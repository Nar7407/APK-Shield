import React, { useState, useRef } from "react";
import { ChevronDown, HelpCircle, Shield, Sparkles, Lock } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { LiquidText } from "./LiquidText";
import { cyberAudio } from "../lib/audio";

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const faqGlowY = useTransform(scrollYProgress, [0, 1], ["-60px", "60px"]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is my data safe when I scan a file or link?",
      answer: "Yes, completely. APK Shield operates on a strict ephemeral scanning architecture. Files and URLs are parsed exclusively in temporary volatile memory and purged immediately after analysis is finalized. We never index, store, or sell user files, contacts, or browsing data.",
    },
    {
      question: "Does APK Shield work offline?",
      answer: "The installed Android and Windows clients include on-device static heuristic rules that can evaluate AndroidManifest permissions, dangerous intent filters, and suspicious entrypoints offline. When connected to the internet, APK Shield augments this with live AI threat intelligence and zero-day blacklist feeds.",
    },
    {
      question: "What happens if a link or app is flagged as dangerous?",
      answer: "APK Shield issues a high-visibility warning detailing the exact risks (e.g., banking trojan payload, SMS stealer, or credential harvester). It blocks the installation or navigation and provides clear, step-by-step instructions on safe removal and remediation.",
    },
    {
      question: "Is APK Shield free to use?",
      answer: "Yes. The core APK Shield Android app, Windows desktop client, and in-browser scanner are free for individual users to protect themselves against mobile malware and phishing fraud. Commercial organizations requiring bulk API access can request dedicated enterprise licenses.",
    },
    {
      question: "How does the AI detect zero-day fake APKs before traditional antivirus?",
      answer: "Traditional antivirus relies on matching exact file signatures that attackers easily defeat through minor repackaging. APK Shield instead audits behavioral intent — identifying dangerous combinations like requesting SMS reception alongside accessibility services and hidden window overlays — accurately flagging zero-day trojans regardless of how they are named.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting with parallax */}
      <motion.div
        style={{ y: faqGlowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Clear Answers &amp; Security Principles</span>
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
                "Frequently Asked",
                "Questions & Answers"
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
            className="mt-4 text-base text-slate-300 leading-relaxed font-normal"
          >
            Everything you need to know about APK Shield's analysis engine, privacy guarantees, and protection model.
          </motion.p>
        </div>

        {/* Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-[#0d162b] border-blue-500/40 shadow-xl shadow-blue-950/30"
                    : "bg-[#0b101f]/80 border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onMouseEnter={() => cyberAudio.playHover()}
                  onClick={() => {
                    cyberAudio.playClick();
                    toggleFaq(index);
                  }}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-white font-sans">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-blue-500 text-white rotate-180"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Security Assurance Footer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 p-6 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-4 text-left"
        >
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-sans">
              Strict Confidentiality Guarantee
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              APK Shield adheres to international privacy regulations. All static inspection and telemetry payloads remain encrypted in transit.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
