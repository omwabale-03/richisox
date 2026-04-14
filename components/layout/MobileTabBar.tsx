"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Search, Heart, User } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

const tabs = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/products", icon: ShoppingBag, label: "Shop" },
  { href: "#search", icon: Search, label: "Search" },
  { href: "/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/account", icon: User, label: "Account" },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const wishlistCount = useWishlistStore((s) => s.itemCount());
  const cartCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "#search") return false;
    return pathname.startsWith(href);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-luxe-border h-16 flex items-center justify-around px-2">
      {tabs.map(({ href, icon: Icon, label }) => {
        const active = isActive(href);
        const count = label === "Wishlist" ? wishlistCount : label === "Shop" ? cartCount : 0;

        return (
          <Link
            key={label}
            href={href === "#search" ? "/products" : href}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 relative transition-colors duration-200 ${
              active ? "text-luxe-text" : "text-luxe-muted"
            }`}
          >
            <Icon className="w-[20px] h-[20px]" strokeWidth={active ? 2 : 1.5} />
            <span className="text-[9px] uppercase tracking-[0.1em]" style={{ fontWeight: active ? 600 : 400 }}>
              {label}
            </span>
            {mounted && count > 0 && (
              <span className="absolute top-0 right-1 w-[14px] h-[14px] bg-luxe-sale text-white text-[7px] rounded-full flex items-center justify-center" style={{ fontWeight: 600 }}>
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
