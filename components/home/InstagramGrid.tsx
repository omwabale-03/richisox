"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=300&h=300&fit=crop&q=80",
];

export function InstagramGrid() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-[1400px] mx-auto px-[4%]">
        <div className="text-center mb-8">
          <p className="eyebrow mb-3">Social Proof</p>
          <h2 className="font-playfair text-luxe-text mb-3" style={{ fontWeight: 400 }}>
            Wear It. Share It. <em className="font-playfair italic">#RichySox</em>
          </h2>
          <a
            href="#"
            className="text-[11px] uppercase tracking-[0.18em] text-luxe-gold border-b border-luxe-gold/40 hover:border-luxe-gold transition-colors duration-200 pb-0.5"
            style={{ fontWeight: 500 }}
          >
            Follow us @richysox
          </a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-luxe-border">
          {images.map((src, i) => (
            <a
              key={i}
              href="#"
              className="relative aspect-square bg-luxe-image-bg overflow-hidden group"
            >
              <Image src={src} alt={`Instagram post ${i + 1}`} fill className="object-cover" />
              <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
