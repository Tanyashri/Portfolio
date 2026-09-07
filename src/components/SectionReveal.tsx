import React from 'react';
import { motion } from 'motion/react';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 12,
  duration = 0.4
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: "0px 0px 80px 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
