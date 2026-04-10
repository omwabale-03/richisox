import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import User from "@/models/User";
import { ok, unauthorized, err } from "@/lib/response";

export async function GET(req: NextRequest) {
  try {
    const payload = getUserFromRequest(req);
    if (!payload) return unauthorized();

    await connectDB();
    const user = await User.findById(payload.userId).select("-__v");
    if (!user) return unauthorized("User not found");

    return ok(user);
  } catch (error) {
    return err("Failed to fetch user");
  }
}
