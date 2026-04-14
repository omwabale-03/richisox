"use client";

import Link from "next/link";
import { Briefcase, Dumbbell, Coffee, Crown, Gift, Plane } from "lucide-react";

const occasions = [
  { icon: Briefcase, label: "Office Wear", href: "/products?occasion=office" },
  { icon: Dumbbell, label: "Sports & Gym", href: "/products?occasion=sports" },
  { icon: Coffee, label: "Casual", href: "/products?occasion=casual" },
  { icon: Crown, label: "Formal", href: "/products?occasion=formal" },
  { icon: Gift, label: "Festive / Gifting", href: "/products?occasion=festive" },
  { icon: Plane, label: "Travel", href: "/products?occasion=travel" },
];

export function ShopByOccasion() {
  return (
    <section className="section-padding bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%]">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Find Your Perfect Pair</p>
          <h2 className="font-playfair text-luxe-text" style={{ fontWeight: 400 }}>
            Shop by <em className="font-playfair italic">Occasion</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-luxe-border">
          {occasions.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="bg-white flex flex-col items-center py-8 px-4 group hover:bg-luxe-surface transition-colors duration-200"
            >
              <Icon className="w-7 h-7 text-luxe-gold mb-3 group-hover:scale-110 transition-transform duration-200" strokeWidth={1.5} />
              <span className="text-[11px] uppercase tracking-[0.15em] text-luxe-text-secondary group-hover:text-luxe-text transition-colors duration-200 text-center" style={{ fontWeight: 500 }}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
