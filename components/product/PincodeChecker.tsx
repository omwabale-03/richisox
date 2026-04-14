"use client";

import { useState } from "react";
import { MapPin, Truck } from "lucide-react";

export function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<{ available: boolean; days: string; date: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    if (pincode.length !== 6) return;
    setLoading(true);
    // Mock pincode check
    setTimeout(() => {
      const daysNum = pincode.startsWith("1") || pincode.startsWith("2") || pincode.startsWith("3") || pincode.startsWith("4")
        ? 3 : 5;
      const deliveryDate = new Date(Date.now() + daysNum * 86400000);
      setResult({
        available: true,
        days: `${daysNum}-${daysNum + 2}`,
        date: deliveryDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" }),
      });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="mb-6 pt-6 border-t border-luxe-border">
      <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
        Delivery
      </p>
      <div className="flex gap-0">
        <div className="flex items-center px-3 border border-r-0 border-luxe-border bg-luxe-surface">
          <MapPin className="w-3.5 h-3.5 text-luxe-muted" />
        </div>
        <input
          type="text"
          placeholder="Enter pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
            setResult(null);
          }}
          className="flex-1 px-3 py-2.5 border border-luxe-border text-[13px] text-luxe-text placeholder:text-luxe-muted bg-white"
          style={{ fontWeight: 300, boxShadow: "none" }}
          onKeyDown={(e) => e.key === "Enter" && handleCheck()}
        />
        <button
          onClick={handleCheck}
          disabled={pincode.length !== 6 || loading}
          className="px-5 py-2.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.15em] hover:bg-[#333] transition-colors duration-200 disabled:opacity-40"
          style={{ fontWeight: 500 }}
        >
          {loading ? "..." : "Check"}
        </button>
      </div>
      {result && (
        <div className="mt-3 flex items-center gap-2 text-[12px] text-green-700 bg-green-50 border border-green-100 px-3 py-2">
          <Truck className="w-3.5 h-3.5" />
          <span>
            Delivery in <span style={{ fontWeight: 500 }}>{result.days} days</span> — Est. by{" "}
            <span style={{ fontWeight: 500 }}>{result.date}</span>
          </span>
        </div>
      )}
    </div>
  );
}
