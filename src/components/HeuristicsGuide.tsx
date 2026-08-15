"use client";

import React from "react";
import { Zap, ShieldCheck, Terminal, Cpu, Lock, Layers, Activity } from "lucide-react";
import { FlipText } from "./ui/FlipText";

export function HeuristicsGuide() {
  const topics = [
    {
      icon: Cpu,
      title: "Shannon Entropy (0.00 - 8.00)",
      description:
        "Measures randomness in raw file byte distributions. Plain text or standard source code averages 4.0–5.5. Binary executables without packing score ~6.0–6.8. Encrypted ransomware blobs or UPX/Themida packed binaries exceed 7.20.",
    },
    {
      icon: Layers,
      title: "MITRE ATT&CK Matrix Correlation",
      description:
        "Maps discovered code signatures against standard adversary tactics (T1059 Command Execution, T1027 Defense Evasion, T1547 Persistence, T1071 C2 Communication) allowing SOC incident responders to anticipate attack chains.",
    },
    {
      icon: Terminal,
      title: "Automated YARA Signature Synthesis",
      description:
        "Generates pattern matching rules targeting unique strings, PE header anomalies, and malicious regex artifacts so your perimeter SIEM and EDR solutions can immediately quarantine related variants.",
    },
    {
      icon: Lock,
      title: "URL Brand Impersonation & Typosquatting",
      description:
        "Detects punycode homoglyphs, newly registered domain (NRD) anomalies, SSL certificate mismatch, and deceptive paths impersonating tech giants and financial institutions.",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative rounded-2xl bg-[#111111] border border-white/10 shadow-2xl p-6 md:p-8 overflow-hidden group">
        {/* Sleek top gradient highlight bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <FlipText duration={2.5}>THREAT ENGINE ARCHITECTURE</FlipText>
            </h2>
            <p className="text-xs md:text-sm text-white/40 font-mono">
              Deep Heuristics • Static Byte Analysis • Gemini 3.7 AI Reasoning
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-mono">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-white/60 leading-relaxed pt-1">
                  {topic.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HeuristicsGuide;
