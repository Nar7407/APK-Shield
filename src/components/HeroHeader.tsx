"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Terminal, Sparkles, AlertTriangle } from "lucide-react";
import { CreepyButton } from "./ui/CreepyButton";
import { FlipFadeText } from "./ui/FlipFadeText";
import { MorphText } from "./ui/MorphText";
import { AsciiGlitchRipple } from "./ui/AsciiGlitchRipple";
import { playScanStartSound } from "@/lib/sound";

interface HeroHeaderProps {
  onQuickScanClick: () => void;
  onUrlScanClick: () => void;
}

export function HeroHeader({ onQuickScanClick, onUrlScanClick }: HeroHeaderProps) {
  const handleQuickScan = () => {
    playScanStartSound();
    onQuickScanClick();
  };

  const handleUrlScan = () => {
    playScanStartSound();
    onUrlScanClick();
  };

  return (
    <div className="relative pt-24 pb-10 md:pt-28 md:pb-14 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Top Threat Alert Tag with AsciiGlitchRipple */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-md"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span>REAL-TIME THREAT INTELLIGENCE</span>
        <span className="text-white/30">•</span>
        <AsciiGlitchRipple
          className="font-bold text-white/90 tracking-wider hover:text-blue-300"
          dur={800}
        >
          [SENTINEL-v4.8 TITAN ACTIVE]
        </AsciiGlitchRipple>
      </motion.div>

      {/* Main Liquid Dynamic Header */}
      <div className="w-full my-2">
        <FlipFadeText
          words={[
            "ANALYZE. NEUTRALIZE. PROTECT.",
            "REAL-TIME THREAT RADAR",
            "MALWARE DEEP HEURISTICS",
            "URL REPUTATION & PHISHING",
            "GEMINI 3.7 AI REASONING",
          ]}
          interval={3200}
          textClassName="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase"
        />
      </div>

      {/* MorphText Sub-headline */}
      <div className="my-2">
        <MorphText
          words={["ZERO-DAY THREATS", "RANSOMWARE DROPPERS", "PHISHING PORTALS", "C2 BOTNETS", "STEALTH TROJANS"]}
          interval={2600}
          fontSize="clamp(1.1rem, 3vw, 1.8rem)"
          subtext="PROPRIETARY NEURAL ENGINE & STATIC BYTE DISSECTION"
        />
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl text-sm md:text-base text-white/50 mt-4 leading-relaxed font-sans"
      >
        Our proprietary neural network analyzes millions of suspicious signatures and URL behaviors in sub-millisecond cycles. Secure your infrastructure with the world's fastest threat reputation engine.
      </motion.p>

      {/* Action Buttons Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-8"
      >
        {/* Creepy Button for File Threat Scanner */}
        <CreepyButton
          onClick={handleQuickScan}
          coverClassName="bg-blue-500 shadow-[-4px_4px_0px_0px_#000000] text-white"
          className="min-w-[13rem] h-12 text-sm uppercase tracking-wider font-mono shadow-[0_0_20px_rgba(59,130,246,0.25)]"
        >
          <span className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-white" />
            INITIALIZE SCAN
          </span>
        </CreepyButton>

        {/* Secondary Button for URL Reputation */}
        <button
          onClick={handleUrlScan}
          className="relative group min-w-[13rem] h-12 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-blue-500/50 font-mono text-sm font-semibold tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg backdrop-blur-md cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            GLOBAL REPUTATION SCAN
          </span>
          <div className="absolute inset-0 rounded-xl bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </motion.div>

      {/* Sleek Metrics Stat Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 w-full max-w-4xl"
      >
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left hover:border-blue-500/30 transition-colors">
          <div className="text-blue-400 font-mono text-xl sm:text-2xl font-bold mb-1">1.2M+</div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Daily Signatures</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left hover:border-green-500/30 transition-colors">
          <div className="text-green-400 font-mono text-xl sm:text-2xl font-bold mb-1">99.98%</div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Detection Accuracy</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left hover:border-purple-500/30 transition-colors">
          <div className="text-purple-400 font-mono text-xl sm:text-2xl font-bold mb-1">14ms</div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-medium">API Response Time</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left hover:border-amber-500/30 transition-colors">
          <div className="text-amber-400 font-mono text-xl sm:text-2xl font-bold mb-1">100%</div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Sandbox Isolation</div>
        </div>
      </motion.div>
    </div>
  );
}
