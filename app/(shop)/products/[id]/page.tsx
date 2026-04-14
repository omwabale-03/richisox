"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShoppingBag, Zap, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { IProduct } from "@/types";

const DEMO_PRODUCT: IProduct = {
  _id: "1",
  name: "Luxury Crew Socks",
  description:
    "Experience the pinnacle of comfort with our Luxury Crew Socks. Made from 100% premium combed cotton, these socks feature reinforced heel and toe for extra durability. The mid-calf length provides excellent coverage while the elastic arch support keeps them perfectly in place all day.",
  price: 299,
  comparePrice: 499,
  category: "men",
  type: "crew",
  sizes: ["S", "M", "L", "XL"],
  colors: [
    { name: "Midnight Black", hex: "#000000" },
    { name: "Navy Blue", hex: "#1a237e" },
    { name: "Charcoal", hex: "#424242" },
    { name: "Gold", hex: "#A8874A" },
  ],
  images: [
    "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=600&fit=crop",
  ],
  stock: 50,
  sku: "RS-001",
  tags: ["premium", "crew", "cotton"],
  isActive: true,
  isFeatured: true,
  rating: 4.8,
  reviewCount: 124,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const perks = [
  { icon: Truck, label: "Free Shipping ₹499+" },
  { icon: RotateCcw, label: "7-Day Returns" },
  { icon: Shield, label: "Secure Checkout" },
  { icon: Zap, label: "Ships in 24-48hrs" },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const addItem = useCartStore((s) => s.addItem);

  const product = DEMO_PRODUCT;
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor.name);
    }
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, selectedColor.name, quantity);
    window.location.href = "/checkout";
  };

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%] py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-luxe-muted mb-8" style={{ fontWeight: 500 }}>
          <Link href="/" className="hover:text-luxe-text transition-colors duration-200">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-luxe-text transition-colors duration-200">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-luxe-text">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative h-96 lg:h-[500px] bg-luxe-image-bg overflow-hidden mb-4 border border-luxe-border">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-20 overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i ? "border-luxe-text" : "border-luxe-border"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-luxe-gold mb-3" style={{ fontWeight: 500 }}>
              {product.category} &middot; {product.type}
            </p>
            <h1 className="font-playfair text-luxe-text mb-3" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)" }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[12px] h-[12px]"
                    style={{
                      clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                      background: i < Math.floor(product.rating) ? "#A8874A" : "#E8E4DF",
                    }}
                  />
                ))}
              </div>
              <span className="text-[12px] text-luxe-muted">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-[28px] text-luxe-text" style={{ fontWeight: 500 }}>
                &#8377;{product.price}
              </span>
              {product.comparePrice && (
                <>
                  <span className="text-[18px] text-luxe-muted line-through">&#8377;{product.comparePrice}</span>
                  <span className="text-[13px] text-luxe-sale" style={{ fontWeight: 500 }}>
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            <p className="text-body-base text-luxe-text-secondary mb-6" style={{ fontWeight: 300, lineHeight: 1.85 }}>
              {product.description}
            </p>

            {/* Color Picker */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
                Color: <span className="text-luxe-muted" style={{ fontWeight: 400 }}>{selectedColor.name}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className="w-[14px] h-[14px] rounded-full border border-luxe-border transition-all duration-200"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: selectedColor.hex === color.hex
                        ? "0 0 0 2px white, 0 0 0 3px #1A1A1A"
                        : "none",
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Picker */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
                Size
              </p>
              <div className="flex gap-0">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] border border-luxe-border -ml-px first:ml-0 transition-colors duration-200 ${
                      selectedSize === size
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "bg-white text-luxe-text-secondary hover:text-luxe-text"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text" style={{ fontWeight: 600 }}>
                Quantity
              </p>
              <div className="flex items-center border border-luxe-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-[14px]" style={{ fontWeight: 500 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-luxe-text-secondary hover:text-luxe-text transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 border border-luxe-border-emphasis text-luxe-text text-[11px] uppercase tracking-[0.2em] hover:border-luxe-text transition-colors duration-200"
                style={{ fontWeight: 500 }}
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#333] transition-colors duration-200"
                style={{ fontWeight: 500 }}
              >
                <Zap className="w-4 h-4" />
                Buy Now
              </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-luxe-border">
              {perks.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-luxe-gold" strokeWidth={1.5} />
                  <span className="text-[11px] text-luxe-text-secondary" style={{ fontWeight: 400 }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
