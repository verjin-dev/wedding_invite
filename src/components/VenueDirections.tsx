import { Navigation as Compass } from 'lucide-react';
import { wedding } from '../data/wedding';
import Reveal from './Reveal';

export default function VenueDirections() {
  return (
    <section className="section venues" id="directions" aria-labelledby="dir-title">
      <Reveal>
        <p className="label">08 - Find us</p><h2 id="dir-title" className="display"><span>Venue directions</span></h2>
        <div className="venue-links">
          {([wedding.ceremony, wedding.reception] as const).map((v) => (
            <a key={v.venue} className="btn btn-outline" href={v.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Compass size={16} aria-hidden="true" /> {v.venue}, {v.location}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
