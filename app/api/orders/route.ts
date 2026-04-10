import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { ok, unauthorized, badRequest, err } from "@/lib/response";

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return unauthorized();

    await connectDB();
    const orders = await Order.find({ user: user.userId })
      .populate("user", "name mobile")
      .sort({ createdAt: -1 });

    return ok(orders);
  } catch {
    return err("Failed to fetch orders");
  }
}

export async function POST(req: NextRequest) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload) return unauthorized();

    await connectDB();
    const body = await req.json();
    const { items, address, subtotal, discount, shipping, total, coupon } = body;

    if (!items?.length || !address) return badRequest("Items and address required");

    // Reduce stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    const order = await Order.create({
      user: userPayload.userId,
      items,
      address,
      subtotal,
      discount: discount || 0,
      shipping: shipping || 0,
      total,
      coupon,
    });

    return ok(order, "Order created");
  } catch {
    return err("Failed to create order");
  }
}
