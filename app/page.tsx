import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Star, Truck, RotateCcw, Shield, Clock } from "lucide-react";

const sockColors = [
  { bg: "#1a237e", emoji: "🧦" },
  { bg: "#c9a84c", emoji: "✨" },
  { bg: "#e91e63", emoji: "🎀" },
  { bg: "#2e7d32", emoji: "🌿" },
  { bg: "#6a1b9a", emoji: "💜" },
  { bg: "#bf360c", emoji: "🔥" },
];

const testimonials = [
  { name: "Priya S.", rating: 5, text: "Absolutely love these socks! The quality is top-notch and they feel amazing.", location: "Mumbai" },
  { name: "Rahul M.", rating: 5, text: "Finally found socks that are both stylish and comfortable. RichySox is the best!", location: "Delhi" },
  { name: "Ananya K.", rating: 5, text: "The crew socks are perfect. I've ordered 5 pairs already. Highly recommend!", location: "Bangalore" },
  { name: "Vikram R.", rating: 4, text: "Great quality socks. The sports collection is perfect for my gym sessions.", location: "Chennai" },
  { name: "Sneha P.", rating: 5, text: "Love the colors and the softness. My kids absolutely adore the kids collection!", location: "Pune" },
  { name: "Arjun D.", rating: 5, text: "Premium quality at a fair price. My go-to sock brand from now on!", location: "Hyderabad" },
];

const categories = [
  {
    id: "men",
    label: "Men",
    emoji: "👔",
    bg: "from-[#1a237e] to-[#283593]",
    href: "/products?category=men",
    description: "Crew, ankle & sports",
  },
  {
    id: "women",
    label: "Women",
    emoji: "💅",
    bg: "from-[#880e4f] to-[#c2185b]",
    href: "/products?category=women",
    description: "Cute & comfortable",
  },
  {
    id: "kids",
    label: "Kids",
    emoji: "🎒",
    bg: "from-[#01579b] to-[#0288d1]",
    href: "/products?category=kids",
    description: "Fun & colorful",
  },
];

const features = [
  { icon: "🧵", title: "Premium Quality", desc: "100% combed cotton with reinforced heel & toe" },
  { icon: "🚚", title: "Free Shipping ₹499+", desc: "Fast delivery across all of India" },
  { icon: "↩️", title: "Easy Returns", desc: "7-day hassle-free return policy" },
  { icon: "🔒", title: "Secure Payments", desc: "UPI, cards, wallets, net banking via Razorpay" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="min-h-screen bg-[#fafaf7] flex items-center pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 text-[#c9a84c] px-4 py-2 rounded-full text-sm font-medium mb-6">
                  ✨ New Collection — Summer 2024
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold leading-tight mb-6 text-[#0a0a0a]">
                  Step into{" "}
                  <span className="text-[#c9a84c]">Luxury</span>{" "}
                  Comfort
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                  Premium socks crafted for style and comfort. Because even your feet deserve the best.
                  Discover 100+ designs for men, women, and kids.
                </p>

                {/* Stats */}
                <div className="flex items-center gap-8 mb-10">
                  {[
                    { num: "100+", label: "Designs" },
                    { num: "50K+", label: "Customers" },
                    { num: "4.9★", label: "Rating" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold text-[#0a0a0a]">{stat.num}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#c9a84c] transition-all duration-300 group"
                  >
                    Shop Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/products?isFeatured=true"
                    className="inline-flex items-center justify-center gap-2 border-2 border-[#0a0a0a] text-[#0a0a0a] px-8 py-4 rounded-full font-semibold hover:bg-[#0a0a0a] hover:text-white transition-all duration-300"
                  >
                    Best Sellers
                  </Link>
                </div>
              </div>

              {/* Right — Colorful sock grid */}
              <div className="hidden lg:grid grid-cols-3 gap-4">
                {sockColors.map((sock, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center h-40 rounded-3xl text-4xl shadow-lg ${i % 2 === 1 ? "-rotate-3" : "rotate-2"}`}
                    style={{ backgroundColor: sock.bg }}
                  >
                    {sock.emoji}🧦
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="bg-[#0a0a0a] py-4 overflow-hidden">
          <div className="marquee-track">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 pr-8 text-[#c9a84c] font-medium text-sm whitespace-nowrap">
                <span>✦ Premium Cotton</span>
                <span>✦ Free Shipping ₹499+</span>
                <span>✦ 100+ Designs</span>
                <span>✦ Easy Returns</span>
                <span>✦ Secure Payments</span>
                <span>✦ Made for India</span>
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        <section className="py-20 bg-[#f4f0e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-playfair font-bold text-[#0a0a0a] mb-4">Shop by Category</h2>
              <p className="text-gray-600">Find the perfect pair for every occasion</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.bg} p-8 min-h-[320px] flex flex-col justify-between cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                >
                  <div className="text-6xl mb-4">{cat.emoji}</div>
                  <div>
                    <h3 className="text-3xl font-playfair font-bold text-white mb-1">{cat.label}</h3>
                    <p className="text-white/70 text-sm mb-4">{cat.description}</p>
                    <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:bg-white group-hover:text-[#0a0a0a] transition-all">
                      Shop Now →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-playfair font-bold text-white mb-4">Why RichySox?</h2>
              <p className="text-gray-400">Everything you need from a premium sock brand</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-[#f4f0e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-playfair font-bold text-[#0a0a0a] mb-4">What Customers Say</h2>
              <p className="text-gray-600">Loved by 50,000+ customers across India</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < t.rating ? "fill-[#c9a84c] text-[#c9a84c]" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#c9a84c] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0a0a0a]">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-[#c9a84c]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#0a0a0a] mb-4">
              Ready to step up your sock game?
            </h2>
            <p className="text-[#0a0a0a]/70 text-lg mb-6">
              Use code <span className="font-bold bg-[#0a0a0a] text-[#c9a84c] px-3 py-1 rounded-lg">RICHY10</span> for 10% off your first order
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform text-lg"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
