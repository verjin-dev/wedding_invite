import { imageAssets } from '../data/assets';
import { weddingConfig } from '../data/wedding';
import Reveal from './Reveal';

export default function VenueDirections() {
  const reference = imageAssets.churchReference2;
  const hall = imageAssets.receptionHall;
  return <section className="block directions-section" id="directions" aria-labelledby="dir-title">
    <Reveal className="block-head"><p className="eyebrow">The places we gather</p><h2 id="dir-title" className="block-title">Where to find us</h2><p className="body">Our celebration will take place in Iruthayapuram. Directions will be added when the locations are confirmed.</p></Reveal>
    <div className="venue-reference-grid">
      <Reveal className="venue-reference"><img src={reference.src} srcSet={reference.srcSet} sizes="(max-width: 760px) 100vw, 50vw" width={reference.width} height={reference.height} alt={reference.alt} loading="lazy" decoding="async"/><span className="venue-photo-label">Church exterior · user-provided photograph</span><div className="venue-copy"><p className="eyebrow">Wedding</p><h3>{weddingConfig.ceremony.venue}</h3><p>{weddingConfig.ceremony.location} · {weddingConfig.ceremony.diocese}</p>{weddingConfig.ceremony.mapUrl && <a className="pill" href={weddingConfig.ceremony.mapUrl} target="_blank" rel="noreferrer">Open directions ↗</a>}</div></Reveal>
      <Reveal className="venue-reference"><img src={hall.fallback} srcSet={hall.srcSet} sizes="(max-width: 760px) 100vw, 50vw" width={hall.width} height={hall.height} alt={hall.alt} loading="lazy" decoding="async"/><span className="venue-photo-label">Illustration · confirmed hall photograph not supplied</span><div className="venue-copy"><p className="eyebrow">Wedding reception</p><h3>{weddingConfig.reception.venue}</h3><p>{weddingConfig.reception.location}{weddingConfig.reception.time ? ` · ${weddingConfig.reception.time}` : ' · Timing to be announced'}</p>{weddingConfig.reception.mapUrl && <a className="pill" href={weddingConfig.reception.mapUrl} target="_blank" rel="noreferrer">Open directions ↗</a>}</div></Reveal>
    </div>
  </section>;
}
