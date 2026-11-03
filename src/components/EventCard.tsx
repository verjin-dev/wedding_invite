import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { wedding } from '../data/wedding';
import Reveal from './Reveal';

type Props = { kind: 'ceremony' | 'reception' };

export default function EventCard({ kind }: Props) {
  const e = wedding[kind];
  const num = kind === 'ceremony' ? 'I' : 'II';
  return (
    <Reveal className="event-wrap">
      <article className="event">
        <span className="event-num" aria-hidden="true">{num}</span>
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
