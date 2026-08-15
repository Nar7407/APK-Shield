import React, { useState } from "react";
import { AlertOctagon, Smartphone, Link as LinkIcon, MessageSquare, KeyRound, ShieldAlert, ArrowRight, XCircle, AlertTriangle, Check, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export function ProblemSection() {
  const [activeStep, setActiveStep] = useState(0);

  const threatCards = [
    {
      icon: Smartphone,
      title: "Fake Banking & KYC Apps",
      description: "Attackers disguise malicious APKs as urgent banking updates, KYC verifiers, or government payment portals to hijack your bank accounts.",
      tag: "Banking Trojans",
      color: "border-red-500/30 bg-red-950/20 text-red-400",
    },
    {
      icon: LinkIcon,
      title: "Deceptive Phishing Links",
      description: "Convincing fake login pages mimic Google, Apple, WhatsApp, or payroll portals to steal your passwords and session tokens instantly.",
      tag: "Credential Theft",
      color: "border-amber-500/30 bg-amber-950/20 text-amber-400",
    },
    {
      icon: MessageSquare,
      title: "OTP & SMS Interception",
      description: "Malicious APKs abuse hidden SMS permissions to intercept two-factor authentication (2FA) codes and drain bank accounts silently.",
      tag: "2FA Bypass",
      color: "border-purple-500/30 bg-purple-950/20 text-purple-400",
    },
    {
      icon: KeyRound,
      title: "Silent Screen & Key Overlays",
      description: "Invisible overlay windows capture keystrokes, lock screen PINs, and passwords without triggering standard Android OS warnings.",
      tag: "Overlay Attacks",
      color: "border-rose-500/30 bg-rose-950/20 text-rose-400",
    },
  ];

  const attackFlowSteps = [
    {
      step: 1,
      title: "Delivery via WhatsApp or SMS",
      desc: "Attackers message you claiming an urgent package delivery issue, KYC suspension, or tax refund with a link to download an APK or visit a portal.",
      riskBadge: "Social Engineering",
    },
    {
      step: 2,
      title: "User Installs APK or Opens Link",
      desc: "Believing the message is official, the user downloads the unknown file or submits their username and password onto the spoofed web page.",
      riskBadge: "Execution / Phishing",
    },
    {
      step: 3,
      title: "Malware Intercepts OTPs & Keys",
      desc: "The APK requests hidden Accessibility or SMS permissions, reading incoming bank OTP messages and forwarding them to attacker servers.",
      riskBadge: "Silent Data Exfiltration",
    },
    {
      step: 4,
      title: "Account Takeover & Financial Loss",
      desc: "The attacker uses the intercepted OTP and credentials to execute unauthorized bank transfers, drain crypto wallets, or lock the victim out.",
      riskBadge: "Account Compromise",
    },
  ];

  return (
    <section id="problem" className="py-24 bg-[#090e1c] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-mono uppercase tracking-wider mb-4">
            <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
            <span>The Modern Mobile Threat Reality</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
            Fake Apps and Phishing Sites Are Stealing Credentials Every Day
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Cybercriminals routinely distribute weaponized Android APKs and clone websites through WhatsApp, SMS, and Telegram. Once installed, these apps steal one-time passwords (OTPs), intercept banking codes, and harvest credentials without your knowledge.
          </p>
        </div>

        {/* 4 Threat Dimension Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {threatCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0f172a]/90 border border-white/10 hover:border-red-500/40 p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/20 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${card.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-red-200 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-red-400/90">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>High Risk Vector</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Attack Flow Visualization */}
        <div className="mt-16 rounded-3xl bg-[#0b1122] border border-blue-500/20 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
                Anatomy of an Attack
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-1 font-sans">
                How Attackers Bypass Traditional Antivirus
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md font-mono">
              Traditional antivirus only checks for outdated file names. APK Shield uses real-time AI to inspect runtime permissions and site reputation before harm is done.
            </p>
          </div>

          {/* Flow Stepper Bar */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {attackFlowSteps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                  activeStep === idx
                    ? "bg-blue-950/40 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                    : "bg-black/40 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      activeStep === idx
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    0{step.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-950/60 border border-red-500/30 text-red-300">
                    {step.riskBadge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1.5 font-sans">
                  {step.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {step.desc}
                </p>

                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-[#0b1122] border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Solution Banner */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-blue-900/40 to-slate-900/60 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
                <Check className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-sans">
                  Where APK Shield Stops The Attack
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  APK Shield intercepts the payload at Step 1 and Step 2 — alerting you before you install or submit credentials.
                </p>
              </div>
            </div>

            <a
              href="#download"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold font-mono tracking-wide uppercase transition-all shadow-md"
            >
              Get Protected Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
