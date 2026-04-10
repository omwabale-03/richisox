import { NextRequest } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { ok, unauthorized, err, badRequest } from "@/lib/response";

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return unauthorized();

    const { orderId, amount } = await req.json();
    if (!orderId || !amount) return badRequest("orderId and amount required");

    // Dynamically import Razorpay to avoid build issues
    const Razorpay = (await import("razorpay")).default;
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const razorpayOrder = await rzp.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: orderId,
    });

    await connectDB();
    await Order.findByIdAndUpdate(orderId, {
      razorpayOrderId: razorpayOrder.id,
    });

    return ok({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error("Create Razorpay order error:", error);
    return err("Failed to create payment order");
  }
}
