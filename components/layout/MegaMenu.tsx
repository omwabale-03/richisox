"use client";

import Image from "next/image";
import Link from "next/link";
import { MegaMenuTab } from "@/data/navMenuData";

interface MegaMenuProps {
  data: MegaMenuTab;
  onLinkClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({ data, onLinkClick, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 w-screen bg-white z-[200]"
      style={{
        borderTop: "2px solid #C9A84C",
        boxShadow: "0 8px 32px rgba(26,21,8,0.10)",
      }}
    >
      <div
        className="max-w-[1400px] mx-auto px-[4%]"
        style={{ padding: "40px 4% 36px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 280px 280px",
            gap: "32px",
          }}
        >
          {/* Text Columns */}
          {data.columns.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  fontWeight: 700,
                  marginBottom: "18px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                {col.heading}
              </p>
              <div className="flex flex-col">
                {col.links.map((link) => (
                  <Link
                    key={link.label + link.href}
                    href={link.href}
                    onClick={onLinkClick}
                    className="mega-menu-link"
                    style={{
                      fontSize: "13px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#1A1508",
                      fontWeight: link.bold ? 700 : 400,
                      lineHeight: "2.4",
                      transition: "color 0.2s",
                      display: "block",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Featured Cards */}
          {data.featuredCards.map((card) => (
            <Link
              key={card.href + card.topLabel}
              href={card.href}
              onClick={onLinkClick}
              className="relative overflow-hidden group block"
              style={{ height: "320px" }}
            >
              <Image
                src={card.image}
                alt={card.bottomLabel}
                fill
                className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-500"
                style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                sizes="280px"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              {/* Top label */}
              <span
                className="absolute"
                style={{
                  top: "16px",
                  left: "16px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  maxWidth: "140px",
                  lineHeight: 1.2,
                }}
              >
                {card.topLabel}
              </span>
              {/* Bottom label */}
              <span
                className="absolute"
                style={{
                  bottom: "56px",
                  left: "16px",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.75)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {card.bottomLabel}
              </span>
              {/* SHOP NOW button */}
              <span
                className="absolute"
                style={{
                  bottom: "16px",
                  left: "16px",
                  background: "#C9A84C",
                  color: "#1A1508",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  padding: "9px 18px",
                  display: "inline-block",
                }}
              >
                Shop Now
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
