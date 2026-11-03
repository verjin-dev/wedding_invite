import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { wedding } from '../data/wedding';
import Reveal from './Reveal';

export default function CoupleSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  return (
    <section className="section couple" id="couple" ref={ref} aria-labelledby="couple-title">
      <Reveal className="couple-photo">
        <div className="photo-frame">
          <motion.img style={{ y, scale: 1.12 }} src="/images/IMG_2012(1).jpeg" alt="Verjin and Jesmi standing together in a sunlit garden" loading="lazy" decoding="async" />
        </div>
      </Reveal>
      <Reveal delay={0.15} className="couple-copy">
        <p className="label">The couple</p>
        <h2 id="couple-title" className="script">{wedding.groom} <i>&amp;</i> {wedding.bride}</h2>
        <p className="serif date">{wedding.dateLabel}</p>
        <p className="serif">Two hearts, joined in faith and love, ready to begin a lifetime together. Thank you for being part of our journey.</p>
      </Reveal>
    </section>
  );
}
