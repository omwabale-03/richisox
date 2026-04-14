"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterState {
  category: string[];
  occasion: string[];
  sockType: string[];
  material: string[];
  technology: string[];
  priceBracket: string[];
  rating: number;
  colour: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FILTER_SECTIONS = [
  {
    key: "category" as const,
    label: "Category",
    options: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "kids", label: "Kids" },
      { value: "unisex", label: "Unisex" },
    ],
  },
  {
    key: "occasion" as const,
    label: "Occasion",
    options: [
      { value: "casual", label: "Casual" },
      { value: "formal", label: "Formal" },
      { value: "sports", label: "Sports" },
      { value: "office", label: "Office" },
      { value: "festive", label: "Festive" },
      { value: "travel", label: "Travel" },
    ],
  },
  {
    key: "sockType" as const,
    label: "Sock Type",
    options: [
      { value: "ankle", label: "Ankle" },
      { value: "crew", label: "Crew" },
      { value: "no-show", label: "No-Show" },
      { value: "quarter", label: "Quarter" },
      { value: "knee-high", label: "Knee-High" },
      { value: "over-the-calf", label: "Over-the-Calf" },
    ],
  },
  {
    key: "material" as const,
    label: "Material",
    options: [
      { value: "cotton", label: "Cotton" },
      { value: "bamboo", label: "Bamboo" },
      { value: "merino", label: "Merino Wool" },
      { value: "modal", label: "Modal" },
      { value: "cashmere", label: "Cashmere" },
      { value: "polyester", label: "Polyester" },
      { value: "silk-blend", label: "Silk Blend" },
    ],
  },
  {
    key: "technology" as const,
    label: "Technology",
    options: [
      { value: "Silver Frost Anti-Odour", label: "Anti-Odour" },
      { value: "Moisture Wicking", label: "Moisture Wicking" },
      { value: "Arch Support", label: "Arch Support" },
      { value: "Cushioned Sole", label: "Cushioned" },
      { value: "OEKO-TEX Certified", label: "OEKO-TEX" },
      { value: "Compression Zones", label: "Compression" },
    ],
  },
];

const PRICE_BRACKETS = [
  { value: "0-199", label: "Under ₹199" },
  { value: "199-299", label: "₹199 – ₹299" },
  { value: "299-499", label: "₹299 – ₹499" },
  { value: "499-999", label: "₹499 – ₹999" },
  { value: "999-9999", label: "₹999+" },
];

const COLOUR_SWATCHES = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#1a237e" },
  { name: "Grey", hex: "#9E9E9E" },
  { name: "Pink", hex: "#e91e63" },
  { name: "Blue", hex: "#2196f3" },
  { name: "Green", hex: "#4CAF50" },
  { name: "Red", hex: "#B85450" },
  { name: "Beige", hex: "#D7CCC8" },
];

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const arr = filters[key] as string[];
    const updated = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    onFilterChange({ ...filters, [key]: updated });
  };

  const clearAll = () => {
    onFilterChange({
      category: [],
      occasion: [],
      sockType: [],
      material: [],
      technology: [],
      priceBracket: [],
      rating: 0,
      colour: [],
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) =>
    Array.isArray(v) ? v.length > 0 : v > 0
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text" style={{ fontWeight: 600 }}>
          Filters
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-[10px] uppercase tracking-[0.15em] text-luxe-gold hover:text-luxe-text transition-colors duration-200"
            style={{ fontWeight: 500 }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Checkbox filter sections */}
      {FILTER_SECTIONS.map((section) => (
        <div key={section.key} className="border-b border-luxe-border pb-4 mb-4">
          <button
            onClick={() => toggleCollapse(section.key)}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-[10px] uppercase tracking-[0.15em] text-luxe-text" style={{ fontWeight: 600 }}>
              {section.label}
              {(filters[section.key] as string[]).length > 0 && (
                <span className="ml-1.5 text-luxe-gold">({(filters[section.key] as string[]).length})</span>
              )}
            </span>
            {collapsed[section.key] ? (
              <ChevronDown className="w-3.5 h-3.5 text-luxe-muted" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-luxe-muted" />
            )}
          </button>
          {!collapsed[section.key] && (
            <div className="space-y-2">
              {section.options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(filters[section.key] as string[]).includes(opt.value)}
                    onChange={() => toggleArrayFilter(section.key, opt.value)}
                    className="w-3.5 h-3.5 accent-[#1A1A1A] cursor-pointer"
                  />
                  <span className="text-[12px] text-luxe-text-secondary group-hover:text-luxe-text transition-colors duration-200" style={{ fontWeight: 300 }}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Price Brackets */}
      <div className="border-b border-luxe-border pb-4 mb-4">
        <button
          onClick={() => toggleCollapse("price")}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-[10px] uppercase tracking-[0.15em] text-luxe-text" style={{ fontWeight: 600 }}>
            Price
            {filters.priceBracket.length > 0 && (
              <span className="ml-1.5 text-luxe-gold">({filters.priceBracket.length})</span>
            )}
          </span>
          {collapsed.price ? <ChevronDown className="w-3.5 h-3.5 text-luxe-muted" /> : <ChevronUp className="w-3.5 h-3.5 text-luxe-muted" />}
        </button>
        {!collapsed.price && (
          <div className="space-y-2">
            {PRICE_BRACKETS.map((bracket) => (
              <label key={bracket.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.priceBracket.includes(bracket.value)}
                  onChange={() => toggleArrayFilter("priceBracket", bracket.value)}
                  className="w-3.5 h-3.5 accent-[#1A1A1A] cursor-pointer"
                />
                <span className="text-[12px] text-luxe-text-secondary group-hover:text-luxe-text transition-colors duration-200" style={{ fontWeight: 300 }}>
                  {bracket.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="border-b border-luxe-border pb-4 mb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
          Rating
        </p>
        <div className="space-y-2">
          {[4, 3].map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === r}
                onChange={() => onFilterChange({ ...filters, rating: filters.rating === r ? 0 : r })}
                className="w-3.5 h-3.5 accent-[#1A1A1A] cursor-pointer"
              />
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[10px] h-[10px]"
                    style={{
                      clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                      background: i < r ? "#A8874A" : "#E8E4DF",
                    }}
                  />
                ))}
                <span className="text-[11px] text-luxe-muted ml-1">& above</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Colour Swatches */}
      <div className="pb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
          Colour
        </p>
        <div className="flex flex-wrap gap-2.5">
          {COLOUR_SWATCHES.map((swatch) => (
            <button
              key={swatch.name}
              onClick={() => toggleArrayFilter("colour", swatch.name)}
              className="w-[22px] h-[22px] rounded-full transition-all duration-200"
              style={{
                backgroundColor: swatch.hex,
                border: swatch.hex === "#FFFFFF" ? "1px solid #D8D3CC" : "1px solid transparent",
                boxShadow: filters.colour.includes(swatch.name)
                  ? "0 0 0 2px white, 0 0 0 3px #1A1A1A"
                  : "none",
              }}
              title={swatch.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export type { FilterState };
