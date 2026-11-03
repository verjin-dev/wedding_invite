import { wedding } from '../data/wedding';
import { Card } from './Reveal';

export default function CoupleSection() {
  return (
    <Card className="b-photo photo-card">
      <img src="/images/IMG_1741.jpeg" alt="Jesmi smiling at Verjin, with a bouquet in the foreground" loading="lazy" decoding="async" />
      <div className="photo-caption">
        <p className="eyebrow light">The couple</p>
        <h2>{wedding.groom} <i>&amp;</i> {wedding.bride}</h2>
        <p>{wedding.dateLabel}</p>
      </div>
    </Card>
  );
}
