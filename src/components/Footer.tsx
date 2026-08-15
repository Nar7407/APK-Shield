import React, { useState } from "react";
import { Shield, ShieldCheck, Activity, Lock, ArrowUp, Mail, FileText, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "The Problem", href: "#problem" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Live Scanner", href: "#scanner" },
    { label: "Download", href: "#download" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[#050811] border-t border-white/10 relative overflow-hidden text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                APK<span className="text-blue-400">Shield</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-blue-300">
                v2.4 Production
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-md leading-relaxed font-normal">
              APK Shield is a commercial-grade mobile threat intelligence platform engineered to detect weaponized Android APKs, fake banking apps, and phishing URLs before they compromise your data.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Threat Network Operational • 99.99% Uptime</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Downloads & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4">
              Resources &amp; Trust
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/downloads/apkshield.apk"
                  download
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Android Client (APK)</span>
                </a>
              </li>
              <li>
                <a
                  href="/downloads/apkshield.exe"
                  download
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Windows Client (EXE)</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Contact Security Team
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} APK Shield Security Systems. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Secure SHA-256 Verified Releases</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-blue-500/30 rounded-2xl max-w-lg w-full p-6 space-y-4 text-left shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-sans">Privacy Policy</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-300 font-normal leading-relaxed max-h-80 overflow-y-auto pr-2">
              <p>
                <strong>1. Ephemeral Processing:</strong> All APK files and URLs submitted to APK Shield are decompiled in volatile memory for threat heuristic analysis and immediately deleted post-analysis.
              </p>
              <p>
                <strong>2. Zero Data Harvesting:</strong> We do not log, retain, or share user contacts, file storage, SMS contents, or device identifiers.
              </p>
              <p>
                <strong>3. Telemetry &amp; Security:</strong> Anonymized threat signatures may be correlated with global threat intelligence feeds to improve proactive defense models.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-blue-500/30 rounded-2xl max-w-lg w-full p-6 space-y-4 text-left shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-sans">Terms of Service</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-300 font-normal leading-relaxed max-h-80 overflow-y-auto pr-2">
              <p>
                <strong>1. Authorized Use:</strong> APK Shield is designed to assist users and security administrators in auditing Android application packages and web links for malicious indicators.
              </p>
              <p>
                <strong>2. Advisory Nature:</strong> Risk ratings and threat assessments represent automated machine intelligence scoring and should be combined with general security vigilance.
              </p>
              <p>
                <strong>3. Software Distribution:</strong> APK Shield binaries are provided under standard commercial end-user licensing.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Security Team Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-blue-500/30 rounded-2xl max-w-lg w-full p-6 space-y-4 text-left shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-sans">Contact Threat Operations</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-300 font-normal leading-relaxed">
              <p>
                Need to report a false positive, submit a zero-day Android malware sample, or inquire about enterprise integrations?
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-blue-300 space-y-1">
                <div>Email: security@apkshield.com</div>
                <div>PGP Key ID: 0x8F4A1C9E7B2D5A3F</div>
                <div>Incident Response: 24/7 Monitoring Active</div>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
