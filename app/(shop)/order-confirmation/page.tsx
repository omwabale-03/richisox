"use client";

import Link from "next/link";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-luxe-bg flex items-center justify-center">
      <div className="max-w-lg mx-auto px-[4%] text-center py-20">
        <div className="w-16 h-16 bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="font-playfair text-luxe-text mb-3" style={{ fontWeight: 400, fontSize: "28px" }}>
          Order <em className="font-playfair italic">Confirmed</em>!
        </h1>
        <p className="text-body-base text-luxe-text-secondary mb-2" style={{ fontWeight: 300, lineHeight: 1.85 }}>
          Thank you for shopping with RichySox. Your order has been placed successfully.
        </p>
        <p className="text-[13px] text-luxe-muted mb-8" style={{ fontWeight: 300 }}>
          You will receive an order confirmation SMS shortly.
        </p>

        <div className="bg-white border border-luxe-border p-6 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-luxe-gold" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text" style={{ fontWeight: 600 }}>
              Estimated Delivery
            </p>
          </div>
          <p className="text-[14px] text-luxe-text" style={{ fontWeight: 500 }}>
            {new Date(Date.now() + 5 * 86400000).toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-[12px] text-luxe-muted mt-1">Delivered by Delhivery / Blue Dart</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/orders"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-luxe-border-emphasis text-luxe-text text-[11px] uppercase tracking-[0.2em] hover:border-luxe-text transition-colors duration-200"
            style={{ fontWeight: 500 }}
          >
            View My Orders
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#333] transition-colors duration-200"
            style={{ fontWeight: 500 }}
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
