import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LiquidEngine } from "@/components/LiquidEngine";
import { Choreography } from "@/components/Choreography";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://terrane-lake.vercel.app"),
  title: {
    default: "TERRANE — Architecture of ground, light, and duration.",
    template: "%s — TERRANE",
  },
  description:
    "Terrane is an architecture studio in Tashkent. Houses, interiors, and landscapes as one material condition.",
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "TERRANE",
    description: "Houses, interiors, and landscapes of lasting proportion.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} antialiased`}>
      <body className="min-h-dvh bg-bone font-sans text-ink">
        <LiquidEngine />
        <Choreography />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
