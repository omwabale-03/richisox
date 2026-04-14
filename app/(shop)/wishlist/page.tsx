"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { IProduct } from "@/types";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-luxe-bg" />;
  }

  const handleMoveToCart = (product: IProduct) => {
    addToCart(product, product.sizes[0] || "Free Size", product.colors[0]?.name || "Default");
    removeItem(product._id);
    toast.success("Moved to cart!");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-luxe-bg flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-luxe-border mx-auto mb-6" strokeWidth={1} />
          <h2 className="font-playfair text-luxe-text mb-3" style={{ fontWeight: 400, fontSize: "24px" }}>
            Your wishlist is empty
          </h2>
          <p className="text-[13px] text-luxe-muted mb-8" style={{ fontWeight: 300 }}>
            Save items you love to your wishlist and shop them anytime.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-[44px] py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors duration-200"
            style={{ fontWeight: 500 }}
          >
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%] py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="eyebrow mb-2">Saved Items</p>
            <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)" }}>
              My <em className="font-playfair italic">Wishlist</em>
            </h1>
            <p className="text-[12px] text-luxe-muted mt-1">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => { clearWishlist(); toast.success("Wishlist cleared"); }}
            className="text-[11px] uppercase tracking-[0.15em] text-luxe-muted hover:text-luxe-sale transition-colors duration-200 border-b border-luxe-border pb-0.5"
            style={{ fontWeight: 500 }}
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-luxe-border">
          {items.map((product) => (
            <div key={product._id} className="bg-white">
              <Link href={`/products/${product._id}`} className="block">
                <div className="relative h-64 bg-luxe-image-bg overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.mrp && product.mrp > product.price && (
                    <span
                      className="absolute top-3 left-3 bg-luxe-sale text-white text-[8px] uppercase tracking-[0.15em] px-2.5 py-1"
                      style={{ fontWeight: 500 }}
                    >
                      -{product.discount || Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
                    </span>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <p className="text-[9px] uppercase tracking-[0.2em] text-luxe-gold mb-1" style={{ fontWeight: 500 }}>
                  {product.sockType || product.type}
                </p>
                <Link href={`/products/${product._id}`}>
                  <h3 className="font-playfair text-[15px] text-luxe-text mb-2 line-clamp-1 hover:text-luxe-gold transition-colors duration-200" style={{ fontWeight: 400 }}>
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[15px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{product.price}</span>
                  {product.mrp && product.mrp > product.price && (
                    <span className="text-[12px] text-luxe-muted line-through">&#8377;{product.mrp}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.15em] hover:bg-[#333] transition-colors duration-200"
                    style={{ fontWeight: 500 }}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => { removeItem(product._id); toast.success("Removed from wishlist"); }}
                    className="px-3 py-2.5 border border-luxe-border text-luxe-muted hover:text-luxe-sale hover:border-luxe-sale transition-colors duration-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
