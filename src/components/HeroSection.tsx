import React from "react";
import {
  Shield,
  ShieldAlert,
  Download,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Monitor,
  Lock,
  Activity,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveHeroBanner } from "./ui/responsive-hero-banner";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* 21st.dev Responsive Hero Banner Component */}
      <ResponsiveHeroBanner
        badgeLabel="v2.5 Live"
        badgeText="Real-Time Mobile APK Sandbox & Phishing Heuristics"
        title="Stop Malicious APKs & Fake Links"
        titleLine2="Before They Compromise You"
        description="APK Shield scans suspicious Android apps, fake WhatsApp APKs, and deceptive phishing websites in real-time — providing an instant, AI-powered 0–100 risk score and plain-English safety breakdown."
        primaryButtonText="Scan File or URL Now"
        primaryButtonHref="#scanner"
        onPrimaryClick={() => scrollToSection("#scanner")}
        secondaryButtonText="Download APK Shield"
        secondaryButtonHref="#download"
        onSecondaryClick={() => scrollToSection("#download")}
        ctaButtonText="Install App"
        ctaButtonHref="#download"
        onCtaClick={() => scrollToSection("#download")}
        partnersTitle="Integrated with world-class security intelligence & mobile sandboxes"
        partners={[
          { name: "VirusTotal Intel", href: "#" },
          { name: "MITRE ATT&CK", href: "#" },
          { name: "YARA Rules Engine", href: "#" },
          { name: "OWASP Mobile Top 10", href: "#" },
          { name: "PhishTank Threat Feed", href: "#" },
        ]}
      />

      {/* Hero Interactive Radar Threat Visual */}
      <div className="relative -mt-10 sm:-mt-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl bg-[#0d1527]/95 border border-blue-500/30 p-5 sm:p-7 shadow-2xl shadow-blue-950/60 backdrop-blur-xl"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="ml-2 text-xs font-mono text-slate-300 font-semibold tracking-wide">
                APK_SHIELD_LIVE_ENGINE // REAL-TIME PROTECTION
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>AI THREAT CORE: ACTIVE</span>
            </div>
          </div>

          {/* Real-time Threat Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-mono">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-xl bg-black/50 border border-white/5 flex items-start gap-3.5 hover:border-red-500/30 transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                  Malicious APK Detection
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  99.94% Accuracy
                </div>
                <div className="text-[10px] text-red-300/90 mt-0.5">
                  SMS &amp; Banking Trojans Flagged
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-xl bg-black/50 border border-white/5 flex items-start gap-3.5 hover:border-blue-500/30 transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                  Analysis Latency
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  &lt; 2.8 Seconds
                </div>
                <div className="text-[10px] text-blue-300/90 mt-0.5">
                  Zero-Day Neural Classification
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-xl bg-black/50 border border-white/5 flex items-start gap-3.5 hover:border-emerald-500/30 transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                  User Privacy
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  100% Ephemeral
                </div>
                <div className="text-[10px] text-emerald-300/90 mt-0.5">
                  No Files Stored on Servers
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

