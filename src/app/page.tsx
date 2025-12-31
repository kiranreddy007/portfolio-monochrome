'use client';

import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { useAutoSnapScroll } from "@/hooks/useAutoSnapScroll";

export default function Home() {
  // Enable auto-snap scrolling when sections become 20% visible
  useAutoSnapScroll();

  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
