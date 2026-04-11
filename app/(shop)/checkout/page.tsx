"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Phone, MapPin, CreditCard, Lock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import axios from "axios";

const SHIPPING_THRESHOLD = 499;
const SHIPPING_FEE = 49;

const steps = [
  { id: 1, label: "Login", icon: Phone },
  { id: 2, label: "Address", icon: MapPin },
  { id: 3, label: "Payment", icon: CreditCard },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const { user, token, setAuth, isLoggedIn } = useAuthStore();

  const [step, setStep] = useState(isLoggedIn() ? 2 : 1);

  // Step 1 state
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 2 state
  const [address, setAddress] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Step 3 state
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const sub = subtotal();
  const shipping = sub >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = sub + shipping - discount;

  const handleSendOtp = async () => {
    if (!mobile || mobile.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/auth/send-otp", { mobile });
      setOtpSent(true);
      toast.success("OTP sent to +91 " + mobile);
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/verify-otp", { mobile, otp, name });
      setAuth(data.data.user, data.data.token);
      toast.success("Welcome to RichySox!");
      setStep(2);
    } catch {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressNext = () => {
    const required = ["name", "mobile", "street", "city", "state", "pincode"] as const;
    for (const field of required) {
      if (!address[field]) {
        toast.error(`Please fill in ${field}`);
        return;
      }
    }
    setStep(3);
  };

  const handleApplyCoupon = async () => {
    try {
      const { data } = await axios.post(
        "/api/coupon",
        { code: couponCode, subtotal: sub },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDiscount(data.data.discount);
      setCouponApplied(true);
      toast.success(`Coupon applied! You save ₹${data.data.discount}`);
    } catch {
      toast.error("Invalid or expired coupon");
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data: orderData } = await axios.post(
        "/api/orders",
        {
          items: items.map((i) => ({
            productId: i.product._id,
            name: i.product.name,
            image: i.product.images[0],
            price: i.product.price,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
          })),
          address,
          subtotal: sub,
          discount,
          shipping,
          total,
          coupon: couponApplied ? couponCode : undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data: razorpayData } = await axios.post(
        "/api/payment/create-order",
        { orderId: orderData.data._id, amount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);

      script.onload = () => {
        type RazorpayWindow = { Razorpay: new (opts: Record<string, unknown>) => { open: () => void } };
        const rzp = new (window as unknown as RazorpayWindow).Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: razorpayData.data.amount,
          currency: "INR",
          name: "RichySox",
          description: `Order ${orderData.data.orderId}`,
          order_id: razorpayData.data.razorpayOrderId,
          handler: async (response: Record<string, string>) => {
            await axios.post(
              "/api/payment/verify",
              {
                orderId: orderData.data._id,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            clearCart();
            toast.success("Payment successful! Order placed!");
            router.push(`/orders/${orderData.data._id}`);
          },
          prefill: { name: address.name, contact: address.mobile },
          theme: { color: "#c9a84c" },
        });
        rzp.open();
      };
    } catch {
      toast.error("Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-playfair font-bold text-brand-brown mb-8 text-center">Checkout</h1>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step > s.id
                      ? "bg-brand-gold text-white"
                      : step === s.id
                      ? "bg-brand-brown text-brand-cream-light"
                      : "bg-brand-cream-dark text-brand-brown-light/40"
                  }`}
                >
                  {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step === s.id ? "text-brand-brown" : "text-brand-brown-light/40"}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 h-0.5 ${step > s.id ? "bg-brand-gold" : "bg-brand-cream-dark"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Step 1: OTP Login */}
            {step === 1 && (
              <div className="bg-brand-cream-light rounded-2xl p-6 border border-brand-cream-dark">
                <h2 className="text-xl font-semibold text-brand-brown mb-6 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-brand-gold" /> Login with OTP
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-brown mb-1">Mobile Number</label>
                    <div className="flex">
                      <span className="flex items-center px-3 border border-r-0 border-brand-cream-dark rounded-l-xl bg-brand-cream text-sm text-brand-brown-light">+91</span>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="flex-1 px-4 py-3 border border-brand-cream-dark rounded-r-xl focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm bg-white text-brand-brown"
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
                        <label className="block text-sm font-medium text-brand-brown mb-1">Enter OTP</label>
                        <input
                          type="text"
                          placeholder="6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          className="w-full px-4 py-3 border border-brand-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold text-center text-xl tracking-widest bg-white text-brand-brown"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-brown mb-1">Your Name</label>
                        <input
                          type="text"
                          placeholder="Full name (for new users)"
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
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>
                      <button
                        onClick={() => { setOtpSent(false); setOtp(""); }}
                        className="w-full py-2 text-sm text-brand-brown-light/60 hover:text-brand-brown"
                      >
                        Resend OTP
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
              <div className="bg-brand-cream-light rounded-2xl p-6 border border-brand-cream-dark">
                <h2 className="text-xl font-semibold text-brand-brown mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-gold" /> Delivery Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Full Name", span: 1, type: "text" },
                    { key: "mobile", label: "Mobile", span: 1, type: "tel" },
                    { key: "street", label: "Street Address", span: 2, type: "text" },
                    { key: "city", label: "City", span: 1, type: "text" },
                    { key: "state", label: "State", span: 1, type: "text" },
                    { key: "pincode", label: "Pincode", span: 1, type: "text" },
                  ].map(({ key, label, span, type }) => (
                    <div key={key} className={span === 2 ? "col-span-2" : ""}>
                      <label className="block text-sm font-medium text-brand-brown mb-1">{label}</label>
                      <input
                        type={type}
                        value={address[key as keyof typeof address]}
                        onChange={(e) => setAddress((a) => ({ ...a, [key]: e.target.value }))}
                        className="w-full px-4 py-3 border border-brand-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm bg-white text-brand-brown"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddressNext}
                  className="w-full mt-6 py-3 bg-brand-gold text-white rounded-xl font-semibold hover:bg-brand-gold-hover transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-brand-cream-light rounded-2xl p-6 border border-brand-cream-dark">
                <h2 className="text-xl font-semibold text-brand-brown mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-brand-gold" /> Secure Payment
                </h2>
                <div className="bg-brand-cream rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-green-700" />
                    <span className="text-sm font-medium text-green-800">100% Secure via Razorpay</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["UPI", "Debit Card", "Credit Card", "Net Banking", "Wallets"].map((m) => (
                      <span key={m} className="px-3 py-1 bg-brand-cream-light rounded-full text-xs font-medium text-brand-brown-light border border-brand-cream-dark">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coupon */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-brand-brown mb-2">Coupon Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      disabled={couponApplied}
                      className="flex-1 px-4 py-3 border border-brand-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm font-mono bg-white text-brand-brown disabled:bg-brand-cream/50"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode}
                      className="px-6 py-3 bg-brand-gold text-white rounded-xl font-semibold hover:bg-brand-gold-hover transition-colors disabled:opacity-50"
                    >
                      {couponApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  <p className="text-xs text-brand-brown-light/50 mt-1">Try code: RICHY10</p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full py-4 bg-brand-brown text-brand-cream-light rounded-xl font-semibold text-lg hover:bg-brand-gold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  {loading ? "Processing..." : `Pay ₹${total.toFixed(0)}`}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-brand-cream-light rounded-2xl p-6 border border-brand-cream-dark sticky top-24">
              <h3 className="font-playfair font-bold text-brand-brown mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product._id}-${item.size}`} className="flex justify-between text-sm">
                    <span className="text-brand-brown-light/60 truncate flex-1 mr-2">
                      {item.product.name} &times; {item.quantity}
                    </span>
                    <span className="font-medium text-brand-brown">₹{(item.product.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-cream-dark pt-4 space-y-2">
                <div className="flex justify-between text-sm text-brand-brown-light/60">
                  <span>Subtotal</span>
                  <span>₹{sub.toFixed(0)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-700">
                    <span>Coupon Discount</span>
                    <span>-₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-brand-brown-light/60">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-brand-brown pt-2 border-t border-brand-cream-dark">
                  <span>Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
