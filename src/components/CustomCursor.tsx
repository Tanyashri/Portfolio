import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'hidden'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor trailing
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check for touch device or reduced motion
    const touchCheck = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const motionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchDevice(touchCheck);
    setIsReducedMotion(motionCheck);

    if (touchCheck || motionCheck) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Find if we are hovering over an element with custom cursor state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorVariant('hover');
        return;
      }

      // Default hover detection for standard links and buttons
      const isClickable = target.closest('a, button, [role="button"], input, select, textarea');
      if (isClickable) {
        setCursorText('');
        setCursorVariant('hover');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant('hidden');
    };

    const handleMouseEnter = () => {
      setCursorVariant('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice || isReducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Spring Ring / Pill with Text */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorVariant === 'hidden' ? 0 : 1,
          opacity: cursorVariant === 'hidden' ? 0 : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
      >
        {cursorText ? (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="px-3 py-1.5 rounded-full bg-[#FF85A2] text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-2xl shadow-[#FF85A2]/30 flex items-center gap-1.5 border border-black/10"
          >
            <span className="text-xs">✨</span>
            <span>{cursorText}</span>
          </motion.div>
        ) : (
          <motion.div
            animate={{
              width: cursorVariant === 'hover' ? 44 : 28,
              height: cursorVariant === 'hover' ? 44 : 28,
              borderColor: cursorVariant === 'hover' ? 'rgba(255, 133, 162, 0.8)' : 'rgba(255, 255, 255, 0.35)',
              backgroundColor: cursorVariant === 'hover' ? 'rgba(255, 133, 162, 0.12)' : 'transparent',
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="rounded-full border border-dashed flex items-center justify-center"
          />
        )}
      </motion.div>

      {/* Center Precise Dot (only when not showing pill text) */}
      {!cursorText && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: cursorVariant === 'hover' ? 1.5 : 1,
            backgroundColor: cursorVariant === 'hover' ? '#FF85A2' : '#FDFCFB',
          }}
          transition={{ duration: 0.1 }}
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none"
        />
      )}
    </div>
  );
};
