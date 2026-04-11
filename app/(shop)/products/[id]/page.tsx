"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, ShoppingBag, Zap, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus } from "lucide-react";
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
    { name: "Gold", hex: "#c9a84c" },
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
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-brand-brown-light/60 mb-8">
          <Link href="/" className="hover:text-brand-gold">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-brand-gold">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-brand-brown font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative h-96 lg:h-[500px] bg-brand-cream-light rounded-3xl overflow-hidden mb-4 border border-brand-cream-dark">
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
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i ? "border-brand-gold" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="inline-block px-3 py-1 bg-brand-gold/10 text-brand-gold text-sm rounded-full capitalize mb-3">
              {product.category} &middot; {product.type}
            </span>
            <h1 className="text-3xl font-playfair font-bold text-brand-brown mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-brand-cream-dark"}`} />
                ))}
              </div>
              <span className="text-sm text-brand-brown-light/60">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-brand-brown">₹{product.price}</span>
              {product.comparePrice && (
                <>
                  <span className="text-xl text-brand-cream-dark line-through">₹{product.comparePrice}</span>
                  <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-0.5 rounded-full">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-brand-brown-light leading-relaxed mb-6">{product.description}</p>

            {/* Color Picker */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-brand-brown mb-3">
                Color: <span className="font-normal text-brand-brown-light/60">{selectedColor.name}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selectedColor.hex === color.hex ? "border-brand-gold scale-110" : "border-transparent scale-100"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Picker */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-brand-brown mb-3">Size</p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-full text-sm font-medium border-[1.5px] transition-all ${
                      selectedSize === size
                        ? "bg-brand-brown text-brand-cream-light border-brand-brown"
                        : "border-brand-cream-dark text-brand-brown hover:border-brand-brown"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-semibold text-brand-brown">Quantity</p>
              <div className="flex items-center gap-3 bg-brand-cream-light rounded-full border border-brand-cream-dark px-4 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-brand-gold">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="hover:text-brand-gold">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full border-[1.5px] border-brand-gold text-brand-brown font-semibold hover:bg-brand-gold/10 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full bg-brand-gold text-white font-semibold hover:bg-brand-gold-hover transition-all"
              >
                <Zap className="w-5 h-5" />
                Buy Now
              </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-2 gap-3">
              {perks.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-brand-brown-light">
                  <Icon className="w-4 h-4 text-brand-gold" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
