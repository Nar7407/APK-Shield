import React from "react";
import { motion } from "framer-motion";

interface CircularProgressIndicatorProps {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  isIndeterminate?: boolean;
  colorClassName?: string;
  trackColorClassName?: string;
  showPing?: boolean;
}

export function CircularProgressIndicator({
  size = 20,
  strokeWidth = 2.5,
  progress = 65,
  isIndeterminate = false,
  colorClassName = "text-cyan-400",
  trackColorClassName = "text-white/20",
  showPing = true,
}: CircularProgressIndicatorProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * Math.min(100, Math.max(0, progress))) / 100;

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        className={`w-full h-full -rotate-90 transform ${
          isIndeterminate ? "animate-spin" : ""
        }`}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={trackColorClassName}
        />

        {/* Animated Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isIndeterminate ? circumference * 0.35 : strokeDashoffset}
          strokeLinecap="round"
          className={`${colorClassName} transition-all duration-300`}
        />
      </svg>

      {/* Center ambient radar ping dot */}
      {showPing && (
        <span className="absolute flex h-1.5 w-1.5 items-center justify-center pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1 w-1 bg-cyan-300" />
        </span>
      )}
    </div>
  );
}

interface ScanningStatusBadgeProps {
  label?: string;
  progress?: number;
  showPercent?: boolean;
}

export function ScanningStatusBadge({
  label = "Scanning",
  progress,
  showPercent = true,
}: ScanningStatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 font-mono tracking-wider">
      <span>{label}</span>
      <span className="inline-flex tracking-normal">
        <span className="animate-bounce inline-block [animation-delay:-0.3s]">.</span>
        <span className="animate-bounce inline-block [animation-delay:-0.15s]">.</span>
        <span className="animate-bounce inline-block">.</span>
      </span>
      {showPercent && typeof progress === "number" && (
        <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
          {Math.round(progress)}%
        </span>
      )}
    </span>
  );
}
