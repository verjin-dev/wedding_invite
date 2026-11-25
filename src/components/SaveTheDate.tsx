import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from 'framer-motion';
import { CalendarPlus, ChevronDown, Download, Pointer } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { weddingConfig } from '../data/wedding';
import { downloadIcs, googleCalendarUrl } from '../lib/calendar';
import Countdown from './Countdown';
import Reveal, { SplitTitle } from './Reveal';

/** The share of the scroll that must be pulled open before it unrolls the rest of the way by itself. */
const COMMIT_AT = 0.35;

/**
 * Save the date as a rolled parchment: the guest pulls the ribbon down and the scroll unrolls
 * with the drag. A tap, Enter or Space on the ribbon unrolls it too.
 */
export default function SaveTheDate() {
  const reduceMotion = useReducedMotion();
  const paperRef = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const height = useMotionValue(0);
  const panStart = useRef(0);
  const panned = useRef(false);

  // The paper's own height is how far the scroll can unroll; it changes with the screen width.
  useEffect(() => {
    const paper = paperRef.current;
    if (!paper) return;
    const observer = new ResizeObserver(() => setFull(paper.offsetHeight));
    observer.observe(paper);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { if (revealed) height.set(full); }, [full, revealed, height]);

  const unroll = () => {
    if (revealed) return;
    setRevealed(true);
    animate(height, full, reduceMotion ? { duration: 0 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
  };

  const onPanStart = () => { panned.current = true; panStart.current = height.get(); };
  const onPan = (_: PointerEvent, info: PanInfo) => {
    if (revealed) return;
    height.set(Math.min(full, Math.max(0, panStart.current + info.offset.y)));
  };
  const onPanEnd = () => {
    // Touch drags often end without a click, so the flag must not outlive this gesture.
    window.setTimeout(() => { panned.current = false; }, 0);
    if (revealed) return;
    if (height.get() > full * COMMIT_AT) unroll();
    else animate(height, 0, { type: 'spring', stiffness: 320, damping: 26 });
  };
  const onClick = () => {
    // A drag ends with a click on some browsers; only a real tap should unroll here.
    if (panned.current) { panned.current = false; return; }
    unroll();
  };

  const { wedding, ceremony, couple } = weddingConfig;
  const [weekday] = wedding.dateLong.split(',');
  return <section className="block save-section" id="save" aria-labelledby="save-title">
    <Reveal className="block-head save-head"><p className="eyebrow">Mark your calendar</p><SplitTitle id="save-title" text="Save the date"/></Reveal>

    <div className={`scroll${revealed ? ' is-revealed' : ''}`}>
      <div className="scroll-rod" aria-hidden="true"><i/><i/></div>
      <motion.div className="scroll-window" id="save-scroll" style={{ height }}>
        <div className="scroll-paper" ref={paperRef}>
          <p className="eyebrow">The wedding day</p>
          <p className="scroll-names">{couple.displayNames}</p>
          <span className="scroll-cross" aria-hidden="true">{'✝'}</span>
          <p className="scroll-weekday">{weekday}</p>
          <p className="scroll-date">{wedding.dateLabel}</p>
          <p className="scroll-time">{wedding.ceremonyTime}</p>
          <p className="scroll-venue">{ceremony.venue}<span>{ceremony.location}</span></p>
        </div>
      </motion.div>
      <div className="scroll-rod scroll-rod--bottom" aria-hidden="true"><i/><i/></div>

      <motion.button type="button" className="scroll-ribbon" aria-controls="save-scroll" aria-expanded={revealed}
        aria-label={revealed ? 'The wedding date is revealed' : 'Pull the ribbon to reveal the wedding date'}
        onPanStart={onPanStart} onPan={onPan} onPanEnd={onPanEnd} onClick={onClick}>
        <span className="ribbon-tails" aria-hidden="true"><i/><i/></span>
        <span className="ribbon-charm" aria-hidden="true">{'✝'}</span>
      </motion.button>
      {!revealed && <p className="scroll-hint" aria-hidden="true"><Pointer size={18}/> Pull the ribbon</p>}
      {revealed && !reduceMotion && <div className="scroll-petals" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <span key={i} style={{ ['--i' as string]: i }}/>)}</div>}
    </div>

    <Countdown />

    <div className="save-actions">
      <a className="pill solid" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer"><CalendarPlus size={16}/> Google Calendar</a>
      <button className="pill" type="button" onClick={downloadIcs}><Download size={16}/> Apple / Outlook (.ics)</button>
      <a className="pill" href="#ceremony"><ChevronDown size={16}/> Our wedding details</a>
    </div>
  </section>;
}
