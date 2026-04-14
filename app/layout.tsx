import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "RichySox — Premium Luxury Socks",
  description:
    "Elevate your feet with timeless luxury socks. Curated collection of premium high-quality socks for those who demand sophisticated style without compromising on artisanal comfort.",
  keywords: ["socks", "premium socks", "luxury socks", "men socks", "women socks", "kids socks", "India"],
  openGraph: {
    title: "RichySox — Elevate Your Feet With Timeless Luxury",
    description: "Premium socks crafted for sophisticated style and artisanal comfort.",
    siteName: "RichySox",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1A1A1A",
              color: "#FFFFFF",
              fontFamily: "var(--font-dm-sans)",
              borderRadius: "0px",
              border: "1px solid #D8D3CC",
              fontSize: "13px",
              fontWeight: 400,
            },
          }}
        />
      </body>
    </html>
  );
}
