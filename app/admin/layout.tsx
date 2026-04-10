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
    <div className="flex h-screen bg-[#f4f0e8]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] text-white flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="text-2xl font-playfair font-bold">
            <span className="text-white">Richy</span>
            <span className="text-[#c9a84c]">Sox</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === href
                  ? "bg-[#c9a84c] text-[#0a0a0a]"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          {user && (
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-white">{user.name || "Admin"}</p>
              <p className="text-xs text-gray-500">{user.mobile}</p>
            </div>
          )}
        </div>
      </aside>

      {/* Content */}
      <main className="ml-64 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
