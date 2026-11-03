import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { wedding } from '../data/wedding';
import Lightbox from './Lightbox';
import Reveal from './Reveal';

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  return (
    <section className="section gallery" id="gallery" aria-labelledby="gal-title">
      <Reveal>
        <p className="label">06 - Moments</p>
        <h2 id="gal-title" className="display"><span>Photo gallery</span></h2>
      </Reveal>
      <div className="masonry">
        {wedding.gallery.map((img, i) => (
          <motion.button
            key={img.src} type="button" className="tile" onClick={() => setActive(i)}
            aria-label={`View photo ${i + 1}: ${img.alt}`}
            initial={{ clipPath: 'inset(100% 0 0 0)' }} whileInView={{ clipPath: 'inset(0% 0 0 0)' }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 1.1, delay: (i % 3) * 0.12, ease: [0.65, 0, 0.2, 1] }}
          >
            <img src={img.src} alt="" loading="lazy" decoding="async" />
          </motion.button>
        ))}
      </div>
      <Lightbox images={wedding.gallery} index={active} onClose={close} onChange={setActive} />
    </section>
  );
}
