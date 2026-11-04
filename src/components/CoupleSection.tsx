import { wedding } from '../data/wedding';
import { Card } from './Reveal';

export default function CoupleSection() {
  return (
    <Card className="b-photo photo-card">
      <div className="duo">
        <img src="/images/groom-portrait.webp" alt={`Portrait of ${wedding.groom}`} loading="lazy" decoding="async" />
        <img src="/images/bride-portrait.webp" alt={`Portrait of ${wedding.bride}`} loading="lazy" decoding="async" />
      </div>
      <div className="photo-caption">
        <p className="eyebrow light">The couple</p>
        <h2>{wedding.groom} <i>&amp;</i> {wedding.bride}</h2>
        <p>{wedding.dateLabel}</p>
      </div>
    </Card>
  );
}
