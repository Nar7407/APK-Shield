import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[10000] pointer-events-none h-[2.5px] sm:h-[3px] bg-white/[0.03]"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.85)] relative"
        style={{ scaleX }}
      >
        {/* Glowing cyber lead edge tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-full bg-white blur-[1px] opacity-80" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] -mr-1" />
      </motion.div>
    </div>
  );
}
