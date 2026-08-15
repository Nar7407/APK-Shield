"use client";

import React, { useState } from "react";
import { Search, Database, Copy, Check, ShieldAlert, Cpu, Sparkles, ExternalLink, RefreshCw } from "lucide-react";
import { playHoverBlip, playScanStartSound } from "@/lib/sound";
import { FlipText } from "./ui/FlipText";

interface IocRecord {
  ioc: string;
  type: "SHA256" | "MD5" | "IP" | "DOMAIN" | "CVE";
  threatName: string;
  family: string;
  firstSeen: string;
  status: "Active" | "Sinkholed" | "Mitigated";
  severity: "Critical" | "High" | "Medium";
  c2Port?: number;
  description: string;
}

const PRESET_IOCS: IocRecord[] = [
  {
    ioc: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    type: "SHA256",
    threatName: "WannaCry.Crypt.v2",
    family: "Ransomware",
    firstSeen: "May 2017",
    status: "Sinkholed",
    severity: "Critical",
    description: "SMBv1 EternalBlue exploit worm spreading file encryption payload.",
  },
  {
    ioc: "7a57a5a743894a0e10b1ef380b2a8d5c",
    type: "MD5",
    threatName: "AgentTesla.Keylogger.Gen",
    family: "InfoStealer",
    firstSeen: "2024-Q3",
    status: "Active",
    severity: "Critical",
    description: ".NET based advanced info stealer extracting browser credentials and keystrokes.",
  },
  {
    ioc: "185.220.101.42",
    type: "IP",
    threatName: "CobaltStrike.TeamServer",
    family: "C2 Infrastructure",
    firstSeen: "August 2026",
    status: "Active",
    c2Port: 50050,
    severity: "High",
    description: "Known adversary command & control beacon listener hosted on offshore bulletproof IP.",
  },
  {
    ioc: "CVE-2023-38831",
    type: "CVE",
    threatName: "WinRAR Arbitrary Code Execution",
    family: "Weaponized Exploit",
    firstSeen: "August 2023",
    status: "Mitigated",
    severity: "Critical",
    description: "Vulnerability in WinRAR processing zip files containing spoofed file extensions.",
  },
  {
    ioc: "secure-appleid-verify-token.top",
    type: "DOMAIN",
    threatName: "AppleID.Harvest.Phish",
    family: "Phishing",
    firstSeen: "2 days ago",
    status: "Active",
    severity: "High",
    description: "Active phishing gateway capturing two-factor authentication tokens.",
  },
];

export function IocVault() {
  const [query, setQuery] = useState("");
  const [copiedIoc, setCopiedIoc] = useState<string | null>(null);

  const filteredIocs = PRESET_IOCS.filter(
    (item) =>
      item.ioc.toLowerCase().includes(query.toLowerCase()) ||
      item.threatName.toLowerCase().includes(query.toLowerCase()) ||
      item.family.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
  );

  const handleCopy = (ioc: string) => {
    navigator.clipboard.writeText(ioc);
    setCopiedIoc(ioc);
    setTimeout(() => setCopiedIoc(null), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative rounded-2xl bg-[#111111] border border-white/10 shadow-2xl p-6 md:p-8 overflow-hidden group">
        {/* Sleek top gradient highlight bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Database className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <FlipText duration={2.5}>IOC / HASH VAULT</FlipText>
              </h2>
              <p className="text-xs md:text-sm text-white/40 font-mono">
                Threat Indicators • Malware Hashes • C2 Beacon IPs • CVE Intel
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by SHA256 hash, MD5, IP address, CVE, or malware family name..."
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black border border-white/10 focus:border-blue-500/80 text-sm font-mono text-white placeholder:text-white/20 focus:outline-none shadow-inner"
          />
        </div>

        {/* IOC List */}
        <div className="mt-6 space-y-3">
          {filteredIocs.length > 0 ? (
            filteredIocs.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-500/15 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/30">
                      {item.type}
                    </span>
                    <span className="font-bold text-sm text-white font-mono">
                      {item.threatName}
                    </span>
                    <span className="text-xs text-white/40 font-mono">
                      • {item.family}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        item.severity === "Critical"
                          ? "bg-red-950 text-red-400 border border-red-500/30"
                          : "bg-amber-950 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {item.severity}
                    </span>
                    <span className="text-[11px] font-mono text-white/30">
                      Seen: {item.firstSeen}
                    </span>
                  </div>

                  <div className="font-mono text-xs text-blue-300 break-all">
                    {item.ioc}
                  </div>

                  <p className="text-xs text-white/60">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(item.ioc)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedIoc === item.ioc ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY IOC</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center rounded-xl bg-black border border-white/10 text-white/40 font-mono text-xs">
              No matching Indicator of Compromise found in vault for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IocVault;
