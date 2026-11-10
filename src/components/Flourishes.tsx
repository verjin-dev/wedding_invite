import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

const petals = Array.from({ length: 12 }, (_, i) => i);
const ease = [0.16, 1, 0.3, 1] as const;

/** Petals drifting down across the hero. Decorative only. */
export function HeroPetals() {
  return <div className="hero-petals" aria-hidden="true">{petals.map(i => <span key={i} style={{ '--i': i } as CSSProperties} />)}</div>;
}

/** Two wedding rings that draw themselves as they scroll into view. Decorative only. */
export function RingsFlourish() {
  const draw = (delay: number) => ({ initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 1.6, delay, ease } });
  return <svg className="rings-flourish" viewBox="0 0 160 64" fill="none" aria-hidden="true">
    <motion.path d="M4 34 H50" {...draw(.9)} />
    <motion.path d="M156 34 H110" {...draw(.9)} />
    <motion.circle cx="68" cy="34" r="19" {...draw(0)} />
    <motion.circle cx="92" cy="34" r="19" {...draw(.35)} />
    <path className="rings-spark" d="M80 2 L82.2 8.8 L89 11 L82.2 13.2 L80 20 L77.8 13.2 L71 11 L77.8 8.8 Z" />
  </svg>;
}

function Dove() {
  return <svg viewBox="0 0 64 44" aria-hidden="true">
    <path className="dove-wing dove-wing--far" d="M27 25 C22 13 26 5 35 1 C35 10 36 18 36 25 Z" />
    <path d="M3 27 L13 26 C20 21 29 20 38 23 C43 19 49 18 53 21 L60 22 L54 25 C52 31 44 35 34 34 C25 34 16 31 11 30 L2 33 L7 29 Z" />
    <path className="dove-wing" d="M24 26 C17 14 21 5 31 0 C31 10 34 18 36 26 Z" />
  </svg>;
}

/** A pair of doves gliding across the closing section. Decorative only. */
export function Doves() {
  return <div className="doves" aria-hidden="true"><span className="dove"><Dove /></span><span className="dove dove--second"><Dove /></span></div>;
}

const stars = Array.from({ length: 14 }, (_, i) => i);

/** Stars twinkling behind the scripture verse. Decorative only. */
export function Stars() {
  return <div className="stars" aria-hidden="true">{stars.map(i => <span key={i} style={{ '--i': i } as CSSProperties} />)}</div>;
}

/** A heart that draws itself, then keeps a slow beat. Decorative only. */
export function HeartFlourish() {
  return <svg className="heart-flourish" viewBox="0 0 48 44" fill="none" aria-hidden="true">
    <motion.path d="M24 40 C8 28 2 20 2 12 C2 5 8 2 13 2 C18 2 22 5 24 9 C26 5 30 2 35 2 C40 2 46 5 46 12 C46 20 40 28 24 40 Z" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1.8, ease }} />
  </svg>;
}

const bell = <><path d="M0 0 V6" /><path d="M-3 6 C-11 9 -12 20 -13 28 L-16 32 H16 L13 28 C12 20 11 9 3 6 Z" /><circle cx="0" cy="35.5" r="2.4" /></>;

/** A pair of wedding bells swinging on a ribbon. Decorative only. */
export function Bells() {
  return <svg className="bells" viewBox="0 0 80 62" fill="none" aria-hidden="true">
    <g transform="translate(30 12)"><g className="bell">{bell}</g></g>
    <g transform="translate(50 12)"><g className="bell bell--second">{bell}</g></g>
    <path d="M40 11 C34 2 26 5 30 11 C33 14 37 12 40 11 C43 12 47 14 50 11 C54 5 46 2 40 11 Z" />
  </svg>;
}

const flute = <><path d="M-6 0 C-6 14 -3 20 0 21 C3 20 6 14 6 0 Z" /><path d="M0 21 V40 M-6 40 H6" /></>;

/** Two champagne flutes that lean in and clink. Decorative only. */
export function Glasses() {
  return <svg className="glasses" viewBox="0 0 80 62" fill="none" aria-hidden="true">
    <g transform="translate(27 18)"><g className="flute">{flute}<circle className="bubble" cx="-1.5" cy="14" r="1" /><circle className="bubble bubble--late" cx="2" cy="16" r=".8" /></g></g>
    <g transform="translate(53 18)"><g className="flute flute--second">{flute}<circle className="bubble bubble--late" cx="-2" cy="15" r=".8" /><circle className="bubble" cx="1.5" cy="13" r="1" /></g></g>
    <path className="clink" d="M40 2 L41.6 7.4 L47 9 L41.6 10.6 L40 16 L38.4 10.6 L33 9 L38.4 7.4 Z" />
  </svg>;
}
