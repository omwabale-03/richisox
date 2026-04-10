import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Coupon from "@/models/Coupon";
import { ok, badRequest, unauthorized, err } from "@/lib/response";

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return unauthorized();

    await connectDB();
    const { code, subtotal } = await req.json();
    if (!code) return badRequest("Coupon code required");

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      expiresAt: { $gt: new Date() },
    });

    if (!coupon) return badRequest("Invalid or expired coupon code");
    if (coupon.usedCount >= coupon.usageLimit) return badRequest("Coupon usage limit reached");
    if (subtotal < coupon.minOrderValue) {
      return badRequest(`Minimum order value of ₹${coupon.minOrderValue} required`);
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (subtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
    } else {
      discount = coupon.discountValue;
    }

    return ok({ discount: Math.round(discount), coupon: coupon.code }, "Coupon applied");
  } catch {
    return err("Failed to apply coupon");
  }
}
