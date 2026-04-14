"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function GiftBoxBanner() {
  return (
    <section className="bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2">
          {/* Image Side */}
          <div className="relative h-[350px] md:h-[450px] bg-luxe-image-bg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=700&h=450&fit=crop"
              alt="Gift Box"
              fill
              className="object-cover"
            />
            {/* Subtle dot pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle, #A8874A 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }} />
          </div>
          {/* Content Side */}
          <div className="flex items-center justify-center p-10 md:p-16 bg-white">
            <div className="max-w-sm">
              <span className="inline-block border border-luxe-gold text-luxe-gold text-[9px] uppercase tracking-[0.2em] px-3 py-1 mb-5" style={{ fontWeight: 500 }}>
                Gift Collection
              </span>
              <h2 className="font-playfair text-luxe-text mb-4" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)" }}>
                The <em className="font-playfair italic">Perfect</em> Gift
              </h2>
              <p className="text-body-sm text-luxe-text-secondary mb-3" style={{ fontWeight: 300, lineHeight: 1.85 }}>
                Curated gift boxes in packs of 3, 5 & 9. Beautiful packaging,
                premium socks, unforgettable impressions.
              </p>
              <p className="text-[12px] text-luxe-muted mb-8" style={{ fontWeight: 400 }}>
                Starting from &#8377;749
              </p>
              <Link
                href="/gift-builder"
                className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-[44px] py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors duration-200"
                style={{ fontWeight: 500 }}
              >
                Build Your Gift Box <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
