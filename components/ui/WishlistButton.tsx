"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { IProduct } from "@/types";

interface WishlistButtonProps {
  product: IProduct;
  className?: string;
  size?: number;
}

export function WishlistButton({ product, className = "", size = 14 }: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const active = mounted && isInWishlist(product._id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(product);
      }}
      className={`transition-colors duration-200 ${className}`}
      title={active ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <Heart
        className={`transition-all duration-200 ${active ? "text-luxe-sale fill-luxe-sale" : "text-luxe-muted hover:text-luxe-text"}`}
        style={{ width: size, height: size }}
        strokeWidth={1.5}
      />
    </button>
  );
}
