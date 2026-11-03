import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Florals from './Florals';

type Props = { onOpened: () => void };

export default function EnvelopeOpening({ onOpened }: Props) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'gone'>('closed');

  useEffect(() => {
    document.body.style.overflow = phase === 'gone' ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  const open = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    window.setTimeout(() => { setPhase('gone'); onOpened(); }, 1700);
  };
  const skip = () => { setPhase('gone'); onOpened(); };

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          className="envelope-screen"
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation envelope"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Florals />
          <div className="envelope-stage">
            <p className="label">You are invited</p>
            <div className={`envelope ${phase === 'opening' ? 'is-open' : ''}`}>
              <motion.div className="env-card" animate={phase === 'opening' ? { y: -70, scale: 1.04 } : { y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}>
                <span>Verjin &amp; Jesmi</span>
              </motion.div>
              <div className="env-back" />
              <div className="env-front" />
              <div className="env-flap" />
              <img className="env-seal" src="/florals/emblem.svg" alt="" />
            </div>
            <h1 className="env-names script"><span>Verjin</span><i>&amp;</i><span>Jesmi</span></h1>
            <p className="serif date">17 · May · 2027</p>
            <button type="button" className="btn btn-gold" onClick={open} autoFocus>Open Invitation</button>
            <button type="button" className="skip-link" onClick={skip}>Skip animation</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
