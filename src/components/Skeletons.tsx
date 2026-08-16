import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Cpu } from "lucide-react";

/**
 * High-tech cyber skeleton for Feature Cards
 * Matches exact dimensions, 8px grid spacing, and border radius of MagneticFeatureCard
 */
export function FeatureCardSkeleton({ idx = 0 }: { idx?: number; key?: React.Key }) {
  return (
    <div
      className="relative rounded-2xl p-7 bg-[#0c1427]/80 border border-white/10 overflow-hidden min-h-[290px] flex flex-col justify-between"
    >
      {/* Animated Cyber Scanner Sweep */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: "linear",
          delay: idx * 0.2,
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent skew-x-12 pointer-events-none"
      />

      <div>
        {/* Top Icon & Tag Skeleton */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/5 animate-pulse" />
          <div className="h-6 w-32 rounded-full bg-slate-800/60 border border-white/5 animate-pulse" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-5 w-3/4 rounded-md bg-slate-800/90 animate-pulse" />
          <div className="h-5 w-1/2 rounded-md bg-slate-800/60 animate-pulse" />
        </div>

        {/* Description Lines Skeleton */}
        <div className="space-y-2">
          <div className="h-3.5 w-full rounded bg-slate-800/50 animate-pulse" />
          <div className="h-3.5 w-5/6 rounded bg-slate-800/40 animate-pulse" />
          <div className="h-3.5 w-4/6 rounded bg-slate-800/30 animate-pulse" />
        </div>
      </div>

      {/* Bottom Footer Accent Skeleton */}
      <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-4">
        <div className="h-3 w-20 rounded bg-slate-800/40 animate-pulse" />
        <div className="w-4 h-4 rounded bg-slate-800/50 animate-pulse" />
      </div>
    </div>
  );
}

/**
 * High-tech cyber skeleton for Live Scanner Module
 * Prevents Layout Shift and renders exact structural layout of APK / URL demo card
 */
export function LiveScannerSkeleton() {
  return (
    <div className="relative rounded-3xl bg-[#0a101f]/95 border border-blue-500/20 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden min-h-[520px]">
      {/* Animated Light Sweep Beam */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          repeat: Infinity,
          duration: 2.6,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent skew-x-12 pointer-events-none"
      />

      {/* Preset Pill Bar Skeleton */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3.5 h-3.5 rounded bg-blue-500/30 animate-pulse" />
          <div className="h-3 w-40 rounded bg-slate-800 animate-pulse" />
        </div>
        <div className="flex flex-wrap gap-2.5">
          <div className="h-9 w-48 rounded-xl bg-slate-800/70 border border-white/5 animate-pulse" />
          <div className="h-9 w-44 rounded-xl bg-slate-800/60 border border-white/5 animate-pulse" />
          <div className="h-9 w-36 rounded-xl bg-slate-800/50 border border-white/5 animate-pulse" />
        </div>
      </div>

      {/* Upload Dropzone Skeleton */}
      <div className="rounded-2xl border-2 border-dashed border-slate-700/60 bg-slate-900/40 p-10 flex flex-col items-center justify-center text-center relative mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-900/30 border border-blue-500/20 flex items-center justify-center mb-4 animate-pulse">
          <Shield className="w-7 h-7 text-blue-400/40" />
        </div>
        <div className="h-4 w-64 rounded bg-slate-800 mb-2 animate-pulse" />
        <div className="h-3 w-48 rounded bg-slate-800/60 animate-pulse" />
      </div>

      {/* Threat Metrics Mock Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 rounded bg-slate-800 animate-pulse" />
              <div className="h-4 w-12 rounded bg-slate-800 animate-pulse" />
            </div>
            <div className="h-2 w-full rounded bg-slate-800/40 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
