"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    toast.success("Profile updated!");
  };

  return (
    <div>
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-6" style={{ fontWeight: 600 }}>
        Personal Information
      </h2>
      <div className="bg-white border border-luxe-border p-6 max-w-lg space-y-5">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>Full Name</label>
          <input
            type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-luxe-border text-[13px] text-luxe-text bg-white" style={{ fontWeight: 300, boxShadow: "none" }}
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>Email</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-luxe-border text-[13px] text-luxe-text bg-white" style={{ fontWeight: 300, boxShadow: "none" }}
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>Mobile</label>
          <input
            type="tel" value={user?.mobile || ""} disabled
            className="w-full px-4 py-3 border border-luxe-border text-[13px] text-luxe-muted bg-luxe-surface" style={{ fontWeight: 300, boxShadow: "none" }}
          />
          <p className="text-[10px] text-luxe-muted mt-1">Mobile number cannot be changed</p>
        </div>
        <button
          onClick={handleSave}
          className="px-[44px] py-3.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#333] transition-colors duration-200"
          style={{ fontWeight: 500 }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
