"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Search, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import { getRecentSearches, addRecentSearch, clearRecentSearches } from "@/hooks/useRecentSearches";
import { IProduct } from "@/types";

const TRENDING = ["Crew Socks", "Gift Box", "Bamboo", "Sports", "No-Show", "Merino"];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IProduct[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setRecentSearches(getRecentSearches());
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      const q = query.toLowerCase();
      const matches = DEMO_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.sockType.includes(q) ||
          p.material.includes(q)
      ).slice(0, 6);
      setResults(matches);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (term: string) => {
    addRecentSearch(term);
    onClose();
    window.location.href = `/products?search=${encodeURIComponent(term)}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      handleSearch(query.trim());
    }
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-white">
      <div className="max-w-[800px] mx-auto px-[4%] py-8">
        {/* Search Input */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-0 top-1/2 -translate-y-1/2 text-luxe-muted" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for socks, materials, occasions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-8 pr-4 py-3 text-[16px] text-luxe-text placeholder:text-luxe-muted border-b-2 border-luxe-text bg-transparent"
              style={{ fontWeight: 300, boxShadow: "none", outline: "none" }}
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-luxe-muted hover:text-luxe-text transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-muted mb-4" style={{ fontWeight: 500 }}>
              Results ({results.length})
            </p>
            <div className="space-y-0">
              {results.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  onClick={() => { addRecentSearch(query); onClose(); }}
                  className="flex items-center gap-4 py-3 border-b border-luxe-border hover:bg-luxe-surface/50 transition-colors duration-200 px-2 -mx-2"
                >
                  <div className="relative w-14 h-14 bg-luxe-image-bg overflow-hidden flex-shrink-0">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-luxe-gold" style={{ fontWeight: 500 }}>{product.sockType}</p>
                    <p className="text-[14px] text-luxe-text" style={{ fontWeight: 400 }}>{product.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{product.price}</p>
                    {product.mrp && product.mrp > product.price && (
                      <p className="text-[11px] text-luxe-muted line-through">&#8377;{product.mrp}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href={`/products?search=${encodeURIComponent(query)}`}
              onClick={() => { addRecentSearch(query); onClose(); }}
              className="flex items-center justify-center gap-2 mt-6 text-[11px] uppercase tracking-[0.15em] text-luxe-gold hover:text-luxe-text transition-colors duration-200"
              style={{ fontWeight: 500 }}
            >
              View all results <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : query.trim() ? (
          <div className="text-center py-12">
            <p className="text-[14px] text-luxe-muted mb-2">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-[12px] text-luxe-muted" style={{ fontWeight: 300 }}>Try a different search term</p>
          </div>
        ) : (
          <div>
            {/* Trending Searches */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-luxe-gold" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text" style={{ fontWeight: 600 }}>
                  Trending Searches
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING.map((term) => (
                  <button
                    key={term}
                    onClick={() => { setQuery(term); handleSearch(term); }}
                    className="px-4 py-2 border border-luxe-border text-[11px] uppercase tracking-[0.1em] text-luxe-text-secondary hover:text-luxe-text hover:border-luxe-text transition-colors duration-200"
                    style={{ fontWeight: 500 }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-luxe-muted" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text" style={{ fontWeight: 600 }}>
                      Recent Searches
                    </p>
                  </div>
                  <button
                    onClick={() => { clearRecentSearches(); setRecentSearches([]); }}
                    className="text-[10px] uppercase tracking-[0.15em] text-luxe-muted hover:text-luxe-text transition-colors duration-200"
                    style={{ fontWeight: 500 }}
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-0">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => { setQuery(term); handleSearch(term); }}
                      className="flex items-center gap-3 w-full py-2.5 text-left text-[13px] text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200 border-b border-luxe-border"
                      style={{ fontWeight: 300 }}
                    >
                      <Search className="w-3.5 h-3.5 text-luxe-muted" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
