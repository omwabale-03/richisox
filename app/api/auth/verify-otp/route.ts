import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyOTP } from "@/lib/otp";
import { signToken } from "@/lib/auth";
import User from "@/models/User";
import { badRequest, err } from "@/lib/response";

export async function POST(req: NextRequest) {
  try {
    const { mobile, otp, name } = await req.json();

    if (!mobile || !otp) return badRequest("Mobile and OTP required");

    const isValid = verifyOTP(mobile, otp);
    if (!isValid) return badRequest("Invalid or expired OTP");

    // Try connecting to DB, fall back to mock user for dev mode
    let userData: { _id: string; name: string; mobile: string; role: string; loyaltyPoints: number };

    try {
      await connectDB();
      let user = await User.findOne({ mobile });
      if (!user) {
        user = await User.create({ mobile, name: name || "" });
      } else if (name && !user.name) {
        user.name = name;
        await user.save();
      }
      userData = {
        _id: user._id.toString(),
        name: user.name,
        mobile: user.mobile,
        role: user.role,
        loyaltyPoints: user.loyaltyPoints || 0,
      };
    } catch (dbError) {
      console.warn("DB connection failed, using dev mock user:", (dbError as Error).message);
      userData = {
        _id: `dev_${mobile}`,
        name: name || "Dev User",
        mobile,
        role: "customer",
        loyaltyPoints: 0,
      };
    }

    const token = signToken({
      userId: userData._id,
      mobile: userData.mobile,
      role: userData.role as "customer" | "admin",
    });

    const nextResponse = NextResponse.json(
      {
        success: true,
        data: { user: userData, token },
        message: "Login successful",
      },
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
