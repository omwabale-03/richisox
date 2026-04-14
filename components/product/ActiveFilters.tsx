"use client";

import { X } from "lucide-react";
import { FilterState } from "./FilterSidebar";

interface ActiveFiltersProps {
  filters: FilterState;
  onRemove: (key: keyof FilterState, value: string) => void;
  onClearAll: () => void;
  totalResults: number;
  totalProducts: number;
}

export function ActiveFilters({ filters, onRemove, onClearAll, totalResults, totalProducts }: ActiveFiltersProps) {
  const chips: { key: keyof FilterState; value: string; label: string }[] = [];

  (["category", "occasion", "sockType", "material", "technology", "priceBracket", "colour"] as const).forEach((key) => {
    (filters[key] as string[]).forEach((value) => {
      chips.push({ key, value, label: value });
    });
  });

  if (filters.rating > 0) {
    chips.push({ key: "rating", value: String(filters.rating), label: `${filters.rating}★ & above` });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[11px] text-luxe-muted">
          Showing <span className="text-luxe-text" style={{ fontWeight: 500 }}>{totalResults}</span> of {totalProducts} products
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <button
            key={`${chip.key}-${chip.value}`}
            onClick={() => onRemove(chip.key, chip.value)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-luxe-surface border border-luxe-border text-[10px] uppercase tracking-[0.1em] text-luxe-text-secondary hover:text-luxe-text hover:border-luxe-text transition-colors duration-200"
            style={{ fontWeight: 500 }}
          >
            {chip.label}
            <X className="w-3 h-3" />
          </button>
        ))}
        <button
          onClick={onClearAll}
          className="text-[10px] uppercase tracking-[0.15em] text-luxe-gold hover:text-luxe-text transition-colors duration-200 ml-2"
          style={{ fontWeight: 500 }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
