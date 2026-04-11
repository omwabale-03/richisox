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
  const itemCount = useCartStore((s) => s.itemCount());
  const { user, logout, isLoggedIn, isAdmin } = useAuthStore();

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
    <nav className="sticky top-0 z-50 bg-brand-cream-light border-b-[1.5px] border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">&#128081;</span>
            <span className="text-xl font-playfair font-bold tracking-tight text-brand-brown">
              RichySox
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15px] font-sans text-brand-brown hover:text-brand-gold transition-colors border-b-2 border-transparent hover:border-brand-brown pb-0.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenuOpen(!userMenuOpen);
                }}
                className="p-2 hover:bg-brand-cream rounded-full transition-colors text-brand-brown"
              >
                <User className="w-5 h-5" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-48 bg-brand-cream-light rounded-2xl shadow-xl border border-brand-cream-dark py-2 z-50">
                  {isLoggedIn() ? (
                    <>
                      <div className="px-4 py-2 border-b border-brand-cream-dark">
                        <p className="text-xs text-brand-brown-light">Signed in as</p>
                        <p className="text-sm font-medium text-brand-brown truncate">{user?.name || user?.mobile}</p>
                      </div>
                      <Link
                        href="/orders"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-brand-brown hover:bg-brand-cream transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        My Orders
                      </Link>
                      {isAdmin() && (
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-brand-brown hover:bg-brand-cream transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-brand-brown hover:bg-brand-cream transition-colors"
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
              className="relative p-2 hover:bg-brand-cream rounded-full transition-colors text-brand-brown"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-brown text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 hover:bg-brand-cream rounded-full transition-colors text-brand-brown"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-cream-light border-t border-brand-cream-dark shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 px-4 rounded-xl text-[15px] font-medium text-brand-brown hover:bg-brand-cream transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
