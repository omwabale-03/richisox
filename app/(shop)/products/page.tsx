"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, ShoppingBag, Star, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { IProduct } from "@/types";

const categories = ["all", "men", "women", "kids"];
const types = ["all", "casual", "sports", "formal", "ankle", "crew"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const DEMO_PRODUCTS: IProduct[] = [
  {
    _id: "1",
    name: "Luxury Crew Socks",
    description: "Premium cotton crew socks with reinforced heel and toe.",
    price: 299,
    comparePrice: 499,
    category: "men",
    type: "crew",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Navy", hex: "#1a237e" }],
    images: ["https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop"],
    stock: 50,
    sku: "RS-001",
    tags: ["premium", "crew"],
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 124,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Sports Performance Socks",
    description: "High-performance socks for intense workouts and sports activities.",
    price: 199,
    category: "men",
    type: "sports",
    sizes: ["M", "L", "XL"],
    colors: [{ name: "White", hex: "#ffffff" }, { name: "Blue", hex: "#2196f3" }],
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"],
    stock: 100,
    sku: "RS-002",
    tags: ["sports", "performance"],
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Floral Ankle Socks",
    description: "Cute floral pattern ankle socks perfect for everyday wear.",
    price: 149,
    comparePrice: 249,
    category: "women",
    type: "ankle",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Pink", hex: "#e91e63" }, { name: "White", hex: "#ffffff" }],
    images: ["https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop"],
    stock: 75,
    sku: "RS-003",
    tags: ["floral", "ankle", "cute"],
    isActive: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 210,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    name: "Kids Rainbow Socks",
    description: "Fun rainbow colored socks that kids will love!",
    price: 129,
    category: "kids",
    type: "crew",
    sizes: ["XS", "S"],
    colors: [{ name: "Rainbow", hex: "#ff9800" }],
    images: ["https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop"],
    stock: 60,
    sku: "RS-004",
    tags: ["kids", "rainbow", "colorful"],
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 56,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "5",
    name: "Formal Dress Socks",
    description: "Elegant dress socks perfect for formal occasions.",
    price: 349,
    comparePrice: 499,
    category: "men",
    type: "formal",
    sizes: ["M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Charcoal", hex: "#424242" }],
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop"],
    stock: 30,
    sku: "RS-005",
    tags: ["formal", "dress", "elegant"],
    isActive: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 78,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "6",
    name: "Casual Stripe Socks",
    description: "Classic stripe pattern casual socks for women.",
    price: 179,
    category: "women",
    type: "casual",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Multicolor", hex: "#9c27b0" }],
    images: ["https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&h=400&fit=crop"],
    stock: 80,
    sku: "RS-006",
    tags: ["casual", "stripe"],
    isActive: true,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 43,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const addItem = useCartStore((s) => s.addItem);

  const [products] = useState<IProduct[]>(DEMO_PRODUCTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [type, setType] = useState(searchParams.get("type") || "all");
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = products
    .filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "all" && p.category !== category) return false;
      if (type !== "all" && p.type !== type) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const handleAddToCart = (product: IProduct) => {
    addItem(product, product.sizes[0] || "M", product.colors[0]?.name || "Default");
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-brand-brown">All Socks</h1>
            <p className="text-brand-brown-light/60 text-sm mt-1">{filtered.length} products</p>
          </div>
          <div className="sm:ml-auto flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-cream-dark" />
              <input
                type="text"
                placeholder="Search socks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl border border-brand-cream-dark bg-brand-cream-light text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold w-64 text-brand-brown"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-xl border border-brand-cream-dark bg-brand-cream-light text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold text-brand-brown"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-cream-dark bg-brand-cream-light text-sm hover:bg-brand-cream transition-colors text-brand-brown"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-brand-cream-light rounded-2xl p-6 mb-8 border border-brand-cream-dark">
            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                <p className="text-sm font-semibold text-brand-brown mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                        category === cat
                          ? "bg-brand-brown text-brand-cream-light"
                          : "bg-brand-cream text-brand-brown-light hover:bg-brand-cream-dark"
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-brown mb-3">Type</p>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                        type === t
                          ? "bg-brand-gold text-white"
                          : "bg-brand-cream text-brand-brown-light hover:bg-brand-cream-dark"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {(category !== "all" || type !== "all" || search) && (
                <button
                  onClick={() => { setCategory("all"); setType("all"); setSearch(""); }}
                  className="sm:ml-auto text-sm text-brand-gold hover:underline self-start sm:self-center"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-brand-cream-dark mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-brown mb-2">No products found</h3>
            <p className="text-brand-brown-light/60 mb-6">Try adjusting your filters</p>
            <button
              onClick={() => { setCategory("all"); setType("all"); setSearch(""); }}
              className="px-6 py-3 bg-brand-gold text-white rounded-full hover:bg-brand-gold-hover transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product._id}
                className="group bg-brand-cream-light rounded-2xl overflow-hidden border border-brand-cream-dark hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <Link href={`/products/${product._id}`} className="block">
                  <div className="relative h-56 bg-brand-cream overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.comparePrice && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-brand-cream-light/90 text-brand-brown text-xs font-medium px-2 py-1 rounded-full capitalize">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-brand-brown-light/50 uppercase tracking-wider mb-1 capitalize">{product.type}</p>
                    <h3 className="font-semibold text-brand-brown text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                      <span className="text-xs text-brand-brown-light/60">{product.rating} ({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-brand-brown">₹{product.price}</span>
                      {product.comparePrice && (
                        <span className="text-sm text-brand-cream-dark line-through">₹{product.comparePrice}</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 4).map((c) => (
                        <div
                          key={c.hex}
                          className="w-4 h-4 rounded-full border border-brand-cream-dark"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-gold text-white rounded-xl text-sm font-medium hover:bg-brand-gold-hover transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-cream" />}>
      <ProductsContent />
    </Suspense>
  );
}
