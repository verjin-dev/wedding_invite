import { useReducedMotion } from 'framer-motion';
import { useEffect, useState, type CSSProperties } from 'react';

/** A repeatable, stable spread in [0, 1) for petal `i`, so every render and replay looks the same. */
const spread = (i: number, factor: number) => (i * factor) % 1;

type Props = { count?: number; className?: string };

/**
 * One pass of rose petals tumbling down their container. Each petal falls, sways and turns over
 * on its own timing, then the whole layer removes itself. Decorative only; nothing plays under
 * reduced motion.
 */
export default function RosePetals({ count = 20, className = '' }: Props) {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);
  const petals = Array.from({ length: count }, (_, i) => ({
    x: `${Math.round(spread(i + 1, 0.618034) * 100)}%`,
    size: `${Math.round(14 + spread(i + 1, 0.754878) * 15)}px`,
    fall: 5.5 + spread(i + 1, 0.56984) * 3.5,
    delay: spread(i + 1, 0.32472) * 3.5,
    sway: `${Math.round(18 + spread(i + 1, 0.41421) * 46)}px`,
    turn: `${(1.7 + spread(i + 1, 0.81917) * 2).toFixed(2)}s`,
  }));
  const lastEnd = Math.max(...petals.map(p => p.fall + p.delay));
  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), lastEnd * 1000 + 300);
    return () => window.clearTimeout(timer);
  }, [lastEnd]);
  if (reduceMotion || done) return null;
  return <div className={`rose-petals ${className}`.trim()} aria-hidden="true">
    {petals.map((p, i) => <span className="rp" key={i} style={{ '--x': p.x, '--s': p.size, '--d': `${p.fall.toFixed(2)}s`, '--t': `${p.delay.toFixed(2)}s`, '--w': p.sway, '--r': p.turn } as CSSProperties}><i><b/></i></span>)}
  </div>;
}
