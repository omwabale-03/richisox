"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqSections = [
  {
    title: "Ordering",
    items: [
      { q: "How do I place an order?", a: "Browse our collection, select your preferred socks, choose your size and pack, then click 'Add to Cart'. Proceed to checkout, enter your delivery details, and complete payment via Razorpay." },
      { q: "Can I modify my order after placing it?", a: "Orders can be modified within 1 hour of placement. Contact us at hello@richysox.com or call +91 98765 43210." },
      { q: "What payment methods do you accept?", a: "We accept UPI, Debit/Credit Cards, Net Banking, Wallets (Paytm, PhonePe), and Cash on Delivery (COD) via Razorpay." },
    ],
  },
  {
    title: "Shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery takes 3-7 business days depending on your location. Metro cities usually receive orders within 3-4 days." },
      { q: "Is shipping free?", a: "Yes! Shipping is free on all orders above ₹499. For orders below ₹499, a flat ₹49 shipping fee applies." },
      { q: "Do you deliver across India?", a: "Yes, we deliver to all pin codes across India through our logistics partners Delhivery and Blue Dart." },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy. If you're not satisfied with your purchase, initiate a return from your account within 7 days of delivery." },
      { q: "How do exchanges work?", a: "For size exchanges, initiate from your account. We'll pick up the original pair and ship the new size at no extra cost." },
      { q: "When will I get my refund?", a: "Refunds are processed within 5-7 business days after we receive the returned product. The amount is credited to your original payment method." },
    ],
  },
  {
    title: "Products",
    items: [
      { q: "What materials do you use?", a: "We use premium materials including combed cotton, bamboo fibre, merino wool, modal, silk blends, and cashmere. All materials are OEKO-TEX certified." },
      { q: "What does 'Silver Frost Anti-Odour' mean?", a: "Silver Frost is our proprietary anti-odour technology that uses silver ion-infused fibres to prevent bacterial growth, keeping your socks fresh for longer." },
      { q: "How should I care for my socks?", a: "Machine wash cold with similar colours. Tumble dry on low heat. Avoid bleach. For delicate materials like cashmere and silk blends, hand wash is recommended." },
      { q: "Do you offer gift packaging?", a: "Yes! Our Gift Box collection comes in premium matte-black boxes with gold foil branding. You can also build your own custom gift box at /gift-builder." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[800px] mx-auto px-[4%] py-16">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Help Centre</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 40px)" }}>
            Frequently Asked <em className="font-playfair italic">Questions</em>
          </h1>
        </div>

        {faqSections.map((section) => (
          <div key={section.title} className="mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-gold mb-4" style={{ fontWeight: 600 }}>
              {section.title}
            </h2>
            <Accordion type="single" collapsible className="bg-white border border-luxe-border">
              {section.items.map((item, i) => (
                <AccordionItem key={i} value={`${section.title}-${i}`} className="px-6">
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
