import React from "react";
import { motion } from "framer-motion";
import { Shield, Cpu, Binary, Radio, Sparkles } from "lucide-react";

interface CyberLoadingFallbackProps {
  sectionTitle?: string;
  minHeight?: string;
}

export function CyberLoadingFallback({
  sectionTitle = "Loading Security Module...",
  minHeight = "min-h-[360px]",
}: CyberLoadingFallbackProps) {
  return (
    <div
      className={`relative w-full ${minHeight} flex flex-col items-center justify-center py-16 px-4 overflow-hidden`}
    >
      {/* Background Cyber Glow & Ambient Highlights */}
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none delay-500 animate-pulse" />

      {/* Cyber Radar Loader Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Animated Rings & Rotating Hex Radar */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-25 blur-md animate-pulse" />

          {/* Outer Spinning Dashed Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-0 rounded-2xl border-2 border-dashed border-cyan-400/40"
          />

          {/* Inner Counter-Rotating Hex Orbit */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute inset-2 rounded-xl border border-blue-500/50"
          />

          {/* Center Glowing Cyber Shield Icon */}
          <div className="relative z-10 w-11 h-11 rounded-lg bg-[#070b14]/90 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Shield className="w-5 h-5 text-cyan-400" />
            </motion.div>
          </div>
        </div>

        {/* Section Title & Telemetry Status */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>THREAT SENTINEL PIPELINE</span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white tracking-wide font-mono">
            {sectionTitle}
          </h3>

          <p className="text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-blue-400 animate-spin" />
            <span>Synchronizing sandbox heuristics & bytecode parser...</span>
          </p>
        </div>

        {/* Cyber Progress Indicator Bar */}
        <div className="w-48 h-1.5 bg-slate-800/80 rounded-full mt-5 overflow-hidden border border-white/10 relative">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          />
        </div>
      </div>
    </div>
  );
}

export default CyberLoadingFallback;
