import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { wedding } from '../data/wedding';
import Florals from './Florals';
import Polaroid from './Polaroid';
import { PenLine } from './Reveal';

export default function Hero({ ready }: { ready: boolean }) {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });
  return (
    <section className="hero" id="top">
      <Florals />
      <div className="hero-grid">
        <div className="hero-photo">
          {ready && <Polaroid eager tilt={-3} src="/images/IMG_2012(1).jpeg" alt="Verjin and Jesmi standing together in a sunlit garden" note="the two of us" />}
          <motion.svg className="stamp" viewBox="0 0 120 120" aria-hidden="true"
            initial={{ opacity: 0, scale: 1.8, rotate: -30 }} animate={ready ? { opacity: 1, scale: 1, rotate: -14 } : { opacity: 0 }}
            transition={{ delay: 1.4, type: 'spring', stiffness: 220, damping: 14 }}>
            <defs><path id="ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
            <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" />
            <text fontSize="10.5" letterSpacing="3" fill="currentColor" fontFamily="Cinzel, serif"><textPath href="#ring">SAVE THE DATE · SAVE THE DATE · </textPath></text>
            <text x="60" y="58" textAnchor="middle" fontSize="20" fill="currentColor" fontFamily="Cormorant Garamond, serif" fontWeight="600">17</text>
            <text x="60" y="76" textAnchor="middle" fontSize="11" letterSpacing="2" fill="currentColor" fontFamily="Cinzel, serif">MAY 27</text>
          </motion.svg>
        </div>
        <div className="hero-copy">
          <motion.p className="label" {...rise(0.4)}>Together with their families</motion.p>
          <motion.h1 className="hand-title" {...rise(0.7)}>
            <span>{wedding.groom}</span>
            <i>and</i>
            <span>{wedding.bride}</span>
          </motion.h1>
          {ready && <PenLine className="hero-pen" delay={1.4} />}
          <motion.p className="typed" {...rise(1.2)}>{wedding.dateLabel}</motion.p>
          <motion.a href="#invitation" className="scroll-cue" aria-label="Scroll to the invitation" {...rise(1.6)}><ChevronDown /></motion.a>
        </div>
      </div>
    </section>
  );
}
