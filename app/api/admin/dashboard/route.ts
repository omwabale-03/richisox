import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import { ok, forbidden, err } from "@/lib/response";

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== "admin") return forbidden();

    await connectDB();

    const [totalCustomers, totalProducts, orders] = await Promise.all([
      User.countDocuments({ role: "customer" }),
      Product.countDocuments({ isActive: true }),
      Order.find().populate("user", "name mobile").sort({ createdAt: -1 }).limit(100),
    ]);

    const totalRevenue = orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.total, 0);

    const ordersByStatus = orders.reduce(
      (acc: Record<string, number>, o) => {
        acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1;
        return acc;
      },
      {}
    );

    return ok({
      totalRevenue,
      totalOrders: orders.length,
      totalCustomers,
      totalProducts,
      recentOrders: orders.slice(0, 10),
      ordersByStatus,
    });
  } catch {
    return err("Failed to fetch dashboard stats");
  }
}
