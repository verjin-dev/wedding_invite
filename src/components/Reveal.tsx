import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ImgHTMLAttributes, type ReactNode } from 'react';

type Props = { children: ReactNode; delay?: number; className?: string };

const ease = [0.16, 1, 0.3, 1] as const;

/** Plain content rises into place. */
export default function Reveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const titleVariants = { hidden: {}, shown: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const wordVariants = { hidden: { opacity: 0, y: '0.5em', rotate: 3 }, shown: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease } } };

/** A section heading whose words rise in one after another. Screen readers get the plain text. */
export function SplitTitle({ text, id, className = 'block-title' }: { text: string; id?: string; className?: string }) {
  return (
    <motion.h2 id={id} className={className} aria-label={text} variants={titleVariants} initial="hidden" whileInView="shown" viewport={{ once: true, margin: '-60px' }}>
      {text.split(' ').map((word, index) => (
        <span key={index} aria-hidden="true">
          <motion.span style={{ display: 'inline-block' }} variants={wordVariants}>{word}</motion.span>{' '}
        </span>
      ))}
    </motion.h2>
  );
}

/** A photo that drifts slowly inside its frame as the page scrolls. The frame must clip overflow. */
export function ParallaxImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  // Spread first so the motion style wins; scale covers the drift so no edge shows.
  return <motion.img {...(props as object)} ref={ref} style={reduceMotion ? undefined : { y, scale: 1.1 }} />;
}

const listVariants = { hidden: {}, shown: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const itemVariants = { hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

/** A list whose items arrive one at a time. */
export function StaggerList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <motion.ul className={className} variants={listVariants} initial="hidden" whileInView="shown" viewport={{ once: true, margin: '-40px' }}>
      {items.map(item => <motion.li key={item} variants={itemVariants}>{item}</motion.li>)}
    </motion.ul>
  );
}

/** A bento tile: scales and fades in, lifts slightly on hover. */
export function Card({ children, delay = 0, className = '' }: Props) {
  return (
    <motion.div
      className={`card ${className}`}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
