import React, { useEffect, useRef } from "react";

interface LaserBeam {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  width: number;
  color: string;
  glowColor: string;
  opacity: number;
  baseOpacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  driftX: number;
  driftY: number;
  waveAmplitude: number;
  waveFrequency: number;
}

interface LaserParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  life: number;
  maxLife: number;
}

export interface LaserFieldProps {
  className?: string;
  /** Fixed full-viewport background positioning */
  fixed?: boolean;
  /** Primary brand laser colors */
  colors?: string[];
  /** Glow colors corresponding to laser cores */
  glowColors?: string[];
  /** Overall speed multiplier - lower is calmer & slower */
  speed?: number;
  /** Number of primary sweeping laser rays */
  laserCount?: number;
  /** Number of ambient floating laser spark particles */
  particleCount?: number;
  /** Opacity of the effect */
  opacity?: number;
  /** Laser perspective/grid angle in degrees */
  angle?: number;
  /** Enable mouse focal attraction/deflection */
  interactive?: boolean;
}

export const LaserField: React.FC<LaserFieldProps> = ({
  className = "",
  fixed = false,
  colors = ["#38bdf8", "#60a5fa", "#3b82f6", "#06b6d4", "#818cf8"],
  glowColors = [
    "rgba(56, 189, 248, 0.4)",
    "rgba(96, 165, 250, 0.35)",
    "rgba(59, 130, 246, 0.3)",
    "rgba(6, 182, 212, 0.35)",
  ],
  speed = 0.28, // Slower, calmer motion
  laserCount = 20,
  particleCount = 55,
  opacity = 0.8,
  angle = -12,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    active: boolean;
  }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = fixed
        ? { width: window.innerWidth, height: window.innerHeight }
        : container.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    // Initialize Lasers
    const lasers: LaserBeam[] = [];
    const radAngle = (angle * Math.PI) / 180;

    for (let i = 0; i < laserCount; i++) {
      const colorIdx = i % colors.length;
      const glowIdx = i % glowColors.length;
      const isHorizontal = Math.random() > 0.35;

      lasers.push({
        x: Math.random() * (width || window.innerWidth || 1400),
        y: Math.random() * (height || window.innerHeight || 900),
        length: Math.random() * 550 + 350,
        angle: isHorizontal
          ? Math.random() * 0.1 - 0.05
          : radAngle + (Math.random() * 0.16 - 0.08),
        speed: (Math.random() * 0.45 + 0.25) * speed,
        width: Math.random() * 1.6 + 0.8,
        color: colors[colorIdx],
        glowColor: glowColors[glowIdx],
        opacity: Math.random() * 0.5 + 0.35,
        baseOpacity: Math.random() * 0.5 + 0.35,
        pulseSpeed: (Math.random() * 0.018 + 0.008) * speed,
        pulsePhase: Math.random() * Math.PI * 2,
        driftX: (Math.random() * 0.5 - 0.25) * speed,
        driftY: (Math.random() * 0.35 - 0.175) * speed,
        waveAmplitude: Math.random() * 16 + 6,
        waveFrequency: Math.random() * 0.0025 + 0.001,
      });
    }

    // Initialize Sparks/Particles
    const particles: LaserParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const colorIdx = i % colors.length;
      const glowIdx = i % glowColors.length;
      const maxL = Math.random() * 220 + 160;
      particles.push({
        x: Math.random() * (width || window.innerWidth || 1400),
        y: Math.random() * (height || window.innerHeight || 900),
        vx: (Math.random() * 0.5 - 0.25) * speed,
        vy: (Math.random() * -0.45 - 0.1) * speed,
        radius: Math.random() * 1.8 + 0.5,
        color: colors[colorIdx],
        glowColor: glowColors[glowIdx],
        alpha: Math.random() * 0.6 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.2,
        life: Math.random() * maxL,
        maxLife: maxL,
      });
    }

    // Mouse tracking across full viewport
    const onMouseMove = (e: MouseEvent) => {
      if (fixed) {
        mouseRef.current.targetX = e.clientX;
        mouseRef.current.targetY = e.clientY;
      } else if (container) {
        const rect = container.getBoundingClientRect();
        mouseRef.current.targetX = e.clientX - rect.left;
        mouseRef.current.targetY = e.clientY - rect.top;
      }
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const isMouseActive = mouseRef.current.active && interactive;

      // 1. Subtle background perspective cyber weave
      ctx.save();
      const gridSpacing = 100;
      const gridAlpha = 0.028 * opacity;
      ctx.strokeStyle = `rgba(56, 189, 248, ${gridAlpha})`;
      ctx.lineWidth = 1;

      const gridOffsetY = (time * 0.12 * speed) % gridSpacing;
      for (let y = gridOffsetY; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Primary Laser Beams
      lasers.forEach((laser) => {
        laser.pulsePhase += laser.pulseSpeed;
        const currentOpacity =
          (laser.baseOpacity + Math.sin(laser.pulsePhase) * 0.25) * opacity;

        // Slow calm drift
        laser.x += Math.cos(laser.angle) * laser.speed + laser.driftX;
        laser.y += Math.sin(laser.angle) * laser.speed + laser.driftY;

        // Subtle sine wave displacement for gentle organic movement
        const waveOffset =
          Math.sin(time * laser.waveFrequency + laser.pulsePhase) *
          laser.waveAmplitude;

        // Wrap around boundaries smoothly
        if (laser.x > width + 300) laser.x = -300;
        if (laser.x < -300) laser.x = width + 300;
        if (laser.y > height + 300) laser.y = -300;
        if (laser.y < -300) laser.y = height + 300;

        let startX = laser.x;
        let startY = laser.y + waveOffset;
        let endX = startX + Math.cos(laser.angle) * laser.length;
        let endY = startY + Math.sin(laser.angle) * laser.length;

        // Subtle gentle mouse attraction
        if (isMouseActive) {
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          const dx = mouseX - midX;
          const dy = mouseY - midY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 380 && dist > 0) {
            const pull = ((380 - dist) / 380) * 16;
            startY += (dy / dist) * pull;
            endY += (dy / dist) * pull;
          }
        }

        // Linear gradient for laser beam (fade at heads and tails)
        const grad = ctx.createLinearGradient(startX, startY, endX, endY);
        grad.addColorStop(0, "rgba(56, 189, 248, 0)");
        grad.addColorStop(0.2, laser.color);
        grad.addColorStop(0.5, "#ffffff");
        grad.addColorStop(0.8, laser.color);
        grad.addColorStop(1, "rgba(56, 189, 248, 0)");

        // Outer Glow Layer
        ctx.save();
        ctx.shadowColor = laser.glowColor;
        ctx.shadowBlur = 18;
        ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity * 0.75));
        ctx.strokeStyle = laser.color;
        ctx.lineWidth = laser.width * 2.6;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Inner Sharp Laser Core
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#ffffff";
        ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity));
        ctx.strokeStyle = grad;
        ctx.lineWidth = laser.width;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // High intensity head focal point
        const headX = (startX + endX) / 2;
        const headY = (startY + endY) / 2;
        const headGrad = ctx.createRadialGradient(
          headX,
          headY,
          0,
          headX,
          headY,
          16
        );
        headGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        headGrad.addColorStop(0.3, laser.color);
        headGrad.addColorStop(1, "rgba(56, 189, 248, 0)");

        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(headX, headY, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 3. Floating Ambient Laser Spark Particles
      particles.forEach((p) => {
        p.life += 1;
        if (p.life >= p.maxLife) {
          p.life = 0;
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.vx = (Math.random() * 0.5 - 0.25) * speed;
          p.vy = (Math.random() * -0.4 - 0.1) * speed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap particles
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const lifeRatio = p.life / p.maxLife;
        const fade = Math.sin(lifeRatio * Math.PI);
        const currentAlpha = p.baseAlpha * fade * opacity;

        ctx.save();
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [
    colors,
    glowColors,
    speed,
    laserCount,
    particleCount,
    opacity,
    angle,
    interactive,
    fixed,
  ]);

  return (
    <div
      ref={containerRef}
      className={`${
        fixed ? "fixed inset-0" : "absolute inset-0"
      } pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Top & Bottom Radial Vignette to seamlessly blend with #070b14 */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#070b14]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-transparent to-[#070b14]/40 pointer-events-none" />
    </div>
  );
};

export default LaserField;
