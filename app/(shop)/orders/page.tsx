"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Package, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { IOrder } from "@/types";
import axios from "axios";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
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
  const { token, isLoggedIn } = useAuthStore();
  const [orders, setOrders] = useState<IOrder[]>(DEMO_ORDERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen bg-[#f4f0e8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-playfair font-bold text-[#0a0a0a] mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Your orders will appear here</p>
            <Link href="/products" className="px-6 py-3 bg-[#0a0a0a] text-white rounded-full hover:bg-[#c9a84c] transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                href={`/orders/${order._id}`}
                className="block bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-mono font-semibold text-[#c9a84c]">{order.orderId}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.orderStatus]}`}>
                      {order.orderStatus}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#c9a84c] transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 rounded-xl bg-[#f4f0e8] border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="ml-2">
                    <p className="text-sm text-gray-600">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                    <p className="font-bold text-[#0a0a0a]">₹{order.total.toFixed(0)}</p>
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
