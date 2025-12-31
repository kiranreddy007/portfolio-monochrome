import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import AnimationProvider from "@/components/AnimationProvider";


// Premium, clean typography
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kiran Ragi | Full Stack Developer",
  description: "Full Stack Developer specializing in scalable web applications and machine learning solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="texture-overlay" />
        <Header />
        <AnimationProvider>

          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
