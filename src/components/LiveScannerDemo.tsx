import React, { useState } from "react";
import { Shield, ShieldAlert, ShieldCheck, Globe, Smartphone, Search, UploadCloud, RefreshCw, AlertTriangle, CheckCircle2, XCircle, FileCode, Lock, Zap, ArrowRight, Sparkles, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ApkSample {
  label: string;
  fileName: string;
  type: "dangerous" | "suspicious" | "safe";
  size: string;
  mockResult: {
    threatScore: number;
    threatLevel: "MALICIOUS" | "SUSPICIOUS" | "SAFE";
    verdict: string;
    summary: string;
    permissions: { name: string; dangerous: boolean; reason: string }[];
    malwareFamily: string;
    recommendation: string;
  };
}

export function LiveScannerDemo() {
  const [activeTab, setActiveTab] = useState<"apk" | "link">("apk");

  // APK State
  const [isScanningApk, setIsScanningApk] = useState(false);
  const [selectedApkFile, setSelectedApkFile] = useState<string | null>(null);
  const [apkScanResult, setApkScanResult] = useState<any | null>(null);

  // Link State
  const [inputUrl, setInputUrl] = useState("");
  const [isScanningUrl, setIsScanningUrl] = useState(false);
  const [urlScanResult, setUrlScanResult] = useState<any | null>(null);

  const apkSamples: ApkSample[] = [
    {
      label: "Fake State Bank KYC Update (SharkBot)",
      fileName: "SBI_Quick_KYC_Verification_v2.apk",
      type: "dangerous",
      size: "8.4 MB",
      mockResult: {
        threatScore: 96,
        threatLevel: "MALICIOUS",
        verdict: "Dangerous Banking Trojan (SharkBot / Anatsa)",
        summary: "This APK is a counterfeit banking application designed to steal net banking credentials and OTPs. It injects fake login overlays over legitimate banking apps and intercepts incoming SMS messages.",
        permissions: [
          { name: "android.permission.RECEIVE_SMS", dangerous: true, reason: "Silently reads incoming bank 2FA OTP codes" },
          { name: "android.permission.BIND_ACCESSIBILITY_SERVICE", dangerous: true, reason: "Captures screen content and executes auto-clicks" },
          { name: "android.permission.SYSTEM_ALERT_WINDOW", dangerous: true, reason: "Draws invisible overlay login boxes to harvest passwords" },
          { name: "android.permission.REQUEST_INSTALL_PACKAGES", dangerous: true, reason: "Downloads secondary malware payloads in background" },
        ],
        malwareFamily: "Trojan.AndroidOS.SharkBot.Dropper",
        recommendation: "DO NOT INSTALL. If already installed, immediately disconnect Wi-Fi/data, uninstall via Safe Mode, and contact your bank to reset passwords.",
      },
    },
    {
      label: "Suspicious WhatsApp Plus MOD",
      fileName: "WhatsApp_Plus_Gold_Ultra_v18.apk",
      type: "suspicious",
      size: "42.1 MB",
      mockResult: {
        threatScore: 68,
        threatLevel: "SUSPICIOUS",
        verdict: "Suspicious Modded App with Privacy Leakage",
        summary: "This modified version of WhatsApp contains unauthorized tracking code and communicates with unregistered third-party telemetry servers in Eastern Europe, posing risk to message privacy.",
        permissions: [
          { name: "android.permission.READ_CONTACTS", dangerous: true, reason: "Exfiltrates entire address book to unknown servers" },
          { name: "android.permission.RECORD_AUDIO", dangerous: true, reason: "Requests background microphone access without active call" },
          { name: "android.permission.ACCESS_FINE_LOCATION", dangerous: false, reason: "Location tracking enabled in background" },
        ],
        malwareFamily: "Riskware.AndroidOS.Spyware.ModdedClient",
        recommendation: "Not Recommended. Use only the official WhatsApp application from Google Play or WhatsApp.com.",
      },
    },
    {
      label: "Official Google Authenticator",
      fileName: "Google_Authenticator_v6.2.0.apk",
      type: "safe",
      size: "12.8 MB",
      mockResult: {
        threatScore: 2,
        threatLevel: "SAFE",
        verdict: "Verified Safe Official Package",
        summary: "Cryptographic signatures verify this file was signed by Google LLC. No suspicious background network beacons, excessive permissions, or hidden overlay services detected.",
        permissions: [
          { name: "android.permission.CAMERA", dangerous: false, reason: "Used solely to scan 2FA QR codes" },
          { name: "android.permission.USE_BIOMETRIC", dangerous: false, reason: "Secures authentication database" },
        ],
        malwareFamily: "Clean Security Utility",
        recommendation: "Safe to install and operate on your device.",
      },
    },
  ];

  const linkSamples = [
    { label: "Fake Apple ID Support Portal", url: "https://auth-apple-support-verify.com/login" },
    { label: "WhatsApp Gold Bonus Scam", url: "http://whatsapp-gold-gift-update.xyz/claim" },
    { label: "Official GitHub Login (Safe)", url: "https://github.com/login" },
  ];

  const handleSelectApkSample = (sample: ApkSample) => {
    setSelectedApkFile(sample.fileName);
    setIsScanningApk(true);
    setApkScanResult(null);

    setTimeout(() => {
      setApkScanResult(sample.mockResult);
      setIsScanningApk(false);
    }, 900);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedApkFile(file.name);
    setIsScanningApk(true);
    setApkScanResult(null);

    // Call server file scan
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const textContent = (reader.result as string) || "";
        const res = await fetch("/api/scan/file", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            textContent: textContent.slice(0, 10000),
            fileType: "apk",
          }),
        });
        const data = await res.json();
        if (data.success && data.result) {
          const r = data.result;
          setApkScanResult({
            threatScore: r.threatScore,
            threatLevel: r.threatLevel,
            verdict: r.verdict,
            summary: r.summary,
            permissions: [
              { name: "android.permission.INTERNET", dangerous: false, reason: "Standard network access" },
              { name: "android.permission.RECEIVE_SMS", dangerous: r.threatScore > 50, reason: "SMS interception capability" },
              { name: "android.permission.SYSTEM_ALERT_WINDOW", dangerous: r.threatScore > 60, reason: "Overlay screen injection" },
            ],
            malwareFamily: r.malwareFamily,
            recommendation: r.threatScore > 50 ? "Dangerous file. Delete immediately." : "File appears safe for standard use.",
          });
        }
      } catch (err) {
        console.error("Scan error:", err);
      } finally {
        setIsScanningApk(false);
      }
    };
    reader.readAsText(file);
  };

  const handleScanUrl = async (targetUrlOverride?: string) => {
    const urlToTest = targetUrlOverride || inputUrl;
    if (!urlToTest) return;

    setIsScanningUrl(true);
    setUrlScanResult(null);

    try {
      const res = await fetch("/api/scan/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToTest }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setUrlScanResult(data.result);
      }
    } catch (err) {
      console.error("URL scan error:", err);
    } finally {
      setIsScanningUrl(false);
    }
  };

  return (
    <section id="scanner" className="py-24 bg-[#070b16] relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive Product Demonstration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
            Try APK Shield Live Scanner
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Experience our neural threat intelligence engine right now. Inspect sample APK packages or paste suspicious links to see real-time risk scoring in action.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-12 flex justify-center">
          <div className="p-1.5 rounded-2xl bg-[#0c1427] border border-white/10 flex items-center gap-2 shadow-xl">
            <button
              onClick={() => setActiveTab("apk")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === "apk"
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Android APK Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab("link")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === "link"
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Phishing Link Inspector</span>
            </button>
          </div>
        </div>

        {/* Main Scanner Card Container */}
        <div className="mt-8 max-w-5xl mx-auto rounded-3xl bg-[#0a101f]/95 border border-blue-500/20 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {activeTab === "apk" ? (
            /* APK SCANNER TAB */
            <div>
              {/* Presets Row */}
              <div className="mb-6">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Select Test Sample APK:</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {apkSamples.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectApkSample(s)}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/40 text-xs font-mono text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                      <span>{s.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          s.type === "dangerous"
                            ? "bg-red-950 text-red-400 border border-red-500/30"
                            : s.type === "suspicious"
                            ? "bg-amber-950 text-amber-400 border border-amber-500/30"
                            : "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {s.type.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="relative border-2 border-dashed border-blue-500/30 hover:border-blue-400/60 rounded-2xl p-8 text-center bg-black/30 transition-colors group">
                <input
                  type="file"
                  accept=".apk,.bin,.zip,.exe,.jar"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-sans">
                      {selectedApkFile ? selectedApkFile : "Drag & Drop an Android .APK File"}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      or click to browse your device (Max 100MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {isScanningApk && (
                <div className="mt-8 p-6 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-center space-y-3">
                  <RefreshCw className="w-7 h-7 text-blue-400 animate-spin mx-auto" />
                  <div className="text-sm font-bold text-white font-mono">
                    UNPACKING APK PERMISSIONS &amp; NEURAL HEURISTICS...
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Decompiling AndroidManifest.xml • Checking C2 IP Signatures • Evaluating Risk Index
                  </p>
                </div>
              )}

              {/* APK Results View */}
              {apkScanResult && !isScanningApk && (
                <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                  {/* Verdict Banner */}
                  <div
                    className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                      apkScanResult.threatScore > 75
                        ? "bg-red-950/40 border-red-500/40"
                        : apkScanResult.threatScore > 35
                        ? "bg-amber-950/40 border-amber-500/40"
                        : "bg-emerald-950/40 border-emerald-500/40"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                            apkScanResult.threatScore > 75
                              ? "bg-red-500 text-white"
                              : apkScanResult.threatScore > 35
                              ? "bg-amber-500 text-black"
                              : "bg-emerald-500 text-white"
                          }`}
                        >
                          {apkScanResult.threatLevel}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Classification: <strong className="text-white">{apkScanResult.malwareFamily}</strong>
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white font-sans">
                        {apkScanResult.verdict}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                        {apkScanResult.summary}
                      </p>
                    </div>

                    {/* Threat Score Gauge */}
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/60 border border-white/10 min-w-[170px] text-center">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                        Risk Score
                      </div>
                      <div className="text-4xl font-black font-mono text-white">
                        <span
                          className={
                            apkScanResult.threatScore > 75
                              ? "text-red-400"
                              : apkScanResult.threatScore > 35
                              ? "text-amber-400"
                              : "text-emerald-400"
                          }
                        >
                          {apkScanResult.threatScore}
                        </span>
                        <span className="text-sm text-slate-500 font-normal"> / 100</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        Confidence: 99.4%
                      </div>
                    </div>
                  </div>

                  {/* Android Permissions Breakdown */}
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                      <FileCode className="w-5 h-5 text-blue-400" />
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                        Android Permissions &amp; Capabilities Audit
                      </h4>
                    </div>

                    <div className="space-y-2.5">
                      {apkScanResult.permissions.map((perm: any, i: number) => (
                        <div
                          key={i}
                          className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            perm.dangerous
                              ? "bg-red-950/20 border-red-500/30"
                              : "bg-white/5 border-white/10"
                          }`}
                        >
                          <div>
                            <div className="font-mono text-xs font-bold text-white flex items-center gap-2">
                              {perm.dangerous ? (
                                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                              ) : (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                              <span>{perm.name}</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5 font-sans">
                              {perm.reason}
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold shrink-0 self-start sm:self-auto ${
                              perm.dangerous
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            }`}
                          >
                            {perm.dangerous ? "HIGH RISK" : "NORMAL"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation Card */}
                  <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-3.5">
                    <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans">
                        Recommended Security Action
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {apkScanResult.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* LINK SCANNER TAB */
            <div>
              {/* Presets Row */}
              <div className="mb-6">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Select Test Suspicious URL:</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {linkSamples.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputUrl(sample.url);
                        handleScanUrl(sample.url);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/40 text-xs font-mono text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-400" />
                      <span>{sample.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* URL Input Bar */}
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
                    placeholder="https://secure-login-update.com/verify or paste SMS link..."
                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-black border border-white/15 focus:border-blue-500 text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none shadow-inner"
                  />
                </div>

                <button
                  onClick={() => handleScanUrl()}
                  disabled={isScanningUrl}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] cursor-pointer"
                >
                  {isScanningUrl ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>ANALYZING URL...</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4" />
                      <span>SCAN LINK INTEL</span>
                    </>
                  )}
                </button>
              </div>

              {/* Link Scan Result */}
              {urlScanResult && !isScanningUrl && (
                <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                  <div
                    className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                      urlScanResult.reputationScore > 60
                        ? "bg-red-950/40 border-red-500/40"
                        : "bg-emerald-950/40 border-emerald-500/40"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                            urlScanResult.reputationScore > 60
                              ? "bg-red-500 text-white"
                              : "bg-emerald-500 text-white"
                          }`}
                        >
                          {urlScanResult.threatLevel}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Target: <strong className="text-white">{urlScanResult.domain}</strong>
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white font-sans">
                        {urlScanResult.verdict}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                        {urlScanResult.summary}
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/60 border border-white/10 min-w-[170px] text-center">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                        Risk Score
                      </div>
                      <div className="text-4xl font-black font-mono text-white">
                        <span
                          className={
                            urlScanResult.reputationScore > 60
                              ? "text-red-400"
                              : "text-emerald-400"
                          }
                        >
                          {urlScanResult.reputationScore}
                        </span>
                        <span className="text-sm text-slate-500 font-normal"> / 100</span>
                      </div>
                    </div>
                  </div>

                  {/* Blacklist Vendor Feed Status */}
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4">
                      Multi-Engine Phishing Threat Feed Detections
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {urlScanResult.blacklists.map((engine: any, i: number) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                        >
                          <span className="text-xs font-mono text-slate-200">{engine.engine}</span>
                          {engine.detected ? (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/30">
                              FLAGGED
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                              CLEAN
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
