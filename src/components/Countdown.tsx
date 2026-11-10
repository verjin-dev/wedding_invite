import { CalendarPlus, Download } from 'lucide-react';
import { imageAssets } from '../data/assets';
import { weddingConfig } from '../data/wedding';
import { useCountdown } from '../hooks/useCountdown';
import { downloadIcs, googleCalendarUrl } from '../lib/calendar';
import { RingsFlourish } from './Flourishes';

const UNITS = [['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']] as const;

export default function Countdown() {
  const target = `${weddingConfig.wedding.date}T${weddingConfig.wedding.ceremonyTime24}:00+05:30`;
  const countdown = useCountdown(target);
  const background = imageAssets.roseArch;
  return <section className="countdown-band" id="countdown" aria-labelledby="countdown-title">
    <img className="countdown-band__bg" src={background.src} srcSet={background.srcSet} sizes="100vw" width={background.width} height={background.height} alt="" loading="lazy" decoding="async"/>
    <div className="countdown-band__veil" aria-hidden="true"/>
    <div className="countdown-band__inner">
      <RingsFlourish />
      <p className="eyebrow light">{weddingConfig.wedding.dateLong}</p>
      <h2 className="countdown-band__title" id="countdown-title">The day we begin forever</h2>
      {countdown.phase === 'counting' ? <>
        <ul className="countdown-band__units" aria-hidden="true">{UNITS.map(([key, label]) => <li key={key}><span className="countdown-band__value">{countdown.ready ? String(countdown[key]).padStart(2, '0') : '--'}</span><span className="countdown-band__label">{label}</span></li>)}</ul>
        <p className="sr-only" role="timer" aria-live="off">{countdown.ready ? `${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes and ${countdown.seconds} seconds until the ceremony.` : ''}</p>
      </> : <p className="countdown-band__done">{countdown.phase === 'today' ? `${weddingConfig.couple.displayNames} are married today. Thanks be to God.` : `${weddingConfig.couple.displayNames} were married on ${weddingConfig.wedding.dateLabel}.`}</p>}
      <div className="countdown-band__actions"><a className="pill pill--light" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer"><CalendarPlus size={16} aria-hidden="true"/>Add to Google Calendar</a><button type="button" className="pill pill--light" onClick={downloadIcs}><Download size={16} aria-hidden="true"/>Download .ics</button></div>
    </div>
  </section>;
}
