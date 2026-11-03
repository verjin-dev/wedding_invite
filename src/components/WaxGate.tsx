import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = { onOpened: () => void };

/** Opening screen: a sealed card. Tapping breaks the wax seal in two, then the card lifts away. */
export default function WaxGate({ onOpened }: Props) {
  const [phase, setPhase] = useState<'closed' | 'broken' | 'gone'>('closed');

  useEffect(() => {
    document.body.style.overflow = phase === 'gone' ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  const open = () => {
    if (phase !== 'closed') return;
    setPhase('broken');
    window.setTimeout(() => { setPhase('gone'); onOpened(); }, 1900);
  };
  const skip = () => { setPhase('gone'); onOpened(); };
  const broken = phase === 'broken';

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div className="wax-gate" role="dialog" aria-modal="true" aria-label="Wedding invitation" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            className="wax-card"
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            animate={broken ? { opacity: 0, y: -80, rotate: 2, scale: 1.05 } : { opacity: 1, y: 0, rotate: -1.5 }}
            transition={broken ? { delay: 0.9, duration: 0.9, ease: [0.65, 0, 0.35, 1] } : { duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tape tape-gate" aria-hidden="true" />
            <p className="label">You are invited</p>
            <img className="wax-emblem" src="/florals/emblem.svg" alt="" />
            <h1 className="hand-title"><span>Verjin</span><i>&amp;</i><span>Jesmi</span></h1>
            <p className="wax-date">17 · 05 · 2027</p>
            <button type="button" className="seal-btn" onClick={open} aria-label="Break the seal and open the invitation" autoFocus>
              <motion.span className="seal-half seal-l" animate={broken ? { x: -34, y: 14, rotate: -24, opacity: 0 } : { x: 0, rotate: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}><b>V&amp;J</b></motion.span>
              <motion.span className="seal-half seal-r" animate={broken ? { x: 34, y: 20, rotate: 22, opacity: 0 } : { x: 0, rotate: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}><b>V&amp;J</b></motion.span>
            </button>
            <p className="seal-hint">Tap the seal to open</p>
          </motion.div>
          <button type="button" className="skip-link" onClick={skip}>Skip animation</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
