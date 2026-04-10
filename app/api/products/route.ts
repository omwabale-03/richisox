import { NextRequest } from "next/server";
import { SortOrder } from "mongoose";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Product from "@/models/Product";
import { ok, forbidden, err } from "@/lib/response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const search = searchParams.get("search");
    const isFeatured = searchParams.get("isFeatured");
    const sort = searchParams.get("sort") || "newest";

    const query: Record<string, unknown> = { isActive: true };
    if (category) query.category = category;
    if (type) query.type = type;
    if (isFeatured === "true") query.isFeatured = true;
    if (search) query.$text = { $search: search };

    const sortMap: Record<string, Record<string, SortOrder>> = {
      newest: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating: { rating: -1 },
    };

    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query).sort(sortMap[sort]).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    return ok({ products, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    return err("Failed to fetch products");
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== "admin") return forbidden();

    await connectDB();
    const body = await req.json();
    const product = await Product.create(body);
    return ok(product, "Product created");
  } catch (error) {
    return err("Failed to create product");
  }
}
