import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { adminAuth } from "@/lib/firebase-admin";
import { signToken } from "@/lib/auth";
import User from "@/models/User";
import { badRequest, err } from "@/lib/response";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { idToken, name } = await req.json();

    if (!idToken) return badRequest("Firebase ID token is required");

    // Verify the Firebase token
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (verifyError) {
      console.error("Firebase token verification failed:", verifyError);
      return badRequest("Invalid or expired Firebase token");
    }

    const phoneNumber = decodedToken.phone_number;
    if (!phoneNumber) return badRequest("No phone number in Firebase token");

    // Extract 10-digit mobile (remove +91 prefix)
    const mobile = phoneNumber.replace(/^\+91/, "").replace(/^\+/, "").slice(-10);

    // Find or create user
    let user = await User.findOne({ mobile });
    if (!user) {
      user = await User.create({ mobile, name: name || "" });
    } else if (name && !user.name) {
      user.name = name;
      await user.save();
    }

    // Issue our JWT
    const token = signToken({
      userId: user._id.toString(),
      mobile: user.mobile,
      role: user.role,
    });

    const nextResponse = NextResponse.json(
      {
        success: true,
        data: {
          user: { _id: user._id, name: user.name, mobile: user.mobile, role: user.role, loyaltyPoints: user.loyaltyPoints || 0 },
          token,
        },
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
    console.error("Firebase verify error:", error);
    return err("Authentication failed");
  }
}
