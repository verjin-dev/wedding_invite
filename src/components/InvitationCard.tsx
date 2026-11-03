import { wedding } from '../data/wedding';
import Florals from './Florals';
import Reveal from './Reveal';

export default function InvitationCard() {
  return (
    <section className="section" id="invitation" aria-labelledby="inv-title">
      <Reveal>
        <article className="card">
          <Florals className="florals-card" />
          <div className="card-body">
            <blockquote className="verse">
              “{wedding.verse.text}”
              <cite>— {wedding.verse.ref}</cite>
            </blockquote>
            <p className="label">With the blessings of our families</p>
            <p className="serif message">{wedding.message}</p>
            <h2 id="inv-title" className="script names">
              <span>{wedding.groom}</span><i>and</i><span>{wedding.bride}</span>
            </h2>
            <img className="divider" src="/florals/divider.svg" alt="" />
            <p className="label">{wedding.dateLabel}</p>
            <div className="card-events">
              <p><strong>{wedding.ceremony.title}</strong><br />{wedding.ceremony.time} · {wedding.ceremony.venue}, {wedding.ceremony.location}</p>
              <p><strong>{wedding.reception.title}</strong><br />{wedding.reception.time} · {wedding.reception.venue}, {wedding.reception.location}</p>
            </div>
            <p className="serif blessing">May God bless our union. We look forward to celebrating with you.</p>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
