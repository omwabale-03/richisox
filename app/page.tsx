"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ShopByOccasion } from "@/components/home/ShopByOccasion";
import { BestSellers } from "@/components/home/BestSellers";
import { GiftBoxBanner } from "@/components/home/GiftBoxBanner";
import { TrendingNewTabs } from "@/components/home/TrendingNewTabs";
import { InstagramGrid } from "@/components/home/InstagramGrid";

const testimonials = [
  { name: "Priya S.", rating: 5, text: "Absolutely love these socks! The quality is top-notch and they feel amazing.", location: "Mumbai" },
  { name: "Rahul M.", rating: 5, text: "Finally found socks that are both stylish and comfortable. RichySox is the best!", location: "Delhi" },
  { name: "Ananya K.", rating: 5, text: "The crew socks are perfect. I've ordered 5 pairs already. Highly recommend!", location: "Bangalore" },
  { name: "Vikram R.", rating: 4, text: "Great quality socks. The sports collection is perfect for my gym sessions.", location: "Chennai" },
  { name: "Sneha P.", rating: 5, text: "Love the colors and the softness. My kids absolutely adore the kids collection!", location: "Pune" },
  { name: "Arjun D.", rating: 5, text: "Premium quality at a fair price. My go-to sock brand from now on!", location: "Hyderabad" },
];

const features = [
  {
    title: "Premium Quality",
    desc: "100% combed cotton with reinforced heel & toe",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A8874A" strokeWidth="1.5">
        <path d="M16 2L20 10L29 11.5L22.5 18L24 27L16 23L8 27L9.5 18L3 11.5L12 10L16 2Z" />
      </svg>
    ),
  },
  {
    title: "Free Shipping",
    desc: "Fast delivery across all of India on orders ₹499+",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A8874A" strokeWidth="1.5">
        <rect x="2" y="10" width="18" height="14" rx="0" />
        <path d="M20 16H26L30 20V24H20V16Z" />
        <circle cx="9" cy="26" r="2.5" />
        <circle cx="25" cy="26" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Easy Returns",
    desc: "7-day hassle-free return policy",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A8874A" strokeWidth="1.5">
        <path d="M4 16C4 9.37 9.37 4 16 4C22.63 4 28 9.37 28 16" />
        <path d="M28 16C28 22.63 22.63 28 16 28C9.37 28 4 22.63 4 16" />
        <path d="M2 12L4 16L8 14" />
      </svg>
    ),
  },
  {
    title: "Secure Payments",
    desc: "UPI, cards, wallets, net banking via Razorpay",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A8874A" strokeWidth="1.5">
        <rect x="4" y="8" width="24" height="16" rx="0" />
        <path d="M16 18V14M16 14L13 17M16 14L19 17" />
        <circle cx="16" cy="16" r="6" />
      </svg>
    ),
  },
];

const pressNames = ["Vogue India", "GQ India", "Elle", "Harper's Bazaar", "Grazia"];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Marquee */}
        <div className="bg-[#1A1A1A] py-3.5 overflow-hidden">
          <div className="marquee-track">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 pr-8 text-luxe-gold-light text-[11px] tracking-[0.15em] uppercase whitespace-nowrap" style={{ fontWeight: 500 }}>
                <span>&#10022; Premium Cotton</span>
                <span>&#10022; Silver Frost Anti-Odour</span>
                <span>&#10022; OEKO-TEX Certified</span>
                <span>&#10022; Moisture Wicking</span>
                <span>&#10022; 300+ Designs</span>
                <span>&#10022; Made in India</span>
              </span>
            ))}
          </div>
        </div>

        {/* Shop by Occasion */}
        <ShopByOccasion />

        {/* Best Sellers */}
        <BestSellers />

        {/* Gift Box Banner */}
        <GiftBoxBanner />

        {/* Trending / New Arrivals Tabs */}
        <TrendingNewTabs />

        {/* Features Strip */}
        <section className="bg-white border-y border-luxe-border">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`flex flex-col items-center text-center py-10 px-6 ${
                    i < features.length - 1 ? "lg:border-r border-luxe-border" : ""
                  } ${i < 2 ? "border-b lg:border-b-0 border-luxe-border" : ""}`}
                >
                  <div className="mb-4">{f.icon}</div>
                  <h4 className="text-[11px] uppercase tracking-[0.15em] text-luxe-text mb-2" style={{ fontWeight: 600 }}>{f.title}</h4>
                  <p className="text-[11px] text-luxe-muted" style={{ fontWeight: 400 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-luxe-bg">
          <div className="max-w-[1400px] mx-auto px-[4%]">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">What They Say</p>
              <h2 className="font-playfair text-luxe-text mb-2" style={{ fontWeight: 400 }}>
                Customer <em className="font-playfair italic">Stories</em>
              </h2>
              <p className="text-body-sm text-luxe-muted" style={{ fontWeight: 400 }}>Loved by 50,000+ customers across India</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white p-7 border border-luxe-border">
                  <div className="flex items-center gap-1.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-[14px] h-[14px]"
                        style={{
                          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                          background: i < t.rating ? "#A8874A" : "#E8E4DF",
                        }}
                      />
                    ))}
                  </div>
                  <p className="font-playfair italic text-[15px] text-luxe-text-secondary leading-relaxed mb-5" style={{ fontWeight: 400 }}>&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-luxe-text rounded-full flex items-center justify-center text-white text-[10px]" style={{ fontWeight: 600 }}>{t.name[0]}</div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-luxe-text" style={{ fontWeight: 600 }}>{t.name}</p>
                      <p className="text-[10px] text-luxe-muted">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram */}
        <InstagramGrid />

        {/* As Featured In */}
        <section className="bg-luxe-surface py-10">
          <div className="max-w-[1400px] mx-auto px-[4%]">
            <p className="eyebrow text-center mb-6">As Featured In</p>
            <div className="flex items-center justify-center flex-wrap gap-0">
              {pressNames.map((name, i) => (
                <div key={name} className={`px-8 py-2 ${i < pressNames.length - 1 ? "border-r border-luxe-border-emphasis" : ""}`}>
                  <span className="font-playfair text-[16px] text-luxe-muted uppercase tracking-[0.05em]" style={{ fontWeight: 400 }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="bg-[#1A1A1A] py-20">
          <div className="max-w-2xl mx-auto px-[4%] text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-luxe-gold mb-4" style={{ fontWeight: 500 }}>Join the Club</p>
            <h2 className="font-playfair text-white mb-4" style={{ fontWeight: 400 }}>
              Ready to Step Up Your <em className="font-playfair italic text-luxe-gold-light">Sock Game</em>?
            </h2>
            <p className="text-[13px] text-luxe-muted mb-8" style={{ fontWeight: 300 }}>
              Use code <span className="text-luxe-gold-light" style={{ fontWeight: 500 }}>RICHY10</span> for 10% off your first order
            </p>
            <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 bg-white/10 border border-white/20 text-white text-[13px] placeholder:text-white/40"
                style={{ fontWeight: 300, boxShadow: "none" }}
              />
              <button className="px-8 py-4 bg-luxe-gold text-white text-[11px] uppercase tracking-[0.2em] hover:bg-luxe-gold-light transition-colors duration-200" style={{ fontWeight: 500 }}>
                Subscribe
              </button>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-luxe-muted border-b border-luxe-muted hover:text-white hover:border-white transition-colors duration-200 pb-0.5"
              style={{ fontWeight: 500 }}
            >
              Shop Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
