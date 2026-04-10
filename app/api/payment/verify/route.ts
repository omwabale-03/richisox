import { NextRequest } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Order from "@/models/Order";
import { createShiprocketOrder } from "@/lib/shiprocket";
import { ok, unauthorized, badRequest, err } from "@/lib/response";

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return unauthorized();

    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

    // Verify HMAC signature
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return badRequest("Payment verification failed");
    }

    await connectDB();
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "paid",
        orderStatus: "confirmed",
        razorpayOrderId,
        razorpayPaymentId,
      },
      { new: true }
    );

    if (!order) return badRequest("Order not found");

    // Create Shiprocket shipment (non-fatal)
    try {
      const shiprocketPayload = {
        order_id: order.orderId,
        order_date: order.createdAt,
        pickup_location: "Primary",
        billing_customer_name: order.address.name,
        billing_phone: order.address.mobile,
        billing_address: order.address.street,
        billing_city: order.address.city,
        billing_state: order.address.state,
        billing_pincode: order.address.pincode,
        billing_country: "India",
        shipping_is_billing: true,
        order_items: order.items.map((item) => ({
          name: item.name,
          sku: item.productId.toString(),
          units: item.quantity,
          selling_price: item.price,
        })),
        payment_method: "Prepaid",
        sub_total: order.subtotal,
        length: 10,
        breadth: 10,
        height: 5,
        weight: 0.3,
      };

      const srOrder = await createShiprocketOrder(shiprocketPayload);
      await Order.findByIdAndUpdate(orderId, {
        shiprocketOrderId: srOrder.order_id,
        trackingNumber: srOrder.shipment_id,
      });
    } catch (srError) {
      console.warn("Shiprocket order creation failed (non-fatal):", srError);
    }

    return ok(order, "Payment verified and order confirmed");
  } catch (error) {
    console.error("Payment verify error:", error);
    return err("Payment verification failed");
  }
}
