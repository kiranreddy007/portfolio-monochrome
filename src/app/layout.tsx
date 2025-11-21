import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Full Stack Developer Portfolio",
  description: "Portfolio of an experienced Full Stack Developer specializing in Next.js, AWS, and ML.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import AnimationProvider from '@/components/AnimationProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className={inter.className}>
        <AnimationProvider>
          <div className="texture-overlay" />
          <Header />
          <main>{children}</main>
          <Footer />
        </AnimationProvider>
      </body>
    </html>
  );
}
