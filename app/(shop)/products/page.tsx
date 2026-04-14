"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { IProduct } from "@/types";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { FilterSidebar, FilterState } from "@/components/product/FilterSidebar";
import { ActiveFilters } from "@/components/product/ActiveFilters";
import { ViewToggle } from "@/components/product/ViewToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "bestseller", label: "Best Sellers" },
  { value: "discount", label: "Discount" },
];

const ITEMS_PER_PAGE = 8;

const emptyFilters: FilterState = {
  category: [],
  occasion: [],
  sockType: [],
  material: [],
  technology: [],
  priceBracket: [],
  rating: 0,
  colour: [],
};

function matchesPriceBracket(price: number, brackets: string[]): boolean {
  if (brackets.length === 0) return true;
  return brackets.some((b) => {
    const [min, max] = b.split("-").map(Number);
    return price >= min && price <= max;
  });
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const addItem = useCartStore((s) => s.addItem);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [filters, setFilters] = useState<FilterState>(() => {
    const cat = searchParams.get("category");
    const occ = searchParams.get("occasion");
    const type = searchParams.get("type");
    return {
      ...emptyFilters,
      category: cat && cat !== "all" ? [cat] : [],
      occasion: occ ? [occ] : [],
      sockType: type && type !== "all" ? [type] : [],
    };
  });

  useEffect(() => {
    const cat = searchParams.get("category");
    const occ = searchParams.get("occasion");
    const type = searchParams.get("type");
    setFilters((prev) => ({
      ...prev,
      category: cat && cat !== "all" ? [cat] : prev.category,
      occasion: occ ? [occ] : prev.occasion,
      sockType: type && type !== "all" ? [type] : prev.sockType,
    }));
  }, [searchParams]);

  const filtered = DEMO_PRODUCTS
    .filter((p) => {
      if (!p.isActive) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))) return false;
      if (filters.category.length > 0 && !filters.category.includes(p.category)) return false;
      if (filters.occasion.length > 0 && !filters.occasion.some((o) => p.occasion.includes(o as typeof p.occasion[number]))) return false;
      if (filters.sockType.length > 0 && !filters.sockType.includes(p.sockType)) return false;
      if (filters.material.length > 0 && !filters.material.includes(p.material)) return false;
      if (filters.technology.length > 0 && !filters.technology.some((t) => p.technologies.includes(t))) return false;
      if (!matchesPriceBracket(p.price, filters.priceBracket)) return false;
      if (filters.rating > 0 && p.rating < filters.rating) return false;
      if (filters.colour.length > 0 && !filters.colour.some((c) => p.colors.some((pc) => pc.name.toLowerCase().includes(c.toLowerCase())))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "bestseller") return b.reviewCount - a.reviewCount;
      if (sort === "discount") return (b.discount || 0) - (a.discount || 0);
      return 0;
    });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleAddToCart = (product: IProduct) => {
    addItem(product, product.sizes[0] || "Free Size", product.colors[0]?.name || "Default");
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFilter = (key: keyof FilterState, value: string) => {
    if (key === "rating") {
      setFilters((prev) => ({ ...prev, rating: 0 }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: (prev[key] as string[]).filter((v) => v !== value),
      }));
    }
  };

  const clearAllFilters = () => {
    setFilters(emptyFilters);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%] py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div>
            <p className="eyebrow mb-2">Our Collection</p>
            <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 40px)" }}>
              All <em className="font-playfair italic">Socks</em>
            </h1>
          </div>
          <div className="sm:ml-auto flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxe-muted" />
              <input
                type="text"
                placeholder="Search socks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-luxe-border bg-white text-[13px] text-luxe-text w-56 placeholder:text-luxe-muted"
                style={{ fontWeight: 300, boxShadow: "none" }}
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 border border-luxe-border bg-white text-[13px] text-luxe-text"
              style={{ fontWeight: 400, boxShadow: "none" }}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ViewToggle view={view} onViewChange={setView} />
            {/* Mobile filter trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-luxe-border bg-white text-[11px] uppercase tracking-[0.15em] text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200"
                  style={{ fontWeight: 500 }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-white overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="font-playfair text-[18px]" style={{ fontWeight: 400 }}>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar filters={filters} onFilterChange={setFilters} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filters */}
        <ActiveFilters
          filters={filters}
          onRemove={handleRemoveFilter}
          onClearAll={clearAllFilters}
          totalResults={filtered.length}
          totalProducts={DEMO_PRODUCTS.length}
        />

        {/* Main Layout: Sidebar + Grid */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-16 h-16 text-luxe-border mx-auto mb-4" strokeWidth={1} />
                <h3 className="font-playfair text-luxe-text mb-2" style={{ fontWeight: 400 }}>No products found</h3>
                <p className="text-[13px] text-luxe-muted mb-6" style={{ fontWeight: 300 }}>Try adjusting your filters</p>
                <button
                  onClick={clearAllFilters}
                  className="px-[44px] py-3.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#333] transition-colors duration-200"
                  style={{ fontWeight: 500 }}
                >
                  Clear Filters
                </button>
              </div>
            ) : view === "grid" ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-luxe-border">
                  {visible.map((product) => (
                    <div key={product._id} className="group bg-white overflow-hidden">
                      <Link href={`/products/${product._id}`} className="block">
                        <div className="relative h-56 md:h-64 bg-luxe-image-bg overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                            style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                          />
                          {product.isNew && (
                            <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[8px] uppercase tracking-[0.15em] px-2.5 py-1" style={{ fontWeight: 500 }}>New</span>
                          )}
                          {!product.isNew && product.isFeatured && (
                            <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[8px] uppercase tracking-[0.15em] px-2.5 py-1" style={{ fontWeight: 500 }}>Best Seller</span>
                          )}
                          {product.mrp && product.mrp > product.price && (
                            <span className="absolute top-3 right-[44px] bg-luxe-sale text-white text-[8px] uppercase tracking-[0.15em] px-2.5 py-1" style={{ fontWeight: 500 }}>
                              -{product.discount || Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
                            </span>
                          )}
                          <WishlistButton
                            product={product}
                            className="absolute top-3 right-3 w-8 h-8 bg-white border border-luxe-border flex items-center justify-center"
                          />
                          <div
                            className="absolute inset-x-0 bottom-0 bg-[#1A1A1A] text-white text-center py-3 text-[11px] uppercase tracking-[0.2em] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                            style={{ fontWeight: 500 }}
                            onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                          >
                            Add to Bag
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-luxe-gold mb-1" style={{ fontWeight: 500 }}>{product.sockType}</p>
                          <h3 className="font-playfair text-[15px] text-luxe-text mb-1.5 line-clamp-1" style={{ fontWeight: 400 }}>{product.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[15px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{product.price}</span>
                            {product.mrp && product.mrp > product.price && (
                              <>
                                <span className="text-[12px] text-luxe-muted line-through">&#8377;{product.mrp}</span>
                                <span className="text-[11px] text-luxe-sale" style={{ fontWeight: 500 }}>
                                  {product.discount || Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                                </span>
                              </>
                            )}
                          </div>
                          {product.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {product.technologies.slice(0, 2).map((t) => (
                                <span key={t} className="text-[7px] uppercase tracking-[0.1em] text-luxe-muted border border-luxe-border px-1.5 py-0.5">{t}</span>
                              ))}
                            </div>
                          )}
                          <div className="flex gap-1.5">
                            {product.colors.slice(0, 4).map((c, i) => (
                              <div
                                key={c.hex}
                                className="w-[12px] h-[12px] rounded-full border border-luxe-border"
                                style={{ backgroundColor: c.hex, boxShadow: i === 0 ? "0 0 0 1.5px white, 0 0 0 2.5px #1A1A1A" : "none" }}
                              />
                            ))}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {/* Load More */}
                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                      className="px-[44px] py-3.5 border border-luxe-border-emphasis text-luxe-text text-[11px] uppercase tracking-[0.2em] hover:border-luxe-text transition-colors duration-200"
                      style={{ fontWeight: 500 }}
                    >
                      Load More ({filtered.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* List View */
              <>
                <div className="space-y-0">
                  {visible.map((product, idx) => (
                    <Link
                      key={product._id}
                      href={`/products/${product._id}`}
                      className={`flex gap-5 bg-white p-5 border border-luxe-border hover:bg-luxe-surface/30 transition-colors duration-200 ${idx > 0 ? "-mt-px" : ""}`}
                    >
                      <div className="relative w-28 h-28 bg-luxe-image-bg overflow-hidden flex-shrink-0">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-luxe-gold mb-1" style={{ fontWeight: 500 }}>{product.sockType}</p>
                        <h3 className="font-playfair text-[16px] text-luxe-text mb-1" style={{ fontWeight: 400 }}>{product.name}</h3>
                        <p className="text-[12px] text-luxe-text-secondary line-clamp-1 mb-2" style={{ fontWeight: 300 }}>{product.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[16px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{product.price}</span>
                          {product.mrp && product.mrp > product.price && (
                            <>
                              <span className="text-[12px] text-luxe-muted line-through">&#8377;{product.mrp}</span>
                              <span className="text-[11px] text-luxe-sale" style={{ fontWeight: 500 }}>
                                {product.discount}% off
                              </span>
                            </>
                          )}
                        </div>
                        {product.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {product.technologies.slice(0, 3).map((t) => (
                              <span key={t} className="text-[8px] uppercase tracking-[0.1em] text-luxe-muted border border-luxe-border px-1.5 py-0.5">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <WishlistButton product={product} size={16} />
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-[8px] h-[8px]" style={{
                              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                              background: i < Math.floor(product.rating) ? "#A8874A" : "#E8E4DF",
                            }} />
                          ))}
                          <span className="text-[10px] text-luxe-muted ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                      className="px-[44px] py-3.5 border border-luxe-border-emphasis text-luxe-text text-[11px] uppercase tracking-[0.2em] hover:border-luxe-text transition-colors duration-200"
                      style={{ fontWeight: 500 }}
                    >
                      Load More ({filtered.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
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
