import { ArrowUpRight } from 'lucide-react';
import { wedding } from '../data/wedding';
import { Card } from './Reveal';
import Reveal from './Reveal';

export default function VenueDirections() {
  return (
    <section className="block" id="directions" aria-labelledby="dir-title">
      <Reveal className="block-head">
        <p className="eyebrow">Find us</p>
        <h2 id="dir-title" className="block-title">Venue directions</h2>
      </Reveal>
      <div className="venues">
        {([wedding.ceremony, wedding.reception] as const).map((v) => (
          <Card key={v.venue} className="venue">
            <iframe
              className="venue-map" src={v.embedUrl} title={`Map: ${v.venue}, ${v.location}`}
              loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"
            />
            <a className="row" href={v.mapsUrl} target="_blank" rel="noopener noreferrer">
              <span><small>{v.title}</small>{v.venue}, {v.location}</span>
              <ArrowUpRight size={26} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
