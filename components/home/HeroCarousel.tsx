"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    eyebrow: "SS'25 Collection",
    headline: "New Arrivals",
    subtext: "Discover the latest in luxury sock design. Crafted for those who appreciate the finer things.",
    cta: "Shop New Arrivals",
    href: "/products?isNew=true",
    bg: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=1400&h=700&fit=crop",
  },
  {
    eyebrow: "Zero Odour Modal",
    headline: "Best Sellers",
    subtext: "Our most loved styles — tried, tested, and adored by over 50,000 customers across India.",
    cta: "Shop Best Sellers",
    href: "/products?isFeatured=true",
    bg: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=1400&h=700&fit=crop",
  },
  {
    eyebrow: "The Perfect Gift",
    headline: "Gift Sets",
    subtext: "Curated gift boxes for every occasion. Premium packaging, unforgettable impressions.",
    cta: "Shop Gift Sets",
    href: "/products?type=giftbox",
    bg: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1400&h=700&fit=crop",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] min-w-0 relative h-[500px] lg:h-[600px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.bg})` }}
              >
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="relative h-full flex items-center">
                <div className="max-w-[1400px] mx-auto px-[4%] w-full">
                  <div className="max-w-xl">
                    <p
                      className="text-[10px] uppercase tracking-[0.3em] text-luxe-gold-light mb-4"
                      style={{ fontWeight: 500 }}
                    >
                      {slide.eyebrow}
                    </p>
                    <h1
                      className="font-playfair text-white mb-5"
                      style={{ fontWeight: 400, fontSize: "clamp(38px, 5vw, 64px)", lineHeight: 1.1 }}
                    >
                      {slide.headline}
                    </h1>
                    <p className="text-[14px] text-white/70 mb-8 max-w-[400px]" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                      {slide.subtext}
                    </p>
                    <Link
                      href={slide.href}
                      className="inline-block bg-white text-[#1A1A1A] px-[44px] py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-white/90 transition-colors duration-200"
                      style={{ fontWeight: 500 }}
                    >
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-[2px] transition-all duration-300 ${
              selectedIndex === i ? "w-8 bg-white" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
