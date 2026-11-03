import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = { children: ReactNode; delay?: number; className?: string };

/** Content lifts gently onto the page. */
export default function Reveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Pinned things land on the page with a little spring and settle at their tilt. */
export function Drop({ children, delay = 0, className, tilt = 0 }: Props & { tilt?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -70, rotate: tilt + 9, scale: 1.08 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 13, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A pen stroke that draws itself under a word. */
export function PenLine({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg className={`pen ${className}`} viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M4 11 C 50 3, 90 15, 140 8 S 240 4, 296 10"
        fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: 'easeInOut' }}
      />
    </svg>
  );
}
