import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { wedding } from '../data/wedding';
import Reveal from './Reveal';

export default function CoupleSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  return (
    <section className="couple" id="couple" ref={ref} aria-labelledby="couple-title">
      <div className="couple-bg">
        <motion.img style={{ y, scale: 1.2 }} src="/images/IMG_1741.jpeg" alt="Jesmi smiling at Verjin, with a bouquet in the foreground" loading="lazy" decoding="async" />
      </div>
      <Reveal className="couple-copy">
        <p className="label">02 — The couple</p>
        <h2 id="couple-title" className="display"><span>{wedding.groom}</span><i>&amp;</i><span>{wedding.bride}</span></h2>
        <p className="date">{wedding.dateLabel}</p>
        <p>Two hearts, joined in faith and love, ready to begin a lifetime together. Thank you for being part of our journey.</p>
      </Reveal>
    </section>
  );
}
