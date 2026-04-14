"use client";

import { IPackOption } from "@/types";

interface PackSelectorProps {
  packOptions: IPackOption[];
  selectedPack: IPackOption;
  onPackChange: (pack: IPackOption) => void;
}

export function PackSelector({ packOptions, selectedPack, onPackChange }: PackSelectorProps) {
  if (!packOptions || packOptions.length <= 1) return null;

  return (
    <div className="mb-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
        Select Pack Size
      </p>
      <div className="flex flex-wrap gap-0">
        {packOptions.map((pack) => (
          <button
            key={pack.size}
            onClick={() => onPackChange(pack)}
            className={`px-5 py-3 text-[11px] border border-luxe-border -ml-px first:ml-0 transition-colors duration-200 ${
              selectedPack.size === pack.size
                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                : "bg-white text-luxe-text-secondary hover:text-luxe-text"
            }`}
          >
            <span className="uppercase tracking-[0.12em] block" style={{ fontWeight: 500 }}>{pack.label}</span>
            <span className="block mt-0.5" style={{ fontWeight: 400 }}>&#8377;{pack.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
