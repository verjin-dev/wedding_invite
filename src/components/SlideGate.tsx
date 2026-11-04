import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { pop } from '../lib/confetti';

type Props = { onOpened: () => void };

const KNOB = 56;

/** Opening screen: slide the knob across (or press it) and the screen lifts away. */
export default function SlideGate({ onOpened }: Props) {
  const [open, setOpen] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(220);
  const x = useMotionValue(0);
  const fill = useTransform(x, (v) => v + KNOB);
  const hintOpacity = useTransform(x, [0, max * 0.5], [1, 0]);

  useEffect(() => {
    const measure = () => track.current && setMax(track.current.offsetWidth - KNOB - 8);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const finish = () => {
    if (open) return;
    setOpen(true);
    onOpened();
    pop(window.innerWidth / 2, window.innerHeight * 0.75);
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="gate" role="dialog" aria-modal="true" aria-label="Wedding invitation"
          exit={{ y: '-100%' }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="gate-glow" aria-hidden="true" />
          <motion.div className="gate-body" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            <p className="eyebrow">You are invited</p>
            <h1 className="gate-names"><span>Verjin</span><i>&amp;</i><span>Jesmi</span></h1>
            <p className="gate-date">17 · 05 · 2027</p>
          </motion.div>
          <motion.div className="gate-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
            <div className="slider" ref={track}>
              <motion.div className="slider-fill" style={{ width: fill }} aria-hidden="true" />
              <motion.span className="slider-hint" style={{ opacity: hintOpacity }}>Slide to open</motion.span>
              <motion.button
                type="button" className="slider-knob" aria-label="Open invitation"
                drag="x" dragConstraints={{ left: 0, right: max }} dragElastic={0} dragMomentum={false}
                style={{ x }}
                onDragEnd={() => { if (x.get() > max * 0.8) finish(); else x.set(0); }}
                onClick={finish}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight size={22} />
              </motion.button>
            </div>
            <button type="button" className="skip-link" onClick={finish}>Skip</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
