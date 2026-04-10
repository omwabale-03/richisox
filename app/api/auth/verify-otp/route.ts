import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyOTP } from "@/lib/otp";
import { signToken } from "@/lib/auth";
import User from "@/models/User";
import { ok, badRequest, err } from "@/lib/response";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { mobile, otp, name } = await req.json();

    if (!mobile || !otp) return badRequest("Mobile and OTP required");

    const isValid = verifyOTP(mobile, otp);
    if (!isValid) return badRequest("Invalid or expired OTP");

    let user = await User.findOne({ mobile });
    if (!user) {
      user = await User.create({ mobile, name: name || "" });
    } else if (name && !user.name) {
      user.name = name;
      await user.save();
    }

    const token = signToken({
      userId: user._id.toString(),
      mobile: user.mobile,
      role: user.role,
    });

    const response = ok(
      {
        user: { _id: user._id, name: user.name, mobile: user.mobile, role: user.role },
        token,
      },
      "Login successful"
    );

    const nextResponse = NextResponse.json(
      { success: true, data: { user: { _id: user._id, name: user.name, mobile: user.mobile, role: user.role }, token } },
      { status: 200 }
    );
    nextResponse.cookies.set("richysox_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    console.error("Verify OTP error:", error);
    return err("Authentication failed");
  }
}
