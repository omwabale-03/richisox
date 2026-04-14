import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const articles: Record<string, { title: string; category: string; date: string; content: string[] }> = {
  "sock-care-guide": {
    title: "The Ultimate Sock Care Guide",
    category: "Care Tips",
    date: "March 15, 2025",
    content: [
      "Your premium socks deserve the same care as the rest of your wardrobe. With the right washing and storage techniques, you can keep them looking and feeling brand new for years.",
      "For cotton and bamboo socks, machine wash on a cold or warm cycle with similar colours. Turn them inside out before washing to protect the outer surface. Avoid using bleach or fabric softener, as these can break down the fibres over time.",
      "Merino wool and cashmere socks require more gentle treatment. Hand wash in cold water with a mild detergent, then gently press out excess water without wringing. Lay flat to dry — never tumble dry wool products.",
      "For silk-blend socks, hand washing is always recommended. Use lukewarm water and a gentle soap. Air dry away from direct sunlight to prevent colour fading.",
      "Storage tip: Always fold your socks rather than balling them up. Balling stretches the elastic at the cuff. Store in a cool, dry drawer and consider adding a cedar block to keep them fresh between wears.",
    ],
  },
  "styling-socks-with-formal-wear": {
    title: "How to Style Socks with Formal Wear",
    category: "Style Guide",
    date: "February 28, 2025",
    content: [
      "The right pair of socks can elevate a formal outfit from good to exceptional. Here's our guide to mastering the art of sock styling for every formal occasion.",
      "Rule #1: Match your socks to your trousers, not your shoes. This creates a seamless line from trouser to shoe, elongating your silhouette. For a navy suit, choose navy or dark blue socks.",
      "Rule #2: For black-tie events, always go with solid black over-the-calf socks. These stay up all evening and maintain a polished look whether you're standing or sitting.",
      "Rule #3: In business settings, subtle patterns like fine ribbing or micro-dots add personality without being distracting. Our Formal Merino Wool collection is designed specifically for this purpose.",
      "Rule #4: When you want to make a statement, festive occasions allow for bolder choices. Our Silk Blend Festive collection features rich colours like burgundy, teal, and gold that complement traditional Indian formal wear beautifully.",
    ],
  },
  "perfect-gift-box": {
    title: "Why Socks Make the Perfect Gift",
    category: "Gifting",
    date: "January 10, 2025",
    content: [
      "In a world of predictable gifts, a curated box of premium socks is a refreshingly thoughtful choice. Here's why our Gift Box collection has become the go-to present for every occasion.",
      "Socks are universal — everyone wears them, every day. Unlike clothes that might not fit or accessories that might not match someone's style, quality socks are always appreciated.",
      "Our Gift Box collection takes this a step further. Each box is a curated experience: 5 or 9 pairs carefully selected to complement each other, presented in our signature matte-black box with gold foil branding.",
      "For weddings, Diwali, birthdays, or corporate gifting, our gift boxes offer a price range from ₹1,499 to ₹2,499 — making them accessible yet premium enough to impress.",
      "Want something truly personal? Our Gift Builder lets you handpick individual pairs, add a custom message, and choose your packaging. It's gift-giving, elevated.",
    ],
  },
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15: params is async, but for static rendering with demo data we handle it directly
  const slug = "sock-care-guide"; // fallback
  const article = articles[slug] || articles["sock-care-guide"];

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[700px] mx-auto px-[4%] py-16">
        <Link href="/blog" className="flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-luxe-muted hover:text-luxe-text transition-colors duration-200 mb-8" style={{ fontWeight: 500 }}>
          <ChevronLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <span className="text-[9px] uppercase tracking-[0.2em] text-luxe-gold" style={{ fontWeight: 500 }}>{article.category}</span>
        <h1 className="font-playfair text-luxe-text mt-2 mb-3" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)" }}>
          {article.title}
        </h1>
        <p className="text-[12px] text-luxe-muted mb-10">{article.date}</p>

        <div className="space-y-5">
          {article.content.map((para, i) => (
            <p key={i} className="text-body-base text-luxe-text-secondary" style={{ fontWeight: 300, lineHeight: 1.85 }}>
              {para}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-luxe-border text-center">
          <Link
            href="/products"
            className="inline-block bg-[#1A1A1A] text-white px-[44px] py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors duration-200"
            style={{ fontWeight: 500 }}
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
