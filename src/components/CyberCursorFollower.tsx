"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

interface DataBit {
  id: number;
  x: number;
  y: number;
  text?: string;
  color: string;
  size: number;
  angle: number;
  speed: number;
}

export function CyberCursorFollower() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [dataBits, setDataBits] = useState<DataBit[]>([]);
  const lastSpawnPos = useRef({ x: -100, y: -100 });
  const bitCounter = useRef(0);

  // Framer motion smooth spring coordinates for leading cursor tracker
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const trailSpringConfig = { damping: 35, stiffness: 220, mass: 0.8 };
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  const bitChars = ["0", "1", "•", "0x", "1", "0", "◆", "0"];
  const bitColors = ["#38bdf8", "#60a5fa", "#34d399", "#818cf8", "#38bdf8"];

  // Handle fine-pointer check (desktop/mouse only)
  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsEnabled(isFinePointer);
  }, []);

  const spawnDataBit = useCallback((x: number, y: number) => {
    bitCounter.current += 1;
    const char = bitChars[Math.floor(Math.random() * bitChars.length)];
    const color = bitColors[Math.floor(Math.random() * bitColors.length)];
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 20 + 10;

    const newBit: DataBit = {
      id: bitCounter.current,
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      text: char,
      color,
      size: Math.random() > 0.6 ? 10 : 8,
      angle,
      speed,
    };

    setDataBits((prev) => [...prev.slice(-14), newBit]);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouseX.set(clientX);
      mouseY.set(clientY);

      const dx = clientX - lastSpawnPos.current.x;
      const dy = clientY - lastSpawnPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const now = performance.now();

      // Spawn subtle data bits when moving with distance threshold and throttle
      if (dist > 18 && now - lastTime > 45) {
        spawnDataBit(clientX, clientY);
        lastSpawnPos.current = { x: clientX, y: clientY };
        lastTime = now;
      }
    };

    const handleMouseLeave = () => {
      mouseX.set(-100);
      mouseY.set(-100);
      setDataBits([]);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isEnabled, mouseX, mouseY, spawnDataBit]);

  // Clean up expired data bits
  useEffect(() => {
    if (dataBits.length === 0) return;
    const timer = setTimeout(() => {
      setDataBits((prev) => prev.slice(1));
    }, 450);
    return () => clearTimeout(timer);
  }, [dataBits]);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      {/* 1. Trailing Subtle Cyber Ring Halo */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-8 h-8 rounded-full border border-cyan-400/20 bg-cyan-500/[0.03] blur-[0.5px] pointer-events-none shadow-[0_0_12px_rgba(56,189,248,0.15)]"
      />

      {/* 2. Leading Primary Precision Dot */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-2 h-2 rounded-full bg-cyan-400 pointer-events-none shadow-[0_0_8px_#38bdf8,0_0_16px_rgba(56,189,248,0.6)]"
      >
        {/* Subtle center radar micro-ring */}
        <span className="absolute -inset-1 rounded-full border border-cyan-300/40 animate-ping opacity-60" />
      </motion.div>

      {/* 3. Floating Emitter Data Bits (Framer Motion Staggered Fade & Drift) */}
      <AnimatePresence>
        {dataBits.map((bit) => {
          const targetX = Math.cos(bit.angle) * bit.speed;
          const targetY = Math.sin(bit.angle) * bit.speed + 14; // gentle downward gravitational drift

          return (
            <motion.div
              key={bit.id}
              initial={{
                opacity: 0.85,
                scale: 1,
                x: bit.x,
                y: bit.y,
              }}
              animate={{
                opacity: 0,
                scale: 0.35,
                x: bit.x + targetX,
                y: bit.y + targetY,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                color: bit.color,
                fontSize: `${bit.size}px`,
                textShadow: `0 0 6px ${bit.color}`,
              }}
              className="font-mono font-bold select-none pointer-events-none leading-none"
            >
              {bit.text}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
