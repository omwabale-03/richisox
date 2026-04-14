"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { User, Package, MapPin, Heart, Award, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const sidebarLinks = [
  { href: "/account/profile", label: "My Profile", icon: User },
  { href: "/account/orders", label: "My Orders", icon: Package },
  { href: "/account/addresses", label: "My Addresses", icon: MapPin },
  { href: "/wishlist", label: "My Wishlist", icon: Heart },
  { href: "/account/loyalty", label: "Loyalty Points", icon: Award },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login?redirect=/account");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%] py-10">
        <div className="mb-8">
          <p className="eyebrow mb-2">Your Account</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(24px, 2.5vw, 34px)" }}>
            Hello, <em className="font-playfair italic">{user?.name || "there"}</em>
          </h1>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block w-[220px] flex-shrink-0">
            <nav className="space-y-0.5">
              {sidebarLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                    pathname === href || (href !== "/wishlist" && pathname.startsWith(href))
                      ? "bg-[#1A1A1A] text-white"
                      : "text-luxe-text-secondary hover:text-luxe-text hover:bg-luxe-surface"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <button
                onClick={() => { logout(); router.push("/"); }}
                className="flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-luxe-sale hover:bg-red-50 transition-colors duration-200 w-full"
                style={{ fontWeight: 500 }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>
          </aside>

          {/* Mobile tabs */}
          <div className="md:hidden w-full mb-6 overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {sidebarLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2.5 text-[10px] uppercase tracking-[0.12em] border border-luxe-border -ml-px first:ml-0 whitespace-nowrap transition-colors duration-200 ${
                    pathname === href || (href !== "/wishlist" && pathname.startsWith(href))
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                      : "text-luxe-text-secondary"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
