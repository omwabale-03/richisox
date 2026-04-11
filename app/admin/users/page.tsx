"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const DEMO_USERS = [
  { _id: "u1", name: "Om Wabale", mobile: "9876543210", email: "om@richysox.com", role: "admin", createdAt: "2024-01-15" },
  { _id: "u2", name: "Priya Sharma", mobile: "9876543211", email: "priya@gmail.com", role: "customer", createdAt: "2024-02-20" },
  { _id: "u3", name: "Rahul Mehta", mobile: "9012345678", email: "rahul@yahoo.com", role: "customer", createdAt: "2024-03-10" },
  { _id: "u4", name: "Ananya Kapoor", mobile: "8765432109", email: "ananya@gmail.com", role: "customer", createdAt: "2024-04-05" },
  { _id: "u5", name: "Vikram Rajan", mobile: "7654321098", email: "", role: "customer", createdAt: "2024-05-01" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const filtered = DEMO_USERS.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.mobile.includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-brand-brown">Customers</h1>
        <p className="text-gray-500 mt-1">{DEMO_USERS.length} registered users</p>
      </div>

      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, mobile, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2.5 rounded-xl border border-brand-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm w-80"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-cream">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream">
              {filtered.map((user) => (
                <tr key={user._id} className="hover:bg-brand-cream/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-brand-brown text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{user.mobile}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email || "—"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        user.role === "admin"
                          ? "bg-brand-gold/20 text-[#a8882e]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
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
