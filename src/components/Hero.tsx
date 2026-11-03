import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { wedding } from '../data/wedding';
import Florals from './Florals';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 60]);
  return (
    <section className="hero" id="top">
      <Florals />
      <motion.div className="hero-inner" style={{ y }}>
        <img className="hero-emblem" src="/florals/emblem.svg" alt="" width={96} height={96} />
        <p className="label">We are getting married</p>
        <h1 className="script names">
          <span>{wedding.groom}</span>
          <i>&amp;</i>
          <span>{wedding.bride}</span>
        </h1>
        <img className="divider" src="/florals/divider.svg" alt="" />
        <p className="serif date">{wedding.dateLabel}</p>
        <a href="#invitation" className="scroll-cue" aria-label="Scroll to invitation"><ChevronDown /></a>
      </motion.div>
    </section>
  );
}
