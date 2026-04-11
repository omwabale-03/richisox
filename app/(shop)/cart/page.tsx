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
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-brand-cream-dark mx-auto mb-6" />
          <h2 className="text-2xl font-playfair font-bold text-brand-brown mb-3">Your cart is empty</h2>
          <p className="text-brand-brown-light/60 mb-8">Looks like you haven&apos;t added any socks yet!</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brand-gold text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-gold-hover transition-colors"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-playfair font-bold text-brand-brown mb-8">
          Shopping Cart ({itemCount()})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product._id}-${item.size}-${item.color}`}
                className="bg-brand-cream-light rounded-2xl p-4 flex items-center gap-4 border border-brand-cream-dark"
              >
                <div className="relative w-20 h-20 bg-brand-cream rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-brown">{item.product.name}</h3>
                  <p className="text-sm text-brand-brown-light/60">{item.size} &middot; {item.color}</p>
                  <p className="text-sm font-bold text-brand-gold">₹{item.product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 border border-brand-cream-dark rounded-full px-3 py-1">
                    <button
                      onClick={() => updateQty(item.product._id, item.size, item.color, item.quantity - 1)}
                      className="hover:text-brand-gold transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product._id, item.size, item.color, item.quantity + 1)}
                      className="hover:text-brand-gold transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-semibold text-sm w-20 text-right text-brand-brown">
                    ₹{(item.product.price * item.quantity).toFixed(0)}
                  </span>
                  <button
                    onClick={() => {
                      removeItem(item.product._id, item.size, item.color);
                      toast.success("Removed from cart");
                    }}
                    className="p-2 text-brand-cream-dark hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-cream-light rounded-2xl p-6 border border-brand-cream-dark sticky top-24">
              <h2 className="text-xl font-playfair font-bold text-brand-brown mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-brown-light/60">Subtotal</span>
                  <span className="font-medium text-brand-brown">₹{sub.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-brown-light/60">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-700" : "text-brand-brown"}`}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-brand-gold bg-brand-gold/10 px-3 py-2 rounded-lg">
                    Add ₹{(SHIPPING_THRESHOLD - sub).toFixed(0)} more for free shipping!
                  </p>
                )}
                <div className="border-t border-brand-cream-dark pt-4 flex justify-between">
                  <span className="font-bold text-brand-brown">Total</span>
                  <span className="font-bold text-xl text-brand-brown">₹{total.toFixed(0)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full text-center py-4 bg-brand-gold text-white rounded-2xl font-semibold hover:bg-brand-gold-hover transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/products"
                className="block w-full text-center py-3 mt-3 text-brand-brown-light/60 text-sm hover:text-brand-brown transition-colors"
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
