"use client";

import React from "react";
import { ResponsiveHeroBanner } from "./components/ui/responsive-hero-banner";
import { CyberBackground } from "./components/CyberBackground";
import { CyberCursorFollower } from "./components/CyberCursorFollower";
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

  const handleScannerClick = () => {
    const el = document.querySelector("#scanner");
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
      {/* Subtle, non-intrusive cyber data bit cursor follow effect */}
      <CyberCursorFollower />

      {/* 1. Primary Responsive Hero Banner with Unified Floating Navigation */}
      <ResponsiveHeroBanner
        badgeLabel="v2.5 Live"
        badgeText="Real-Time Mobile APK Sandbox & Phishing Heuristics"
        title="Stop Malicious APKs & Fake Links"
        titleLine2="Before They Compromise You"
        description="APK Shield scans suspicious Android apps, fake WhatsApp APKs, and deceptive phishing websites in real-time — providing an instant, AI-powered 0–100 risk score and plain-English safety breakdown."
        primaryButtonText="Scan File or URL Now"
        primaryButtonHref="#scanner"
        onPrimaryClick={handleScannerClick}
        secondaryButtonText="Download APK Shield"
        secondaryButtonHref="#download"
        onSecondaryClick={handleDownloadClick}
        ctaButtonText="Download APK Shield"
        ctaButtonHref="#download"
        onCtaClick={handleDownloadClick}
        navLinks={[
          { label: "The Problem", href: "#problem" },
          { label: "Threat Engine", href: "#how-it-works" },
          { label: "Features", href: "#features" },
          { label: "Live Scanner", href: "#scanner", isActive: true },
          { label: "Download App", href: "#download" },
          { label: "FAQ", href: "#faq" },
        ]}
        partnersTitle="Integrated with world-class security intelligence & mobile sandboxes"
        partners={[
          { name: "VirusTotal Intel", href: "#" },
          { name: "MITRE ATT&CK", href: "#" },
          { name: "YARA Rules Engine", href: "#" },
          { name: "OWASP Mobile Top 10", href: "#" },
          { name: "PhishTank Threat Feed", href: "#" },
        ]}
      />

      {/* Main Single-Page Content Sections (with ambient animated cyber background) */}
      <main className="relative overflow-hidden">
        {/* Animated Cyber Defense Matrix Background for all non-hero sections */}
        <CyberBackground />

        {/* 2. The Problem Section */}
        <ProblemSection />

        {/* 3. How It Works / Threat Engine Section */}
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


