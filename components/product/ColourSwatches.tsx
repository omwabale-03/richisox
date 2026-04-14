"use client";

import { IProductColor } from "@/types";

interface ColourSwatchesProps {
  colors: IProductColor[];
  selectedColor: IProductColor;
  onColorChange: (color: IProductColor) => void;
}

export function ColourSwatches({ colors, selectedColor, onColorChange }: ColourSwatchesProps) {
  return (
    <div className="mb-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
        Colour: <span className="text-luxe-muted" style={{ fontWeight: 400 }}>{selectedColor.name}</span>
      </p>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.hex}
            onClick={() => onColorChange(color)}
            className="w-[20px] h-[20px] rounded-full border transition-all duration-200"
            style={{
              backgroundColor: color.hex,
              borderColor: color.hex === "#FFFFFF" || color.hex === "#FAFAFA" || color.hex === "#F5F5F5" || color.hex === "#FFF8E1" ? "#D8D3CC" : color.hex,
              boxShadow: selectedColor.hex === color.hex
                ? "0 0 0 2px white, 0 0 0 3px #1A1A1A"
                : "none",
            }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}
