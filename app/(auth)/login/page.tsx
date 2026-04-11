"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth, isLoggedIn } = useAuthStore();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isLoggedIn()) {
    router.push("/");
    return null;
  }

  const handleSendOtp = async () => {
    if (!mobile || mobile.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/auth/send-otp", { mobile });
      setOtpSent(true);
      toast.success("OTP sent!");
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Enter valid OTP");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/verify-otp", { mobile, otp, name });
      setAuth(data.data.user, data.data.token);
      toast.success("Welcome to RichySox!");
      if (data.data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-xl">&#128081;</span>
            <span className="text-4xl font-playfair font-bold text-brand-brown">
              RichySox
            </span>
          </Link>
          <p className="text-brand-brown-light/60 mt-2 text-sm">Elevate Your Feet With Timeless Luxury</p>
        </div>

        <div className="bg-brand-cream-light rounded-3xl border border-brand-cream-dark p-8">
          <h2 className="text-2xl font-playfair font-bold text-brand-brown mb-2">Welcome back</h2>
          <p className="text-brand-brown-light/60 text-sm mb-6">Login or create an account with your mobile number</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1">Mobile Number</label>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 border-brand-cream-dark rounded-l-xl bg-brand-cream text-sm text-brand-brown-light">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  disabled={otpSent}
                  className="flex-1 px-4 py-3 border border-brand-cream-dark rounded-r-xl focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm bg-white disabled:bg-brand-cream/50 text-brand-brown"
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full py-3 bg-brand-gold text-white rounded-xl font-semibold hover:bg-brand-gold-hover transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-brand-brown mb-1">OTP</label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full px-4 py-3 border border-brand-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold text-center text-2xl tracking-widest font-mono bg-white text-brand-brown"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-brown mb-1">Full Name (for new users)</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm bg-white text-brand-brown"
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full py-3 bg-brand-gold text-white rounded-xl font-semibold hover:bg-brand-gold-hover transition-colors disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </button>
                <button
                  onClick={() => { setOtpSent(false); setOtp(""); }}
                  className="w-full text-sm text-brand-brown-light/60 hover:text-brand-brown transition-colors"
                >
                  &larr; Change number / Resend OTP
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-brand-brown-light/50 mt-6">
          By continuing, you agree to our{" "}
          <Link href="#" className="text-brand-gold hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="#" className="text-brand-gold hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
