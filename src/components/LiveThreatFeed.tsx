"use client";

import React, { useState, useEffect } from "react";
import { Radar, ShieldAlert, Activity, Globe, RefreshCw, AlertTriangle, Cpu } from "lucide-react";
import { ThreatFeedItem } from "@/types";
import { FlipText } from "./ui/FlipText";
import { AsciiGlitchRipple } from "./ui/AsciiGlitchRipple";

export function LiveThreatFeed() {
  const [feedItems, setFeedItems] = useState<ThreatFeedItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchThreats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/threat-feed");
      const data = await res.json();
      if (data.success) {
        setFeedItems(data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreats();
    const interval = setInterval(fetchThreats, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative rounded-2xl bg-[#111111] border border-white/10 shadow-2xl p-6 md:p-8 overflow-hidden group">
        {/* Sleek top gradient highlight bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Radar className="w-6 h-6 animate-pulse text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <FlipText duration={2.5}>GLOBAL THREAT RADAR</FlipText>
              </h2>
              <p className="text-xs md:text-sm text-white/40 font-mono">
                Real-Time Worldwide Zero-Day Ingestion & Honeypot Intercepts
              </p>
            </div>
          </div>

          <button
            onClick={fetchThreats}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 text-xs font-mono text-white/80 hover:text-blue-300 flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>SYNC FEED</span>
          </button>
        </div>

        {/* Live Threat Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedItems.map((threat) => (
            <div
              key={threat.id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 font-mono text-[10px] font-bold border border-blue-500/30">
                    {threat.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      threat.severity === "critical"
                        ? "bg-red-950 text-red-400 border border-red-500/30"
                        : threat.severity === "high"
                        ? "bg-amber-950 text-amber-400 border border-amber-500/30"
                        : "bg-blue-950 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {threat.severity.toUpperCase()}
                  </span>
                </div>

                <div className="text-sm font-bold text-white font-mono mb-1">
                  {threat.threatName}
                </div>

                <div className="font-mono text-xs text-blue-300 break-all mb-3">
                  <AsciiGlitchRipple dur={1200} spread={1.2}>
                    {threat.indicator}
                  </AsciiGlitchRipple>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-blue-400" />
                  <span>Origin: {threat.originCountry}</span>
                </div>
                <div className="text-white/30">{threat.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveThreatFeed;
