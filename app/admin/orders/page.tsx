"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import toast from "react-hot-toast";

const statusOptions = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-blue-50 text-blue-700",
  processing: "bg-purple-50 text-purple-700",
  shipped: "bg-indigo-50 text-indigo-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const DEMO_ORDERS = [
  { id: "RS-20240611-0042", customer: "Priya Sharma", mobile: "9876543210", items: 2, total: 598, paymentStatus: "paid", orderStatus: "delivered", date: "Jun 11, 2024", _id: "o1" },
  { id: "RS-20240611-0041", customer: "Rahul Mehta", mobile: "9012345678", items: 1, total: 299, paymentStatus: "paid", orderStatus: "shipped", date: "Jun 11, 2024", _id: "o2" },
  { id: "RS-20240610-0040", customer: "Ananya Kapoor", mobile: "8765432109", items: 3, total: 897, paymentStatus: "paid", orderStatus: "processing", date: "Jun 10, 2024", _id: "o3" },
  { id: "RS-20240610-0039", customer: "Vikram Rajan", mobile: "7654321098", items: 1, total: 149, paymentStatus: "paid", orderStatus: "confirmed", date: "Jun 10, 2024", _id: "o4" },
  { id: "RS-20240609-0038", customer: "Sneha Patil", mobile: "6543210987", items: 2, total: 747, paymentStatus: "pending", orderStatus: "pending", date: "Jun 09, 2024", _id: "o5" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = orders.filter((o) => {
    if (search && !o.id.includes(search) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && o.orderStatus !== statusFilter) return false;
    return true;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="eyebrow mb-2">Manage</p>
        <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "28px" }}>Orders</h1>
        <p className="text-[12px] text-luxe-muted mt-1">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxe-muted" />
          <input
            type="text"
            placeholder="Search by Order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 border border-luxe-border bg-white text-[13px] w-72 text-luxe-text placeholder:text-luxe-muted"
            style={{ fontWeight: 300 }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-luxe-border bg-white text-[13px] text-luxe-text"
          style={{ fontWeight: 400 }}
        >
          <option value="all">All Statuses</option>
          {statusOptions.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-luxe-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-luxe-surface">
              <tr>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Order ID</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Customer</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Items</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Total</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Payment</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Status</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Date</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxe-border">
              {filtered.map((order) => (
                <tr key={order._id} className="hover:bg-luxe-surface/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <span className="font-mono text-[12px] text-luxe-gold" style={{ fontWeight: 500 }}>{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[12px] text-luxe-text" style={{ fontWeight: 500 }}>{order.customer}</p>
                    <p className="text-[10px] text-luxe-muted">{order.mobile}</p>
                  </td>
                  <td className="px-6 py-4 text-[12px] text-luxe-text-secondary">{order.items}</td>
                  <td className="px-6 py-4 text-[12px] text-luxe-text" style={{ fontWeight: 500 }}>₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] capitalize ${order.paymentStatus === "paid" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`} style={{ fontWeight: 500 }}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border-0 cursor-pointer capitalize ${statusColors[order.orderStatus]}`}
                      style={{ fontWeight: 500 }}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s} className="bg-white text-luxe-text capitalize">{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-[12px] text-luxe-muted">{order.date}</td>
                  <td className="px-6 py-4">
                    <Link href={`/orders/${order._id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 transition-colors duration-200 inline-flex">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
