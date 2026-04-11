"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    id: "luxury",
    label: "Luxury Selection",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=800&fit=crop",
    href: "/products?category=men",
  },
  {
    id: "patterns",
    label: "Stylish Patterns",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=800&fit=crop",
    href: "/products?category=women",
  },
  {
    id: "comfort",
    label: "Superior Comfort",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=800&fit=crop",
    href: "/products?category=kids",
  },
];

const curatedImages = [
  { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=450&fit=crop", alt: "Blue Athletic Socks" },
  { src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=450&fit=crop", alt: "Olive Green Socks" },
  { src: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=450&fit=crop", alt: "Classic Pattern Socks" },
  { src: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=450&fit=crop", alt: "Premium Wool Socks" },
];

const testimonials = [
  { name: "Priya S.", rating: 5, text: "Absolutely love these socks! The quality is top-notch and they feel amazing.", location: "Mumbai" },
  { name: "Rahul M.", rating: 5, text: "Finally found socks that are both stylish and comfortable. RichySox is the best!", location: "Delhi" },
  { name: "Ananya K.", rating: 5, text: "The crew socks are perfect. I've ordered 5 pairs already. Highly recommend!", location: "Bangalore" },
  { name: "Vikram R.", rating: 4, text: "Great quality socks. The sports collection is perfect for my gym sessions.", location: "Chennai" },
  { name: "Sneha P.", rating: 5, text: "Love the colors and the softness. My kids absolutely adore the kids collection!", location: "Pune" },
  { name: "Arjun D.", rating: 5, text: "Premium quality at a fair price. My go-to sock brand from now on!", location: "Hyderabad" },
];

const features = [
  { icon: "🧵", title: "Premium Quality", desc: "100% combed cotton with reinforced heel & toe" },
  { icon: "🚚", title: "Free Shipping ₹499+", desc: "Fast delivery across all of India" },
  { icon: "↩️", title: "Easy Returns", desc: "7-day hassle-free return policy" },
  { icon: "🔒", title: "Secure Payments", desc: "UPI, cards, wallets, net banking via Razorpay" },
];

export default function HomePage() {
  const [curatedIdx, setCuratedIdx] = useState(0);
  const maxIdx = Math.max(0, curatedImages.length - 2);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-brand-cream-light">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20 lg:py-28">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="max-w-xl">
                <h1 className="text-5xl md:text-6xl lg:text-[58px] font-playfair font-extrabold leading-[1.1] text-brand-brown mb-7">
                  Elevate Your Feet With Timeless Luxury Socks
                </h1>
                <p className="text-base text-brand-brown-light leading-relaxed mb-9 max-w-[420px]">
                  We curated a collection of premium high-quality socks for those who demand sophisticated style
                  without compromising on artisanal comfort. From silk blends to fine wool, experience the pinnacle of
                  foot couture.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-brand-gold text-white px-9 py-4 rounded-full text-base font-semibold hover:bg-brand-gold-hover transition-colors"
                >
                  Shop Luxury
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="w-full max-w-[380px] aspect-[9/10] rounded-3xl overflow-hidden bg-brand-cream-dark flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=760&h=840&fit=crop"
                  alt="Luxury Socks"
                  width={380}
                  height={420}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="bg-brand-brown py-4 overflow-hidden">
          <div className="marquee-track">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 pr-8 text-brand-gold font-medium text-sm whitespace-nowrap">
                <span>✦ Premium Cotton</span>
                <span>✦ Free Shipping ₹499+</span>
                <span>✦ 100+ Designs</span>
                <span>✦ Easy Returns</span>
                <span>✦ Artisanal Comfort</span>
                <span>✦ Made for India</span>
              </span>
            ))}
          </div>
        </div>

        {/* Shop by Category */}
        <section className="py-20 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            <h2 className="text-4xl md:text-[44px] font-playfair font-extrabold text-center text-brand-brown mb-12">
              Shop by Category
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <div key={cat.id} className="flex flex-col items-center">
                  <Link href={cat.href} className="block w-full group">
                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-brand-cream-dark mb-5">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        width={400}
                        height={533}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <h3 className="text-xl font-playfair font-bold text-brand-brown mb-3 text-center">
                    {cat.label}
                  </h3>
                  <Link
                    href={cat.href}
                    className="px-9 py-2.5 rounded-full border-[1.5px] border-brand-gold text-brand-brown text-sm font-sans hover:bg-brand-gold/10 transition-colors"
                  >
                    Explore
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curated Selection */}
        <section className="py-20 bg-brand-cream-light">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            <h2 className="text-4xl md:text-[44px] font-playfair font-extrabold text-center text-brand-brown mb-4">
              The Curated Selection
            </h2>
            <p className="text-center text-brand-brown-light text-base max-w-xl mx-auto mb-12 leading-relaxed">
              Discover our ensemble of sophisticated designs, where luxury comfort is woven into
              every stitch. We invite you to experience the pinnacle of artisanal sock-making.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setCuratedIdx(Math.max(0, curatedIdx - 1))}
                disabled={curatedIdx === 0}
                className="w-10 h-10 rounded-full border-[1.5px] border-brand-gold/40 flex items-center justify-center text-brand-brown hover:border-brand-gold hover:bg-brand-gold/10 transition-colors flex-shrink-0 disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {curatedImages.slice(curatedIdx, curatedIdx + 2).map((img, i) => (
                  <div key={curatedIdx + i} className="rounded-[20px] overflow-hidden bg-brand-cream-dark aspect-[4/3]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCuratedIdx(Math.min(maxIdx, curatedIdx + 1))}
                disabled={curatedIdx >= maxIdx}
                className="w-10 h-10 rounded-full border-[1.5px] border-brand-gold/40 flex items-center justify-center text-brand-brown hover:border-brand-gold hover:bg-brand-gold/10 transition-colors flex-shrink-0 disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Why RichySox */}
        <section className="py-20 bg-brand-brown">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            <h2 className="text-4xl font-playfair font-bold text-brand-cream-light text-center mb-4">
              Why RichySox?
            </h2>
            <p className="text-center text-brand-cream-dark/60 mb-12">
              Everything you need from a premium sock brand
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="text-brand-cream-light font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-brand-cream-dark/60 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            <h2 className="text-4xl font-playfair font-bold text-brand-brown text-center mb-4">
              What Customers Say
            </h2>
            <p className="text-center text-brand-brown-light mb-12">
              Loved by 50,000+ customers across India
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-brand-cream-light rounded-2xl p-6 border border-brand-cream-dark hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < t.rating ? "fill-brand-gold text-brand-gold" : "text-brand-cream-dark"}`}
                      />
                    ))}
                  </div>
                  <p className="text-brand-brown-light text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-brown">{t.name}</p>
                      <p className="text-xs text-brand-brown-light/60">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-brand-gold">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-brown mb-4">
              Ready to step up your sock game?
            </h2>
            <p className="text-brand-brown/70 text-lg mb-6">
              Use code <span className="font-bold bg-brand-brown text-brand-gold px-3 py-1 rounded-lg">RICHY10</span> for 10% off your first order
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-brown text-brand-cream-light px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform text-lg"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
