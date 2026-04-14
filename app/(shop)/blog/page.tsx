import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    slug: "sock-care-guide",
    title: "The Ultimate Sock Care Guide",
    excerpt: "Keep your premium socks looking and feeling brand new with these essential care tips for every material.",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=400&fit=crop",
    date: "March 15, 2025",
    category: "Care Tips",
  },
  {
    slug: "styling-socks-with-formal-wear",
    title: "How to Style Socks with Formal Wear",
    excerpt: "From boardroom meetings to black-tie events, discover the art of pairing socks with formal outfits.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=400&fit=crop",
    date: "February 28, 2025",
    category: "Style Guide",
  },
  {
    slug: "perfect-gift-box",
    title: "Why Socks Make the Perfect Gift",
    excerpt: "Thoughtful, practical, and luxurious — here's why a curated sock gift box is the ultimate present.",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=400&fit=crop",
    date: "January 10, 2025",
    category: "Gifting",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%] py-16">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">The Journal</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 40px)" }}>
            Our <em className="font-playfair italic">Blog</em>
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group bg-white border border-luxe-border overflow-hidden">
              <div className="relative h-52 bg-luxe-image-bg overflow-hidden">
                <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }} />
                <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[8px] uppercase tracking-[0.15em] px-2.5 py-1" style={{ fontWeight: 500 }}>{article.category}</span>
              </div>
              <div className="p-5">
                <p className="text-[10px] text-luxe-muted mb-2">{article.date}</p>
                <h2 className="font-playfair text-[18px] text-luxe-text mb-2 group-hover:text-luxe-gold transition-colors duration-200" style={{ fontWeight: 400 }}>{article.title}</h2>
                <p className="text-[12px] text-luxe-text-secondary line-clamp-2" style={{ fontWeight: 300, lineHeight: 1.7 }}>{article.excerpt}</p>
                <span className="inline-block mt-4 text-[10px] uppercase tracking-[0.15em] text-luxe-gold border-b border-luxe-gold/40 pb-0.5" style={{ fontWeight: 500 }}>Read More</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
