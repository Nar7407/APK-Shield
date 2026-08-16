import React from "react";
import ResponsiveHeroBanner from "./responsive-hero-banner";

export const HeroDemo: React.FC = () => {
  return (
    <ResponsiveHeroBanner
      badgeLabel="v2.5 Live"
      badgeText="Real-Time Mobile APK Sandbox & Phishing Heuristics"
      title="Stop Malicious APKs & Fake Links"
      titleLine2="Before They Compromise You"
      description="APK Shield analyzes Android package binaries, decompiles suspicious DEX code, inspects high-risk permissions, and detects zero-day phishing infrastructure before installation."
      primaryButtonText="Scan File or URL"
      secondaryButtonText="Download APK Shield"
      ctaButtonText="Install Client"
      partnersTitle="Integrated with world-class security intelligence & mobile sandboxes"
    />
  );
};

export default HeroDemo;
