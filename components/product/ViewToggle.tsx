"use client";

import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex border border-luxe-border">
      <button
        onClick={() => onViewChange("grid")}
        className={`p-2 transition-colors duration-200 ${
          view === "grid" ? "bg-[#1A1A1A] text-white" : "text-luxe-muted hover:text-luxe-text"
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={`p-2 border-l border-luxe-border transition-colors duration-200 ${
          view === "list" ? "bg-[#1A1A1A] text-white" : "text-luxe-muted hover:text-luxe-text"
        }`}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}
