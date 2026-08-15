import React from "react";
import { Gauge, FileText, Layers, Database, ShieldAlert, Zap, Check, Lock, Cpu, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { LiquidText } from "./LiquidText";

export function FeaturesSection() {
  const features = [
    {
      icon: Gauge,
      title: "Instant Risk Scoring",
      description: "Get a clear 0–100 numerical risk metric with an AI confidence rating, letting you evaluate threat severity at a single glance.",
      highlight: "0–100 Precision Index",
    },
    {
      icon: FileText,
      title: "Plain-English Reports",
      description: "No confusing technical jargon or cryptic hexadecimal dumps. APK Shield explains in everyday language why something is risky and what to do.",
      highlight: "Zero Security Jargon",
    },
    {
      icon: Layers,
      title: "APK & Link Scanning",
      description: "Complete unified defense covering Android installation packages (.apk files) as well as phishing, smishing, and spoofed login links.",
      highlight: "Dual Protection Surface",
    },
    {
      icon: Database,
      title: "Threat Intelligence Powered",
      description: "Continuously synchronized with worldwide zero-day feeds, malicious C2 infrastructure databases, and known banking trojan signatures.",
      highlight: "Live Global Threat Feeds",
    },
    {
      icon: ShieldAlert,
      title: "Permission & Behavior Analysis",
      description: "Instantly flags deceptive apps requesting sensitive capabilities like SMS reading, accessibility abuse, overlay drawing, and camera access.",
      highlight: "Heuristic Permission Auditing",
    },
    {
      icon: Zap,
      title: "Fast & Lightweight",
      description: "High-performance neural cloud engines deliver comprehensive static and heuristic analysis in under 3 seconds without draining battery.",
      highlight: "< 3s Cloud Analysis",
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#090e1d] relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Built for Modern Android &amp; Web Threats</span>
          </div>

          <div className="my-2 max-w-5xl mx-auto flex justify-center">
            <LiquidText
              lines={[
                "Comprehensive Defense Against",
                "Deceptive Apps & Links"
              ]}
              lineColors={["#ffffff", "#60a5fa"]}
              fontSize={135}
              className="h-28 sm:h-36 md:h-44 max-w-4xl"
            />
          </div>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            APK Shield combines advanced byte heuristics, permission dissection, and AI threat intelligence into an effortless security experience.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0f172a]/80 border border-white/10 p-7 flex flex-col justify-between hover:border-blue-500/40 hover:-translate-y-1 transition-all hover:shadow-2xl hover:shadow-blue-950/30 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-white/5 text-blue-300 border border-white/10">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 font-sans group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>Enterprise-grade protection</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison / Security Standards Strip */}
        <div className="mt-14 p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans">
                Privacy-First Cloud Architecture
              </h4>
              <p className="text-xs text-slate-400">
                Uploaded samples are scanned in memory and purged instantly. No personal data or contacts are ever indexed.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#scanner"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-blue-300 transition-colors"
            >
              Test Real-Time Scanner ↓
            </a>
            <a
              href="#download"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono text-white font-semibold transition-all shadow-md"
            >
              Download APK Shield
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
