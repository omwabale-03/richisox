"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

const SHIPPING_THRESHOLD = 499;
const SHIPPING_FEE = 49;

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, itemCount } = useCartStore();
  const sub = subtotal();
  const shipping = sub >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = sub + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-luxe-bg flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-luxe-border mx-auto mb-6" strokeWidth={1} />
          <h2 className="font-playfair text-luxe-text mb-3" style={{ fontWeight: 400, fontSize: "24px" }}>
            Your cart is empty
          </h2>
          <p className="text-[13px] text-luxe-muted mb-8" style={{ fontWeight: 300 }}>
            Looks like you haven&apos;t added any socks yet!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-[44px] py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors duration-200"
            style={{ fontWeight: 500 }}
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%] py-10">
        <div className="mb-8">
          <p className="eyebrow mb-2">Your Bag</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)" }}>
            Shopping Cart ({itemCount()})
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-0">
            {items.map((item, idx) => (
              <div
                key={`${item.product._id}-${item.size}-${item.color}`}
                className={`bg-white p-5 flex items-center gap-5 border border-luxe-border ${idx > 0 ? "-mt-px" : ""}`}
              >
                <div className="relative w-20 h-20 bg-luxe-image-bg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-luxe-gold mb-1" style={{ fontWeight: 500 }}>
                    RichySox
                  </p>
                  <h3 className="font-playfair text-[15px] text-luxe-text mb-0.5" style={{ fontWeight: 400 }}>
                    {item.product.name}
                  </h3>
                  <p className="text-[11px] text-luxe-muted">{item.size} &middot; {item.color}</p>
                  <p className="text-[14px] text-luxe-text mt-1" style={{ fontWeight: 500 }}>
                    &#8377;{item.product.price}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-luxe-border">
                    <button
                      onClick={() => updateQty(item.product._id, item.size, item.color, item.quantity - 1)}
                      className="px-2.5 py-1.5 text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-[13px]" style={{ fontWeight: 500 }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product._id, item.size, item.color, item.quantity + 1)}
                      className="px-2.5 py-1.5 text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[14px] w-20 text-right text-luxe-text" style={{ fontWeight: 500 }}>
                    &#8377;{(item.product.price * item.quantity).toFixed(0)}
                  </span>
                  <button
                    onClick={() => {
                      removeItem(item.product._id, item.size, item.color);
                      toast.success("Removed from cart");
                    }}
                    className="p-2 text-luxe-muted hover:text-luxe-sale transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 border border-luxe-border sticky top-[130px]">
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-6" style={{ fontWeight: 600 }}>
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[13px]">
                  <span className="text-luxe-muted">Subtotal</span>
                  <span className="text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{sub.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-luxe-muted">Shipping</span>
                  <span className={`${shipping === 0 ? "text-green-700" : "text-luxe-text"}`} style={{ fontWeight: 500 }}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-luxe-gold bg-luxe-surface px-3 py-2 border border-luxe-border">
                    Add &#8377;{(SHIPPING_THRESHOLD - sub).toFixed(0)} more for free shipping!
                  </p>
                )}
                <div className="border-t border-luxe-border pt-4 flex justify-between">
                  <span className="text-[13px] text-luxe-text" style={{ fontWeight: 600 }}>Total</span>
                  <span className="text-[18px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{total.toFixed(0)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full text-center py-4 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#333] transition-colors duration-200"
                style={{ fontWeight: 500 }}
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/products"
                className="block w-full text-center py-3 mt-3 text-[11px] uppercase tracking-[0.15em] text-luxe-muted hover:text-luxe-text transition-colors duration-200"
                style={{ fontWeight: 500 }}
              >
                &larr; Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
