import { CalendarDays, Clock, MapPin, Sun, Sunset } from 'lucide-react';
import { wedding } from '../data/wedding';
import Reveal from './Reveal';

type Props = { kind: 'ceremony' | 'reception' };

export default function EventCard({ kind }: Props) {
  const e = wedding[kind];
  const Icon = kind === 'ceremony' ? Sun : Sunset;
  const part = kind === 'ceremony' ? 'Morning' : 'Evening';
  return (
    <Reveal className="event-wrap">
      <article className={`event event-${kind}`}>
        <span className="event-part"><Icon size={20} strokeWidth={1.3} aria-hidden="true" /> {part}</span>
        <h3>{e.title}</h3>
        <ul>
          <li><CalendarDays size={18} strokeWidth={1.3} aria-hidden="true" /> 17 May 2027</li>
          <li><Clock size={18} strokeWidth={1.3} aria-hidden="true" /> {e.time}</li>
          <li><MapPin size={18} strokeWidth={1.3} aria-hidden="true" /> <span><strong>{e.venue}</strong><br />{e.location}</span></li>
        </ul>
        <a className="link-arrow" href={e.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions →<span className="sr-only"> to {e.venue} (opens in a new tab)</span></a>
      </article>
    </Reveal>
  );
}
