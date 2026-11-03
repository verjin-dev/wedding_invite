import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { wedding } from '../data/wedding';
import { Drop } from './Reveal';

type Props = { kind: 'ceremony' | 'reception'; index: number };

export default function EventCard({ kind, index }: Props) {
  const e = wedding[kind];
  return (
    <Drop tilt={index === 0 ? -1.5 : 1.5} delay={index * 0.12} className={`ticket ticket-${kind}`}>
      <div className="ticket-main">
        <p className="label">{kind === 'ceremony' ? 'Admit two · Morning' : 'Admit all · Evening'}</p>
        <h3 className="hand-title sm"><span>{e.title}</span></h3>
        <ul>
          <li><CalendarDays size={18} strokeWidth={1.3} aria-hidden="true" /> 17 May 2027</li>
          <li><Clock size={18} strokeWidth={1.3} aria-hidden="true" /> {e.time}</li>
          <li><MapPin size={18} strokeWidth={1.3} aria-hidden="true" /> <span><strong>{e.venue}</strong><br />{e.location}</span></li>
        </ul>
      </div>
      <div className="ticket-stub">
        <a className="btn btn-outline" href={e.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions<span className="sr-only"> to {e.venue} (opens in a new tab)</span></a>
      </div>
    </Drop>
  );
}
