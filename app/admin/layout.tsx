"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Users, ExternalLink, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/users", label: "Customers", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAdmin } = useAuthStore();

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/");
    }
  }, [isAdmin, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-luxe-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A1A] text-white flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-0">
            <span className="font-playfair text-[22px] tracking-[0.08em] text-white" style={{ fontWeight: 400 }}>
              RichySox
            </span>
            <span className="text-luxe-gold text-[22px] ml-0.5">.</span>
          </Link>
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mt-1" style={{ fontWeight: 500 }}>
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.12em] transition-all duration-200 ${
                pathname === href
                  ? "bg-luxe-gold text-[#1A1A1A]"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
              style={{ fontWeight: 500 }}
            >
              <Icon className="w-[18px] h-[18px]" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-white/50 hover:bg-white/5 hover:text-white transition-all duration-200"
            style={{ fontWeight: 500 }}
          >
            <ExternalLink className="w-4 h-4" />
            View Store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
            style={{ fontWeight: 500 }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          {user && (
            <div className="px-4 py-2">
              <p className="text-[11px] text-white" style={{ fontWeight: 500 }}>{user.name || "Admin"}</p>
              <p className="text-[10px] text-white/40">{user.mobile}</p>
            </div>
          )}
        </div>
      </aside>

      {/* Content */}
      <main className="ml-64 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
