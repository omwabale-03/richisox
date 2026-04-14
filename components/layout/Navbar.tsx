"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  Package,
  Settings,
  Search,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/products?category=men", label: "Men" },
  { href: "/products?category=women", label: "Women" },
  { href: "/products?category=kids", label: "Kids" },
];

export function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const { user, logout, isLoggedIn, isAdmin } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setUserMenuOpen(false);
    if (userMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [userMenuOpen]);

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
      <nav className="sticky top-[41px] z-50 bg-white border-b border-luxe-border h-[72px]">
        <div className="max-w-[1400px] mx-auto px-[4%] h-full">
          {/* 3-column grid: left links, center logo, right icons */}
          <div className="grid grid-cols-3 items-center h-full">
            {/* Left: Nav Links (desktop) */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-nav-link uppercase text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200"
                  style={{ fontWeight: 500 }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger (left on mobile) */}
            <div className="md:hidden flex items-center">
              <button
                className="p-2 text-luxe-text hover:text-luxe-text-secondary transition-colors duration-200"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Center: Logo */}
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

            {/* Right: Icons */}
            <div className="flex items-center justify-end gap-5">
              {/* Search icon */}
              <button className="hidden md:flex items-center gap-1.5 text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200">
                <Search className="w-[18px] h-[18px]" />
                <span className="text-nav-link uppercase" style={{ fontWeight: 500 }}>
                  Search
                </span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                  }}
                  className="flex items-center gap-1.5 text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200"
                >
                  <User className="w-[18px] h-[18px]" />
                  <span className="hidden md:inline text-nav-link uppercase" style={{ fontWeight: 500 }}>
                    Account
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-10 w-52 bg-white shadow-lg border border-luxe-border py-2 z-50">
                    {isLoggedIn() ? (
                      <>
                        <div className="px-4 py-2.5 border-b border-luxe-border">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-muted" style={{ fontWeight: 500 }}>
                            Signed in as
                          </p>
                          <p className="text-[13px] text-luxe-text truncate mt-0.5" style={{ fontWeight: 500 }}>
                            {user?.name || user?.mobile}
                          </p>
                        </div>
                        <Link
                          href="/orders"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-luxe-text-secondary hover:text-luxe-text hover:bg-luxe-surface transition-colors duration-200"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Package className="w-4 h-4" />
                          My Orders
                        </Link>
                        {isAdmin() && (
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-luxe-text-secondary hover:text-luxe-text hover:bg-luxe-surface transition-colors duration-200"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4" />
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-luxe-sale hover:bg-red-50 transition-colors duration-200 w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-luxe-text-secondary hover:text-luxe-text hover:bg-luxe-surface transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Login / Sign Up
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-1.5 text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                <span className="hidden md:inline text-nav-link uppercase" style={{ fontWeight: 500 }}>
                  Bag
                </span>
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 md:-top-1.5 md:left-2.5 w-[18px] h-[18px] bg-luxe-text text-white text-[9px] rounded-full flex items-center justify-center" style={{ fontWeight: 600 }}>
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-luxe-border">
            <div className="px-[4%] py-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 px-4 text-nav-link uppercase text-luxe-text-secondary hover:text-luxe-text hover:bg-luxe-surface transition-colors duration-200"
                  style={{ fontWeight: 500 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
