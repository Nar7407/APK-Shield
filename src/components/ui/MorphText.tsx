"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface MorphTextProps {
  /**
   * Array of words / phrases to cycle through.
   * @default ["ANALYZING", "DECRYPTING", "NEUTRALIZING", "GUARDING"]
   */
  words?: string[];
  /**
   * Duration (ms) each word is displayed before transitioning.
   * @default 3000
   */
  interval?: number;
  /**
   * Optional subtext rendered beneath the morphing word.
   */
  subtext?: string;
  /**
   * Font size passed as a CSS value (e.g. "clamp(2rem, 8vw, 4.5rem)").
   */
  fontSize?: string;
  /**
   * Font family.
   */
  fontFamily?: string;
  /** Extra CSS classes on the root wrapper. */
  className?: string;
  /** Extra CSS classes on the morphing text container. */
  textClassName?: string;
  /** Extra CSS classes on the subtext element. */
  subtextClassName?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function MorphText({
  words = ["MALWARE", "RANSOMWARE", "PHISHING", "ZERO-DAY", "C2 BEACONS"],
  interval = 2800,
  subtext,
  fontSize = "clamp(2rem, 6vw, 3.8rem)",
  fontFamily = 'system-ui, -apple-system, sans-serif',
  className,
  textClassName,
  subtextClassName,
}: MorphTextProps) {
  // Unique ID so multiple instances don't share filter IDs
  const uid = useId().replace(/:/g, "");
  const filterId = `morph-threshold-${uid}`;

  const totalDuration = (interval / 1000) * words.length; // seconds
  const wordDuration = interval / 1000;

  // Build per-word keyframe + delay styles
  const wordStyles = words.map((_, i) => ({
    animationDelay: `${i * wordDuration}s`,
    animationDuration: `${totalDuration}s`,
  }));

  return (
    <div className={cn("morph-text-root relative flex flex-col items-center", className)}>
      {/* ── Threshold SVG filter (hidden) ─────────────────────────── */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── Morphing word container ────────────────────────────────── */}
      <div
        className={cn("morph-text-container relative select-none", textClassName)}
        style={{
          fontSize,
          fontWeight: 800,
          filter: `url(#${filterId})`,
          fontFamily,
        }}
      >
        {/* word rotator */}
        <div
          className="morph-word-rotator relative flex items-center justify-center text-cyan-500 dark:text-cyan-400"
          style={{ height: "1.2em", minWidth: "14ch" }}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="morph-word absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                whiteSpace: "nowrap",
                animationName: "morph-word-rotate",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                ...wordStyles[i],
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ── Optional subtext ──────────────────────────────────────── */}
      {subtext && (
        <p
          className={cn(
            "morph-subtext mt-4 uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 text-xs font-semibold",
            subtextClassName
          )}
          style={{
            fontFamily,
          }}
        >
          {subtext}
        </p>
      )}

      {/* ── Scoped keyframes ──────────────────────────────────────── */}
      <style>{`
        @keyframes morph-word-rotate {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(0.8);
          }
          5% {
            opacity: 0.5;
            filter: blur(10px);
          }
          15%, 35% {
            opacity: 1;
            filter: blur(0px);
            transform: translate(-50%, -50%) scale(1);
          }
          45% {
            opacity: 0.5;
            filter: blur(10px);
          }
          50%, 100% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

export default MorphText;
