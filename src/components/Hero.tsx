import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { imageAssets, type ImageAsset } from '../data/assets';
import { weddingConfig } from '../data/wedding';
import { HeroPetals } from './Flourishes';

const ease = [0.16, 1, 0.3, 1] as const;
/** Hidden behind the doors, then shown in turn once they open. */
const enter = (delay: number, from: Record<string, number>) => ({ hidden: from, shown: { opacity: 1, y: 0, scaleX: 1, transition: { duration: 1, delay, ease } } });

export default function Hero({ revealed }: { revealed: boolean }) {
  // Widened to ImageAsset so the optional provenance note is readable whichever image is used here.
  const exterior: ImageAsset = imageAssets.heroCouple;
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 76]);
  // The photo settles from a slight zoom as the doors give way, then drifts with scrolling.
  const intro = useMotionValue(reduceMotion ? 1 : 1.14);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageScale = useTransform(() => intro.get() * scrollScale.get());
  const textY = useTransform(scrollYProgress, [0, 1], [0, -54]);
  const state = revealed ? 'shown' : 'hidden';
  useEffect(() => {
    if (!revealed) return;
    if (reduceMotion) { intro.set(1); return; }
    const settle = animate(intro, 1, { duration: 2.6, ease });
    return () => settle.stop();
  }, [revealed, reduceMotion, intro]);
  return <section ref={heroRef} className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-card">
      <motion.img className="hero-media" src={exterior.fallback} srcSet={exterior.srcSet} sizes="100vw" width={exterior.width} height={exterior.height} alt={exterior.alt} fetchPriority="high" decoding="async" style={reduceMotion ? undefined : { y: imageY, scale: imageScale }} initial={{ opacity: .6 }} animate={{ opacity: revealed ? 1 : .6 }} transition={{ duration: 2.2, ease }} />
      <div className="hero-shade" aria-hidden="true" />
      <HeroPetals />
      <div className="hero-frame" aria-hidden="true"><span/><span/><span/><span/></div>
      <motion.div className="hero-text" style={reduceMotion ? undefined : { y: textY }} initial="hidden" animate={state}>
        <motion.p className="eyebrow light" variants={enter(.45, { opacity: 0, y: 12 })}>A Sacred Beginning</motion.p>
        <motion.div className="hero-rule" variants={enter(.65, { scaleX: 0 })} aria-hidden="true" />
        <motion.h1 id="hero-title" className="hero-names" variants={enter(.75, { opacity: 0, y: 26 })}><span>{weddingConfig.couple.groom.displayName}</span><i>&amp;</i><span>{weddingConfig.couple.bride.displayName}</span></motion.h1>
        <motion.p className="hero-date" variants={enter(1.15, { opacity: 0, y: 10 })}>{weddingConfig.wedding.dateLabel.toUpperCase()}</motion.p>
        <motion.p className="hero-tagline" variants={enter(1.35, { opacity: 0, y: 10 })}>{weddingConfig.brand.tagline}</motion.p>
      </motion.div>
      <a href="#story" className="hero-scroll" aria-label="Scroll to our story"><span>Scroll to discover</span><ArrowDown size={17} aria-hidden="true"/></a>
    </div>
  </section>;
}
