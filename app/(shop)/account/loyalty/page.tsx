"use client";

import { useAuthStore } from "@/store/authStore";
import { Award, Gift, ShoppingBag } from "lucide-react";

export default function LoyaltyPage() {
  const { user } = useAuthStore();
  const points = user?.loyaltyPoints || 0;
  const rupeeValue = Math.floor(points * 0.25);

  return (
    <div>
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-6" style={{ fontWeight: 600 }}>
        RichyPoints
      </h2>

      {/* Balance Card */}
      <div className="bg-[#1A1A1A] text-white p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-luxe-gold" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-gold-light" style={{ fontWeight: 500 }}>Your Points Balance</p>
        </div>
        <p className="text-[40px] mb-1" style={{ fontWeight: 500 }}>{points.toLocaleString()}</p>
        <p className="text-[13px] text-white/60">= &#8377;{rupeeValue} redeemable value</p>
      </div>

      {/* How It Works */}
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-4" style={{ fontWeight: 600 }}>
        How It Works
      </h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: ShoppingBag, title: "Earn", desc: "Get 1 point for every ₹10 spent on purchases." },
          { icon: Award, title: "Collect", desc: "Watch your points grow with every order you place." },
          { icon: Gift, title: "Redeem", desc: "Use 100 points = ₹25 off at checkout. No minimum." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white border border-luxe-border p-5">
            <Icon className="w-5 h-5 text-luxe-gold mb-3" strokeWidth={1.5} />
            <p className="text-[11px] uppercase tracking-[0.12em] text-luxe-text mb-1" style={{ fontWeight: 600 }}>{title}</p>
            <p className="text-[12px] text-luxe-text-secondary" style={{ fontWeight: 300, lineHeight: 1.7 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Points History */}
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-4" style={{ fontWeight: 600 }}>
        Points History
      </h3>
      <div className="bg-white border border-luxe-border">
        <div className="p-5 text-center text-[13px] text-luxe-muted" style={{ fontWeight: 300 }}>
          Points history will appear here after your first purchase.
        </div>
      </div>
    </div>
  );
}
