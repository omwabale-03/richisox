"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Package } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-blue-50 text-blue-700",
  processing: "bg-purple-50 text-purple-700",
  shipped: "bg-indigo-50 text-indigo-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const DEMO_ORDERS = [
  { _id: "order1", orderId: "RS-20240601-0001", status: "delivered", total: 598, date: "Jun 1, 2024", items: [{ name: "Luxury Crew Socks", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=80&h=80&fit=crop", qty: 2 }] },
  { _id: "order2", orderId: "RS-20240611-0002", status: "shipped", total: 538, date: "Jun 11, 2024", items: [{ name: "Sports Performance Socks", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop", qty: 3 }] },
];

export default function AccountOrdersPage() {
  return (
    <div>
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-6" style={{ fontWeight: 600 }}>
        Order History
      </h2>
      {DEMO_ORDERS.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-luxe-border mx-auto mb-4" strokeWidth={1} />
          <p className="text-[14px] text-luxe-muted">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-0">
          {DEMO_ORDERS.map((order, idx) => (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className={`flex items-center gap-4 bg-white p-5 border border-luxe-border hover:bg-luxe-surface/50 transition-colors duration-200 group ${idx > 0 ? "-mt-px" : ""}`}
            >
              <div className="flex -space-x-2">
                {order.items.map((item, i) => (
                  <div key={i} className="relative w-12 h-12 overflow-hidden border-2 border-white">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-mono text-luxe-gold" style={{ fontWeight: 500 }}>{order.orderId}</p>
                <p className="text-[11px] text-luxe-muted">{order.date} &middot; {order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] capitalize mb-1 ${statusColors[order.status]}`} style={{ fontWeight: 500 }}>
                  {order.status}
                </span>
                <p className="text-[13px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{order.total}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-luxe-border group-hover:text-luxe-gold transition-colors duration-200" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
