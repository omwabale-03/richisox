"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, ShoppingBag } from "lucide-react";
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

  useEffect(() => {
    setCategory(searchParams.get("category") || "all");
    setType(searchParams.get("type") || "all");
  }, [searchParams]);

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
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%] py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div>
            <p className="eyebrow mb-2">Our Collection</p>
            <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 40px)" }}>
              All <em className="font-playfair italic">Socks</em>
            </h1>
            <p className="text-[12px] text-luxe-muted mt-1">{filtered.length} products</p>
          </div>
          <div className="sm:ml-auto flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxe-muted" />
              <input
                type="text"
                placeholder="Search socks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-luxe-border bg-white text-[13px] text-luxe-text w-64 placeholder:text-luxe-muted"
                style={{ fontWeight: 300 }}
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 border border-luxe-border bg-white text-[13px] text-luxe-text"
              style={{ fontWeight: 400 }}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 border border-luxe-border bg-white text-[11px] uppercase tracking-[0.15em] text-luxe-text-secondary hover:text-luxe-text hover:border-luxe-text transition-colors duration-200"
              style={{ fontWeight: 500 }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Category Filter Strip */}
        <div className="flex flex-wrap gap-0 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 border border-luxe-border -ml-px first:ml-0 ${
                category === cat
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : "bg-white text-luxe-text-secondary hover:text-luxe-text"
              }`}
              style={{ fontWeight: 500 }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-6 mb-8 border border-luxe-border">
            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
                  Type
                </p>
                <div className="flex flex-wrap gap-0">
                  {types.map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`px-4 py-2 text-[11px] uppercase tracking-[0.12em] border border-luxe-border -ml-px first:ml-0 transition-colors duration-200 ${
                        type === t
                          ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                          : "bg-white text-luxe-text-secondary hover:text-luxe-text"
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {(category !== "all" || type !== "all" || search) && (
                <button
                  onClick={() => { setCategory("all"); setType("all"); setSearch(""); }}
                  className="sm:ml-auto text-[11px] uppercase tracking-[0.15em] text-luxe-gold hover:text-luxe-text transition-colors duration-200 self-start sm:self-center border-b border-luxe-gold pb-0.5"
                  style={{ fontWeight: 500 }}
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
            <ShoppingBag className="w-16 h-16 text-luxe-border mx-auto mb-4" />
            <h3 className="font-playfair text-luxe-text mb-2" style={{ fontWeight: 400 }}>No products found</h3>
            <p className="text-[13px] text-luxe-muted mb-6" style={{ fontWeight: 300 }}>Try adjusting your filters</p>
            <button
              onClick={() => { setCategory("all"); setType("all"); setSearch(""); }}
              className="px-[44px] py-3.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#333] transition-colors duration-200"
              style={{ fontWeight: 500 }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="luxe-product-grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <div
                key={product._id}
                className="group bg-white overflow-hidden"
              >
                <Link href={`/products/${product._id}`} className="block">
                  <div className="relative h-64 bg-luxe-image-bg overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                    />
                    {/* Badge */}
                    {product.isFeatured && (
                      <span
                        className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[8px] uppercase tracking-[0.15em] px-2.5 py-1"
                        style={{ fontWeight: 500 }}
                      >
                        Best Seller
                      </span>
                    )}
                    {product.comparePrice && (
                      <span
                        className="absolute top-3 left-3 bg-luxe-sale text-white text-[8px] uppercase tracking-[0.15em] px-2.5 py-1"
                        style={{ fontWeight: 500, left: product.isFeatured ? "auto" : "12px", right: product.isFeatured ? "12px" : "auto", top: product.isFeatured ? "12px" : "12px" }}
                      >
                        -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                      </span>
                    )}
                    {/* Wishlist heart placeholder */}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white border border-luxe-border flex items-center justify-center text-luxe-muted hover:text-luxe-text transition-colors duration-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                    {/* Add to Bag hover bar */}
                    <div
                      className="absolute inset-x-0 bottom-0 bg-[#1A1A1A] text-white text-center py-3 text-[11px] uppercase tracking-[0.2em] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                      style={{ fontWeight: 500 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                    >
                      Add to Bag
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-luxe-gold mb-1.5" style={{ fontWeight: 500 }}>
                      {product.type}
                    </p>
                    <h3 className="font-playfair text-[16px] text-luxe-text mb-2 line-clamp-2" style={{ fontWeight: 400 }}>
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[16px] text-luxe-text" style={{ fontWeight: 500 }}>
                        &#8377;{product.price}
                      </span>
                      {product.comparePrice && (
                        <>
                          <span className="text-[13px] text-luxe-muted line-through">
                            &#8377;{product.comparePrice}
                          </span>
                          <span className="text-[12px] text-luxe-sale" style={{ fontWeight: 500 }}>
                            {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% off
                          </span>
                        </>
                      )}
                    </div>
                    {/* Color swatches */}
                    <div className="flex gap-2">
                      {product.colors.slice(0, 4).map((c, i) => (
                        <div
                          key={c.hex}
                          className="w-[14px] h-[14px] rounded-full border border-luxe-border"
                          style={{
                            backgroundColor: c.hex,
                            boxShadow: i === 0 ? "0 0 0 2px white, 0 0 0 3px #1A1A1A" : "none",
                          }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
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
    <Suspense fallback={<div className="min-h-screen bg-luxe-bg" />}>
      <ProductsContent />
    </Suspense>
  );
}
