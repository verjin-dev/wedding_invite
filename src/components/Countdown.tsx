import { AnimatePresence, motion } from 'framer-motion';
import { wedding } from '../data/wedding';
import { useCountdown } from '../hooks/useCountdown';
import Reveal from './Reveal';

/** Each digit rolls upward when its value changes. */
function Roll({ value }: { value: string }) {
  return (
    <span className="roll" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="roll-d"
          initial={{ y: '90%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-90%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Countdown() {
  const t = useCountdown(wedding.ceremonyStart);
  const units: [string, number][] = [['Days', t.days], ['Hours', t.hours], ['Minutes', t.minutes], ['Seconds', t.seconds]];
  return (
    <section className="countdown" id="countdown" aria-labelledby="cd-title">
      <Reveal>
        <p className="label">03 — Counting down</p>
        <h2 id="cd-title" className="display"><span>Until the sun rises on our day</span></h2>
        {t.done ? (
          <p className="big">The day has arrived. Thank you for celebrating with us.</p>
        ) : (
          <div className="cd-grid" role="timer" aria-label={`${t.days} days, ${t.hours} hours, ${t.minutes} minutes and ${t.seconds} seconds until the ceremony`}>
            {units.map(([label, v], i) => {
              const s = String(v).padStart(2, '0');
              return (
                <motion.div
                  className="cd-box" key={label}
                  initial={{ clipPath: 'inset(100% 0 0 0)' }} whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                  viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.65, 0, 0.2, 1] }}
                >
                  <strong>{Array.from(s).map((d, k) => <Roll key={k} value={d} />)}</strong>
                  <span>{label}</span>
                </motion.div>
              );
            })}
          </div>
        )}
        <p className="cd-note">17 May 2027 · 10:30 AM IST</p>
      </Reveal>
    </section>
  );
}
