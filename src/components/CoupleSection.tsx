import { wedding } from '../data/wedding';
import Polaroid from './Polaroid';
import Reveal from './Reveal';

export default function CoupleSection() {
  return (
    <section className="page couple" id="couple" aria-labelledby="couple-title">
      <div className="couple-photos">
        <Polaroid tilt={-5} className="pol-a" src="/images/IMG_1741.jpeg" alt="Jesmi smiling at Verjin, with a bouquet in the foreground" note={wedding.groom.split(' ')[0]} />
        <Polaroid tilt={4} delay={0.15} className="pol-b" src="/images/IMG_2012(1).jpeg" alt="Verjin and Jesmi standing together in a sunlit garden" note={wedding.bride.split(' ')[0]} />
      </div>
      <Reveal className="couple-copy">
        <p className="note">the couple</p>
        <h2 id="couple-title" className="hand-title sm"><span>{wedding.groom}</span><i>&amp;</i><span>{wedding.bride}</span></h2>
        <p className="typed">{wedding.dateLabel}</p>
        <p>Two hearts, joined in faith and love, ready to begin a lifetime together. Thank you for being part of our journey.</p>
      </Reveal>
    </section>
  );
}
