"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Search,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Server,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  RefreshCw,
  Layers,
  ArrowRight,
  ShieldAlert,
  Calendar,
} from "lucide-react";
import confetti from "canvas-confetti";
import { UrlScanResult } from "@/types";
import { playScanStartSound, playThreatAlertSound, playHoverBlip } from "@/lib/sound";
import { FlipText } from "./ui/FlipText";

const SAMPLE_URLS = [
  {
    label: "Apple ID Phish Portal",
    url: "https://apple-support-verify-auth92.xyz/login.php",
    type: "Phishing",
  },
  {
    label: "MetaMask Crypto Drainer",
    url: "https://metamask-seed-connect-sync.top/wallet",
    type: "Web3 Drainer",
  },
  {
    label: "PayPal Account Security Trap",
    url: "https://paypal-security-update-billing.info/auth",
    type: "Credential Stealer",
  },
  {
    label: "GitHub Official Repository",
    url: "https://github.com",
    type: "Clean",
  },
  {
    label: "Google Cloud Platform",
    url: "https://cloud.google.com",
    type: "Clean",
  },
];

export function UrlScanner() {
  const [inputUrl, setInputUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState<UrlScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const scanSteps = [
    "Normalizing URL & decomposing query parameters...",
    "Querying authoritative DNS and IP resolution...",
    "Inspecting ASN network routing & geographic reputation...",
    "Validating SSL/TLS certificate chain & expiration...",
    "Checking 6 global anti-phishing blacklist databases...",
    "Running Gemini 3.7 Brand Impersonation & Typosquatting Analyzer...",
  ];

  const handleSelectPreset = (sampleUrl: string) => {
    playHoverBlip();
    setInputUrl(sampleUrl);
    setErrorMsg(null);
  };

  const handleScanUrl = async (targetUrlOverride?: string) => {
    const target = targetUrlOverride || inputUrl;
    if (!target.trim()) {
      setErrorMsg("Please enter a valid URL or domain to analyze.");
      return;
    }

    setErrorMsg(null);
    setIsScanning(true);
    setScanResult(null);
    playScanStartSound();

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % scanSteps.length;
      setScanStep(step);
    }, 450);

    try {
      const res = await fetch("/api/scan/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });

      const data = await res.json();
      clearInterval(interval);

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to scan URL");
      }

      setScanResult(data.result);
      const isMalicious = data.result.threatLevel === "MALICIOUS" || data.result.threatLevel === "CRITICAL";
      playThreatAlertSound(isMalicious);

      if (!isMalicious && data.result.reputationScore < 20) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10b981", "#38bdf8", "#6ee7b7"],
        });
      }
    } catch (err: any) {
      clearInterval(interval);
      setErrorMsg(err.message || "Failed to perform URL reputation scan.");
    } finally {
      setIsScanning(false);
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
      case "MALICIOUS":
        return {
          badge: "bg-red-950/80 text-red-400 border-red-500/40",
          gauge: "from-red-500 to-rose-600",
          text: "text-red-400",
          border: "border-red-500/30",
        };
      case "SUSPICIOUS":
        return {
          badge: "bg-amber-950/80 text-amber-400 border-amber-500/40",
          gauge: "from-amber-500 to-yellow-600",
          text: "text-amber-400",
          border: "border-amber-500/30",
        };
      default:
        return {
          badge: "bg-emerald-950/80 text-emerald-400 border-emerald-500/40",
          gauge: "from-emerald-500 to-teal-500",
          text: "text-emerald-400",
          border: "border-emerald-500/30",
        };
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative rounded-2xl bg-[#111111] border border-white/10 shadow-2xl p-6 md:p-8 overflow-hidden group">
        {/* Sleek top gradient highlight bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <FlipText duration={2.5}>URL & DOMAIN REPUTATION</FlipText>
              </h2>
              <p className="text-xs md:text-sm text-white/40 font-mono">
                Brand Impersonation • Typosquatting • SSL Inspection • Blacklist Feeds
              </p>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="mt-5">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 mb-2.5">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Select Target URL Preset to Test:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_URLS.map((sample, i) => (
              <button
                key={i}
                onClick={() => handleSelectPreset(sample.url)}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/40 text-xs font-mono text-white/70 hover:text-blue-300 transition-all text-left cursor-pointer"
              >
                <Globe className="w-3 h-3 text-blue-400" />
                <span className="font-semibold">{sample.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    sample.type === "Clean"
                      ? "bg-green-950 text-green-400 border border-green-500/30"
                      : "bg-red-950 text-red-400 border border-red-500/30"
                  }`}
                >
                  {sample.type}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScanUrl()}
                placeholder="https://example.com/login or paste suspicious domain..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black border border-white/10 focus:border-blue-500/80 text-sm font-mono text-white placeholder:text-white/20 focus:outline-none shadow-inner"
              />
            </div>

            <button
              onClick={() => handleScanUrl()}
              disabled={isScanning}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
                isScanning
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-[-4px_4px_0px_0px_#000000] hover:translate-x-0.5 hover:-translate-y-0.5"
              }`}
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>CHECKING REPUTATION...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-white" />
                  <span>ANALYZE URL INTEL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Progress Bar */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2 font-mono text-xs text-blue-300">
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 animate-spin text-blue-400" />
                  {scanSteps[scanStep]}
                </span>
                <span className="text-blue-400 font-bold">
                  {Math.round(((scanStep + 1) / scanSteps.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-black overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-green-400"
                  initial={{ width: "10%" }}
                  animate={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan Results */}
        <AnimatePresence>
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 pt-8 border-t border-white/10 space-y-6"
            >
              {/* Main Verdict Banner */}
              {(() => {
                const colors = getThreatColor(scanResult.threatLevel);
                return (
                  <div
                    className={`p-6 rounded-xl bg-black/60 border ${colors.border} flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl`}
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-black font-mono tracking-widest border ${colors.badge}`}
                        >
                          {scanResult.threatLevel}
                        </span>
                        <span className="text-xs font-mono text-white/40">
                          Scan ID: <strong className="text-white">{scanResult.scanId}</strong>
                        </span>
                        <span className="text-xs font-mono text-white/40">
                          Duration: <strong className="text-blue-400">{scanResult.scanDurationMs}ms</strong>
                        </span>
                        {scanResult.isAiEnhanced && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[11px] font-mono">
                            <Sparkles className="w-3 h-3 text-purple-400" />
                            Gemini 3.7 AI
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                        {scanResult.verdict}
                      </h3>

                      <div className="font-mono text-xs text-blue-300 break-all">
                        Target Domain: <strong>{scanResult.domain}</strong>
                      </div>

                      <p className="text-xs md:text-sm text-white/60 max-w-2xl leading-relaxed">
                        {scanResult.summary}
                      </p>

                      {/* Threat Categories Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {scanResult.threatCategories.map((cat, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-full bg-white/5 text-blue-300 border border-blue-500/30 text-[11px] font-mono"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Threat Score Gauge */}
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black border border-white/10 min-w-[160px]">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">
                        Risk Score
                      </div>
                      <div className={`text-4xl md:text-5xl font-black ${colors.text} font-mono`}>
                        {scanResult.reputationScore}
                        <span className="text-base text-white/30 font-normal">/100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colors.gauge}`}
                          style={{ width: `${scanResult.reputationScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Blacklist Vendor Engines Grid */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-blue-400" />
                  <h4 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                    Multi-Engine Blacklist & Threat Feed Status
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {scanResult.blacklists.map((engine, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                        engine.detected
                          ? "bg-red-950/40 border-red-500/40"
                          : "bg-black border-white/10"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold font-mono text-white">
                          {engine.engine}
                        </div>
                        <div
                          className={`text-[11px] font-mono ${
                            engine.detected ? "text-red-400 font-semibold" : "text-white/40"
                          }`}
                        >
                          {engine.category}
                        </div>
                      </div>
                      {engine.detected ? (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Domain & Network Intelligence Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* ASN & Network */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/40 mb-2">
                    <Server className="w-3.5 h-3.5 text-blue-400" />
                    <span>ASN & HOSTING</span>
                  </div>
                  <div className="text-xs font-mono text-white">
                    <div>AS{scanResult.asn.number}</div>
                    <div className="text-blue-300 font-semibold truncate">{scanResult.asn.organization}</div>
                    <div className="text-white/40 text-[10px] mt-1">Country: {scanResult.asn.country} {scanResult.asn.city ? `(${scanResult.asn.city})` : ""}</div>
                  </div>
                </div>

                {/* IP Address */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/40 mb-2">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>IP RESOLUTION</span>
                  </div>
                  <div className="text-xs font-mono text-white">
                    <div className="text-blue-300 font-bold">{scanResult.ipAddress}</div>
                    <div className="text-white/40 text-[10px] mt-1">Direct DNS Host Target</div>
                  </div>
                </div>

                {/* SSL / TLS Status */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/40 mb-2">
                    <Lock className="w-3.5 h-3.5 text-green-400" />
                    <span>SSL / TLS CERTIFICATE</span>
                  </div>
                  <div className="text-xs font-mono text-white">
                    <div>{scanResult.sslStatus.issuer}</div>
                    <div className="text-blue-300 text-[11px]">{scanResult.sslStatus.protocol}</div>
                    <div className="text-white/40 text-[10px] mt-1">
                      {scanResult.sslStatus.daysRemaining} days validity remaining
                    </div>
                  </div>
                </div>

                {/* Domain Age */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/40 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>DOMAIN REGISTRATION AGE</span>
                  </div>
                  <div className="text-xs font-mono text-white">
                    <div className="text-blue-300 font-bold">{scanResult.domainAge}</div>
                    <div className="text-white/40 text-[10px] mt-1">WHOIS Registrar Record</div>
                  </div>
                </div>
              </div>

              {/* Risk Factors & Mitigation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Risk Factors */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <h4 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                      Identified Risk Indicators
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {scanResult.riskFactors.map((risk, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-black border border-white/10 text-xs font-mono text-white/80"
                      >
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mitigation Steps */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <h4 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                      Recommended Security Actions
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {scanResult.mitigationSteps.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-black border border-white/10 text-xs font-mono text-white/80"
                      >
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default UrlScanner;
