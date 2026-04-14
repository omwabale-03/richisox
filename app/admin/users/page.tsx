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
        <p className="eyebrow mb-2">Manage</p>
        <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "28px" }}>Customers</h1>
        <p className="text-[12px] text-luxe-muted mt-1">{DEMO_USERS.length} registered users</p>
      </div>

      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxe-muted" />
        <input
          type="text"
          placeholder="Search by name, mobile, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2.5 border border-luxe-border bg-white text-[13px] w-80 text-luxe-text placeholder:text-luxe-muted"
          style={{ fontWeight: 300 }}
        />
      </div>

      <div className="bg-white border border-luxe-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-luxe-surface">
              <tr>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Customer</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Mobile</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Email</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Role</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxe-border">
              {filtered.map((user) => (
                <tr key={user._id} className="hover:bg-luxe-surface/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white text-[11px]" style={{ fontWeight: 600 }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-[12px] text-luxe-text" style={{ fontWeight: 500 }}>{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[12px] font-mono text-luxe-text-secondary">{user.mobile}</td>
                  <td className="px-6 py-4 text-[12px] text-luxe-text-secondary">{user.email || "\u2014"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] capitalize ${
                        user.role === "admin"
                          ? "bg-luxe-surface text-luxe-gold border border-luxe-border"
                          : "bg-luxe-surface text-luxe-text-secondary"
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[12px] text-luxe-muted">
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
