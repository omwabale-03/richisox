"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  ShoppingBag,
  User,
  Menu,
  LogOut,
  Package,
  Settings,
  Search,
  Heart,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import MobileNav from "@/components/layout/MobileNav";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { megaMenuData } from "@/data/navMenuData";

const navLinks = [
  { href: "/", label: "Home", megaKey: null },
  { href: "/products", label: "Shop", megaKey: null },
  { href: "/products?category=men", label: "Men", megaKey: "MEN" },
  { href: "/products?category=women", label: "Women", megaKey: "WOMEN" },
  { href: "/products?category=kids", label: "Kids", megaKey: "KIDS" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.itemCount());
  const { user, logout, isLoggedIn, isAdmin } = useAuthStore();

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setActiveMenu(null);
    setUserMenuOpen(false);
  }, [pathname]);

  // Escape key closes mega menu + mobile drawer
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setUserMenuOpen(false);
    if (userMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [userMenuOpen]);

  // Hover delay logic for mega menu
  const handleMenuEnter = useCallback((key: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setActiveMenu(key), 150);
  }, []);

  const handleMenuLeave = useCallback(() => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 220);
  }, []);

  // Keep mega menu open when mouse enters the panel
  const handlePanelEnter = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const handlePanelLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 220);
  }, []);

  const closeMegaMenu = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#1A1A1A] text-white text-center py-2.5 sticky top-0 z-[60]">
        <p
          className="font-sans text-[11px] tracking-[0.18em] uppercase"
          style={{ fontWeight: 500 }}
        >
          Free Shipping on Orders Above{" "}
          <span className="text-luxe-gold-light">&#8377;499</span> &nbsp;|&nbsp;
          Use Code{" "}
          <span className="text-luxe-gold-light">RICHY10</span> for 10% Off
        </p>
      </div>

      {/* Main Nav */}
      <nav className="sticky top-[41px] z-50 bg-white border-b border-luxe-border h-[72px]" style={{ position: "sticky" }}>
        <div className="max-w-[1400px] mx-auto px-[4%] h-full">
          <div className="grid grid-cols-3 items-center h-full">
            {/* ── Left: Desktop Nav Links with Mega Menu triggers ── */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const hasMega = link.megaKey && megaMenuData[link.megaKey];
                const isActive = activeMenu === link.megaKey;

                if (hasMega) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => handleMenuEnter(link.megaKey!)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <Link
                        href={link.href}
                        className="nav-link-hover text-nav-link uppercase transition-colors duration-200"
                        style={{
                          fontWeight: 500,
                          color: isActive ? "#C9A84C" : "#5A5550",
                          borderBottom: isActive ? "2px solid #C9A84C" : "2px solid transparent",
                          paddingBottom: "2px",
                        }}
                      >
                        {link.label}
                      </Link>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link-hover text-nav-link uppercase transition-colors duration-200"
                    style={{
                      fontWeight: 500,
                      color: "#5A5550",
                      borderBottom: "2px solid transparent",
                      paddingBottom: "2px",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* ── Mobile hamburger ── */}
            <div className="md:hidden flex items-center">
              <button
                className="p-2 text-luxe-text hover:text-luxe-text-secondary transition-colors duration-200"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* ── Center: Logo ── */}
            <div className="flex items-center justify-center">
              <Link href="/" className="flex items-center gap-0">
                <span
                  className="font-playfair text-[26px] tracking-[0.08em] text-luxe-text"
                  style={{ fontWeight: 400 }}
                >
                  RichySox
                </span>
                <span className="text-luxe-gold text-[26px] ml-0.5">.</span>
              </Link>
            </div>

            {/* ── Right: Icons ── */}
            <div className="flex items-center justify-end gap-5">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-1.5 nav-link-hover transition-colors duration-200"
                style={{ color: "#5A5550", borderBottom: "2px solid transparent", paddingBottom: "2px" }}
              >
                <Search className="w-[18px] h-[18px]" />
                <span className="text-nav-link uppercase" style={{ fontWeight: 500 }}>Search</span>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative flex items-center gap-1.5 nav-link-hover transition-colors duration-200"
                style={{ color: "#5A5550", borderBottom: "2px solid transparent", paddingBottom: "2px" }}
              >
                <Heart className="w-[18px] h-[18px]" />
                <span className="hidden md:inline text-nav-link uppercase" style={{ fontWeight: 500 }}>Wishlist</span>
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 md:-top-1.5 md:left-2.5 w-[18px] h-[18px] bg-luxe-sale text-white text-[9px] rounded-full flex items-center justify-center" style={{ fontWeight: 600 }}>
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                  className="flex items-center gap-1.5 nav-link-hover transition-colors duration-200"
                  style={{ color: "#5A5550", borderBottom: "2px solid transparent", paddingBottom: "2px" }}
                >
                  <User className="w-[18px] h-[18px]" />
                  <span className="text-nav-link uppercase" style={{ fontWeight: 500 }}>Account</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-10 w-52 bg-white shadow-lg border border-luxe-border py-2 z-50">
                    {isLoggedIn() ? (
                      <>
                        <div className="px-4 py-2.5 border-b border-luxe-border">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-muted" style={{ fontWeight: 500 }}>Signed in as</p>
                          <p className="text-[13px] text-luxe-text truncate mt-0.5" style={{ fontWeight: 500 }}>{user?.name || user?.mobile}</p>
                        </div>
                        <Link href="/account" className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-luxe-text-secondary hover:text-luxe-text hover:bg-luxe-surface transition-colors duration-200" onClick={() => setUserMenuOpen(false)}>
                          <User className="w-4 h-4" /> My Account
                        </Link>
                        <Link href="/orders" className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-luxe-text-secondary hover:text-luxe-text hover:bg-luxe-surface transition-colors duration-200" onClick={() => setUserMenuOpen(false)}>
                          <Package className="w-4 h-4" /> My Orders
                        </Link>
                        {isAdmin() && (
                          <Link href="/admin/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-luxe-text-secondary hover:text-luxe-text hover:bg-luxe-surface transition-colors duration-200" onClick={() => setUserMenuOpen(false)}>
                            <Settings className="w-4 h-4" /> Admin Panel
                          </Link>
                        )}
                        <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-luxe-sale hover:bg-red-50 transition-colors duration-200 w-full">
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </>
                    ) : (
                      <Link href="/login" className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-luxe-text-secondary hover:text-luxe-text hover:bg-luxe-surface transition-colors duration-200" onClick={() => setUserMenuOpen(false)}>
                        <User className="w-4 h-4" /> Login / Sign Up
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-1.5 nav-link-hover transition-colors duration-200"
                style={{ color: "#5A5550", borderBottom: "2px solid transparent", paddingBottom: "2px" }}
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                <span className="hidden md:inline text-nav-link uppercase" style={{ fontWeight: 500 }}>Bag</span>
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 md:-top-1.5 md:left-2.5 w-[18px] h-[18px] bg-luxe-text text-white text-[9px] rounded-full flex items-center justify-center" style={{ fontWeight: 600 }}>
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Desktop Mega Menu Panel ── */}
        {activeMenu && megaMenuData[activeMenu] && (
          <MegaMenu
            data={megaMenuData[activeMenu]}
            onLinkClick={closeMegaMenu}
            onMouseEnter={handlePanelEnter}
            onMouseLeave={handlePanelLeave}
          />
        )}
      </nav>

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
