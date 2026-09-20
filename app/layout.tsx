import type { Metadata } from "next";
import "./globals.css";
import "./final.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LightExperience } from "@/components/LightExperience";

export const metadata: Metadata = {
  metadataBase: new URL("https://terrane-studio.vercel.app"),
  title: {
    default: "TERRANE — Ground, light and material.",
    template: "%s — TERRANE",
  },
  description: "Architecture for houses, interiors, landscapes and reuse across Central Asia.",
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "TERRANE",
    description: "Architecture shaped by climate, proportion and material.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no" className="antialiased terrane-final notranslate">
      <head>
        <meta name="robots" content="notranslate" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body translate="no" className="notranslate min-h-dvh bg-bone font-sans text-ink">
        <LightExperience />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
