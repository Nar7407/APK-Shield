import React from "react";
import { UploadCloud, SearchCode, Cpu, Gauge, CheckCircle2, ShieldCheck, ShieldAlert, ArrowRight, Smartphone, Sparkles, Lock } from "lucide-react";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: UploadCloud,
      title: "Upload File or Paste Link",
      description: "Upload any Android .apk file you downloaded, or simply paste a suspicious web link you received via WhatsApp, SMS, or Telegram.",
      accent: "from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/30",
    },
    {
      number: "02",
      icon: SearchCode,
      title: "Deep Permission & Code Scan",
      description: "APK Shield inspects the internal app structure, checking if it requests excessive permissions like silent SMS reading, background audio, or screen overlays.",
      accent: "from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30",
    },
    {
      number: "03",
      icon: Cpu,
      title: "AI Threat Intelligence Check",
      description: "Our neural AI models cross-reference the app and link against global threat feeds, known banking trojans, and phishing kit patterns in real-time.",
      accent: "from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/30",
    },
    {
      number: "04",
      icon: Gauge,
      title: "Instant 0–100 Risk Score",
      description: "You receive a clear numeric risk score alongside an easy-to-understand breakdown explaining in everyday language why something is risky.",
      accent: "from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30",
    },
    {
      number: "05",
      icon: ShieldCheck,
      title: "Plain-English Recommendation",
      description: "Get an immediate, actionable verdict: Safe, Suspicious, or Dangerous — with clear guidance on what steps you should take.",
      accent: "from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#070c18] relative overflow-hidden border-t border-white/5">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Simple, Transparent &amp; Fast</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
            How APK Shield Protects You
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            You don't need to be a cybersecurity specialist to stay safe. APK Shield turns complex code disassembly and network intelligence into a simple risk score with plain-English instructions.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-[#0c1427]/90 border border-white/10 p-6 flex flex-col justify-between transition-all hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-b ${step.accent} border`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-black font-mono text-white/30 group-hover:text-blue-400 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 font-sans">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Automated in Seconds</span>
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
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-left">
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
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-left">
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
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-left">
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
