import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Order from "@/models/Order";
import { ok, forbidden, err } from "@/lib/response";

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== "admin") return forbidden();

    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const query: Record<string, unknown> = {};
    if (status) query.orderStatus = status;
    if (search) query.orderId = { $regex: search, $options: "i" };

    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(query).populate("user", "name mobile email").sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(query),
    ]);

    return ok({ orders, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return err("Failed to fetch orders");
  }
}
