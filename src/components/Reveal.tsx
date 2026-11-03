import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = { children: ReactNode; delay?: number; className?: string };

const ease = [0.16, 1, 0.3, 1] as const;

/** Plain content rises into place. */
export default function Reveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** A bento tile: scales and fades in, lifts slightly on hover. */
export function Card({ children, delay = 0, className = '' }: Props) {
  return (
    <motion.div
      className={`card ${className}`}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
