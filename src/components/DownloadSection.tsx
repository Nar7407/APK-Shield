import React, { useState, useRef } from "react";
import { Smartphone, Monitor, Download, ShieldCheck, Check, Copy, AlertCircle, Sparkles, HardDrive, Shield, Key } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LiquidText } from "./LiquidText";
import { cyberAudio } from "../lib/audio";

export function DownloadSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const downloadGlowY = useTransform(scrollYProgress, [0, 1], ["-70px", "70px"]);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const androidSha256 = "8f4a1c9e7b2d5a3f1e6c8a0d9b4f2e7a1c3b5d7e9f0a2c4e6b8d0a2f4c6e8b0a";
  const windowsSha256 = "3d7a9b1c5e8f2a4d6c0e8b2a4f6d8c0e2b4a6f8d0c2e4a6b8d0e2f4a6b8c0d2e";

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(label);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <section ref={sectionRef} id="download" className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
      {/* Ambient background glow with vertical parallax */}
      <motion.div
        style={{ y: downloadGlowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-4"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Official Client Releases</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="my-2 max-w-3xl mx-auto flex justify-center"
          >
            <LiquidText
              lines={[
                "Get APK Shield",
                "For Android & Desktop"
              ]}
              lineColors={["#ffffff", "#38bdf8"]}
              fontSize={110}
              className="h-28 sm:h-36 md:h-42 max-w-2xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Install APK Shield directly on your Android phone for continuous background app protection, or use the desktop edition to inspect packages before deployment.
          </motion.p>
        </div>

        {/* Two Large Download Cards Side by Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Android Card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="relative rounded-3xl bg-[#0f172a]/90 border border-blue-500/30 hover:border-blue-400/60 p-8 sm:p-10 flex flex-col justify-between transition-colors hover:shadow-2xl hover:shadow-blue-950/50 group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 group-hover:scale-105 transition-transform">
                  <Smartphone className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase">
                  Latest Stable
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-sans">
                  APK Shield for Android
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Continuous protection against fake banking APKs, WhatsApp Trojan drops, and harmful SMS interceptors.
                </p>
              </div>

              {/* Specs List */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 font-mono text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Version:</span>
                  <span className="text-white font-bold">v2.4.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">File Size:</span>
                  <span className="text-white font-bold">14.2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Requirements:</span>
                  <span className="text-white">Android 8.0+ (ARM64 / x86)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">License:</span>
                  <span className="text-emerald-400 font-bold">Free Commercial Client</span>
                </div>
              </div>

              {/* SHA256 Hash */}
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>SHA-256 CHECKSUM</span>
                  <button
                    onMouseEnter={() => cyberAudio.playHover()}
                    onClick={() => {
                      cyberAudio.playClick();
                      handleCopy(androidSha256, "android");
                    }}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedHash === "android" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-[10px] text-slate-400 truncate select-all">
                  {androidSha256}
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-8">
              <a
                onMouseEnter={() => cyberAudio.playHover()}
                onClick={() => cyberAudio.playClick()}
                href="/downloads/apkshield.apk"
                download
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base font-sans tracking-wide transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] active:scale-95 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download APK (14.2 MB)</span>
              </a>
            </div>
          </motion.div>

          {/* Windows Card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="relative rounded-3xl bg-[#0f172a]/90 border border-white/10 hover:border-blue-400/60 p-8 sm:p-10 flex flex-col justify-between transition-colors hover:shadow-2xl hover:shadow-blue-950/50 group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-200 group-hover:text-blue-400 group-hover:scale-105 transition-all">
                  <Monitor className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase">
                  Latest Stable
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-sans">
                  APK Shield for Windows
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Desktop security analyst workstation for batch APK file static disassembly, link inspection, and heuristic audits.
                </p>
              </div>

              {/* Specs List */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 font-mono text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Version:</span>
                  <span className="text-white font-bold">v2.4.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">File Size:</span>
                  <span className="text-white font-bold">38.6 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Requirements:</span>
                  <span className="text-white">Windows 10 / 11 (64-bit)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">License:</span>
                  <span className="text-emerald-400 font-bold">Free Commercial Client</span>
                </div>
              </div>

              {/* SHA256 Hash */}
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>SHA-256 CHECKSUM</span>
                  <button
                    onMouseEnter={() => cyberAudio.playHover()}
                    onClick={() => {
                      cyberAudio.playClick();
                      handleCopy(windowsSha256, "windows");
                    }}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedHash === "windows" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-[10px] text-slate-400 truncate select-all">
                  {windowsSha256}
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-8">
              <a
                onMouseEnter={() => cyberAudio.playHover()}
                onClick={() => cyberAudio.playClick()}
                href="/downloads/apkshield.exe"
                download
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 text-white font-bold text-base font-sans tracking-wide transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <Download className="w-5 h-5 text-slate-300" />
                <span>Download EXE (38.6 MB)</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Small Official Trust Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              Always verify file hashes and only download APK Shield from this official page.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
