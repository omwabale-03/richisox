"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const SIZE_CHART = [
  { label: "S (5-8)", uk: "5-8", us: "6-9", eu: "38-41", cm: "24-26" },
  { label: "M (6-9)", uk: "6-9", us: "7-10", eu: "39-42", cm: "25-27" },
  { label: "L (7-10)", uk: "7-10", us: "8-11", eu: "40-44", cm: "26-29" },
  { label: "XL (8-11)", uk: "8-11", us: "9-12", eu: "42-46", cm: "28-30" },
  { label: "Free Size", uk: "6-10", us: "7-11", eu: "39-44", cm: "25-29" },
];

export function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text" style={{ fontWeight: 600 }}>
          Size: <span className="text-luxe-muted" style={{ fontWeight: 400 }}>{selectedSize}</span>
        </p>
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="text-[10px] uppercase tracking-[0.15em] text-luxe-gold border-b border-luxe-gold/40 hover:border-luxe-gold transition-colors duration-200 pb-0.5"
              style={{ fontWeight: 500 }}
            >
              Size Guide
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md bg-white">
            <SheetHeader>
              <SheetTitle className="font-playfair text-[20px] text-luxe-text" style={{ fontWeight: 400 }}>
                Size Guide
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-muted mb-4" style={{ fontWeight: 500 }}>
                Measurements
              </p>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-luxe-border">
                    <th className="text-left py-2.5 text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Size</th>
                    <th className="text-left py-2.5 text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>UK</th>
                    <th className="text-left py-2.5 text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>US</th>
                    <th className="text-left py-2.5 text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>EU</th>
                    <th className="text-left py-2.5 text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>CM</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map((row) => (
                    <tr key={row.label} className="border-b border-luxe-border">
                      <td className="py-2.5 text-luxe-text" style={{ fontWeight: 500 }}>{row.label}</td>
                      <td className="py-2.5 text-luxe-text-secondary">{row.uk}</td>
                      <td className="py-2.5 text-luxe-text-secondary">{row.us}</td>
                      <td className="py-2.5 text-luxe-text-secondary">{row.eu}</td>
                      <td className="py-2.5 text-luxe-text-secondary">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 p-4 bg-luxe-surface border border-luxe-border">
                <p className="text-[10px] uppercase tracking-[0.15em] text-luxe-gold mb-2" style={{ fontWeight: 500 }}>
                  How to Measure
                </p>
                <p className="text-[12px] text-luxe-text-secondary leading-relaxed" style={{ fontWeight: 300 }}>
                  Stand on a piece of paper and trace the outline of your foot. Measure the
                  distance from the heel to the longest toe in centimeters. Use the chart
                  above to find your perfect size.
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-wrap gap-0">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] border border-luxe-border -ml-px first:ml-0 transition-colors duration-200 ${
              selectedSize === size
                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                : "bg-white text-luxe-text-secondary hover:text-luxe-text"
            }`}
            style={{ fontWeight: 500 }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
