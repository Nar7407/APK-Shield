"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldAlert,
  Download,
  Sparkles,
  ArrowRight,
  Smartphone,
  CheckCircle2,
  Lock,
  Zap,
  Menu,
  X,
  Activity,
  Radio,
  FileCode,
  Globe,
  Volume2,
  VolumeX,
  HelpCircle,
  Cpu,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Terminal,
  Database,
  Binary,
  Server,
  Code2,
  Network,
  Sliders,
  Workflow,
} from "lucide-react";
import { LiquidText } from "../LiquidText";
import { cyberAudio } from "../../lib/audio";

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Partner {
  name: string;
  badge?: string;
  href: string;
}

export interface ResponsiveHeroBannerProps {
  logoUrl?: string;
  backgroundImageUrl?: string;
  navLinks?: NavLink[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
  onCtaClick?: () => void;
  badgeText?: string;
  badgeLabel?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  onPrimaryClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  onSecondaryClick?: () => void;
  partnersTitle?: string;
  partners?: Partner[];
}

export const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  backgroundImageUrl = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80",
  navLinks = [
    { label: "The Problem", href: "#problem" },
    { label: "Threat Engine", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Live Scanner", href: "#scanner", isActive: true },
    { label: "Download App", href: "#download" },
    { label: "FAQ", href: "#faq" },
  ],
  ctaButtonText = "Download APK Shield",
  ctaButtonHref = "#download",
  onCtaClick,
  badgeLabel = "v2.5 Live",
  badgeText = "Real-Time Mobile APK Sandbox & Phishing Heuristics",
  title = "Stop Malicious APKs & Fake Links",
  titleLine2 = "Before They Compromise You",
  description = "APK Shield analyzes Android package binaries, decompiles suspicious DEX code, inspects high-risk permissions, and detects zero-day phishing infrastructure before installation.",
  primaryButtonText = "Scan File or URL Now",
  primaryButtonHref = "#scanner",
  onPrimaryClick,
  secondaryButtonText = "Download APK Shield",
  secondaryButtonHref = "#download",
  onSecondaryClick,
  partnersTitle = "Integrated with world-class security intelligence & mobile sandboxes",
  partners = [
    { name: "VirusTotal Intel", href: "#" },
    { name: "MITRE ATT&CK", href: "#" },
    { name: "YARA Rules Engine", href: "#" },
    { name: "OWASP Mobile Top 10", href: "#" },
    { name: "PhishTank Threat Feed", href: "#" },
  ],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    cyberAudio.setMuted(nextState);
    if (!nextState) {
      cyberAudio.playHover();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and listen for Escape key when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          cyberAudio.playClick();
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    callback?: () => void
  ) => {
    e.preventDefault();
    if (callback) {
      callback();
    }
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        const navOffset = 80;
        const targetTop =
          target.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  const navMeta: Record<
    string,
    { icon: React.ComponentType<{ className?: string }>; desc: string; badge?: string }
  > = {
    "#problem": {
      icon: ShieldAlert,
      desc: "Anatomy of fake APKs & mobile payload vectors",
      badge: "ALERT",
    },
    "#how-it-works": {
      icon: Cpu,
      desc: "Static DEX decompilation & sandbox heuristics",
      badge: "CORE ENGINE",
    },
    "#features": {
      icon: Layers,
      desc: "Hex inspector, IOC detection & risk scoring",
      badge: "MODULES",
    },
    "#scanner": {
      icon: Search,
      desc: "Interactive live APK binary & URL threat scanner",
      badge: "LIVE DEMO",
    },
    "#download": {
      icon: Download,
      desc: "Get APK Shield for Android (APK) & Windows (EXE)",
      badge: "STABLE",
    },
    "#faq": {
      icon: HelpCircle,
      desc: "Deployment, telemetry & privacy documentation",
    },
  };

  return (
    <section className="w-full isolate min-h-[96vh] flex flex-col justify-between overflow-hidden relative bg-[#070b14] border-b border-white/10">
      {/* Background Hero Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={backgroundImageUrl}
          alt="Cyber Security Network Grid"
          className="w-full h-full object-cover opacity-15 filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/75 via-[#070b14]/90 to-[#070b14]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        {/* Ambient Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.18, 0.25, 0.18],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-blue-600/20 blur-[130px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/15 blur-[120px] rounded-full"
        />
      </div>

      {/* Unified Sticky Floating Header / Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${
          isScrolled ? "py-2.5 bg-transparent" : "py-3.5 sm:py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`pointer-events-auto flex items-center justify-between py-2 px-3.5 sm:px-4 rounded-2xl border transition-all duration-300 ${
              isScrolled
                ? "bg-slate-950/30 hover:bg-slate-950/45 border-white/10 backdrop-blur-md shadow-lg shadow-black/20"
                : "bg-slate-900/20 hover:bg-slate-900/35 border-white/10 backdrop-blur-sm"
            }`}
          >
            {/* Brand Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2.5 group text-white focus:outline-none cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                  APK <span className="text-cyan-400">SHIELD</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1 font-mono">
                  AI Security Engine
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <div className="flex items-center gap-1 rounded-full bg-slate-950/40 px-2 py-1 border border-white/10 backdrop-blur-sm">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="px-3 py-1 text-xs font-medium rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => cyberAudio.playHover()}
                href={ctaButtonHref}
                onClick={(e) => {
                  cyberAudio.playClick();
                  handleSmoothScroll(e, ctaButtonHref, onCtaClick);
                }}
                className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{ctaButtonText}</span>
              </motion.a>

              {/* Sound Audio FX Toggle */}
              <button
                onClick={toggleMute}
                onMouseEnter={() => cyberAudio.playHover()}
                title={isMuted ? "Sound Effects Muted" : "Cyber Audio FX Enabled"}
                aria-label="Toggle cyber audio effects"
                className="ml-1 p-2 rounded-full bg-slate-900/50 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-all cursor-pointer backdrop-blur-sm"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                )}
              </button>

              {/* Desktop Menu Drawer Trigger (Three Lines / Hamburger) */}
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  setMobileMenuOpen(true);
                }}
                onMouseEnter={() => cyberAudio.playHover()}
                title="Open Navigation Menu Drawer"
                aria-label="Open navigation menu drawer"
                className="ml-1 p-2 rounded-full bg-slate-900/50 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm backdrop-blur-sm"
              >
                <Menu className="w-4 h-4 text-slate-200" />
              </button>
            </nav>

            {/* Medium screen simplified button & menu trigger */}
            <div className="hidden md:flex lg:hidden items-center gap-2">
              <a
                href={ctaButtonHref}
                onMouseEnter={() => cyberAudio.playHover()}
                onClick={(e) => {
                  cyberAudio.playClick();
                  handleSmoothScroll(e, ctaButtonHref, onCtaClick);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  setMobileMenuOpen(true);
                }}
                onMouseEnter={() => cyberAudio.playHover()}
                className="p-2 rounded-lg bg-slate-800/60 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Open menu drawer"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                setMobileMenuOpen(true);
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/60 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer backdrop-blur-sm"
              aria-expanded={mobileMenuOpen}
              aria-label="Open menu drawer"
            >
              <Menu className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Full-Screen High-Tech Cyber Drawer Overlay (Available on all screen sizes including desktop) */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[100] bg-[#070b14]/95 backdrop-blur-3xl flex flex-col justify-between overflow-y-auto"
              >
                {/* Background Cyber Lights & Atmosphere */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08),transparent_70%)] pointer-events-none" />

                {/* Drawer Header */}
                <div className="relative z-10 p-5 sm:p-6 border-b border-white/10 bg-slate-950/60 backdrop-blur-md">
                  <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                        <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
                          <Shield className="w-5 h-5 text-cyan-400" />
                        </div>
                      </div>
                      <div>
                        <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-2 font-mono">
                          APK <span className="text-cyan-400">SHIELD</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-sans font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            ONLINE
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">AI Threat Defense Engine v2.5</p>
                      </div>
                    </div>

                    {/* Header Controls: Audio Mute & Close Drawer */}
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={toggleMute}
                        onMouseEnter={() => cyberAudio.playHover()}
                        title={isMuted ? "Sound Effects Muted" : "Cyber Audio FX Enabled"}
                        aria-label="Toggle cyber audio effects"
                        className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-400 hover:text-cyan-400 transition-all cursor-pointer"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-slate-500" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-cyan-400" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          cyberAudio.playClick();
                          setMobileMenuOpen(false);
                        }}
                        onMouseEnter={() => cyberAudio.playHover()}
                        className="p-2.5 rounded-xl bg-slate-800/90 border border-white/10 text-slate-200 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer shadow-md flex items-center gap-1.5 font-mono text-xs"
                        aria-label="Close menu drawer"
                      >
                        <X className="w-4 h-4 text-cyan-400" />
                        <span className="hidden sm:inline text-slate-300">Close</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Drawer Body: Staggered Navigation Links in Responsive Bento Grid */}
                <div className="relative z-10 px-5 py-6 sm:px-8 flex-1 max-w-5xl mx-auto w-full space-y-4">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2 flex items-center justify-between">
                    <span>Security Modules & Navigation</span>
                    <span className="text-cyan-400/80">6 Direct Endpoints</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {navLinks.map((link, index) => {
                      const meta = navMeta[link.href] || {
                        icon: ArrowRight,
                        desc: "Navigate to security section",
                      };
                      const Icon = meta.icon;
                      const isLiveScanner = link.href === "#scanner";

                      return (
                        <motion.a
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04 + 0.05, duration: 0.25 }}
                          href={link.href}
                          onMouseEnter={() => cyberAudio.playHover()}
                          onClick={(e) => {
                            cyberAudio.playClick();
                            handleSmoothScroll(e, link.href);
                          }}
                          className={`group w-full p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                            isLiveScanner
                              ? "bg-gradient-to-r from-blue-950/70 to-cyan-950/50 border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                              : "bg-slate-900/70 border-white/10 hover:border-cyan-500/30 hover:bg-slate-800/80"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                                isLiveScanner
                                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 group-hover:scale-105 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                                  : "bg-slate-800/90 text-slate-300 border-white/10 group-hover:text-cyan-400 group-hover:border-cyan-500/30"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                                  {link.label}
                                </span>
                                {meta.badge && (
                                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                    {meta.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 font-sans line-clamp-1">{meta.desc}</p>
                            </div>
                          </div>

                          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>

                  {/* Security Telemetry Status Widget */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                    className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>Telemetry: <span className="text-white">Active Sentinel</span></span>
                    </div>
                    <div>
                      <span>OWASP & MITRE: <span className="text-emerald-400 font-bold">Verified</span></span>
                    </div>
                  </motion.div>
                </div>

                {/* Drawer Footer Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="relative z-10 p-5 sm:p-6 border-t border-white/10 bg-slate-950/90"
                >
                  <div className="max-w-5xl mx-auto w-full space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <a
                        href="#scanner"
                        onMouseEnter={() => cyberAudio.playHover()}
                        onClick={(e) => {
                          cyberAudio.playClick();
                          handleSmoothScroll(e, "#scanner");
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/50 transition-all cursor-pointer"
                      >
                        <Search className="w-4 h-4" />
                        <span>Launch Live Scanner</span>
                      </a>

                      <a
                        href={ctaButtonHref}
                        onMouseEnter={() => cyberAudio.playHover()}
                        onClick={(e) => {
                          cyberAudio.playClick();
                          handleSmoothScroll(e, ctaButtonHref, onCtaClick);
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-cyan-400" />
                        <span>{ctaButtonText}</span>
                      </a>
                    </div>

                    <p className="text-[10px] text-center text-slate-500 font-mono">
                      Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10">ESC</kbd> or tap anywhere to dismiss
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Hero Content */}
      <div className="z-10 relative flex-1 flex flex-col justify-center pt-28 sm:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-4xl">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-blue-950/70 px-3.5 py-1.5 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.25)] backdrop-blur-md"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full py-0.5 px-2.5">
                <Sparkles className="w-3 h-3 text-slate-950" />
                {badgeLabel}
              </span>
              <span className="text-xs sm:text-sm font-medium text-blue-200/90 tracking-wide">
                {badgeText}
              </span>
            </motion.div>

            {/* Main Interactive 3D Liquid Shader Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-5xl mx-auto flex flex-col items-center justify-center my-1"
            >
              <LiquidText
                lines={[
                  title || "Stop Malicious APKs & Fake Links",
                  titleLine2 || "Before They Compromise You",
                ]}
                lineColors={["#ffffff", "#38bdf8"]}
                fontSize={155}
                className="h-32 sm:h-44 md:h-52 lg:h-60 max-w-5xl"
              />
            </motion.div>

            {/* Subtitle / Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mt-6 mx-auto leading-relaxed font-normal"
            >
              {description}
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3.5 mt-9 items-center justify-center"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => cyberAudio.playHover()}
                href={primaryButtonHref}
                onClick={(e) => {
                  cyberAudio.playClick();
                  handleSmoothScroll(e, primaryButtonHref, onPrimaryClick);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white text-sm font-semibold py-3.5 px-7 shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:shadow-[0_0_35px_rgba(56,189,248,0.65)] transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-cyan-200 fill-cyan-200/40" />
                <span>{primaryButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => cyberAudio.playHover()}
                href={secondaryButtonHref}
                onClick={(e) => {
                  cyberAudio.playClick();
                  handleSmoothScroll(e, secondaryButtonHref, onSecondaryClick);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-900/80 hover:bg-slate-800/90 text-sm font-semibold text-slate-200 hover:text-white border border-white/15 px-6 py-3.5 backdrop-blur-md transition-all hover:border-blue-500/40 shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>{secondaryButtonText}</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => cyberAudio.playHover()}
                onClick={() => {
                  cyberAudio.playClick();
                  setIsSpecsExpanded(true);
                  // Smooth scroll to engine specs panel
                  const engineEl = document.getElementById("hero-engine-radar");
                  if (engineEl) {
                    engineEl.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue-950/40 hover:bg-blue-900/50 text-sm font-semibold text-cyan-300 hover:text-cyan-200 border border-blue-500/30 hover:border-cyan-400/50 px-5 py-3.5 backdrop-blur-md transition-all shadow-sm cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Learn More: Specs</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isSpecsExpanded ? "rotate-180" : ""}`} />
              </motion.button>
            </motion.div>

            {/* Quick Value Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-400"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Zero-Upload DEX Client Parsing
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Live Phishing Domain Intelligence
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Free &amp; Open Threat Heuristics
              </span>
            </motion.div>
          </div>

          {/* Real-Time Live Threat Core Radar Panel */}
          <motion.div
            id="hero-engine-radar"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 max-w-4xl mx-auto scroll-mt-24"
          >
            <div className="relative rounded-2xl bg-[#0d1527]/95 border border-blue-500/30 p-5 sm:p-6 shadow-2xl shadow-blue-950/60 backdrop-blur-xl">
              {/* Header bar */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left font-mono">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-start gap-3 hover:border-red-500/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400">
                    <ShieldAlert className="w-4 h-4" />
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
                  className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-start gap-3 hover:border-blue-500/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400">
                    <Zap className="w-4 h-4" />
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
                  className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-start gap-3 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <Lock className="w-4 h-4" />
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

              {/* Expandable Technical Specs Trigger Bar */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Architecture: <span className="text-slate-200">Rust/WASM Static Heuristics Engine</span></span>
                </div>

                <button
                  onClick={() => {
                    cyberAudio.playClick();
                    setIsSpecsExpanded(!isSpecsExpanded);
                  }}
                  onMouseEnter={() => cyberAudio.playHover()}
                  aria-expanded={isSpecsExpanded}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/30 hover:border-cyan-400/50 text-xs font-mono text-cyan-300 hover:text-white transition-all shadow-sm cursor-pointer group"
                >
                  <Sliders className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform" />
                  <span>{isSpecsExpanded ? "Hide Technical Architecture Specs" : "Learn More: Engine Architecture Specs"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isSpecsExpanded ? "rotate-180 text-cyan-400" : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              {/* Expandable Technical Specs Content Drawer */}
              <AnimatePresence>
                {isSpecsExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-5 border-t border-cyan-500/20 text-left space-y-6">
                      {/* Engine Micro-Architecture 4-Pillars Grid */}
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 flex items-center gap-2">
                            <Binary className="w-3.5 h-3.5 text-cyan-400" />
                            Multi-Vector Threat Detection Pipeline
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            v2.5 SENTINEL CORE
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                <FileCode className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-mono font-bold text-white">01. DEX Disassembler</span>
                            </div>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                              Parses <code className="text-cyan-300 font-mono text-[10px]">classes.dex</code> bytecode AST directly in-memory, analyzing Dalvik opcode entropy and spotting packed payloads.
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                <Sliders className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-mono font-bold text-white">02. Permission Matrix</span>
                            </div>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                              Correlates high-risk Android intents (<code className="text-purple-300 font-mono text-[10px]">SYSTEM_ALERT_WINDOW</code> + <code className="text-purple-300 font-mono text-[10px]">READ_SMS</code>) against stealth banking overlay attacks.
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                <Network className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-mono font-bold text-white">03. C2 Threat Feeds</span>
                            </div>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                              Matches embedded URLs and DNS hosts against live malware command-and-control databases and MITRE ATT&amp;CK Mobile matrix TTPs.
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <Shield className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-mono font-bold text-white">04. Neural Scoring</span>
                            </div>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                              Synthesizes 128 weighted risk factors into an actionable threat verdict (<code className="text-emerald-300 font-mono text-[10px]">0-100 Score</code>) with human-readable remediation advice.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Technical Benchmarks & SLA Table */}
                      <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                          <span>Verified System Telemetry &amp; Micro-Benchmarks</span>
                          <span className="text-emerald-400 text-[10px]">ALL SYSTEMS OPERATIONAL</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
                          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                            <div className="text-[10px] text-slate-400">Core Runtime</div>
                            <div className="text-xs font-bold text-white mt-1">Rust / WASM</div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                            <div className="text-[10px] text-slate-400">DEX Parse Time</div>
                            <div className="text-xs font-bold text-cyan-300 mt-1">~45 ms / 80MB</div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                            <div className="text-[10px] text-slate-400">Heuristic Rules</div>
                            <div className="text-xs font-bold text-purple-300 mt-1">42,000+ IoCs</div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                            <div className="text-[10px] text-slate-400">Memory Limit</div>
                            <div className="text-xs font-bold text-emerald-300 mt-1">&lt; 32 MB Heap</div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                            <div className="text-[10px] text-slate-400">False Positive</div>
                            <div className="text-xs font-bold text-white mt-1">&lt; 0.01% Rate</div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                            <div className="text-[10px] text-slate-400">Compliance</div>
                            <div className="text-xs font-bold text-blue-300 mt-1">OWASP MASVS</div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Navigation to Interactive Tools */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="text-[11px] text-slate-400 font-sans">
                          Test these threat models in real time with our live browser-based simulator.
                        </div>
                        <a
                          href="#scanner"
                          onMouseEnter={() => cyberAudio.playHover()}
                          onClick={(e) => {
                            cyberAudio.playClick();
                            handleSmoothScroll(e, "#scanner");
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
                        >
                          <span>Launch Interactive Scanner Demo</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Threat Intelligence Partners Bar */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mx-auto mt-14 max-w-5xl pt-7 border-t border-white/10"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold text-center mb-5">
              {partnersTitle}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 items-center justify-items-center">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="w-full max-w-[180px] py-2 px-3 rounded-xl bg-slate-900/50 border border-white/5 hover:border-blue-500/30 hover:bg-slate-800/60 transition-all text-center flex items-center justify-center gap-2 group shadow-sm"
                >
                  <Shield className="w-3.5 h-3.5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;

