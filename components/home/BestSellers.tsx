"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/demo-products";

export function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const products = DEMO_PRODUCTS.filter((p) => p.isFeatured);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-luxe-surface">
      <div className="max-w-[1400px] mx-auto px-[4%]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="eyebrow mb-3">Most Loved</p>
            <h2 className="font-playfair text-luxe-text" style={{ fontWeight: 400 }}>
              Best <em className="font-playfair italic">Sellers</em>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 border border-luxe-border-emphasis flex items-center justify-center text-luxe-text hover:border-luxe-text transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 border border-luxe-border-emphasis flex items-center justify-center text-luxe-text hover:border-luxe-text transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              href="/products?isFeatured=true"
              className="hidden sm:inline-block ml-4 text-[11px] uppercase tracking-[0.18em] text-luxe-text-secondary border-b border-luxe-border-emphasis hover:text-luxe-text transition-colors duration-200 pb-0.5"
              style={{ fontWeight: 500 }}
            >
              View All
            </Link>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-px overflow-x-auto scrollbar-none bg-luxe-border -mx-1 px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="flex-shrink-0 w-[240px] md:w-[280px] bg-white group"
            >
              <div className="relative h-52 bg-luxe-image-bg overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                />
              </div>
              <div className="p-3.5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-luxe-gold mb-1" style={{ fontWeight: 500 }}>{product.sockType}</p>
                <h3 className="font-playfair text-[14px] text-luxe-text mb-1 line-clamp-1" style={{ fontWeight: 400 }}>{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{product.price}</span>
                  {product.mrp && product.mrp > product.price && (
                    <span className="text-[11px] text-luxe-muted line-through">&#8377;{product.mrp}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
