import React from "react";
import {
  UploadCloud,
  SearchCode,
  Cpu,
  Gauge,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  MousePointerClick,
} from "lucide-react";
import { LiquidText } from "./LiquidText";

export function HowItWorksSection() {


  const steps = [
    {
      number: "01",
      icon: UploadCloud,
      title: "Upload APK or Paste Link",
      prompt: "STEP 1: UPLOAD",
      subtitle: "Drop .apk or URL",
      description:
        "Upload any Android .apk package from your phone or PC, or paste a suspicious link received via WhatsApp, Telegram, or SMS.",
      details: "Full cryptographic hashing (SHA256/MD5) and immediate VirusTotal database lookup initialized upon upload.",
      gradient: "linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)",
    },
    {
      number: "02",
      icon: SearchCode,
      title: "Deep Permission Audit",
      prompt: "STEP 2: AUDIT",
      subtitle: "Analyze Manifest",
      description:
        "APK Shield decompiles the AndroidManifest and DEX code to detect high-risk permissions like SMS intercepts, Accessibility abuse, and Screen Overlays.",
      details: "Detects hidden keylogger triggers and deceptive system prompt spoofing.",
      gradient: "linear-gradient(43deg, rgb(30, 144, 255) 0%, rgb(138, 43, 226) 50%, rgb(255, 105, 180) 100%)",
    },
    {
      number: "03",
      icon: Cpu,
      title: "Neural AI Threat Scan",
      prompt: "STEP 3: AI SCAN",
      subtitle: "Gemini + Threat Feeds",
      description:
        "Our neural intelligence engine cross-examines payload signatures against VirusTotal live feeds and known banking trojan patterns in real time.",
      details: "Identifies SharkBot, Anatsa, SpyNote, and evasive APK droppers in seconds.",
      gradient: "linear-gradient(43deg, rgb(15, 118, 110) 0%, rgb(14, 165, 233) 50%, rgb(168, 85, 247) 100%)",
    },
    {
      number: "04",
      icon: Gauge,
      title: "Instant 0–100 Risk Score",
      prompt: "STEP 4: SCORE",
      subtitle: "Calculated Rating",
      description:
        "Receive a transparent, mathematical risk score that aggregates antivirus consensus, permission risk weight, and domain reputation.",
      details: "Zero ambiguous cybersecurity jargon — scored from 0 (verified clean) to 100 (confirmed malware).",
      gradient: "linear-gradient(43deg, rgb(217, 119, 6) 0%, rgb(239, 68, 68) 50%, rgb(219, 39, 119) 100%)",
    },
    {
      number: "05",
      icon: ShieldCheck,
      title: "Plain-English Guidance",
      prompt: "STEP 5: VERDICT",
      subtitle: "Actionable Steps",
      description:
        "Get an immediate plain-English verdict (Safe, Suspicious, or Dangerous) with simple step-by-step guidance on whether to install or delete.",
      details: "Provides containment advice: safe uninstall procedures, bank alerts, and credential reset checklists.",
      gradient: "linear-gradient(43deg, rgb(16, 185, 129) 0%, rgb(6, 182, 212) 50%, rgb(59, 130, 246) 100%)",
    },
  ];

  const trackerSlots = Array.from({ length: 25 }, (_, i) => `tr-${i + 1}`);

  return (
    <section id="how-it-works" className="py-24 bg-[#070c18] relative overflow-hidden border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive 3D Process Engine</span>
          </div>

          <div className="my-2 max-w-4xl mx-auto flex justify-center">
            <LiquidText
              lines={[
                "How APK Shield",
                "Protects You in Real-Time"
              ]}
              lineColors={["#ffffff", "#38bdf8"]}
              fontSize={135}
              className="h-28 sm:h-36 md:h-44 max-w-3xl"
            />
          </div>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Hover or slide over each card to experience how APK Shield turns complex code disassembly, VirusTotal threat telemetry, and neural AI into instant protection.
          </p>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-blue-400/80">
            <MousePointerClick className="w-4 h-4 animate-pulse" />
            <span>Hover / Move cursor across cards for interactive 3D physics</span>
          </div>
        </div>

        {/* 5-Step 3D Interactive Tracker Cards Grid */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center group"
              >
                {/* 3D Tracker Card Container */}
                <div className="container noselect">
                  <div className="canvas">
                    {trackerSlots.map((tr) => (
                      <div key={tr} className={`tracker ${tr}`} />
                    ))}

                    <div
                      id="card"
                      className="tracker-card"
                      style={{
                        background: step.gradient,
                      }}
                    >
                      {/* IDLE LAYER - Visible when not hovered */}
                      <div className="card-idle-layer">
                        {/* Top Icon Badge */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-lg">
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-black font-mono text-white/90 border border-white/20">
                          {step.number}
                        </div>

                        {/* Centered Large Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-black/20 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-2 shadow-inner">
                          <Icon className="w-7 h-7" />
                        </div>

                        {/* Prompt text pinned at bottom */}
                        <p id="prompt" className="prompt-text">
                          {step.prompt}
                        </p>

                        {/* Subtitle pinned at bottom */}
                        <div className="subtitle text-[11px] font-mono font-medium text-white/90 drop-shadow">
                          {step.subtitle}
                        </div>
                      </div>

                      {/* HOVER LAYER - Reveals all the details on hover */}
                      <div className="card-hover-details">
                        <div>
                          {/* Header inside card */}
                          <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/15">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 font-mono text-[10px] font-bold">
                                {step.number}
                              </span>
                              <span className="text-xs font-bold text-white font-sans truncate">
                                {step.title}
                              </span>
                            </div>
                            <Icon className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
                          </div>

                          {/* Full Detailed Description */}
                          <p className="text-[11px] text-slate-200 font-sans leading-relaxed mt-2">
                            {step.description}
                          </p>
                        </div>

                        {/* Security Telemetry Details */}
                        <div className="mt-2 pt-2 border-t border-white/10">
                          <div className="text-[9px] font-mono text-blue-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                            <span>Security Engine</span>
                          </div>
                          <div className="text-[10px] text-slate-300 font-mono line-clamp-2 leading-tight">
                            {step.details}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Verdict Sample Showcase */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-black/50 border border-white/10 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white font-sans">
              Sample Verdict Outputs You Can Expect
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Designed for regular users — clear color coding, zero ambiguous jargon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
            {/* Safe */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-left hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase">
                  Risk Score: 04 / 100
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-emerald-200">SAFE TO USE</h4>
              <p className="text-xs text-slate-300 mt-1">
                Official Google Authenticator package. Permissions match typical 2FA security utilities with no suspicious network endpoints.
              </p>
            </div>

            {/* Suspicious */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-left hover:border-amber-500/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase">
                  Risk Score: 58 / 100
                </span>
                <ShieldAlert className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-amber-200">SUSPICIOUS APP</h4>
              <p className="text-xs text-slate-300 mt-1">
                Modded messaging app asking for full SMS read permissions and device administrator access without valid reason.
              </p>
            </div>

            {/* Dangerous */}
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-left hover:border-red-500/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-[10px] font-bold uppercase">
                  Risk Score: 96 / 100
                </span>
                <ShieldAlert className="w-5 h-5 text-red-400" />
              </div>
              <h4 className="text-sm font-bold text-red-200">DANGEROUS MALWARE</h4>
              <p className="text-xs text-slate-300 mt-1">
                Fake banking APK containing SharkBot Trojan code. Automatically intercepts bank OTPs and opens hidden payment overlays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

