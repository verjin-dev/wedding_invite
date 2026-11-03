import { ArrowUpRight } from 'lucide-react';
import { wedding } from '../data/wedding';
import Reveal from './Reveal';

export default function VenueDirections() {
  return (
    <section className="block" id="directions" aria-labelledby="dir-title">
      <Reveal className="block-head">
        <p className="eyebrow">Find us</p>
        <h2 id="dir-title" className="block-title">Venue directions</h2>
      </Reveal>
      <Reveal className="rows">
        {([wedding.ceremony, wedding.reception] as const).map((v) => (
          <a key={v.venue} className="row" href={v.mapsUrl} target="_blank" rel="noopener noreferrer">
            <span><small>{v.title}</small>{v.venue}, {v.location}</span>
            <ArrowUpRight size={26} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
