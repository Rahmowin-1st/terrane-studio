import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LightExperience } from "@/components/LightExperience";

export const metadata: Metadata = {
  metadataBase: new URL("https://terrane-studio.vercel.app"),
  title: {
    default: "TERRANE — Architecture of ground, light, and duration.",
    template: "%s — TERRANE",
  },
  description: "Terrane is a portfolio architecture concept for houses, interiors, landscapes and reuse in Central Asia.",
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "TERRANE",
    description: "Architecture of ground, light, and duration — a production portfolio study.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="stylesheet" href="/terrane-v5-light.css?v=v5-final-light-2" />
      </head>
      <body className="min-h-dvh bg-bone font-sans text-ink">
        <LightExperience />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
