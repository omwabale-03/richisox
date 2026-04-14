"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingBag } from "lucide-react";

interface StickyAddToCartProps {
  price: number;
  productName: string;
  onAddToCart: () => void;
}

export function StickyAddToCart({ price, productName, onAddToCart }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    // Observe the "Add to Cart" button area — when it scrolls out of view, show sticky bar
    const mainButton = document.querySelector("[data-add-to-cart-anchor]");
    if (mainButton) observer.observe(mainButton);

    return () => observer.disconnect();
  }, []);

  if (!visible) return <div ref={sentinelRef} />;

  return (
    <>
      <div ref={sentinelRef} />
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-luxe-border px-[4%] py-3 flex items-center gap-4">
        <div className="flex-1">
          <p className="text-[11px] text-luxe-muted line-clamp-1">{productName}</p>
          <p className="text-[16px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{price}</p>
        </div>
        <button
          onClick={onAddToCart}
          className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.15em] hover:bg-[#333] transition-colors duration-200"
          style={{ fontWeight: 500 }}
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </>
  );
}
