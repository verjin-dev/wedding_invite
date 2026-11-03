import { CalendarDays, Church, Clock, MapPin, PartyPopper } from 'lucide-react';
import { wedding } from '../data/wedding';
import Reveal from './Reveal';

type Props = { kind: 'ceremony' | 'reception' };

export default function EventCard({ kind }: Props) {
  const e = wedding[kind];
  const Icon = kind === 'ceremony' ? Church : PartyPopper;
  return (
    <Reveal className="event-wrap">
      <article className="event">
        <Icon className="event-icon" size={34} strokeWidth={1.2} aria-hidden="true" />
        <h3 className="script">{e.title}</h3>
        <ul>
          <li><CalendarDays size={18} aria-hidden="true" /> 17 May 2027</li>
          <li><Clock size={18} aria-hidden="true" /> {e.time}</li>
          <li><MapPin size={18} aria-hidden="true" /> <span><strong>{e.venue}</strong><br />{e.location}</span></li>
        </ul>
        <a className="btn btn-outline" href={e.mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions<span className="sr-only"> to {e.venue} (opens in a new tab)</span></a>
      </article>
    </Reveal>
  );
}
