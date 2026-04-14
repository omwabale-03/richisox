"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { IProductColor } from "@/types";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  colors?: IProductColor[];
  onColorImageChange?: (imageUrl: string) => void;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div>
      {/* Main Image with Zoom */}
      <div
        ref={imageRef}
        className="relative h-96 lg:h-[540px] bg-luxe-image-bg overflow-hidden mb-4 border border-luxe-border cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[activeIndex]}
          alt={productName}
          fill
          className="object-cover transition-transform duration-200"
          style={{
            transform: isZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative w-[72px] h-[72px] overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
              activeIndex === i ? "border-luxe-text" : "border-luxe-border hover:border-luxe-border-emphasis"
            }`}
          >
            <Image src={img} alt={`${productName} view ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
