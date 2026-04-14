"use client";

import { useState } from "react";
import { IProduct, IReview } from "@/types";

interface ProductTabsProps {
  product: IProduct;
}

const tabs = ["Description", "Material & Care", "Size Guide", "Reviews"];

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-16">
      {/* Tab Headers */}
      <div className="flex border-b border-luxe-border">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-3.5 text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 border-b-2 -mb-px ${
              activeTab === i
                ? "text-luxe-text border-luxe-text"
                : "text-luxe-muted border-transparent hover:text-luxe-text-secondary"
            }`}
            style={{ fontWeight: 500 }}
          >
            {tab}
            {i === 3 && product.reviewCount > 0 && (
              <span className="ml-1.5 text-[9px] text-luxe-muted">({product.reviewCount})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {/* Description */}
        {activeTab === 0 && (
          <div className="max-w-[700px]">
            <p className="text-body-base text-luxe-text-secondary leading-relaxed" style={{ fontWeight: 300, lineHeight: 1.85 }}>
              {product.description}
            </p>
            {product.technologies && product.technologies.length > 0 && (
              <div className="mt-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
                  Key Features
                </p>
                <ul className="space-y-2">
                  {product.technologies.map((tech) => (
                    <li key={tech} className="flex items-center gap-2 text-[13px] text-luxe-text-secondary" style={{ fontWeight: 300 }}>
                      <span className="w-1 h-1 bg-luxe-gold rounded-full flex-shrink-0" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Material & Care */}
        {activeTab === 1 && (
          <div className="max-w-[700px]">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
                  Material Composition
                </p>
                <table className="w-full text-[12px]">
                  <tbody>
                    <tr className="border-b border-luxe-border">
                      <td className="py-2 text-luxe-muted">Primary Material</td>
                      <td className="py-2 text-luxe-text capitalize" style={{ fontWeight: 500 }}>{product.material}</td>
                    </tr>
                    <tr className="border-b border-luxe-border">
                      <td className="py-2 text-luxe-muted">Sock Type</td>
                      <td className="py-2 text-luxe-text capitalize" style={{ fontWeight: 500 }}>{product.sockType}</td>
                    </tr>
                    <tr className="border-b border-luxe-border">
                      <td className="py-2 text-luxe-muted">Category</td>
                      <td className="py-2 text-luxe-text capitalize" style={{ fontWeight: 500 }}>{product.category}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
                  Care Instructions
                </p>
                <p className="text-[13px] text-luxe-text-secondary leading-relaxed" style={{ fontWeight: 300, lineHeight: 1.85 }}>
                  {product.materialCare || "Machine wash cold. Tumble dry low. Do not bleach. Do not iron directly on print."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Size Guide */}
        {activeTab === 2 && (
          <div className="max-w-[700px]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-muted mb-4" style={{ fontWeight: 500 }}>
              Available Sizes for This Product
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.sizes.map((size) => (
                <span key={size} className="px-4 py-2 border border-luxe-border text-[11px] uppercase tracking-[0.1em] text-luxe-text" style={{ fontWeight: 500 }}>
                  {size}
                </span>
              ))}
            </div>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-luxe-border">
                  <th className="text-left py-2.5 text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Size</th>
                  <th className="text-left py-2.5 text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>UK</th>
                  <th className="text-left py-2.5 text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>US</th>
                  <th className="text-left py-2.5 text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>EU</th>
                  <th className="text-left py-2.5 text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>Foot Length</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: "S (5-8)", uk: "5-8", us: "6-9", eu: "38-41", cm: "24-26 cm" },
                  { size: "M (6-9)", uk: "6-9", us: "7-10", eu: "39-42", cm: "25-27 cm" },
                  { size: "L (7-10)", uk: "7-10", us: "8-11", eu: "40-44", cm: "26-29 cm" },
                  { size: "XL (8-11)", uk: "8-11", us: "9-12", eu: "42-46", cm: "28-30 cm" },
                  { size: "Free Size", uk: "6-10", us: "7-11", eu: "39-44", cm: "25-29 cm" },
                ].map((row) => (
                  <tr key={row.size} className="border-b border-luxe-border">
                    <td className="py-2.5 text-luxe-text" style={{ fontWeight: 500 }}>{row.size}</td>
                    <td className="py-2.5 text-luxe-text-secondary">{row.uk}</td>
                    <td className="py-2.5 text-luxe-text-secondary">{row.us}</td>
                    <td className="py-2.5 text-luxe-text-secondary">{row.eu}</td>
                    <td className="py-2.5 text-luxe-text-secondary">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reviews */}
        {activeTab === 3 && (
          <div className="max-w-[700px]">
            {/* Rating Summary */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-luxe-border">
              <div className="text-center">
                <p className="text-[32px] text-luxe-text" style={{ fontWeight: 500 }}>{product.rating}</p>
                <div className="flex items-center gap-0.5 justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-[10px] h-[10px]"
                      style={{
                        clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                        background: i < Math.floor(product.rating) ? "#A8874A" : "#E8E4DF",
                      }}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-luxe-muted">{product.reviewCount} reviews</p>
              </div>
            </div>

            {/* Review List */}
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, i) => (
                  <div key={i} className="pb-6 border-b border-luxe-border last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <div
                            key={j}
                            className="w-[10px] h-[10px]"
                            style={{
                              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                              background: j < review.rating ? "#A8874A" : "#E8E4DF",
                            }}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="text-[8px] uppercase tracking-[0.15em] text-green-700 bg-green-50 px-1.5 py-0.5" style={{ fontWeight: 500 }}>
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-luxe-text-secondary mb-2" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-luxe-text" style={{ fontWeight: 500 }}>{review.user}</span>
                      <span className="text-[10px] text-luxe-muted">
                        {new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-luxe-muted" style={{ fontWeight: 300 }}>No reviews yet. Be the first to review!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
