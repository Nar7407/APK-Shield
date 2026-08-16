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
  Database,
} from "lucide-react";
import { LiquidText } from "../LiquidText";

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
    { label: "IOC Vault", href: "#ioc-vault" },
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2.5 bg-[#070b14]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/60"
            : "py-3.5 sm:py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 px-3.5 sm:px-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-lg shadow-black/40">
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
              <div className="flex items-center gap-1 rounded-full bg-slate-950/70 px-2 py-1 border border-white/10 backdrop-blur">
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
                href={ctaButtonHref}
                onClick={(e) => handleSmoothScroll(e, ctaButtonHref, onCtaClick)}
                className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{ctaButtonText}</span>
              </motion.a>
            </nav>

            {/* Medium screen simplified button */}
            <div className="hidden md:flex lg:hidden items-center gap-2">
              <a
                href={ctaButtonHref}
                onClick={(e) => handleSmoothScroll(e, ctaButtonHref, onCtaClick)}
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="lg:hidden mt-2 p-4 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl space-y-3"
              >
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-cyan-300 transition-colors flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  ))}
                </div>
                <a
                  href={ctaButtonHref}
                  onClick={(e) => handleSmoothScroll(e, ctaButtonHref, onCtaClick)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/30"
                >
                  <Download className="w-4 h-4" />
                  <span>{ctaButtonText}</span>
                </a>
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
                href={primaryButtonHref}
                onClick={(e) =>
                  handleSmoothScroll(e, primaryButtonHref, onPrimaryClick)
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white text-sm font-semibold py-3.5 px-7 shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:shadow-[0_0_35px_rgba(56,189,248,0.65)] transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-cyan-200 fill-cyan-200/40" />
                <span>{primaryButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={secondaryButtonHref}
                onClick={(e) =>
                  handleSmoothScroll(e, secondaryButtonHref, onSecondaryClick)
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-900/80 hover:bg-slate-800/90 text-sm font-semibold text-slate-200 hover:text-white border border-white/15 px-6 py-3.5 backdrop-blur-md transition-all hover:border-blue-500/40 shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>{secondaryButtonText}</span>
              </motion.a>
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 max-w-4xl mx-auto"
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

