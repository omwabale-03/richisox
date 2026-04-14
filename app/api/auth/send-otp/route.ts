import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { generateOTP, storeOTP, sendOTP } from "@/lib/otp";
import { ok, badRequest, err } from "@/lib/response";

export async function POST(req: NextRequest) {
  try {
    const { mobile } = await req.json();

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return badRequest("Please provide a valid 10-digit mobile number");
    }

    // Only connect to DB if MSG91 is configured (production)
    // In dev mode, OTP is stored in-memory — no DB needed
    const isDev = !process.env.MSG91_AUTH_KEY;
    if (!isDev) {
      await connectDB();
    }

    const otp = generateOTP();
    storeOTP(mobile, otp);
    await sendOTP(mobile, otp);

    return ok(
      isDev ? { devOtp: otp } : null,
      "OTP sent successfully"
    );
  } catch (error) {
    console.error("Send OTP error:", error);
    return err("Failed to send OTP");
  }
}
