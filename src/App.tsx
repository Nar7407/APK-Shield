"use client";

import React, { Suspense } from "react";
import { ResponsiveHeroBanner } from "./components/ui/responsive-hero-banner";
import { CyberBackground } from "./components/CyberBackground";
import { CyberCursorFollower } from "./components/CyberCursorFollower";
import { CyberLoadingFallback } from "./components/CyberLoadingFallback";

// Code-split major page sections with React.lazy for instant initial paint and optimized bundle chunks
const ProblemSection = React.lazy(() =>
  import("./components/ProblemSection").then((m) => ({ default: m.ProblemSection }))
);
const HowItWorksSection = React.lazy(() =>
  import("./components/HowItWorksSection").then((m) => ({ default: m.HowItWorksSection }))
);
const FeaturesSection = React.lazy(() =>
  import("./components/FeaturesSection").then((m) => ({ default: m.FeaturesSection }))
);
const LiveScannerDemo = React.lazy(() =>
  import("./components/LiveScannerDemo").then((m) => ({ default: m.LiveScannerDemo }))
);
const DownloadSection = React.lazy(() =>
  import("./components/DownloadSection").then((m) => ({ default: m.DownloadSection }))
);
const FaqSection = React.lazy(() =>
  import("./components/FaqSection").then((m) => ({ default: m.FaqSection }))
);
const Footer = React.lazy(() =>
  import("./components/Footer").then((m) => ({ default: m.Footer }))
);

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

      {/* 1. Primary Responsive Hero Banner with Unified Floating Navigation (Loaded Immediately) */}
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

      {/* Main Content with Ambient Cyber Background & Global Suspense Boundary */}
      <main className="relative overflow-hidden">
        {/* Animated Cyber Defense Matrix Background for all non-hero sections */}
        <CyberBackground />

        {/* Global Suspense Boundary for dynamically loaded modules */}
        <Suspense
          fallback={
            <CyberLoadingFallback
              sectionTitle="Initializing Threat Defense Pipeline..."
              minHeight="min-h-[500px]"
            />
          }
        >
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
        </Suspense>
      </main>

      {/* 8. Footer (Lazy Loaded) */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;


