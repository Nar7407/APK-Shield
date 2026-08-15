"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Search,
  Globe,
  FileCode,
  Activity,
  Zap,
  Menu,
  X,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Radar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toggleSound, isSoundEnabled, playHoverBlip } from "@/lib/sound";

interface NotchNavbarProps {
  className?: string;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  threatStats?: { totalScans: number; threatsFound: number };
}

export function NotchNavbar({
  className,
  activeTab = "file-scanner",
  setActiveTab,
  threatStats = { totalScans: 14208, threatsFound: 1892 },
  ...props
}: NotchNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    // Default to dark theme for cybersecurity feel
    document.documentElement.classList.add("dark");
    setIsDark(true);
    setSoundOn(isSoundEnabled());
  }, []);

  const handleToggleTheme = () => {
    playHoverBlip();
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const handleToggleAudio = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) playHoverBlip();
  };

  const items = {
    left: [
      { id: "file-scanner", label: "File Threat Scanner", icon: FileCode },
      { id: "url-scanner", label: "URL & Domain Intel", icon: Globe },
      { id: "hash-lookup", label: "IOC / Hash Vault", icon: Search },
    ],
    right: [
      { id: "live-threats", label: "Global Threat Feed", icon: Radar },
      { id: "heuristics-guide", label: "Threat Engine Docs", icon: Zap },
    ],
  };

  const handleNavClick = (tabId: string) => {
    playHoverBlip();
    if (setActiveTab) setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 h-16 flex px-0 select-none backdrop-blur-md",
          className
        )}
        {...props}
      >
        {/* Left Side Bar - Flexible width */}
        <div className="flex-1 h-11 bg-[#111111]/95 dark:bg-[#111111]/95 z-20 relative min-w-0 border-b border-white/10">
          <div className="h-full flex items-center px-4 md:px-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase hidden sm:inline-block">
                Core Active • Global Grid
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-xs text-white/40 font-mono border-l border-white/10 pl-3">
              <span>Signatures: <strong className="text-white/90 font-mono">1.2M+</strong></span>
              <span>•</span>
              <span>Response: <strong className="text-blue-400 font-mono">14ms</strong></span>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="43.5" x2="100%" y2="43.5" stroke="currentColor" strokeOpacity={0.1} strokeWidth={1} className="text-white" />
          </svg>
        </div>

        {/* Responsive Notch Container - 3 Slices */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">
          {/* Left Slice (Corner) */}
          <div className="w-[45px] h-full relative shrink-0">
            {/* Background */}
            <div
              className="absolute inset-0 bg-[#111111]/95 dark:bg-[#111111]/95 backdrop-blur-md"
              style={{ clipPath: "path('M0 0 H45 V64 C22 64 22 44 0 44 Z')" }}
            />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 45 64">
              <path
                d="M0 43.5 C22 43.5 22 63.5 45 63.5"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.12}
                strokeWidth={1}
                className="text-white"
              />
            </svg>
          </div>

          {/* Center Slice (Flexible Content Area) */}
          <div className="flex-1 h-full relative min-w-0 -ml-px">
            {/* Background & Lines Layer */}
            <div className="absolute inset-0 bg-[#111111]/95 dark:bg-[#111111]/95 backdrop-blur-md shadow-2xl">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="63.5"
                  x2="100%"
                  y2="63.5"
                  stroke="currentColor"
                  strokeOpacity={0.12}
                  strokeWidth={1}
                  className="text-white"
                />
              </svg>
            </div>

            {/* Content Layer */}
            <div className="relative w-full h-full flex items-end justify-between pb-2 px-3 md:px-6">
              {/* Desktop Left Nav */}
              <nav className="hidden md:flex gap-3 lg:gap-5 mb-1 shrink-0">
                {items.left.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "group flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase transition-all px-2.5 py-1 rounded-lg",
                        isActive
                          ? "text-blue-400 bg-blue-500/10 border border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-3.5 h-3.5", isActive ? "text-blue-400" : "opacity-60 group-hover:opacity-100")} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Menu Button (Left) */}
              <button
                className="md:hidden mb-1 p-1 text-white/60 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Logo (Center) */}
              <div className="flex items-center justify-center shrink-0 mx-2 md:mx-4 mt-0.5">
                <button
                  onClick={() => handleNavClick("file-scanner")}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <div className="w-5 h-5 bg-blue-500 rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                    <div className="w-2 h-2 bg-black rounded-xs -rotate-45" />
                  </div>
                  <div className="text-left leading-none">
                    <span className="text-sm font-black tracking-tight text-white flex items-center gap-1">
                      SENTINEL<span className="text-blue-400">.AI</span>
                    </span>
                    <span className="text-[8px] font-mono tracking-widest text-white/40 block mt-0.5">
                      THREAT RADAR
                    </span>
                  </div>
                </button>
              </div>

              {/* Desktop Right Nav */}
              <nav className="hidden md:flex gap-3 lg:gap-5 items-center shrink-0 mb-1">
                {items.right.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "group flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase transition-all px-2.5 py-1 rounded-lg",
                        isActive
                          ? "text-blue-400 bg-blue-500/10 border border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-3.5 h-3.5", isActive ? "text-blue-400" : "opacity-60 group-hover:opacity-100")} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                <div className="flex gap-2 pl-3 border-l border-white/10 shrink-0 items-center">
                  <button
                    onClick={handleToggleAudio}
                    className="p-1.5 rounded-lg text-white/50 hover:text-blue-400 hover:bg-white/5 transition-colors"
                    title={soundOn ? "Mute Audio" : "Unmute Audio"}
                  >
                    {soundOn ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-white/30" />}
                  </button>
                  <button
                    onClick={handleToggleTheme}
                    className="p-1.5 rounded-lg text-white/50 hover:text-blue-400 hover:bg-white/5 transition-colors"
                    title="Toggle Theme"
                  >
                    {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
                  </button>
                </div>
              </nav>

              {/* Mobile Right Actions */}
              <div className="md:hidden flex items-center gap-1 mb-1">
                <button
                  onClick={handleToggleAudio}
                  className="p-1 text-white/60 hover:text-white"
                >
                  {soundOn ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-white/30" />}
                </button>
                <button
                  onClick={handleToggleTheme}
                  className="p-1 text-white/60 hover:text-white"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Slice (Corner) */}
          <div className="w-[45px] h-full relative shrink-0 -ml-px">
            {/* Background */}
            <div
              className="absolute inset-0 bg-[#111111]/95 dark:bg-[#111111]/95 backdrop-blur-md"
              style={{ clipPath: "path('M0 0 H45 V44 C23 44 23 64 0 64 Z')" }}
            />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 45 64">
              <path
                d="M0 63.5 C23 63.5 23 43.5 45 43.5"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.12}
                strokeWidth={1}
                className="text-white"
              />
            </svg>
          </div>
        </div>

        {/* Right Side Bar - Flexible width */}
        <div className="flex-1 h-11 bg-[#111111]/95 dark:bg-[#111111]/95 z-20 relative min-w-0 -ml-px border-b border-white/10">
          <div className="h-full flex items-center justify-end px-4 md:px-6 gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
              <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span className="text-white/40">Scans:</span>
              <span className="text-white font-bold">{threatStats.totalScans.toLocaleString()}</span>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="43.5" x2="100%" y2="43.5" stroke="currentColor" strokeOpacity={0.1} strokeWidth={1} className="text-white" />
          </svg>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-slate-950 border-b border-cyan-500/20 p-4 md:hidden shadow-2xl backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-2">
              {[...items.left, ...items.right].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg text-left transition-colors font-medium text-sm",
                      isActive
                        ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                        : "text-neutral-300 hover:bg-neutral-900"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NotchNavbar;
