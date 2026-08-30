import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Total sequence duration: ~2.1s (or 0.4s if reduced motion is requested)
    const duration = prefersReducedMotion ? 400 : 2100;

    const timer = setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  if (isDone) return null;

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed inset-0 z-[100] bg-[#0D0C10] flex items-center justify-center pointer-events-none"
      >
        <div className="text-center font-display text-2xl font-bold tracking-tight text-white">
          TANYASHRI M.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -16,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }}
      className="fixed inset-0 z-[100] bg-[#0D0C10] text-[#FDFCFB] flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden"
    >
      {/* Subtle fine technical grid */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* PHASE 1: Top Technical Metadata Bar */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between font-mono text-[11px] text-white/40">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
          className="flex items-center gap-2.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4]" />
          <span className="tracking-[0.2em] uppercase font-semibold text-white/60">
            TANYASHRI M. / 01
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
          className="tracking-[0.25em] uppercase text-white/40 hidden sm:block"
        >
          PORTFOLIO // 2026
        </motion.div>
      </div>

      {/* CENTER STAGE: Editorial Identity Reveal */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto px-4">
        {/* PHASE 2: Primary Name Reveal */}
        <div className="w-full flex items-center justify-center overflow-hidden py-2">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ fontSize: 'clamp(1.75rem, 6.5vw, 4.75rem)', whiteSpace: 'nowrap' }}
            className="font-black font-display tracking-tight text-[#FDFCFB] leading-none shrink-0 inline-block text-center"
          >
            TANYASHRI&nbsp;M.
          </motion.h1>
        </div>

        {/* PHASE 3: Identity & Discipline Hierarchy */}
        <div className="w-full flex items-center justify-center overflow-hidden mt-3 sm:mt-5">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.75,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ whiteSpace: 'nowrap', fontSize: 'clamp(0.7rem, 2vw, 0.875rem)' }}
            className="font-mono font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-[#5EEAD4] uppercase shrink-0"
          >
            COMPUTER SCIENCE ENGINEER
          </motion.div>
        </div>

        <div className="w-full flex items-center justify-center overflow-hidden mt-1.5 sm:mt-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 1.05,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ whiteSpace: 'nowrap', fontSize: 'clamp(0.65rem, 1.6vw, 0.75rem)' }}
            className="font-mono text-white/50 tracking-[0.18em] sm:tracking-[0.2em] uppercase shrink-0"
          >
            AI / ML · SOFTWARE · SYSTEMS
          </motion.div>
        </div>
      </div>

      {/* PHASE 4: Minimal Progress Line Indicator */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm mx-auto flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.15 }}
          className="w-full flex items-center justify-between font-mono text-[10px] text-white/35 tracking-[0.25em] uppercase"
        >
          <span>PORTFOLIO</span>
          <span className="text-[#5EEAD4]/70">READY</span>
        </motion.div>

        <div className="w-full h-[1.5px] bg-white/[0.08] rounded-full overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.65,
              delay: 1.25,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{ originX: 0 }}
            className="h-full bg-white/70"
          />
        </div>
      </div>
    </motion.div>
  );
};
