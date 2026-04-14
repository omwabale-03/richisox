"use client";

import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/types";

interface RelatedProductsProps {
  products: IProduct[];
  title?: string;
}

export function RelatedProducts({ products, title = "You May Also Like" }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-luxe-border">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">Curated For You</p>
          <h2 className="font-playfair text-luxe-text text-[22px]" style={{ fontWeight: 400 }}>
            {title}
          </h2>
        </div>
        <Link
          href="/products"
          className="text-[11px] uppercase tracking-[0.18em] text-luxe-text-secondary border-b border-luxe-border-emphasis hover:text-luxe-text transition-colors duration-200 pb-0.5"
          style={{ fontWeight: 500 }}
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-luxe-border">
        {products.slice(0, 4).map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="group bg-white block"
          >
            <div className="relative h-48 bg-luxe-image-bg overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
              />
            </div>
            <div className="p-3">
              <p className="text-[9px] uppercase tracking-[0.2em] text-luxe-gold mb-1" style={{ fontWeight: 500 }}>
                {product.sockType || product.type}
              </p>
              <h3 className="font-playfair text-[14px] text-luxe-text mb-1 line-clamp-1" style={{ fontWeight: 400 }}>
                {product.name}
              </h3>
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
  );
}
