import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { wedding } from '../data/wedding';
import Florals from './Florals';
import SplitText from './SplitText';

export default function Hero({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 50]);
  const sunY = useTransform(scrollY, [0, 700], [0, -90]);
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
  });
  return (
    <section className="hero" id="top">
      <Florals />
      <motion.div className="hero-sun" style={{ y: sunY }} aria-hidden="true">
        <motion.span animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.div>
      <motion.div
        className="hero-arch"
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: ready ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
        transition={{ duration: 1.6, delay: 0.1, ease: [0.65, 0, 0.2, 1] }}
      >
        <motion.img style={{ y, scale: 1.12 }} src="/images/IMG_2012(1).jpeg" alt="Verjin and Jesmi standing together in a sunlit garden" decoding="async" fetchPriority="high" />
      </motion.div>
      <div className="hero-copy">
        <motion.p className="label" {...rise(0.9)}>Together with their families</motion.p>
        <h1 className="display">
          <span><SplitText text={wedding.groom} ready={ready} delay={1.0} /></span>
          <motion.i {...rise(1.5)}>and</motion.i>
          <span><SplitText text={wedding.bride} ready={ready} delay={1.5} /></span>
        </h1>
        <motion.p className="hero-date" {...rise(2.1)}><span>17</span><span>May</span><span>2027</span></motion.p>
        <motion.a href="#invitation" className="scroll-cue" aria-label="Scroll to the invitation — follow the day" {...rise(2.4)}><ChevronDown /></motion.a>
      </div>
    </section>
  );
}
