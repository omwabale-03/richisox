"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import axios from "axios";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "@/lib/firebase";
import type { ConfirmationResult } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth, isLoggedIn } = useAuthStore();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useFirebase, setUseFirebase] = useState(true);

  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if Firebase is configured
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setUseFirebase(false);
    }
  }, []);

  if (isLoggedIn()) {
    router.push("/");
    return null;
  }

  const setupRecaptcha = () => {
    if (recaptchaRef.current) return;
    recaptchaRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {},
    });
  };

  // ── Firebase OTP Flow ──
  const handleFirebaseSendOtp = async () => {
    if (!mobile || mobile.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    try {
      setupRecaptcha();
      const phoneNumber = `+91${mobile}`;
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaRef.current!);
      confirmationRef.current = result;
      setOtpSent(true);
      toast.success("OTP sent to +91 " + mobile);
    } catch (error: unknown) {
      console.error("Firebase send OTP error:", error);
      const msg = error instanceof Error ? error.message : "Failed to send OTP";
      if (msg.includes("too-many-requests")) {
        toast.error("Too many attempts. Please try again later.");
      } else if (msg.includes("invalid-phone-number")) {
        toast.error("Invalid phone number format");
      } else {
        toast.error("Failed to send OTP. Check console for details.");
      }
      // Reset recaptcha on error
      recaptchaRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }
    if (!confirmationRef.current) {
      toast.error("Session expired. Please resend OTP.");
      setOtpSent(false);
      return;
    }
    setLoading(true);
    try {
      const credential = await confirmationRef.current.confirm(otp);
      const idToken = await credential.user.getIdToken();

      // Send Firebase token to our backend
      const { data } = await axios.post("/api/auth/firebase-verify", { idToken, name });
      setAuth(data.data.user, data.data.token);
      toast.success("Welcome to RichySox!");
      if (data.data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      console.error("Verify error:", error);
      const msg = error instanceof Error ? error.message : "";
      if (msg.includes("invalid-verification-code")) {
        toast.error("Invalid OTP. Please try again.");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Fallback: Original MSG91/Dev Console Flow ──
  const handleLegacySendOtp = async () => {
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

  const handleLegacyVerifyOtp = async () => {
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

  // Choose which flow to use
  const handleSendOtp = useFirebase ? handleFirebaseSendOtp : handleLegacySendOtp;
  const handleVerifyOtp = useFirebase ? handleFirebaseVerifyOtp : handleLegacyVerifyOtp;

  const handleResend = () => {
    setOtpSent(false);
    setOtp("");
    confirmationRef.current = null;
    recaptchaRef.current = null;
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

          {/* Auth mode indicator */}
          <div className="mt-4 pt-4 border-t border-luxe-border">
            <p className="text-[9px] text-luxe-muted text-center uppercase tracking-[0.15em]">
              {useFirebase ? "Secured by Firebase" : "Dev Mode — OTP in server console"}
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-luxe-muted mt-6">
          By continuing, you agree to our{" "}
          <Link href="/return-policy" className="text-luxe-gold hover:text-luxe-text transition-colors duration-200 border-b border-luxe-gold">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/shipping-policy" className="text-luxe-gold hover:text-luxe-text transition-colors duration-200 border-b border-luxe-gold">Privacy Policy</Link>
        </p>
      </div>

      {/* Invisible reCAPTCHA container for Firebase */}
      <div id="recaptcha-container" ref={recaptchaContainerRef} />
    </div>
  );
}
