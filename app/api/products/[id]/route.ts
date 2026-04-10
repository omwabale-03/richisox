import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Product from "@/models/Product";
import { ok, notFound, forbidden, err } from "@/lib/response";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const product = await Product.findOne({ _id: params.id, isActive: true });
    if (!product) return notFound("Product not found");
    return ok(product);
  } catch {
    return err("Failed to fetch product");
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== "admin") return forbidden();

    await connectDB();
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, body, { new: true });
    if (!product) return notFound("Product not found");
    return ok(product, "Product updated");
  } catch {
    return err("Failed to update product");
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== "admin") return forbidden();

    await connectDB();
    await Product.findByIdAndUpdate(params.id, { isActive: false });
    return ok(null, "Product deactivated");
  } catch {
    return err("Failed to delete product");
  }
}
