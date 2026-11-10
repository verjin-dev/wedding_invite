import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

const petals = Array.from({ length: 12 }, (_, i) => i);
const ease = [0.16, 1, 0.3, 1] as const;

/** Petals drifting down across the hero. Decorative only. */
export function HeroPetals() {
  return <div className="hero-petals" aria-hidden="true">{petals.map(i => <span key={i} style={{ '--i': i } as CSSProperties} />)}</div>;
}

/** Two wedding rings that draw themselves as they scroll into view. Decorative only. */
export function RingsFlourish() {
  const draw = (delay: number) => ({ initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 1.6, delay, ease } });
  return <svg className="rings-flourish" viewBox="0 0 160 64" fill="none" aria-hidden="true">
    <motion.path d="M4 34 H50" {...draw(.9)} />
    <motion.path d="M156 34 H110" {...draw(.9)} />
    <motion.circle cx="68" cy="34" r="19" {...draw(0)} />
    <motion.circle cx="92" cy="34" r="19" {...draw(.35)} />
    <path className="rings-spark" d="M80 2 L82.2 8.8 L89 11 L82.2 13.2 L80 20 L77.8 13.2 L71 11 L77.8 8.8 Z" />
  </svg>;
}

function Dove() {
  return <svg viewBox="0 0 64 44" aria-hidden="true">
    <path className="dove-wing dove-wing--far" d="M27 25 C22 13 26 5 35 1 C35 10 36 18 36 25 Z" />
    <path d="M3 27 L13 26 C20 21 29 20 38 23 C43 19 49 18 53 21 L60 22 L54 25 C52 31 44 35 34 34 C25 34 16 31 11 30 L2 33 L7 29 Z" />
    <path className="dove-wing" d="M24 26 C17 14 21 5 31 0 C31 10 34 18 36 26 Z" />
  </svg>;
}

/** A pair of doves gliding across the closing section. Decorative only. */
export function Doves() {
  return <div className="doves" aria-hidden="true"><span className="dove"><Dove /></span><span className="dove dove--second"><Dove /></span></div>;
}
