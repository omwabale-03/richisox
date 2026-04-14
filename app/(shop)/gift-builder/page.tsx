"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Gift, Package, ShoppingBag } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

const PACK_OPTIONS = [
  { size: 3, price: 749, label: "Pack of 3" },
  { size: 5, price: 1199, label: "Pack of 5" },
  { size: 9, price: 1999, label: "Pack of 9" },
];

const PACKAGING_OPTIONS = [
  { id: "standard", label: "Standard Box", price: 0, desc: "Eco-friendly kraft box with RichySox branding" },
  { id: "premium", label: "Premium Gift Box", price: 99, desc: "Matte-black box with gold foil logo and ribbon" },
  { id: "luxury", label: "Luxury Presentation Box", price: 199, desc: "Wooden box with velvet lining and personalized card" },
];

const steps = ["Pack Size", "Select Socks", "Gift Message", "Packaging", "Review"];

export default function GiftBuilderPage() {
  const [step, setStep] = useState(0);
  const [packSize, setPackSize] = useState(PACK_OPTIONS[0]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [packaging, setPackaging] = useState(PACKAGING_OPTIONS[0]);
  const addGiftBox = useCartStore((s) => s.addGiftBox);

  const toggleProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts((prev) => prev.filter((p) => p !== id));
    } else if (selectedProducts.length < packSize.size) {
      setSelectedProducts((prev) => [...prev, id]);
    } else {
      toast.error(`You can only select ${packSize.size} socks`);
    }
  };

  const handleAddToCart = () => {
    const baseProduct = DEMO_PRODUCTS.find((p) => p.tags.includes("giftbox")) || DEMO_PRODUCTS[0];
    addGiftBox({
      product: baseProduct,
      quantity: 1,
      size: "Free Size",
      color: "Assorted",
      packSize: packSize.size,
      packPrice: packSize.price + packaging.price,
      giftBox: {
        items: selectedProducts,
        message,
        packaging: packaging.id,
        packagingPrice: packaging.price,
      },
    });
    toast.success("Gift box added to cart!");
    window.location.href = "/cart";
  };

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[1000px] mx-auto px-[4%] py-10">
        <div className="text-center mb-8">
          <p className="eyebrow mb-2">Create Your Own</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)" }}>
            Gift Box <em className="font-playfair italic">Builder</em>
          </h1>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center text-[10px] transition-all duration-200 ${
                i < step ? "bg-luxe-gold text-white" : i === step ? "bg-[#1A1A1A] text-white" : "bg-luxe-surface text-luxe-muted border border-luxe-border"
              }`} style={{ fontWeight: 500 }}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`hidden sm:block text-[10px] uppercase tracking-[0.1em] ${i === step ? "text-luxe-text" : "text-luxe-muted"}`} style={{ fontWeight: 500 }}>
                {s}
              </span>
              {i < steps.length - 1 && <div className={`w-8 h-px ${i < step ? "bg-luxe-gold" : "bg-luxe-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step 0: Pack Size */}
        {step === 0 && (
          <div className="max-w-lg mx-auto">
            <h2 className="font-playfair text-[20px] text-luxe-text text-center mb-6" style={{ fontWeight: 400 }}>Choose Your Pack</h2>
            <div className="space-y-3">
              {PACK_OPTIONS.map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => { setPackSize(opt); setSelectedProducts([]); }}
                  className={`w-full flex items-center justify-between p-5 border transition-colors duration-200 ${
                    packSize.size === opt.size ? "border-[#1A1A1A] bg-[#1A1A1A] text-white" : "border-luxe-border bg-white text-luxe-text hover:border-luxe-text"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5" />
                    <span className="text-[13px]" style={{ fontWeight: 500 }}>{opt.label}</span>
                  </div>
                  <span className="text-[14px]" style={{ fontWeight: 500 }}>&#8377;{opt.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Select Socks */}
        {step === 1 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-[20px] text-luxe-text" style={{ fontWeight: 400 }}>
                Select {packSize.size} Socks
              </h2>
              <span className="text-[12px] text-luxe-gold" style={{ fontWeight: 500 }}>
                {selectedProducts.length} / {packSize.size} selected
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-luxe-border">
              {DEMO_PRODUCTS.filter((p) => !p.tags.includes("giftbox")).map((product) => {
                const selected = selectedProducts.includes(product._id);
                return (
                  <button
                    key={product._id}
                    onClick={() => toggleProduct(product._id)}
                    className={`bg-white text-left relative ${selected ? "ring-2 ring-inset ring-[#1A1A1A]" : ""}`}
                  >
                    <div className="relative h-36 bg-luxe-image-bg overflow-hidden">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      {selected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#1A1A1A] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-[12px] text-luxe-text line-clamp-1" style={{ fontWeight: 400 }}>{product.name}</p>
                      <p className="text-[11px] text-luxe-muted capitalize">{product.sockType}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Gift Message */}
        {step === 2 && (
          <div className="max-w-lg mx-auto">
            <h2 className="font-playfair text-[20px] text-luxe-text text-center mb-6" style={{ fontWeight: 400 }}>Add a Gift Message</h2>
            <div className="bg-white border border-luxe-border p-6">
              <textarea
                rows={4}
                maxLength={150}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a personal message (optional)..."
                className="w-full px-4 py-3 border border-luxe-border text-[13px] text-luxe-text bg-white resize-none placeholder:text-luxe-muted"
                style={{ fontWeight: 300, boxShadow: "none" }}
              />
              <p className="text-right text-[10px] text-luxe-muted mt-1">{message.length}/150</p>
            </div>
          </div>
        )}

        {/* Step 3: Packaging */}
        {step === 3 && (
          <div className="max-w-lg mx-auto">
            <h2 className="font-playfair text-[20px] text-luxe-text text-center mb-6" style={{ fontWeight: 400 }}>Choose Packaging</h2>
            <div className="space-y-3">
              {PACKAGING_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPackaging(opt)}
                  className={`w-full text-left p-5 border transition-colors duration-200 ${
                    packaging.id === opt.id ? "border-[#1A1A1A] bg-[#1A1A1A] text-white" : "border-luxe-border bg-white text-luxe-text hover:border-luxe-text"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px]" style={{ fontWeight: 500 }}>{opt.label}</span>
                    <span className="text-[13px]" style={{ fontWeight: 500 }}>
                      {opt.price === 0 ? "Free" : `+₹${opt.price}`}
                    </span>
                  </div>
                  <p className={`text-[11px] ${packaging.id === opt.id ? "text-white/60" : "text-luxe-muted"}`} style={{ fontWeight: 300 }}>
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="max-w-lg mx-auto">
            <h2 className="font-playfair text-[20px] text-luxe-text text-center mb-6" style={{ fontWeight: 400 }}>Review Your Gift Box</h2>
            <div className="bg-white border border-luxe-border p-6 space-y-4">
              <div className="flex justify-between text-[12px]">
                <span className="text-luxe-muted">Pack Size</span>
                <span className="text-luxe-text" style={{ fontWeight: 500 }}>{packSize.label} — &#8377;{packSize.price}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-luxe-muted">Socks Selected</span>
                <span className="text-luxe-text" style={{ fontWeight: 500 }}>{selectedProducts.length} pairs</span>
              </div>
              {message && (
                <div className="flex justify-between text-[12px]">
                  <span className="text-luxe-muted">Gift Message</span>
                  <span className="text-luxe-text max-w-[200px] text-right" style={{ fontWeight: 300 }}>&ldquo;{message}&rdquo;</span>
                </div>
              )}
              <div className="flex justify-between text-[12px]">
                <span className="text-luxe-muted">Packaging</span>
                <span className="text-luxe-text" style={{ fontWeight: 500 }}>{packaging.label} {packaging.price > 0 ? `(+₹${packaging.price})` : "(Free)"}</span>
              </div>
              <div className="border-t border-luxe-border pt-4 flex justify-between">
                <span className="text-[13px] text-luxe-text" style={{ fontWeight: 600 }}>Total</span>
                <span className="text-[18px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{packSize.price + packaging.price}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-6 py-3 border border-luxe-border text-[11px] uppercase tracking-[0.15em] text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200 disabled:opacity-30"
            style={{ fontWeight: 500 }}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          {step < 4 ? (
            <button
              onClick={() => {
                if (step === 1 && selectedProducts.length < packSize.size) {
                  toast.error(`Please select ${packSize.size} socks`);
                  return;
                }
                setStep(step + 1);
              }}
              className="flex items-center gap-2 px-8 py-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.15em] hover:bg-[#333] transition-colors duration-200"
              style={{ fontWeight: 500 }}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-8 py-3 bg-luxe-gold text-white text-[11px] uppercase tracking-[0.15em] hover:bg-luxe-gold-light transition-colors duration-200"
              style={{ fontWeight: 500 }}
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
