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

export default function LandingPage() {
  return (
    <>
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero */}
      <Hero />

      {/* 3. Marquee strip */}
      <MarqueeBand />

      {/* 4. Bold statement line */}
      <StatementLine />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Feature cards */}
      <FeatureCards />

      {/* 7. Comparison */}
      <Benefits />

      
      

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. Dark closing CTA */}
      <CtaBand />

      {/* 11. Footer */}
      <Footer />
    </>
  );
}
