import { CalendarDays, Church, MapPin, PartyPopper } from 'lucide-react';
import { imageAssets } from '../data/assets';
import { weddingConfig } from '../data/wedding';
import Reveal from './Reveal';

type Props = { kind: 'ceremony' | 'reception' };

export default function EventCard({ kind }: Props) {
  const ceremony = kind === 'ceremony';
  const event = ceremony ? weddingConfig.ceremony : weddingConfig.reception;
  const image = ceremony ? imageAssets.churchInterior : imageAssets.receptionHall;
  const Icon = ceremony ? Church : PartyPopper;
  return <section className={`event-section ${kind}`} id={ceremony ? 'ceremony' : 'reception'} aria-labelledby={`${kind}-title`}>
    <div className="event-layout">
      <Reveal className="event-image"><img src={image.fallback} srcSet={image.srcSet} sizes="(max-width: 800px) 100vw, 58vw" width={image.width} height={image.height} alt={event.imageAlt} loading="lazy" decoding="async"/><span className="event-source-note">{ceremony ? 'Generated interpretation from the supplied altar reference' : 'Illustrative scene · venue photograph not supplied'}</span></Reveal>
      <Reveal className="event-content"><p className="eyebrow"><Icon size={16} aria-hidden="true"/> {ceremony ? 'The sacrament' : 'Together in celebration'}</p>
        <h2 className="block-title" id={`${kind}-title`}>{event.title}</h2>
        <p className="event-time">{ceremony ? weddingConfig.wedding.ceremonyTime : (weddingConfig.reception.time ?? 'Reception timing to be announced')}</p>
        <div className="event-details"><p><CalendarDays size={18} aria-hidden="true"/><span>{weddingConfig.wedding.dateLong}</span></p><p><MapPin size={18} aria-hidden="true"/><span><strong>{event.venue}</strong><br/>{event.location}{ceremony ? ` · ${weddingConfig.ceremony.diocese}` : ''}</span></p></div>
        {event.mapUrl && <a className="pill" href={event.mapUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>}
      </Reveal>
    </div>
  </section>;
}
