import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RichySox — Premium Socks for Men, Women & Kids",
  description:
    "Shop premium socks with luxury comfort and bold designs. Free shipping on orders ₹499+. 100+ designs, easy returns.",
  keywords: ["socks", "premium socks", "luxury socks", "men socks", "women socks", "kids socks", "India"],
  openGraph: {
    title: "RichySox — Step into Luxury Comfort",
    description: "Premium socks for every occasion. Shop now.",
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
              background: "#0a0a0a",
              color: "#fafaf7",
              fontFamily: "var(--font-dm-sans)",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
