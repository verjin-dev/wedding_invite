import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { wedding } from '../data/wedding';
import Lightbox from './Lightbox';
import Reveal from './Reveal';

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  return (
    <section className="block" id="gallery" aria-labelledby="gal-title">
      <Reveal className="block-head">
        <p className="eyebrow">Moments</p>
        <h2 id="gal-title" className="block-title">Photo gallery</h2>
      </Reveal>
      <div className="mosaic">
        {wedding.gallery.map((img, i) => (
          <motion.button
            key={img.src} type="button" className={`tile tile-${i}`} onClick={() => setActive(i)}
            aria-label={`View photo ${i + 1}: ${img.alt}`}
            initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={img.src} alt="" loading="lazy" decoding="async" />
          </motion.button>
        ))}
      </div>
      <Lightbox images={wedding.gallery} index={active} onClose={close} onChange={setActive} />
    </section>
  );
}
