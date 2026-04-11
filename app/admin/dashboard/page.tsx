"use client";

import Link from "next/link";
import { TrendingUp, ShoppingBag, Users, Package, ArrowRight } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "₹1,24,500", icon: TrendingUp, change: "+12%", color: "bg-brand-gold" },
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
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
};

const barColors = ["bg-green-400", "bg-indigo-400", "bg-purple-400", "bg-blue-400", "bg-yellow-400"];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-brand-brown">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with RichySox.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-brand-brown">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            <p className="text-sm text-green-600 font-medium mt-1">{stat.change} this month</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-brand-cream">
            <h2 className="text-lg font-semibold text-brand-brown">Recent Orders</h2>
            <Link href="/admin/orders" className="flex items-center gap-1 text-sm text-brand-gold hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-brand-cream">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-cream">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-brand-cream/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-brand-gold">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-brand-brown">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-semibold">₹{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}>
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
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-brown mb-6">Orders by Status</h2>
          <div className="space-y-4">
            {ordersByStatus.map((item, i) => (
              <div key={item.status}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{item.status}</span>
                  <span className="text-sm font-semibold text-brand-brown">{item.count}</span>
                </div>
                <div className="h-2 bg-brand-cream rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColors[i]} rounded-full transition-all`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-brand-cream space-y-2">
            <h3 className="text-sm font-semibold text-brand-brown mb-3">Quick Links</h3>
            {[
              { href: "/admin/products", label: "Manage Products" },
              { href: "/admin/orders", label: "Manage Orders" },
              { href: "/admin/users", label: "View Customers" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-4 py-2 bg-brand-cream rounded-xl text-sm hover:bg-brand-cream-dark transition-colors"
              >
                {link.label}
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
