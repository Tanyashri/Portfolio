import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isDone, setIsDone] = useState(false);

  const handleDismiss = () => {
    setIsDone(true);
    onComplete();
  };

  useEffect(() => {
    // Snappy sequence duration (~950ms or instant 200ms on reduced motion)
    const duration = prefersReducedMotion ? 200 : 950;

    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, prefersReducedMotion]);

  if (isDone) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -10,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      onClick={handleDismiss}
      className="fixed inset-0 z-[100] bg-[#0D0C10] text-[#FDFCFB] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden cursor-pointer"
    >
      {/* Subtle fine technical grid */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* Top Header Row */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between font-mono text-[11px] text-white/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
          <span className="tracking-[0.2em] uppercase font-semibold text-white/70">
            TANYASHRI M. // CSE
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-white/60 hover:text-white border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>SKIP INTRO</span>
          <ArrowRight className="w-3 h-3 text-[#5EEAD4]" />
        </button>
      </div>

      {/* Center Stage: Fast & Bold Identity */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center"
        >
          <h1
            style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)', whiteSpace: 'nowrap' }}
            className="font-black font-display tracking-tight text-[#FDFCFB] leading-none text-center"
          >
            TANYASHRI M.
          </h1>

          <div
            style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}
            className="font-mono font-semibold tracking-[0.22em] text-[#5EEAD4] uppercase mt-3"
          >
            COMPUTER SCIENCE ENGINEER · AI/ML BUILDER
          </div>
        </motion.div>
      </div>

      {/* Bottom Progress Bar Indicator */}
      <div className="relative z-10 w-full max-w-xs mx-auto flex flex-col items-center gap-2">
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.75,
              ease: 'linear'
            }}
            style={{ originX: 0 }}
            className="h-full bg-[#FF85A2]"
          />
        </div>
        <span className="font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase">
          CLICK ANYWHERE TO ENTER
        </span>
      </div>
    </motion.div>
  );
};
