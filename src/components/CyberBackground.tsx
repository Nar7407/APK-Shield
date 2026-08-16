import React, { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface Emitter {
  id: number;
  top: string;
  left?: string;
  right?: string;
  color: string;
  pulseDelay: number;
  label: string;
}

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Pulsing Light Emitters (Strategic Radar Sonar Nodes)
  const emitters: Emitter[] = useMemo(() => [
    { id: 1, top: "12%", left: "7%", color: "#38bdf8", pulseDelay: 0, label: "EMITTER_ALPHA" },
    { id: 2, top: "26%", right: "8%", color: "#60a5fa", pulseDelay: 1.8, label: "BEACON_02" },
    { id: 3, top: "48%", left: "6%", color: "#818cf8", pulseDelay: 0.9, label: "TELEMETRY_NODE" },
    { id: 4, top: "66%", right: "6%", color: "#34d399", pulseDelay: 2.4, label: "SCAN_ARRAY" },
    { id: 5, top: "84%", left: "10%", color: "#38bdf8", pulseDelay: 1.2, label: "CORE_SHIELD" },
  ], []);

  // 2. Floating Minimalist Threat Packets
  const securityPackets = useMemo(() => [
    { text: "SHA-256 // VERIFIED", top: "8%", left: "4%", delay: 0 },
    { text: "DEX_BYTECODE // CLEAN", top: "20%", right: "4%", delay: 1.5 },
    { text: "C2_BEACON // BLOCKED", top: "34%", left: "5%", delay: 2.8 },
    { text: "APK_SANDBOX // ACTIVE", top: "50%", right: "3%", delay: 0.8 },
    { text: "TLS_CERT // 0x4F9B", top: "64%", left: "3%", delay: 3.2 },
    { text: "HEURISTICS // 99.98%", top: "78%", right: "5%", delay: 2.1 },
    { text: "ANTI_PHISH // PASS", top: "91%", left: "4%", delay: 1.1 },
  ], []);

  // 3. High-Performance Canvas Particle System (Drifting Glowing Dots & Constellation Mesh)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface ParticleDot {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulsePhase: number;
      color: string;
      glowR: number;
      glowG: number;
      glowB: number;
    }

    const palette = [
      { color: "#38bdf8", r: 56, g: 189, b: 248 },  // Cyan
      { color: "#60a5fa", r: 96, g: 165, b: 250 },  // Electric Blue
      { color: "#818cf8", r: 129, g: 140, b: 248 }, // Indigo
      { color: "#34d399", r: 52, g: 211, b: 153 },  // Emerald
      { color: "#a78bfa", r: 167, g: 139, b: 250 }, // Purple/Lavender
    ];

    let particles: ParticleDot[] = [];
    const count = 75; // Optimal balance between density and performance

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      if (!parent) return;

      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-distribute particles if canvas was resized
      if (particles.length === 0) {
        particles = Array.from({ length: count }, () => {
          const col = palette[Math.floor(Math.random() * palette.length)];
          return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45 - 0.12, // subtle upward drift
            radius: Math.random() * 2 + 1.2,
            baseAlpha: Math.random() * 0.5 + 0.3,
            pulseSpeed: Math.random() * 0.02 + 0.008,
            pulsePhase: Math.random() * Math.PI * 2,
            color: col.color,
            glowR: col.r,
            glowG: col.g,
            glowB: col.b,
          };
        });
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw connecting constellation lines between nearby glowing dots
      const maxDistance = 95;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 2. Draw each glowing particle dot
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;

        // Subtle sine wave oscillation
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.25;
        const clampedAlpha = Math.max(0.1, Math.min(1, currentAlpha));

        // Interactive mouse gentle repulsion
        if (mouse.x > -500) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mouse.radius && mdist > 0) {
            const force = (1 - mdist / mouse.radius) * 1.5;
            p.x += (mdx / mdist) * force;
            p.y += (mdy / mdist) * force;
          }
        }

        // Screen boundary wrapping
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Draw soft ambient outer glow
        const glowRadius = p.radius * 4;
        const glowGrad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          glowRadius
        );
        glowGrad.addColorStop(0, `rgba(${p.glowR}, ${p.glowG}, ${p.glowB}, ${clampedAlpha * 0.6})`);
        glowGrad.addColorStop(0.5, `rgba(${p.glowR}, ${p.glowG}, ${p.glowB}, ${clampedAlpha * 0.2})`);
        glowGrad.addColorStop(1, `rgba(${p.glowR}, ${p.glowG}, ${p.glowB}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Draw bright central core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.glowR}, ${p.glowG}, ${p.glowB}, ${clampedAlpha})`;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for next items
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* 1. Cyber Digital Grid */}
      <div
        className="absolute inset-0 opacity-[0.038]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
        }}
      />

      {/* 2. Vertically Sweeping Cyber Laser Radar Beam */}
      <motion.div
        animate={{
          y: ["-10%", "110%"],
          opacity: [0, 0.7, 0.9, 0.7, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 right-0 h-44 bg-gradient-to-b from-transparent via-cyan-500/12 to-transparent"
        style={{ filter: "blur(10px)" }}
      />

      {/* 3. Deep Atmospheric Morphing Ambient Glow Orbs */}
      <motion.div
        animate={{
          x: [0, 70, -50, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.3, 0.9, 1],
          opacity: [0.14, 0.24, 0.16, 0.14],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] -left-24 w-[600px] h-[600px] rounded-full bg-cyan-600/20 blur-[150px]"
      />

      <motion.div
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 70, -40, 0],
          scale: [1, 1.2, 0.85, 1],
          opacity: [0.12, 0.22, 0.14, 0.12],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[44%] -right-28 w-[650px] h-[650px] rounded-full bg-blue-600/20 blur-[160px]"
      />

      <motion.div
        animate={{
          x: [0, 60, -70, 0],
          y: [0, -50, 60, 0],
          scale: [1, 1.25, 0.92, 1],
          opacity: [0.09, 0.18, 0.11, 0.09],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-[76%] left-[18%] w-[550px] h-[550px] rounded-full bg-indigo-600/15 blur-[140px]"
      />

      {/* 4. Canvas-Powered Drifting Glowing Particle System & Constellation Lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* 5. Pulsing Light Emitters with Concentric Expanding Sonar Rings */}
      {emitters.map((emitter) => (
        <div
          key={emitter.id}
          style={{
            top: emitter.top,
            ...(emitter.left ? { left: emitter.left } : { right: emitter.right }),
          }}
          className="absolute z-10 flex items-center justify-center pointer-events-none"
        >
          {/* Emitter Central Glowing Core */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.7, 1, 0.7],
              boxShadow: [
                `0 0 10px ${emitter.color}`,
                `0 0 22px ${emitter.color}`,
                `0 0 10px ${emitter.color}`,
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: emitter.pulseDelay,
            }}
            style={{ backgroundColor: emitter.color }}
            className="w-2.5 h-2.5 rounded-full"
          />

          {/* Sonar Ring 1 */}
          <motion.div
            animate={{
              scale: [1, 4.5],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: emitter.pulseDelay,
            }}
            style={{ borderColor: emitter.color }}
            className="absolute w-4 h-4 rounded-full border border-opacity-70"
          />

          {/* Sonar Ring 2 */}
          <motion.div
            animate={{
              scale: [1, 6],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: emitter.pulseDelay + 0.8,
            }}
            style={{ borderColor: emitter.color }}
            className="absolute w-4 h-4 rounded-full border border-dashed border-opacity-40"
          />

          {/* Micro Telemetry HUD label */}
          <span className="absolute -bottom-4 text-[8px] font-mono tracking-widest text-slate-500/70 whitespace-nowrap hidden lg:inline-block">
            {emitter.label}
          </span>
        </div>
      ))}

      {/* 6. Floating Threat Intel Packets */}
      {securityPackets.map((pkt, idx) => (
        <motion.div
          key={`pkt-${idx}`}
          style={{
            top: pkt.top,
            ...(pkt.left ? { left: pkt.left } : { right: pkt.right }),
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: 8 + idx,
            repeat: Infinity,
            delay: pkt.delay,
            ease: "easeInOut",
          }}
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/70 border border-cyan-500/25 backdrop-blur-md shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[10px] font-mono font-medium tracking-wider text-cyan-300/90 uppercase">
            {pkt.text}
          </span>
        </motion.div>
      ))}

      {/* 7. Dynamic Circuit Tracks with Glow Gradient */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cyber-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <path
          d="M 60 0 L 60 400 L 100 440 L 100 1200 L 50 1250 L 50 2400 L 90 2440 L 90 3800"
          fill="none"
          stroke="url(#cyber-glow-grad)"
          strokeWidth="1.5"
          strokeDasharray="5 9"
        />

        <path
          d="M calc(100% - 60px) 100 L calc(100% - 100px) 160 L calc(100% - 100px) 900 L calc(100% - 50px) 950 L calc(100% - 50px) 2100 L calc(100% - 90px) 2150 L calc(100% - 90px) 3800"
          fill="none"
          stroke="url(#cyber-glow-grad)"
          strokeWidth="1.5"
          strokeDasharray="5 9"
        />
      </svg>
    </div>
  );
}
