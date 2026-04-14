import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        luxe: {
          bg: "#FAFAFA",
          surface: "#F4F2EF",
          card: "#FFFFFF",
          text: "#1A1A1A",
          "text-secondary": "#5A5550",
          muted: "#9A9590",
          border: "#E8E4DF",
          "border-emphasis": "#D8D3CC",
          gold: "#A8874A",
          "gold-light": "#C9A96E",
          sale: "#B85450",
          "image-bg": "#EDE8E0",
        },
        background: "#FAFAFA",
        foreground: "#1A1A1A",
        primary: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F4F2EF",
          foreground: "#1A1A1A",
        },
        muted: {
          DEFAULT: "#F4F2EF",
          foreground: "#9A9590",
        },
        accent: {
          DEFAULT: "#A8874A",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#B85450",
          foreground: "#FFFFFF",
        },
        border: "#E8E4DF",
        input: "#E8E4DF",
        ring: "#A8874A",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
      fontSize: {
        eyebrow: ["10px", { letterSpacing: "0.3em", lineHeight: "1.4" }],
        "eyebrow-lg": ["11px", { letterSpacing: "0.3em", lineHeight: "1.4" }],
        "nav-link": ["11px", { letterSpacing: "0.12em", lineHeight: "1.4" }],
        "body-sm": ["13px", { lineHeight: "1.85" }],
        "body-base": ["14px", { lineHeight: "1.85" }],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        shimmer: "shimmer 2s infinite linear",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
