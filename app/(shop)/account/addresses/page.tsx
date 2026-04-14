"use client";

import { useState } from "react";
import { Plus, MapPin, Trash2, Check } from "lucide-react";
import toast from "react-hot-toast";

interface Address {
  id: string; name: string; mobile: string; street: string; city: string; state: string; pincode: string; isDefault: boolean;
}

const DEMO_ADDRESSES: Address[] = [
  { id: "1", name: "Om Wabale", mobile: "9876543210", street: "123 MG Road", city: "Pune", state: "Maharashtra", pincode: "411001", isDefault: true },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(DEMO_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", street: "", city: "", state: "", pincode: "" });

  const handleAdd = () => {
    if (!form.name || !form.street || !form.pincode) { toast.error("Fill all required fields"); return; }
    setAddresses((prev) => [...prev, { ...form, id: Date.now().toString(), isDefault: prev.length === 0 }]);
    setForm({ name: "", mobile: "", street: "", city: "", state: "", pincode: "" });
    setShowForm(false);
    toast.success("Address added!");
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed");
  };

  const setDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success("Default address updated");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text" style={{ fontWeight: 600 }}>
          Saved Addresses
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-luxe-gold hover:text-luxe-text transition-colors duration-200"
          style={{ fontWeight: 500 }}
        >
          <Plus className="w-3.5 h-3.5" /> Add New
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-luxe-border p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { key: "name", label: "Full Name", span: 1 },
              { key: "mobile", label: "Mobile", span: 1 },
              { key: "street", label: "Street Address", span: 2 },
              { key: "city", label: "City", span: 1 },
              { key: "state", label: "State", span: 1 },
              { key: "pincode", label: "Pincode", span: 1 },
            ].map(({ key, label, span }) => (
              <div key={key} className={span === 2 ? "col-span-2" : ""}>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>{label}</label>
                <input
                  type="text"
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-luxe-border text-[13px] bg-white text-luxe-text"
                  style={{ fontWeight: 300, boxShadow: "none" }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-luxe-border text-[11px] uppercase tracking-[0.15em] text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200" style={{ fontWeight: 500 }}>Cancel</button>
            <button onClick={handleAdd} className="px-6 py-2.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.15em] hover:bg-[#333] transition-colors duration-200" style={{ fontWeight: 500 }}>Save Address</button>
          </div>
        </div>
      )}

      <div className="space-y-0">
        {addresses.map((addr, idx) => (
          <div key={addr.id} className={`bg-white border border-luxe-border p-5 flex items-start gap-4 ${idx > 0 ? "-mt-px" : ""}`}>
            <MapPin className="w-4 h-4 text-luxe-gold mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[13px] text-luxe-text" style={{ fontWeight: 500 }}>{addr.name}</p>
                {addr.isDefault && (
                  <span className="text-[8px] uppercase tracking-[0.15em] text-green-700 bg-green-50 px-1.5 py-0.5" style={{ fontWeight: 500 }}>Default</span>
                )}
              </div>
              <p className="text-[12px] text-luxe-text-secondary" style={{ fontWeight: 300 }}>
                {addr.street}, {addr.city}, {addr.state} {addr.pincode}
              </p>
              <p className="text-[11px] text-luxe-muted mt-0.5">{addr.mobile}</p>
            </div>
            <div className="flex items-center gap-2">
              {!addr.isDefault && (
                <button onClick={() => setDefault(addr.id)} className="p-1.5 text-luxe-muted hover:text-green-700 transition-colors duration-200" title="Set as default">
                  <Check className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => handleDelete(addr.id)} className="p-1.5 text-luxe-muted hover:text-luxe-sale transition-colors duration-200" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
