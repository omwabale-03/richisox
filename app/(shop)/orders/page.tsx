"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Package, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { IOrder } from "@/types";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border border-blue-200",
  processing: "bg-purple-50 text-purple-700 border border-purple-200",
  shipped: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  delivered: "bg-green-50 text-green-700 border border-green-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
};

const DEMO_ORDERS: IOrder[] = [
  {
    _id: "order1",
    orderId: "RS-20240601-0001",
    user: { _id: "u1", name: "Om Wabale", mobile: "9876543210", role: "customer", createdAt: "", updatedAt: "" },
    items: [
      { productId: "1", name: "Luxury Crew Socks", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=80&h=80&fit=crop", price: 299, quantity: 2, size: "M", color: "Black" },
    ],
    address: { _id: "addr1", userId: "u1", name: "Om Wabale", mobile: "9876543210", street: "123 MG Road", city: "Pune", state: "Maharashtra", pincode: "411001", country: "India", isDefault: true },
    subtotal: 598,
    discount: 0,
    shipping: 0,
    total: 598,
    paymentStatus: "paid",
    paymentMethod: "razorpay",
    orderStatus: "delivered",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "order2",
    orderId: "RS-20240611-0002",
    user: { _id: "u1", name: "Om Wabale", mobile: "9876543210", role: "customer", createdAt: "", updatedAt: "" },
    items: [
      { productId: "2", name: "Sports Performance Socks", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop", price: 199, quantity: 3, size: "L", color: "White" },
    ],
    address: { _id: "addr1", userId: "u1", name: "Om Wabale", mobile: "9876543210", street: "123 MG Road", city: "Pune", state: "Maharashtra", pincode: "411001", country: "India", isDefault: true },
    subtotal: 597,
    discount: 59,
    shipping: 0,
    total: 538,
    coupon: "RICHY10",
    paymentStatus: "paid",
    paymentMethod: "razorpay",
    orderStatus: "shipped",
    trackingNumber: "SR123456789IN",
    courier: "Delhivery",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [orders] = useState<IOrder[]>(DEMO_ORDERS);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-4xl mx-auto px-[4%] py-10">
        <div className="mb-8">
          <p className="eyebrow mb-2">Your Account</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)" }}>
            My <em className="font-playfair italic">Orders</em>
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-luxe-border mx-auto mb-4" strokeWidth={1} />
            <h3 className="font-playfair text-luxe-text mb-2" style={{ fontWeight: 400 }}>No orders yet</h3>
            <p className="text-[13px] text-luxe-muted mb-6" style={{ fontWeight: 300 }}>Your orders will appear here</p>
            <Link
              href="/products"
              className="px-[44px] py-3.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#333] transition-colors duration-200 inline-block"
              style={{ fontWeight: 500 }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-0">
            {orders.map((order, idx) => (
              <Link
                key={order._id}
                href={`/orders/${order._id}`}
                className={`block bg-white p-5 border border-luxe-border hover:bg-luxe-surface/50 transition-colors duration-200 group ${idx > 0 ? "-mt-px" : ""}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-mono text-[13px] text-luxe-gold" style={{ fontWeight: 500 }}>{order.orderId}</p>
                    <p className="text-[10px] text-luxe-muted mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-[9px] uppercase tracking-[0.15em] capitalize ${statusColors[order.orderStatus]}`} style={{ fontWeight: 500 }}>
                      {order.orderStatus}
                    </span>
                    <ChevronRight className="w-4 h-4 text-luxe-border group-hover:text-luxe-gold transition-colors duration-200" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="relative w-12 h-12 overflow-hidden border-2 border-white">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 bg-luxe-surface border-2 border-white flex items-center justify-center text-[10px] text-luxe-muted" style={{ fontWeight: 500 }}>
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="ml-2">
                    <p className="text-[11px] text-luxe-muted">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                    <p className="text-[14px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{order.total.toFixed(0)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
