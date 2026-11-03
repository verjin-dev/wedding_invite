import { wedding } from '../data/wedding';
import { useCountdown } from '../hooks/useCountdown';
import Reveal from './Reveal';

export default function Countdown() {
  const t = useCountdown(wedding.ceremonyStart);
  const units: [string, number][] = [['Days', t.days], ['Hours', t.hours], ['Minutes', t.minutes], ['Seconds', t.seconds]];
  return (
    <section className="countdown" id="countdown" aria-labelledby="cd-title">
      <Reveal>
        <p className="label">03 — Counting down</p>
        <h2 id="cd-title" className="display"><span>Our special day</span></h2>
        {t.done ? (
          <p className="big">The day has arrived. Thank you for celebrating with us.</p>
        ) : (
          <div className="cd-grid" role="timer" aria-label="Time remaining until the ceremony">
            {units.map(([label, v]) => (
              <div className="cd-box" key={label}>
                <strong>{String(v).padStart(2, '0')}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}
        <p className="cd-note">17 May 2027 · 10:30 AM IST</p>
      </Reveal>
    </section>
  );
}
