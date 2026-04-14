"use client";

import Link from "next/link";
import { TrendingUp, ShoppingBag, Users, Package, ArrowRight } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "₹1,24,500", icon: TrendingUp, change: "+12%", color: "bg-luxe-gold" },
  { label: "Total Orders", value: "342", icon: ShoppingBag, change: "+8%", color: "bg-blue-500" },
  { label: "Customers", value: "289", icon: Users, change: "+5%", color: "bg-purple-500" },
  { label: "Products", value: "48", icon: Package, change: "+2", color: "bg-green-500" },
];

const recentOrders = [
  { id: "RS-20240611-0042", customer: "Priya Sharma", total: 598, status: "delivered", date: "Jun 11, 2024" },
  { id: "RS-20240611-0041", customer: "Rahul Mehta", total: 299, status: "shipped", date: "Jun 11, 2024" },
  { id: "RS-20240610-0040", customer: "Ananya Kapoor", total: 897, status: "processing", date: "Jun 10, 2024" },
  { id: "RS-20240610-0039", customer: "Vikram Rajan", total: 149, status: "confirmed", date: "Jun 10, 2024" },
  { id: "RS-20240609-0038", customer: "Sneha Patil", total: 747, status: "pending", date: "Jun 09, 2024" },
];

const ordersByStatus = [
  { status: "Delivered", count: 180, pct: 52 },
  { status: "Shipped", count: 62, pct: 18 },
  { status: "Processing", count: 48, pct: 14 },
  { status: "Confirmed", count: 32, pct: 9 },
  { status: "Pending", count: 20, pct: 6 },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-blue-50 text-blue-700",
  processing: "bg-purple-50 text-purple-700",
  shipped: "bg-indigo-50 text-indigo-700",
  delivered: "bg-green-50 text-green-700",
};

const barColors = ["bg-green-400", "bg-indigo-400", "bg-purple-400", "bg-blue-400", "bg-yellow-400"];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="eyebrow mb-2">Overview</p>
        <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "28px" }}>Dashboard</h1>
        <p className="text-[13px] text-luxe-muted mt-1" style={{ fontWeight: 300 }}>
          Welcome back! Here&apos;s what&apos;s happening with RichySox.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 border border-luxe-border">
            <div className={`w-10 h-10 ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-[28px] text-luxe-text" style={{ fontWeight: 500 }}>{stat.value}</p>
            <p className="text-[11px] text-luxe-muted mt-1" style={{ fontWeight: 400 }}>{stat.label}</p>
            <p className="text-[11px] text-green-600 mt-1" style={{ fontWeight: 500 }}>{stat.change} this month</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white border border-luxe-border overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-luxe-border">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text" style={{ fontWeight: 600 }}>
              Recent Orders
            </h2>
            <Link href="/admin/orders" className="flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-luxe-gold hover:text-luxe-text transition-colors duration-200" style={{ fontWeight: 500 }}>
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-luxe-surface">
                <tr>
                  <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Order ID</th>
                  <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Customer</th>
                  <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Total</th>
                  <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxe-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-luxe-surface/50 transition-colors duration-200">
                    <td className="px-6 py-4 text-[12px] font-mono text-luxe-gold" style={{ fontWeight: 500 }}>{order.id}</td>
                    <td className="px-6 py-4 text-[12px] text-luxe-text">{order.customer}</td>
                    <td className="px-6 py-4 text-[12px] text-luxe-text" style={{ fontWeight: 500 }}>₹{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] capitalize ${statusColors[order.status]}`} style={{ fontWeight: 500 }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders by Status */}
        <div className="bg-white p-6 border border-luxe-border">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-6" style={{ fontWeight: 600 }}>
            Orders by Status
          </h2>
          <div className="space-y-4">
            {ordersByStatus.map((item, i) => (
              <div key={item.status}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-luxe-text-secondary">{item.status}</span>
                  <span className="text-[11px] text-luxe-text" style={{ fontWeight: 500 }}>{item.count}</span>
                </div>
                <div className="h-1.5 bg-luxe-surface overflow-hidden">
                  <div
                    className={`h-full ${barColors[i]} transition-all`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-luxe-border space-y-2">
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
              Quick Links
            </h3>
            {[
              { href: "/admin/products", label: "Manage Products" },
              { href: "/admin/orders", label: "Manage Orders" },
              { href: "/admin/users", label: "View Customers" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-4 py-2.5 bg-luxe-surface text-[11px] text-luxe-text-secondary hover:text-luxe-text hover:bg-luxe-border transition-colors duration-200"
              >
                {link.label}
                <ArrowRight className="w-3.5 h-3.5 text-luxe-muted" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
