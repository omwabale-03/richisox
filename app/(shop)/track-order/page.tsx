"use client";

import { useState } from "react";
import { Search, Package } from "lucide-react";
import toast from "react-hot-toast";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");

  const handleTrack = () => {
    if (!orderId.trim()) {
      toast.error("Please enter an order ID");
      return;
    }
    window.location.href = `/orders/${orderId.trim()}`;
  };

  return (
    <div className="min-h-screen bg-luxe-bg flex items-center justify-center">
      <div className="max-w-md mx-auto px-[4%] text-center">
        <Package className="w-12 h-12 text-luxe-gold mx-auto mb-6" strokeWidth={1.5} />
        <h1 className="font-playfair text-luxe-text mb-3" style={{ fontWeight: 400, fontSize: "28px" }}>
          Track Your <em className="font-playfair italic">Order</em>
        </h1>
        <p className="text-[13px] text-luxe-muted mb-8" style={{ fontWeight: 300, lineHeight: 1.7 }}>
          Enter your order ID to check the status and tracking details.
        </p>
        <div className="flex gap-0">
          <div className="flex items-center px-3 border border-r-0 border-luxe-border bg-luxe-surface">
            <Search className="w-4 h-4 text-luxe-muted" />
          </div>
          <input
            type="text"
            placeholder="e.g. RS-20240611-0002"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            className="flex-1 px-4 py-3.5 border border-luxe-border text-[13px] text-luxe-text bg-white placeholder:text-luxe-muted"
            style={{ fontWeight: 300, boxShadow: "none" }}
          />
          <button
            onClick={handleTrack}
            className="px-6 py-3.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.15em] hover:bg-[#333] transition-colors duration-200"
            style={{ fontWeight: 500 }}
          >
            Track
          </button>
        </div>
      </div>
    </div>
  );
}
