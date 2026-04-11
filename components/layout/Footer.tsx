import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">&#128081;</span>
              <span className="text-2xl font-playfair font-bold text-brand-cream-light">
                RichySox
              </span>
            </div>
            <p className="text-brand-cream-dark/80 text-sm leading-relaxed mb-6">
              We curate a collection of premium high-quality socks for those who demand sophisticated style without compromising on artisanal comfort.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-brand-cream-dark/60 hover:text-brand-gold transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-cream-dark/60 hover:text-brand-gold transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-cream-dark/60 hover:text-brand-gold transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-cream-dark/60 hover:text-brand-gold transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {[
                { href: "/products?category=men", label: "Men's Collection" },
                { href: "/products?category=women", label: "Women's Collection" },
                { href: "/products?category=kids", label: "Kids' Collection" },
                { href: "/products?type=sports", label: "Sports Collection" },
                { href: "/products?isFeatured=true", label: "Best Sellers" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream-dark/70 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wider">Help</h4>
            <ul className="space-y-3">
              {[
                { href: "/orders", label: "Track My Order" },
                { href: "#", label: "Shipping Policy" },
                { href: "#", label: "Return Policy" },
                { href: "#", label: "Size Guide" },
                { href: "#", label: "FAQ" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-brand-cream-dark/70 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-brand-cream-dark/70">
              <li>hello@richysox.com</li>
              <li>+91 98765 43210</li>
              <li>Mon-Sat, 9am-6pm IST</li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-brand-cream-dark/50 mb-2">We accept</p>
              <div className="flex items-center gap-2 flex-wrap">
                {["UPI", "Visa", "Mastercard", "Net Banking"].map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 bg-white/10 border border-brand-gold/20 rounded text-xs text-brand-cream-dark/80"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-brand-cream-dark/50 text-sm">&copy; 2024 RichySox. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-brand-cream-dark/50 hover:text-brand-gold text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-brand-cream-dark/50 hover:text-brand-gold text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
