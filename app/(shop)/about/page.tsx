import Image from "next/image";
import { Award, Leaf, Shield, Heart } from "lucide-react";

const values = [
  { icon: Award, title: "Quality First", desc: "Every pair is crafted from the finest materials — combed cotton, bamboo, merino wool, and silk blends." },
  { icon: Leaf, title: "Sustainable", desc: "OEKO-TEX certified, BCI cotton sourced, and eco-friendly bamboo fibres in our green collection." },
  { icon: Shield, title: "SA8000 Certified", desc: "Our manufacturing partners adhere to the highest standards of social accountability." },
  { icon: Heart, title: "Made in India", desc: "Proudly designed and manufactured in India, supporting local artisans and communities." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-luxe-bg">
      {/* Hero */}
      <section className="relative h-[350px] bg-luxe-image-bg overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=1400&h=350&fit=crop" alt="About RichySox" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#1A1A1A]/50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-luxe-gold-light mb-3" style={{ fontWeight: 500 }}>Our Story</p>
            <h1 className="font-playfair text-white" style={{ fontWeight: 400, fontSize: "clamp(36px, 4vw, 56px)" }}>
              About <em className="font-playfair italic">RichySox</em>
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[800px] mx-auto px-[4%] py-16">
        <p className="text-body-base text-luxe-text-secondary mb-6" style={{ fontWeight: 300, lineHeight: 1.85 }}>
          Founded in 2023, RichySox was born from a simple belief: everyone deserves socks that feel as luxurious
          as they look. We noticed a gap in the Indian market — premium-quality socks with contemporary design,
          at prices that don&apos;t break the bank.
        </p>
        <p className="text-body-base text-luxe-text-secondary mb-6" style={{ fontWeight: 300, lineHeight: 1.85 }}>
          Today, we&apos;re proud to serve over 50,000 happy customers across India with a range that spans
          everyday essentials to luxury gift collections. Every pair is a testament to our commitment to quality,
          comfort, and style.
        </p>
        <p className="text-body-base text-luxe-text-secondary mb-12" style={{ fontWeight: 300, lineHeight: 1.85 }}>
          Our mission is simple: to elevate the humble sock from an afterthought to a statement piece. Because
          life&apos;s too short for boring socks.
        </p>

        <h2 className="font-playfair text-luxe-text text-center mb-10" style={{ fontWeight: 400, fontSize: "24px" }}>
          Our <em className="font-playfair italic">Values</em>
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-6 border border-luxe-border">
              <Icon className="w-6 h-6 text-luxe-gold mb-3" strokeWidth={1.5} />
              <h3 className="text-[11px] uppercase tracking-[0.15em] text-luxe-text mb-2" style={{ fontWeight: 600 }}>{title}</h3>
              <p className="text-[13px] text-luxe-text-secondary" style={{ fontWeight: 300, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
