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
  const [devOtp, setDevOtp] = useState<string | null>(null);

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
      const { data } = await axios.post("/api/auth/send-otp", { mobile });
      setOtpSent(true);

      // If dev mode, show OTP in a popup
      if (data.data?.devOtp) {
        setDevOtp(data.data.devOtp);
        toast.success(`OTP: ${data.data.devOtp}`, { duration: 15000 });
      } else {
        toast.success("OTP sent to +91 " + mobile);
      }
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

  const handleResend = () => {
    setOtpSent(false);
    setOtp("");
    setDevOtp(null);
  };

  return (
    <div className="min-h-screen bg-luxe-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-0">
            <span
              className="font-playfair text-[32px] tracking-[0.08em] text-luxe-text"
              style={{ fontWeight: 400 }}
            >
              RichySox
            </span>
            <span className="text-luxe-gold text-[32px] ml-0.5">.</span>
          </Link>
          <p className="text-[11px] uppercase tracking-[0.2em] text-luxe-muted mt-2" style={{ fontWeight: 500 }}>
            Elevate Your Feet With Timeless Luxury
          </p>
        </div>

        <div className="bg-white border border-luxe-border p-8">
          <h2 className="font-playfair text-[24px] text-luxe-text mb-2" style={{ fontWeight: 400 }}>
            Welcome <em className="font-playfair italic">back</em>
          </h2>
          <p className="text-[13px] text-luxe-muted mb-6" style={{ fontWeight: 300 }}>
            Login or create an account with your mobile number
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>
                Mobile Number
              </label>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 border-luxe-border bg-luxe-surface text-[12px] text-luxe-muted">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  disabled={otpSent}
                  className="flex-1 px-4 py-3 border border-luxe-border text-[13px] bg-white disabled:bg-luxe-surface/50 text-luxe-text placeholder:text-luxe-muted"
                  style={{ fontWeight: 300 }}
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full py-3.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#333] transition-colors duration-200 disabled:opacity-50"
                style={{ fontWeight: 500 }}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <>
                {/* Dev OTP popup banner */}
                {devOtp && (
                  <div className="bg-[#FDF9EF] border border-[#C9A84C] p-4 text-center">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-luxe-gold mb-1" style={{ fontWeight: 600 }}>
                      Development Mode
                    </p>
                    <p className="text-[28px] text-luxe-text tracking-[0.3em] font-mono" style={{ fontWeight: 600 }}>
                      {devOtp}
                    </p>
                    <p className="text-[10px] text-luxe-muted mt-1">Enter this OTP below to login</p>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>
                    OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full px-4 py-3 border border-luxe-border text-center text-[20px] tracking-[0.3em] font-mono bg-white text-luxe-text"
                    style={{ fontWeight: 400 }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>
                    Full Name (for new users)
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-luxe-border text-[13px] bg-white text-luxe-text placeholder:text-luxe-muted"
                    style={{ fontWeight: 300 }}
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full py-3.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#333] transition-colors duration-200 disabled:opacity-50"
                  style={{ fontWeight: 500 }}
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </button>
                <button
                  onClick={handleResend}
                  className="w-full text-[11px] text-luxe-muted hover:text-luxe-text transition-colors duration-200"
                >
                  &larr; Change number / Resend OTP
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-[10px] text-luxe-muted mt-6">
          By continuing, you agree to our{" "}
          <Link href="/return-policy" className="text-luxe-gold hover:text-luxe-text transition-colors duration-200 border-b border-luxe-gold">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/shipping-policy" className="text-luxe-gold hover:text-luxe-text transition-colors duration-200 border-b border-luxe-gold">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
