import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { imageAssets, type ImageAsset } from '../data/assets';
import { weddingConfig } from '../data/wedding';

export default function Hero() {
  // Widened to ImageAsset so the optional provenance note is readable whichever image is used here.
  const exterior: ImageAsset = imageAssets.heroCouple;
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 76]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -54]);
  return <section ref={heroRef} className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-card">
      <motion.img className="hero-media" src={exterior.fallback} srcSet={exterior.srcSet} sizes="100vw" width={exterior.width} height={exterior.height} alt={exterior.alt} fetchPriority="high" decoding="async" style={reduceMotion ? undefined : { y: imageY, scale: imageScale }} initial={{ opacity: .8 }} animate={{ opacity: 1 }} transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }} />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-frame" aria-hidden="true"><span/><span/><span/><span/></div>
      <motion.div className="hero-text" style={reduceMotion ? undefined : { y: textY }}>
        <motion.p className="eyebrow light" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .25 }}>A Sacred Beginning</motion.p>
        <motion.div className="hero-rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: .4 }} aria-hidden="true" />
        <motion.h1 id="hero-title" className="hero-names" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .45 }}><span>{weddingConfig.couple.groom.displayName}</span><i>&amp;</i><span>{weddingConfig.couple.bride.displayName}</span></motion.h1>
        <motion.p className="hero-date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .85 }}>{weddingConfig.wedding.dateLabel.toUpperCase()}</motion.p>
        <motion.p className="hero-tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: 1.05 }}>{weddingConfig.brand.tagline}</motion.p>
      </motion.div>
      {exterior.note && <p className="hero-image-note">{exterior.note}</p>}
      <a href="#story" className="hero-scroll" aria-label="Scroll to our story"><span>Scroll to discover</span><ArrowDown size={17} aria-hidden="true"/></a>
    </div>
  </section>;
}
