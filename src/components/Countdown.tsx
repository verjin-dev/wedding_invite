import { AnimatePresence, motion } from 'framer-motion';
import { wedding } from '../data/wedding';
import { useCountdown } from '../hooks/useCountdown';
import { Drop } from './Reveal';

/** Each digit flips up when its value changes. */
function Flip({ value }: { value: string }) {
  return (
    <span className="flip" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="flip-d"
          initial={{ y: '80%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-80%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
    <section className="page" id="countdown" aria-labelledby="cd-title">
      <Drop tilt={1} className="ticket ticket-count">
        <div className="ticket-main">
          <p className="label">Admit two · One day only</p>
          <h2 id="cd-title" className="hand-title sm"><span>The wedding day</span></h2>
          <p className="typed">17 May 2027 · 10:30 AM IST</p>
        </div>
        <div className="ticket-stub">
          {t.done ? (
            <p className="big">The day has arrived. Thank you for celebrating with us.</p>
          ) : (
            <div className="cd-grid" role="timer" aria-label={`${t.days} days, ${t.hours} hours, ${t.minutes} minutes and ${t.seconds} seconds until the ceremony`}>
              {units.map(([label, v]) => (
                <div className="cd-box" key={label}>
                  <strong>{Array.from(String(v).padStart(2, '0')).map((d, k) => <Flip key={k} value={d} />)}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Drop>
    </section>
  );
}
