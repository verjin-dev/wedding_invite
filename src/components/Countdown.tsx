import { AnimatePresence, motion } from 'framer-motion';
import { wedding } from '../data/wedding';
import { useCountdown } from '../hooks/useCountdown';
import { Card } from './Reveal';

/** Each digit slides up when its value changes. */
function Flip({ value }: { value: string }) {
  return (
    <span className="flip" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="flip-d"
          initial={{ y: '70%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-70%', opacity: 0 }}
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
    <Card className="b-count tint" delay={0.1}>
      <p className="eyebrow">Countdown</p>
      {t.done ? (
        <p className="lead">The day has arrived. Thank you for celebrating with us.</p>
      ) : (
        <div className="cd-grid" role="timer" aria-label={`${t.days} days, ${t.hours} hours, ${t.minutes} minutes and ${t.seconds} seconds until the ceremony`}>
          {units.map(([label, v]) => (
            <div className="cd-box" key={label}>
              <strong>{Array.from(String(v).padStart(label === 'Days' ? 3 : 2, '0')).map((d, k) => <Flip key={k} value={d} />)}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
      <p className="small">until 10:30 AM, 17 May 2027 · India Standard Time</p>
    </Card>
  );
}
