"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import { IProduct } from "@/types";

const tabs = [
  { label: "Trending", filter: (p: IProduct) => p.isTrending },
  { label: "New Arrivals", filter: (p: IProduct) => p.isNew },
  { label: "Top Rated", filter: (p: IProduct) => p.rating >= 4.5 },
];

export function TrendingNewTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const products = DEMO_PRODUCTS.filter(tabs[activeTab].filter).slice(0, 4);

  return (
    <section className="section-padding bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%]">
        <div className="text-center mb-8">
          <p className="eyebrow mb-3">Discover</p>
          <div className="flex items-center justify-center gap-6">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`font-playfair text-[18px] md:text-[22px] transition-colors duration-200 pb-1 border-b-2 ${
                  activeTab === i
                    ? "text-luxe-text border-luxe-text"
                    : "text-luxe-muted border-transparent hover:text-luxe-text-secondary"
                }`}
                style={{ fontWeight: 400 }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-luxe-border">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="bg-white group block"
            >
              <div className="relative h-56 bg-luxe-image-bg overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[8px] uppercase tracking-[0.15em] px-2.5 py-1" style={{ fontWeight: 500 }}>New</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-[9px] uppercase tracking-[0.2em] text-luxe-gold mb-1" style={{ fontWeight: 500 }}>{product.sockType}</p>
                <h3 className="font-playfair text-[15px] text-luxe-text mb-1.5 line-clamp-1" style={{ fontWeight: 400 }}>{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{product.price}</span>
                  {product.mrp && product.mrp > product.price && (
                    <span className="text-[12px] text-luxe-muted line-through">&#8377;{product.mrp}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {products.length === 0 && (
          <p className="text-center text-[13px] text-luxe-muted py-10">No products in this category yet.</p>
        )}
      </div>
    </section>
  );
}
