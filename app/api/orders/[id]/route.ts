import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Order from "@/models/Order";
import { ok, unauthorized, notFound, forbidden, err } from "@/lib/response";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return unauthorized();

    await connectDB();
    const order = await Order.findById(params.id).populate("user", "name mobile");
    if (!order) return notFound("Order not found");

    if (order.user._id.toString() !== user.userId && user.role !== "admin") {
      return forbidden();
    }

    return ok(order);
  } catch {
    return err("Failed to fetch order");
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return unauthorized();

    await connectDB();
    const body = await req.json();
    const order = await Order.findById(params.id);
    if (!order) return notFound("Order not found");

    if (user.role !== "admin" && order.user.toString() !== user.userId) {
      return forbidden();
    }

    const updatableFields = user.role === "admin"
      ? ["orderStatus", "paymentStatus", "trackingNumber", "courier", "shiprocketOrderId"]
      : [];

    for (const field of updatableFields) {
      if (body[field] !== undefined) {
        (order as unknown as Record<string, unknown>)[field] = body[field];
      }
    }

    await order.save();
    return ok(order, "Order updated");
  } catch {
    return err("Failed to update order");
  }
}
