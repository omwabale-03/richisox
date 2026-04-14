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
    const limit = parseInt(searchParams.get("limit") || "24");
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const sockType = searchParams.get("sockType");
    const material = searchParams.get("material");
    const occasion = searchParams.get("occasion");
    const technology = searchParams.get("technology");
    const colour = searchParams.get("colour");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minRating = searchParams.get("minRating");
    const packSize = searchParams.get("packSize");
    const search = searchParams.get("search");
    const isFeatured = searchParams.get("isFeatured");
    const isNew = searchParams.get("isNew");
    const isTrending = searchParams.get("isTrending");
    const sort = searchParams.get("sort") || "newest";

    const query: Record<string, unknown> = { isActive: true };
    if (category && category !== "all") query.category = category;
    if (type && type !== "all") query.type = type;
    if (sockType) query.sockType = sockType;
    if (material) query.material = material;
    if (occasion) query.occasion = occasion;
    if (technology) query.technologies = technology;
    if (colour) query["colors.name"] = { $regex: colour, $options: "i" };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) (query.price as Record<string, number>).$gte = Number(minPrice);
      if (maxPrice) (query.price as Record<string, number>).$lte = Number(maxPrice);
    }
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (packSize) query["packOptions.size"] = Number(packSize);
    if (isFeatured === "true") query.isFeatured = true;
    if (isNew === "true") query.isNew = true;
    if (isTrending === "true") query.isTrending = true;
    if (search) query.$text = { $search: search };

    const sortMap: Record<string, Record<string, SortOrder>> = {
      newest: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating: { rating: -1 },
      bestseller: { reviewCount: -1 },
      discount: { discount: -1 },
    };

    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query).sort(sortMap[sort] || sortMap.newest).skip(skip).limit(limit),
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
