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
      <div className="min-h-screen bg-[#f4f0e8] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-playfair font-bold text-[#0a0a0a] mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any socks yet!</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#c9a84c] transition-colors"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f0e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-playfair font-bold text-[#0a0a0a] mb-8">
          Shopping Cart ({itemCount()})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product._id}-${item.size}-${item.color}`}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="relative w-20 h-20 bg-[#f4f0e8] rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0a0a0a]">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">{item.size} · {item.color}</p>
                  <p className="text-sm font-bold text-[#c9a84c]">₹{item.product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 border border-[#e8e0d0] rounded-full px-3 py-1">
                    <button
                      onClick={() => updateQty(item.product._id, item.size, item.color, item.quantity - 1)}
                      className="hover:text-[#c9a84c] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product._id, item.size, item.color, item.quantity + 1)}
                      className="hover:text-[#c9a84c] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-semibold text-sm w-20 text-right">
                    ₹{(item.product.price * item.quantity).toFixed(0)}
                  </span>
                  <button
                    onClick={() => {
                      removeItem(item.product._id, item.size, item.color);
                      toast.success("Removed from cart");
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-playfair font-bold text-[#0a0a0a] mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₹{sub.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#c9a84c] bg-[#c9a84c]/10 px-3 py-2 rounded-lg">
                    Add ₹{(SHIPPING_THRESHOLD - sub).toFixed(0)} more for free shipping!
                  </p>
                )}
                <div className="border-t border-[#e8e0d0] pt-4 flex justify-between">
                  <span className="font-bold text-[#0a0a0a]">Total</span>
                  <span className="font-bold text-xl text-[#0a0a0a]">₹{total.toFixed(0)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full text-center py-4 bg-[#0a0a0a] text-white rounded-2xl font-semibold hover:bg-[#c9a84c] transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/products"
                className="block w-full text-center py-3 mt-3 text-gray-500 text-sm hover:text-[#0a0a0a] transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
