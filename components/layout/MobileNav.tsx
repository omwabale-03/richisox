"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Search, ShoppingBag, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { MOBILE_NAV_TABS } from "./MobileNavData";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("men");
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.itemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key closes drawer
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTab("men");
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const handleClose = () => {
    setActiveTab("men");
    onClose();
  };

  const handleNavigate = (route: string) => {
    handleClose();
    router.push(route);
  };

  const currentTab = MOBILE_NAV_TABS.find((t) => t.id === activeTab) || MOBILE_NAV_TABS[0];
  const viewAllLabel = currentTab.label;
  const viewAllRoute = `/products?category=${activeTab === "super-saver" || activeTab === "genz" || activeTab === "gifting" ? "unisex" : activeTab}`;

  return (
    <div
      className="md:hidden fixed inset-0 z-[65]"
      style={{
        visibility: isOpen ? "visible" : "hidden",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      {/* Drawer panel — slides from top */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-0 bg-white flex flex-col"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.35s ease",
        }}
      >
        {/* ── Announcement Bar (stays visible) ── */}
        <div className="bg-[#1A1A1A] text-white text-center py-2.5 flex-shrink-0">
          <p
            className="font-sans text-[11px] tracking-[0.18em] uppercase"
            style={{ fontWeight: 500 }}
          >
            Free Shipping Above{" "}
            <span style={{ color: "#C9A96E" }}>&#8377;499</span>
            &nbsp;|&nbsp;Code{" "}
            <span style={{ color: "#C9A96E" }}>RICHY10</span> for 10% Off
          </p>
        </div>

        {/* ── Top Navbar Row ── */}
        <div className="flex items-center justify-between h-[56px] px-4 border-b flex-shrink-0" style={{ borderColor: "#EDE5CC" }}>
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close menu"
            className="p-1.5"
            style={{ color: "#1A1508" }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href="/" onClick={handleClose} className="flex items-center gap-0">
            <span
              className="font-playfair text-[22px] tracking-[0.08em]"
              style={{ fontWeight: 400, color: "#1A1508" }}
            >
              RichySox
            </span>
            <span style={{ color: "#A8874A", fontSize: "22px" }} className="ml-0.5">.</span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <Link href="/wishlist" onClick={handleClose} className="relative" style={{ color: "#1A1508" }}>
              <Heart className="w-[18px] h-[18px]" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-[15px] h-[15px] bg-[#B85450] text-white text-[8px] rounded-full flex items-center justify-center" style={{ fontWeight: 600 }}>
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" onClick={handleClose} className="relative" style={{ color: "#1A1508" }}>
              <ShoppingBag className="w-[18px] h-[18px]" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-[15px] h-[15px] bg-[#1A1A1A] text-white text-[8px] rounded-full flex items-center justify-center" style={{ fontWeight: 600 }}>
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ── Search Bar Row ── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0" style={{ borderColor: "#EDE5CC" }}>
          <div
            className="flex items-center flex-1 px-3 h-[42px]"
            style={{
              background: "#FAF7EF",
              border: "1px solid #D4C08A",
            }}
          >
            <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#9A9590" }} />
            <input
              type="text"
              placeholder="Search socks, collections..."
              className="flex-1 ml-2.5 bg-transparent text-[13px] placeholder:text-[#9A9590]"
              style={{ fontWeight: 300, color: "#1A1508", outline: "none", border: "none", boxShadow: "none" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) handleNavigate(`/products?search=${encodeURIComponent(val)}`);
                }
              }}
            />
          </div>
          <button
            onClick={() => handleNavigate("/products")}
            className="text-[12px] uppercase tracking-[0.12em] flex-shrink-0"
            style={{ fontWeight: 700, color: "#C9A84C" }}
          >
            Search
          </button>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Column: Tabs */}
          <div
            className="flex flex-col overflow-y-auto flex-shrink-0"
            style={{ width: "30%", background: "#FFFFFF", borderRight: "1px solid #EDE5CC" }}
          >
            {MOBILE_NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className="text-left py-4 px-3 transition-colors duration-150"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#1A1508",
                    background: isActive ? "#FDF9EF" : "transparent",
                    borderLeft: isActive ? "3px solid #C9A84C" : "3px solid transparent",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right Column: Subcategory Grid */}
          <div
            role="tabpanel"
            className="flex-1 overflow-y-auto p-3"
            style={{ background: "#F5F1E8" }}
          >
            <div className="grid grid-cols-2 gap-2.5">
              {currentTab.subcategories.map((subcat) => (
                <button
                  key={subcat.label}
                  onClick={() => handleNavigate(subcat.route)}
                  className="relative overflow-hidden mobile-nav-card"
                  style={{
                    aspectRatio: "3/2",
                  }}
                >
                  <Image
                    src={subcat.image}
                    alt={subcat.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 35vw"
                  />
                  {/* Dark gradient overlay at bottom */}
                  <div
                    className="absolute inset-0 mobile-nav-card"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                    }}
                  />
                  {/* Label */}
                  <span
                    className="absolute bottom-0 inset-x-0 text-center pb-2.5"
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                    }}
                  >
                    {subcat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <button
          onClick={() => handleNavigate(viewAllRoute)}
          className="flex items-center justify-center w-full flex-shrink-0"
          style={{
            height: "52px",
            background: "#C9A84C",
            color: "#FFFFFF",
            fontSize: "14px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          View All {viewAllLabel} &rarr;
        </button>
      </div>
    </div>
  );
}
