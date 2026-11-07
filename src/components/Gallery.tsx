import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { imageAssets } from '../data/assets';
import { weddingConfig, type GalleryCategory } from '../data/wedding';
import Lightbox from './Lightbox';
import Reveal from './Reveal';

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const [category, setCategory] = useState<GalleryCategory | 'All'>('All');
  const close = useCallback(() => setActive(null), []);
  const publishedImages = weddingConfig.gallery;
  const categories = Array.from(new Set(publishedImages.map(item => item.category)));
  const visibleImages = publishedImages.filter(item => category === 'All' || item.category === category);
  const images = visibleImages.map((item) => ({ ...imageAssets[item.assetId], alt: item.alt }));
  return <section className="block gallery-section" id="gallery" aria-labelledby="gal-title">
    <Reveal className="block-head"><p className="eyebrow">Moments</p><h2 id="gal-title" className="block-title">A few memories</h2><p className="body">A small collection of moments from our journey together.</p></Reveal>
    <div className="gallery-filters" role="group" aria-label="Filter gallery by category"><button type="button" className={category === 'All' ? 'active' : ''} aria-pressed={category === 'All'} onClick={() => { setCategory('All'); setActive(null); }}>All</button>{categories.map(item => <button type="button" key={item} className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => { setCategory(item); setActive(null); }}>{item}</button>)}</div>
    <div className="mosaic">{images.map((img, i) => <motion.button key={img.id} type="button" className={`tile tile-${i}`} onClick={() => setActive(i)} aria-label={`View photo ${i + 1}: ${img.alt}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .8, delay: i * .08, ease: [0.16, 1, 0.3, 1] }}>
      <img src={img.src} srcSet={img.srcSet} sizes="(max-width: 800px) 100vw, 50vw" width={img.width} height={img.height} alt="" loading="lazy" decoding="async"/><span className="tile-caption">{img.alt}</span>
    </motion.button>)}</div>
    <Lightbox images={images} index={active} onClose={close} onChange={setActive}/>
  </section>;
}
