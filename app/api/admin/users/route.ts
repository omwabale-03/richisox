import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import User from "@/models/User";
import { ok, forbidden, err } from "@/lib/response";

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== "admin") return forbidden();

    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { mobile: { $regex: search } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 }).select("-__v");
    return ok(users);
  } catch {
    return err("Failed to fetch users");
  }
}
