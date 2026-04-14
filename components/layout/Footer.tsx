import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-white border-t border-luxe-border">
      <div className="max-w-[1400px] mx-auto px-[4%] py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-0 mb-4">
              <span
                className="font-playfair text-[22px] tracking-[0.08em] text-luxe-text"
                style={{ fontWeight: 400 }}
              >
                RichySox
              </span>
              <span className="text-luxe-gold text-[22px] ml-0.5">.</span>
            </div>
            <p className="text-body-sm text-luxe-text-secondary leading-relaxed mb-6" style={{ fontWeight: 300 }}>
              We curate a collection of premium high-quality socks for those who demand
              sophisticated style without compromising on artisanal comfort.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-luxe-muted hover:text-luxe-text transition-colors duration-200">
                <FaInstagram className="w-[18px] h-[18px]" />
              </a>
              <a href="#" className="text-luxe-muted hover:text-luxe-text transition-colors duration-200">
                <FaFacebook className="w-[18px] h-[18px]" />
              </a>
              <a href="#" className="text-luxe-muted hover:text-luxe-text transition-colors duration-200">
                <FaTwitter className="w-[18px] h-[18px]" />
              </a>
              <a href="#" className="text-luxe-muted hover:text-luxe-text transition-colors duration-200">
                <FaYoutube className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-5"
              style={{ fontWeight: 600 }}
            >
              Shop
            </h4>
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
                    className="text-[12px] text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4
              className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-5"
              style={{ fontWeight: 600 }}
            >
              Help
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/orders", label: "Track My Order" },
                { href: "/shipping-policy", label: "Shipping Policy" },
                { href: "/return-policy", label: "Return Policy" },
                { href: "/size-guide", label: "Size Guide" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-5"
              style={{ fontWeight: 600 }}
            >
              Contact
            </h4>
            <ul className="space-y-3 text-[12px] text-luxe-text-secondary">
              <li>hello@richysox.com</li>
              <li>+91 98765 43210</li>
              <li>Mon-Sat, 9am-6pm IST</li>
            </ul>
            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-muted mb-2" style={{ fontWeight: 500 }}>
                We accept
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {["UPI", "Visa", "Mastercard", "Net Banking"].map((method) => (
                  <span
                    key={method}
                    className="px-2.5 py-1 bg-luxe-surface border border-luxe-border text-[10px] text-luxe-text-secondary uppercase tracking-[0.1em]"
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
      <div className="border-t border-luxe-border">
        <div className="max-w-[1400px] mx-auto px-[4%] py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-luxe-muted">&copy; 2024 RichySox. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[11px] text-luxe-muted hover:text-luxe-text transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[11px] text-luxe-muted hover:text-luxe-text transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
