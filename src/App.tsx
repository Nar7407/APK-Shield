"use client";

import React from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { LiveScannerDemo } from "./components/LiveScannerDemo";
import { DownloadSection } from "./components/DownloadSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";

export function App() {
  const handleDownloadClick = () => {
    const el = document.querySelector("#download");
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white selection:bg-blue-500/30 selection:text-blue-200 font-sans antialiased">
      {/* Top Navbar */}
      <Navbar onDownloadClick={handleDownloadClick} />

      {/* Main Single-Page Scrolling Product Site */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. The Problem Section */}
        <ProblemSection />

        {/* 3. How It Works Section */}
        <HowItWorksSection />

        {/* 4. Features Section */}
        <FeaturesSection />

        {/* 5. Live Interactive Scanner Demo */}
        <LiveScannerDemo />

        {/* 6. Dedicated Download Section */}
        <DownloadSection />

        {/* 7. FAQ Section */}
        <FaqSection />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}

export default App;
