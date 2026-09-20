import type { Metadata } from "next";
import "./globals.css";
import "./case.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LiquidEngine } from "@/components/LiquidEngine";
import { Choreography } from "@/components/Choreography";
import { WebflowV31Bridge } from "@/components/WebflowV31Bridge";
import { FinalExperience } from "@/components/FinalExperience";

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
    <html lang="en" className="antialiased terrane-v31">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="stylesheet" href="/terrane-webflow.css?v=native-v31" />
        <link rel="stylesheet" href="/terrane-frontend-v2.css?v=native-v31" />
        <link rel="stylesheet" href="/terrane-v31-polish.css?v=native-v31" />
        <link rel="stylesheet" href="/terrane-final-v4.css?v=final-v4" />
      </head>
      <body className="terrane-v2 min-h-dvh bg-bone font-sans text-ink">
        <LiquidEngine />
        <Choreography />
        <WebflowV31Bridge />
        <FinalExperience />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
