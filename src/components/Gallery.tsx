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
        <p className="label">Moments</p>
        <h2 id="gal-title" className="script">Photo Gallery</h2>
      </Reveal>
      <div className="masonry">
        {wedding.gallery.map((img, i) => (
          <motion.button
            key={img.src} type="button" className="tile" onClick={() => setActive(i)}
            aria-label={`View photo ${i + 1}: ${img.alt}`}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
          >
            <img src={img.src} alt="" loading="lazy" decoding="async" />
          </motion.button>
        ))}
      </div>
      <Lightbox images={wedding.gallery} index={active} onClose={close} onChange={setActive} />
    </section>
  );
}
