import { Navbar } from "./_components/Navbar";
import { Hero } from "./_components/Hero";
import { MarqueeBand } from "./_components/MarqueeBand";
import { StatementLine } from "./_components/StatementLine";
import { HowItWorks } from "./_components/HowItWorks";
import { FeatureCards } from "./_components/FeatureCards";
import { Benefits } from "./_components/Benefits";

import { FAQ } from "./_components/FAQ";
import { CtaBand } from "./_components/CtaBand";
import { Footer } from "./_components/Footer";
import { Reveal } from "./_components/Reveal";

export default function LandingPage() {
  return (
    <>
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero */}
      <Reveal><Hero /></Reveal>

      {/* 3. Marquee strip */}
      <Reveal><MarqueeBand /></Reveal>

      {/* 4. Bold statement line */}
      <Reveal><StatementLine /></Reveal>

      {/* 5. How It Works */}
      <Reveal><HowItWorks /></Reveal>

      {/* 6. Feature cards */}
      <Reveal><FeatureCards /></Reveal>

      {/* 7. Comparison */}
      <Reveal><Benefits /></Reveal>

      {/* 9. FAQ */}
      <Reveal><FAQ /></Reveal>

      {/* 10. Dark closing CTA */}
      <Reveal><CtaBand /></Reveal>

      {/* 11. Footer */}
      <Footer />
    </>
  );
}
