"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShoppingBag, Zap, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { getProductById, getRelatedProducts, DEMO_PRODUCTS } from "@/lib/demo-products";
import { IProductColor, IPackOption } from "@/types";

import { ImageGallery } from "@/components/product/ImageGallery";
import { PackSelector } from "@/components/product/PackSelector";
import { SizeSelector } from "@/components/product/SizeSelector";
import { ColourSwatches } from "@/components/product/ColourSwatches";
import { TechBadges } from "@/components/product/TechBadges";
import { PincodeChecker } from "@/components/product/PincodeChecker";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";

const perks = [
  { icon: Truck, label: "Free Shipping ₹499+" },
  { icon: RotateCcw, label: "7-Day Returns" },
  { icon: Shield, label: "Secure Checkout" },
  { icon: Zap, label: "Ships in 24-48hrs" },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const addItem = useCartStore((s) => s.addItem);

  const product = getProductById(id as string) || DEMO_PRODUCTS[0];
  const relatedProducts = getRelatedProducts(product);

  const [selectedColor, setSelectedColor] = useState<IProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [selectedPack, setSelectedPack] = useState<IPackOption>(
    product.packOptions?.[0] || { label: "Single", size: 1, price: product.price }
  );
  const [quantity, setQuantity] = useState(1);

  // Track recently viewed
  useEffect(() => {
    try {
      const key = "richysox-recently-viewed";
      const stored = JSON.parse(localStorage.getItem(key) || "[]") as string[];
      const updated = [product._id, ...stored.filter((pid: string) => pid !== product._id)].slice(0, 10);
      localStorage.setItem(key, JSON.stringify(updated));
    } catch {}
  }, [product._id]);

  const displayPrice = selectedPack.price;
  const mrp = product.mrp || product.comparePrice;
  const mrpForPack = mrp ? mrp * selectedPack.size : undefined;
  const discount = mrpForPack && mrpForPack > displayPrice
    ? Math.round(((mrpForPack - displayPrice) / mrpForPack) * 100)
    : product.discount || 0;

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor.name, quantity);
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, selectedColor.name, quantity);
    window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[1400px] mx-auto px-[4%] py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-luxe-muted mb-8" style={{ fontWeight: 500 }}>
          <Link href="/" className="hover:text-luxe-text transition-colors duration-200">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-luxe-text transition-colors duration-200">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/products?category=${product.category}`} className="hover:text-luxe-text transition-colors duration-200 capitalize">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-luxe-text truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div>
            {/* Brand */}
            <p className="text-[9px] uppercase tracking-[0.25em] text-luxe-gold mb-2" style={{ fontWeight: 500 }}>
              RichySox
            </p>

            {/* Name */}
            <h1 className="font-playfair text-luxe-text mb-3" style={{ fontWeight: 400, fontSize: "clamp(24px, 2.5vw, 34px)" }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
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
              <span className="text-[10px] text-luxe-gold border-b border-luxe-gold/40 cursor-pointer hover:border-luxe-gold transition-colors duration-200" style={{ fontWeight: 500 }}>
                Write a Review
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[28px] text-luxe-text" style={{ fontWeight: 500 }}>
                &#8377;{displayPrice}
              </span>
              {mrpForPack && mrpForPack > displayPrice && (
                <>
                  <span className="text-[16px] text-luxe-muted line-through">&#8377;{mrpForPack}</span>
                  <span className="text-[13px] text-luxe-sale" style={{ fontWeight: 500 }}>
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            {/* Technology Badges */}
            <TechBadges technologies={product.technologies} />

            {/* Description */}
            <p className="text-body-sm text-luxe-text-secondary mb-6" style={{ fontWeight: 300, lineHeight: 1.85 }}>
              {product.description}
            </p>

            {/* Pack Selector */}
            <PackSelector
              packOptions={product.packOptions}
              selectedPack={selectedPack}
              onPackChange={setSelectedPack}
            />

            {/* Colour Swatches */}
            <ColourSwatches
              colors={product.colors}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />

            {/* Size Selector with Size Guide */}
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

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

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
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

            {/* Pincode Checker */}
            <PincodeChecker />

            {/* Trust Perks */}
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

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
