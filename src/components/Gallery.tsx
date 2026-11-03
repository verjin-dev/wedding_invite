import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { wedding } from '../data/wedding';
import Lightbox from './Lightbox';
import Reveal from './Reveal';

const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  return (
    <section className="page gallery" id="gallery" aria-labelledby="gal-title">
      <Reveal>
        <p className="note">pinned moments</p>
        <h2 id="gal-title" className="hand-title sm"><span>Photo gallery</span></h2>
      </Reveal>
      <div className="pol-grid">
        {wedding.gallery.map((img, i) => (
          <motion.button
            key={img.src} type="button" className="polaroid pol-tile" onClick={() => setActive(i)}
            aria-label={`View photo ${i + 1}: ${img.alt}`}
            initial={{ opacity: 0, y: -50, rotate: TILTS[i % TILTS.length] + 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: TILTS[i % TILTS.length] }}
            whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 130, damping: 14, delay: (i % 3) * 0.1 }}
          >
            <span className="tape" aria-hidden="true" />
            <div className="polaroid-img"><img src={img.src} alt="" loading="lazy" decoding="async" /></div>
          </motion.button>
        ))}
      </div>
      <Lightbox images={wedding.gallery} index={active} onClose={close} onChange={setActive} />
    </section>
  );
}
