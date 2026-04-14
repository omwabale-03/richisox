"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%] py-16">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Get In Touch</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 40px)" }}>
            Contact <em className="font-playfair italic">Us</em>
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "hello@richysox.com" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: Clock, label: "Hours", value: "Mon–Sat, 9am–6pm IST" },
              { icon: MapPin, label: "Address", value: "Pune, Maharashtra, India" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="w-4 h-4 text-luxe-gold mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-luxe-muted mb-0.5" style={{ fontWeight: 500 }}>{label}</p>
                  <p className="text-[13px] text-luxe-text" style={{ fontWeight: 400 }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-luxe-border p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>Name</label>
                  <input
                    type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-luxe-border text-[13px] text-luxe-text bg-white" style={{ fontWeight: 300, boxShadow: "none" }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>Email</label>
                  <input
                    type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-luxe-border text-[13px] text-luxe-text bg-white" style={{ fontWeight: 300, boxShadow: "none" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>Subject</label>
                <input
                  type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-luxe-border text-[13px] text-luxe-text bg-white" style={{ fontWeight: 300, boxShadow: "none" }}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>Message</label>
                <textarea
                  rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-luxe-border text-[13px] text-luxe-text bg-white resize-none" style={{ fontWeight: 300, boxShadow: "none" }}
                />
              </div>
              <button
                type="submit"
                className="px-[44px] py-3.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#333] transition-colors duration-200"
                style={{ fontWeight: 500 }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
