import React from "react";
import { Shield, ShieldAlert, Download, Sparkles, CheckCircle2, ArrowRight, Smartphone, Monitor, Lock, Activity, Eye, Zap } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#070b14]">
      {/* Background Cyber Grid & Radar Scan Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Blue & Cyan Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Animated Scan Line */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none animate-pulse opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Top Product Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>Next-Gen Android APK &amp; Phishing Threat Detection</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto font-sans"
        >
          Stop Malicious APKs and Phishing Links{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500">
            Before They Stop You
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          APK Shield scans suspicious Android apps, fake WhatsApp APKs, and deceptive phishing websites in real-time — providing an instant, AI-powered 0–100 risk score and plain-English safety breakdown.
        </motion.p>

        {/* Dual Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
        >
          <a
            href="/downloads/apkshield.apk"
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer"
          >
            <Smartphone className="w-5 h-5 text-blue-200" />
            <span>Download for Android (APK)</span>
            <Download className="w-4 h-4 ml-1 opacity-70 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="/downloads/apkshield.exe"
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer"
          >
            <Monitor className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
            <span>Download for Windows (EXE)</span>
            <Download className="w-4 h-4 ml-1 opacity-70 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* In-Browser Scanner Quick Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5"
        >
          <button
            onClick={() => scrollToSection("#scanner")}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
            <span>Or test an APK / URL in our live web scanner</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Hero Interactive Radar Threat Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-14 max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl bg-[#0d1527]/90 border border-blue-500/30 p-4 sm:p-6 shadow-2xl shadow-blue-950/50 backdrop-blur-xl">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  APK_SHIELD_LIVE_ENGINE // REAL-TIME PROTECTION
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>AI THREAT CORE: ACTIVE</span>
              </div>
            </div>

            {/* Real-time Threat Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-mono">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase">Malicious APK Detection</div>
                  <div className="text-sm font-bold text-white">99.94% Accuracy</div>
                  <div className="text-[10px] text-red-300/80">SMS &amp; Banking Trojans Flagged</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase">Analysis Latency</div>
                  <div className="text-sm font-bold text-white">&lt; 2.8 Seconds</div>
                  <div className="text-[10px] text-blue-300/80">Zero-Day Neural Classification</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase">User Privacy</div>
                  <div className="text-sm font-bold text-white">100% Ephemeral</div>
                  <div className="text-[10px] text-emerald-300/80">No Files Stored on Servers</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Over 4.2M+ APKs &amp; Links Analyzed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Heuristic Permission Dissector</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Real-time Phishing Threat Feeds</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Commercial-Grade Security</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
