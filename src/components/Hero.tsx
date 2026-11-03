import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { wedding } from '../data/wedding';

export default function Hero({ ready }: { ready: boolean }) {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
  });
  return (
    <section className="hero" id="top">
      <motion.div
        className="hero-card"
        initial={{ clipPath: 'inset(8% 8% 8% 8% round 40px)' }}
        animate={{ clipPath: ready ? 'inset(0% 0% 0% 0% round 32px)' : 'inset(8% 8% 8% 8% round 40px)' }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src="/images/IMG_2012(1).jpeg" alt="Verjin and Jesmi standing together in a sunlit garden" decoding="async" fetchPriority="high"
          initial={{ scale: 1.25 }} animate={{ scale: ready ? 1 : 1.25 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="hero-shade" aria-hidden="true" />
        <motion.p className="chip hero-chip" {...rise(0.9)}>{wedding.dateShort}</motion.p>
        <div className="hero-text">
          <motion.p className="eyebrow light" {...rise(0.8)}>Together with their families</motion.p>
          <motion.h1 className="hero-names" {...rise(1)}>
            <span>{wedding.groom}</span>
            <i>&amp;</i>
            <span>{wedding.bride}</span>
          </motion.h1>
        </div>
        <motion.a href="#day" className="round-btn hero-down" aria-label="Scroll to the details" {...rise(1.4)}><ArrowDown size={20} /></motion.a>
      </motion.div>
    </section>
  );
}
