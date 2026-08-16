import React, { useState, useRef } from "react";
import { AlertOctagon, Smartphone, Link as LinkIcon, MessageSquare, KeyRound, ShieldAlert, ArrowRight, XCircle, AlertTriangle, Check, RefreshCw, Eye, Lock, ExternalLink, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LiquidText } from "./LiquidText";

export function ProblemSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgRedY = useTransform(scrollYProgress, [0, 1], ["-60px", "60px"]);
  const bgBlueY = useTransform(scrollYProgress, [0, 1], ["60px", "-60px"]);
  const gridShiftY = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);

  const flipCardsData = [
    {
      title: "Fake APK Droppers",
      description: "Counterfeit WhatsApp, Banking & KYC apps distributed via SMS, stealing full storage and SMS control.",
      svgPath: "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
      tag: "APK Malware",
    },
    {
      title: "Phishing Link Fraud",
      description: "Deceptive fake web links mimicking official login portals to capture passwords and active sessions.",
      svgPath: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
      tag: "Link Fraud",
    },
    {
      title: "OTP & SMS Theft",
      description: "Hidden permissions intercept banking 2FA codes silently, bypassing multi-factor verification.",
      svgPath: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80",
      tag: "2FA Interception",
    },
    {
      title: "Credential Stolen",
      description: "Harvested account credentials and tokens traded on darknet markets, triggering instant financial loss.",
      svgPath: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      tag: "Data Exfiltration",
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
    <section ref={sectionRef} id="problem" className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting with vertical parallax */}
      <motion.div
        style={{ y: bgRedY }}
        className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: bgBlueY }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ef4444 1px, transparent 1px), linear-gradient(to bottom, #ef4444 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          y: gridShiftY,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-mono uppercase tracking-wider mb-4"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
            <span>The Modern Mobile Threat Reality</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="my-2 max-w-4xl mx-auto flex justify-center"
          >
            <LiquidText
              lines={[
                "Fake Apps and Phishing Sites",
                "Are Stealing Credentials Every Day"
              ]}
              lineColors={["#ffffff", "#f87171"]}
              fontSize={110}
              className="h-28 sm:h-36 md:h-42 max-w-4xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Cybercriminals routinely distribute weaponized Android APKs and clone websites through WhatsApp, SMS, and Telegram. Once installed, these apps steal one-time passwords (OTPs), intercept banking codes, and harvest credentials without your knowledge.
          </motion.p>
        </div>

        {/* Threat Visual Photo Cards Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {flipCardsData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center"
            >
              {/* Interactive 3D Flip Card */}
              <div className="card card-cyber cursor-pointer w-full group">
                <svg viewBox="0 0 24 24" className="text-blue-400">
                  <path d={item.svgPath} />
                </svg>

                <div className="card__content">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30 mb-2 inline-block">
                    {item.tag}
                  </span>
                  <p className="card__title">{item.title}</p>
                  <p className="card__description">{item.description}</p>
                </div>
              </div>

              {/* Related Threat Photo Preview */}
              <div className="mt-3 w-full rounded-xl overflow-hidden border border-white/10 bg-black/40 p-2 group-hover:border-blue-500/40 transition-colors">
                <div className="relative h-28 w-full rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                    <span className="text-[10px] font-mono text-slate-300 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-red-400" />
                      <span>{item.tag} Target</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Threat Anatomy Graphic Banner with Real-time Photo Evidence */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl bg-[#0b1122] border border-blue-500/20 p-6 sm:p-10 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-white/10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
                Anatomy of an Attack
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
                How Attackers Bypass Traditional Antivirus
              </h3>
              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                Attackers use polymorphic APK droppers and deceptive spoofed URL links that traditional signature-based antivirus cannot detect. By the time a signature is updated, millions in bank balances and OTPs have already been stolen.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-red-500/30 shadow-xl bg-black">
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
                  alt="Malicious APK and Phishing Link Detection"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-xs font-mono text-red-400 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Real Phishing Link &amp; Fake APK Payload</span>
                  </span>
                  <p className="text-[11px] text-slate-300 mt-1 font-mono">
                    Zero-day droppers disguise as system updates to steal OTP credentials.
                  </p>
                </div>
              </div>
            </div>
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
        </motion.div>
      </div>
    </section>
  );
}

