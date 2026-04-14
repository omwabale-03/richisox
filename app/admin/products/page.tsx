"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Plus, Edit, Trash2, X, Check } from "lucide-react";
import toast from "react-hot-toast";
import { IProduct } from "@/types";

const DEMO_PRODUCTS: IProduct[] = [
  {
    _id: "1", name: "Luxury Crew Socks", description: "Premium cotton crew socks.", price: 299, comparePrice: 499,
    category: "men", type: "crew", sizes: ["S", "M", "L", "XL"], colors: [{ name: "Black", hex: "#000000" }],
    images: ["https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=80&h=80&fit=crop"],
    stock: 50, sku: "RS-001", tags: ["premium"], isActive: true, isFeatured: true, rating: 4.8, reviewCount: 124,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: "2", name: "Sports Ankle Socks", description: "Performance sports socks.", price: 199,
    category: "men", type: "sports", sizes: ["M", "L"], colors: [{ name: "White", hex: "#ffffff" }],
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop"],
    stock: 8, sku: "RS-002", tags: ["sports"], isActive: true, isFeatured: false, rating: 4.5, reviewCount: 89,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

type ProductForm = {
  name: string; description: string; price: number; comparePrice: number;
  category: IProduct["category"]; type: IProduct["type"];
  sizes: string; colors: string; images: string; stock: number; sku: string; tags: string;
  isActive: boolean; isFeatured: boolean;
};

const emptyProduct: ProductForm = {
  name: "", description: "", price: 0, comparePrice: 0, category: "men", type: "crew",
  sizes: "S,M,L,XL", colors: "", images: "", stock: 0, sku: "", tags: "", isActive: true, isFeatured: false,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyProduct);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search)
  );

  const openCreate = () => {
    setEditProduct(null);
    setForm(emptyProduct);
    setShowModal(true);
  };

  const openEdit = (p: IProduct) => {
    setEditProduct(p);
    setForm({
      name: p.name, description: p.description, price: p.price, comparePrice: p.comparePrice || 0,
      category: p.category, type: p.type, sizes: p.sizes.join(","), colors: p.colors.map((c) => `${c.name}:${c.hex}`).join(","),
      images: p.images.join(","), stock: p.stock, sku: p.sku, tags: p.tags.join(","),
      isActive: p.isActive, isFeatured: p.isFeatured,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const product: IProduct = {
      _id: editProduct?._id || Date.now().toString(),
      name: form.name, description: form.description, price: form.price, comparePrice: form.comparePrice || undefined,
      category: form.category, type: form.type,
      sizes: form.sizes.split(",").map((s) => s.trim()),
      colors: form.colors.split(",").map((c) => {
        const [name, hex] = c.split(":");
        return { name: name?.trim() || "", hex: hex?.trim() || "#000000" };
      }),
      images: form.images.split(",").map((i) => i.trim()),
      stock: form.stock, sku: form.sku, tags: form.tags.split(",").map((t) => t.trim()),
      isActive: form.isActive, isFeatured: form.isFeatured, rating: editProduct?.rating || 4.5,
      reviewCount: editProduct?.reviewCount || 0,
      createdAt: editProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editProduct) {
      setProducts((prev) => prev.map((p) => (p._id === editProduct._id ? product : p)));
      toast.success("Product updated!");
    } else {
      setProducts((prev) => [product, ...prev]);
      toast.success("Product created!");
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.map((p) => p._id === id ? { ...p, isActive: false } : p));
    toast.success("Product deactivated");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">Manage</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "28px" }}>Products</h1>
          <p className="text-[12px] text-luxe-muted mt-1">{products.filter((p) => p.isActive).length} active products</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.15em] hover:bg-[#333] transition-colors duration-200"
          style={{ fontWeight: 500 }}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxe-muted" />
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md pl-10 pr-4 py-2.5 border border-luxe-border bg-white text-[13px] text-luxe-text placeholder:text-luxe-muted"
          style={{ fontWeight: 300 }}
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-luxe-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-luxe-surface">
              <tr>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Product</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Category</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Price</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Stock</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Status</th>
                <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxe-border">
              {filtered.map((p) => (
                <tr key={p._id} className="hover:bg-luxe-surface/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 overflow-hidden bg-luxe-image-bg flex-shrink-0">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-[12px] text-luxe-text" style={{ fontWeight: 500 }}>{p.name}</p>
                        <p className="text-[10px] text-luxe-muted font-mono">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] text-luxe-text-secondary capitalize">{p.category} · {p.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-[12px] text-luxe-text" style={{ fontWeight: 500 }}>₹{p.price}</span>
                      {p.comparePrice && <span className="text-[10px] text-luxe-muted line-through ml-1">₹{p.comparePrice}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[12px] ${p.stock < 10 ? "text-luxe-sale" : "text-green-600"}`} style={{ fontWeight: 500 }}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] ${p.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`} style={{ fontWeight: 500 }}>
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 text-luxe-sale hover:bg-red-50 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-luxe-border">
            <div className="flex items-center justify-between p-6 border-b border-luxe-border">
              <h3 className="font-playfair text-[20px] text-luxe-text" style={{ fontWeight: 400 }}>
                {editProduct ? "Edit Product" : "Add Product"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-luxe-surface transition-colors duration-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                { key: "name", label: "Product Name", span: 2 },
                { key: "description", label: "Description", span: 2, textarea: true },
                { key: "sku", label: "SKU", span: 1 },
                { key: "stock", label: "Stock", span: 1, type: "number" },
                { key: "price", label: "Price (₹)", span: 1, type: "number" },
                { key: "comparePrice", label: "Compare Price (₹)", span: 1, type: "number" },
                { key: "sizes", label: "Sizes (comma-separated)", span: 1 },
                { key: "colors", label: "Colors (name:hex, ...)", span: 1 },
                { key: "images", label: "Image URLs (comma-separated)", span: 2 },
                { key: "tags", label: "Tags (comma-separated)", span: 2 },
              ].map(({ key, label, span, type, textarea }) => (
                <div key={key} className={span === 2 ? "col-span-2" : ""}>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>
                    {label}
                  </label>
                  {textarea ? (
                    <textarea
                      rows={3}
                      value={form[key as keyof typeof form] as string}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-luxe-border text-[13px] resize-none text-luxe-text"
                      style={{ fontWeight: 300 }}
                    />
                  ) : (
                    <input
                      type={type || "text"}
                      value={form[key as keyof typeof form] as string}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
                      className="w-full px-4 py-2.5 border border-luxe-border text-[13px] text-luxe-text"
                      style={{ fontWeight: 300 }}
                    />
                  )}
                </div>
              ))}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as typeof f.category }))}
                  className="w-full px-4 py-2.5 border border-luxe-border text-[13px] text-luxe-text"
                >
                  {["men", "women", "kids"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-1.5" style={{ fontWeight: 600 }}>
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as typeof f.type }))}
                  className="w-full px-4 py-2.5 border border-luxe-border text-[13px] text-luxe-text"
                >
                  {["casual", "sports", "formal", "ankle", "crew"].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} className="w-4 h-4 accent-luxe-gold" />
                <label htmlFor="isActive" className="text-[12px] text-luxe-text">Active</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="isFeatured" checked={form.isFeatured} onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))} className="w-4 h-4 accent-luxe-gold" />
                <label htmlFor="isFeatured" className="text-[12px] text-luxe-text">Featured</label>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-luxe-border">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border border-luxe-border-emphasis text-[11px] uppercase tracking-[0.15em] text-luxe-text-secondary hover:text-luxe-text hover:border-luxe-text transition-colors duration-200"
                style={{ fontWeight: 500 }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.15em] hover:bg-[#333] transition-colors duration-200 flex items-center justify-center gap-2"
                style={{ fontWeight: 500 }}
              >
                <Check className="w-4 h-4" />
                {editProduct ? "Update Product" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
