import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Florals from './Florals';

type Props = { onOpened: () => void };

/** Opening screen: before dawn, a closed arched door. Opening it swings the doors apart, the sun rises and the page begins. */
export default function DawnGate({ onOpened }: Props) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'gone'>('closed');
  const opening = phase === 'opening';

  useEffect(() => {
    document.body.style.overflow = phase === 'gone' ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  const open = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    window.setTimeout(() => { setPhase('gone'); onOpened(); }, 2300);
  };
  const skip = () => { setPhase('gone'); onOpened(); };

  const ease = [0.65, 0, 0.2, 1] as const;

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div className="gate" role="dialog" aria-modal="true" aria-label="Wedding invitation" exit={{ opacity: 0 }} transition={{ duration: 1 }}>
          <div className="gate-night" aria-hidden="true" />
          <motion.div className="gate-dawn" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: opening ? 1 : 0 }} transition={{ duration: 1.8, ease }} />
          <div className="gate-stars" aria-hidden="true" />
          <motion.div className="gate-sun" aria-hidden="true" animate={opening ? { y: '-46vh', scale: 1.7 } : { y: 0, scale: 1 }} transition={{ duration: 2, ease }} />
          <Florals />
          <div className="gate-stage">
            <motion.p className="label" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>You are invited</motion.p>
            <motion.div className="gate-arch-wrap" initial={{ clipPath: 'inset(100% -24px -24px -24px)' }} animate={{ clipPath: 'inset(0% -24px -24px -24px)' }} transition={{ delay: 0.15, duration: 1.2, ease }}>
              <div className="gate-arch">
                <img className="gate-photo" src="/images/IMG_2012(1).jpeg" alt="" />
                <motion.div className="door door-l" animate={{ rotateY: opening ? -112 : 0 }} transition={{ duration: 1.3, ease, delay: 0.15 }} />
                <motion.div className="door door-r" animate={{ rotateY: opening ? 112 : 0 }} transition={{ duration: 1.3, ease, delay: 0.15 }} />
              </div>
              <motion.img className="gate-seal" src="/florals/emblem.svg" alt="" animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.6 : 1 }} transition={{ duration: 0.5 }} />
            </motion.div>
            <motion.h1 className="gate-names" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}>
              <span>Verjin</span><i>&amp;</i><span>Jesmi</span>
            </motion.h1>
            <motion.div className="gate-actions" initial={{ opacity: 0 }} animate={{ opacity: opening ? 0 : 1 }} transition={{ delay: opening ? 0 : 1.4, duration: 0.7 }}>
              <button type="button" className="btn btn-gold" onClick={open} autoFocus>Open Invitation</button>
              <button type="button" className="skip-link" onClick={skip}>Skip animation</button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
