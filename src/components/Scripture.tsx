import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import Reveal from './Reveal';
import { weddingConfig } from '../data/wedding';
import { Stars } from './Flourishes';

const cards = weddingConfig.scriptureCards;
const SWIPE_DISTANCE = 60;
const SWIPE_SPEED = 400;

// Cards turn about their spine like a page: in from the side they are travelling from.
const turn = {
  enter: (direction: number) => ({ opacity: 0, rotateY: direction * 55, x: direction * 60 }),
  center: { opacity: 1, rotateY: 0, x: 0 },
  exit: (direction: number) => ({ opacity: 0, rotateY: direction * -55, x: direction * -60 }),
};

/** Further verses on cards the guest swipes, taps the arrows or uses the arrow keys to turn. */
function ScriptureCards() {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const go = (step: number) => setPage(([current]) => [(current + step + cards.length) % cards.length, step]);
  const goTo = (target: number) => setPage(([current]) => [target, target > current ? 1 : -1]);
  const onDragEnd = (_: PointerEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_SPEED) go(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_SPEED) go(-1);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); }
  };
  const card = cards[index];
  return <div className="verse-deck" role="region" aria-roledescription="carousel" aria-label="More verses" tabIndex={0} onKeyDown={onKeyDown}>
    <div className="verse-stage">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.figure key={index} className="verse-card" custom={direction} variants={turn} initial="enter" animate="center" exit="exit"
          transition={{ duration: .55, ease: [0.16, 1, 0.3, 1] }}
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.55} onDragEnd={onDragEnd}
          aria-roledescription="slide" aria-label={`${index + 1} of ${cards.length}`}>
          <span className="verse-card-cross" aria-hidden="true">{'✝'}</span>
          <blockquote>“{card.text}”</blockquote>
          <figcaption>{card.reference}</figcaption>
        </motion.figure>
      </AnimatePresence>
    </div>
    <div className="verse-controls">
      <button type="button" className="verse-arrow" aria-label="Previous verse" onClick={() => go(-1)}><ChevronLeft size={18}/></button>
      <div className="verse-dots">{cards.map((item, i) => <button type="button" key={item.reference} className={i === index ? 'active' : ''} aria-label={`Show ${item.reference}`} aria-current={i === index} onClick={() => goTo(i)}/>)}</div>
      <button type="button" className="verse-arrow" aria-label="Next verse" onClick={() => go(1)}><ChevronRight size={18}/></button>
    </div>
  </div>;
}

export default function Scripture() {
  return <section className="scripture" aria-label="Scripture"><Stars /><Reveal className="scripture-inner"><span className="cross-mark" aria-hidden="true">{"✝"}</span><p className="eyebrow">A blessing for their beginning</p><blockquote className="verse"><span className="sr-only">“{weddingConfig.scripture.text}”</span><span aria-hidden="true">{`“${weddingConfig.scripture.text}”`.split(' ').map((word, index) => <span key={index}><span className="verse-word">{word}</span>{' '}</span>)}</span><cite>{weddingConfig.scripture.reference}</cite></blockquote>
    <p className="scripture-covenant">Two hearts brought together by grace, choosing to walk together in faith, love and God’s guidance.</p>
    <ScriptureCards /></Reveal></section>;
}
