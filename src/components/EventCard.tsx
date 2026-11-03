import { ArrowUpRight, CalendarDays, Church, MapPin, PartyPopper } from 'lucide-react';
import { wedding } from '../data/wedding';
import { Card } from './Reveal';

type Props = { kind: 'ceremony' | 'reception' };

export default function EventCard({ kind }: Props) {
  const e = wedding[kind];
  const Icon = kind === 'ceremony' ? Church : PartyPopper;
  const [time, suffix] = kind === 'ceremony' ? ['10:30', 'AM'] : ['5:00 – 9:00', 'PM'];
  return (
    <Card className={`event ${kind === 'reception' ? 'b-rec dark' : 'b-cer'}`} delay={kind === 'reception' ? 0.1 : 0}>
      <div className="event-top">
        <span className="icon-chip"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>
        <p className="eyebrow">{e.title}</p>
      </div>
      <p className="time">{time}<small>{suffix}</small></p>
      <ul>
        <li><CalendarDays size={18} strokeWidth={1.5} aria-hidden="true" /> 17 May 2027</li>
        <li><MapPin size={18} strokeWidth={1.5} aria-hidden="true" /> <span><strong>{e.venue}</strong><br />{e.location}</span></li>
      </ul>
      <a className="pill" href={e.mapsUrl} target="_blank" rel="noopener noreferrer">
        Get directions <ArrowUpRight size={16} aria-hidden="true" />
        <span className="sr-only"> to {e.venue} (opens in a new tab)</span>
      </a>
    </Card>
  );
}
