import { motion, useScroll, useTransform } from 'framer-motion';
import { wedding } from '../data/wedding';
import Florals from './Florals';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 80]);
  return (
    <section className="hero" id="top">
      <div className="hero-photo">
        <motion.img style={{ y, scale: 1.1 }} src="/images/IMG_2012(1).jpeg" alt="Verjin and Jesmi standing together in a sunlit garden" decoding="async" fetchPriority="high" />
        <div className="hero-fade" aria-hidden="true" />
      </div>
      <Florals />
      <div className="hero-copy">
        <p className="label">Together with their families</p>
        <h1 className="display">
          <span>{wedding.groom}</span>
          <i>and</i>
          <span>{wedding.bride}</span>
        </h1>
        <p className="hero-date"><span>17</span><span>May</span><span>2027</span></p>
        <a href="#invitation" className="btn btn-gold">View invitation</a>
      </div>
    </section>
  );
}
