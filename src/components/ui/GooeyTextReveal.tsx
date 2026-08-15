"use client";

import React, { useEffect, useRef, useId, useState } from "react";
import { cn } from "@/lib/utils";

export type GooeyTextRevealMode = "immediate" | "scroll" | "scrub";

export interface GooeyTextRevealProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Text-bearing string or elements to split into animated lines. */
  children: string | React.ReactNode;
  /** Controls when the reveal runs. */
  mode?: GooeyTextRevealMode;
  /** Delay before non-scrub animations begin, in seconds. */
  delay?: number;
  /** Reveal duration for each line, in seconds. */
  duration?: number;
  /** Delay between consecutive lines, in seconds. */
  stagger?: number;
  /** Starting blur measured in em units. */
  blurAmount?: number;
  /** Called after the reveal completes. */
  onComplete?: () => void;
}

export const GooeyTextReveal = React.forwardRef<
  HTMLDivElement,
  GooeyTextRevealProps
>(function GooeyTextReveal(
  {
    children,
    delay = 0.2,
    duration = 1.2,
    stagger = 0.08,
    className,
    onComplete,
    ...props
  },
  forwardedRef
) {
  const reactId = useId();
  const filterId = `gooey-text-reveal-${reactId.replace(/:/g, "")}`;
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
      if (onComplete) {
        setTimeout(onComplete, (duration + 0.5) * 1000);
      }
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay, duration, onComplete]);

  const textContent = typeof children === "string" ? children : "";
  const words = textContent ? textContent.split(" ") : [];

  return (
    <>
      <div
        ref={forwardedRef}
        className={cn("gooey-text-reveal-container relative inline-block select-none", className)}
        style={{
          filter: `url(#${filterId})`,
        }}
        {...props}
      >
        {words.length > 0 ? (
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {words.map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-block transition-all ease-out"
                style={{
                  filter: isRevealed ? "blur(0px)" : "blur(14px)",
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(16px)",
                  transitionDuration: `${duration}s`,
                  transitionDelay: `${wordIdx * stagger}s`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        ) : (
          <div
            className="transition-all ease-out"
            style={{
              filter: isRevealed ? "blur(0px)" : "blur(14px)",
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(16px)",
              transitionDuration: `${duration}s`,
            }}
          >
            {children}
          </div>
        )}
      </div>

      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
            />
            <feComposite in="SourceGraphic" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
});

GooeyTextReveal.displayName = "GooeyTextReveal";

export default GooeyTextReveal;
