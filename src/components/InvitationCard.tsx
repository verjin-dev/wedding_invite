import { wedding } from '../data/wedding';
import Reveal from './Reveal';

export default function InvitationCard() {
  return (
    <section className="section invitation" id="invitation" aria-labelledby="inv-title">
      <Reveal>
        <blockquote className="verse">
          “{wedding.verse.text}”
          <cite>— {wedding.verse.ref}</cite>
        </blockquote>
      </Reveal>
      <Reveal delay={0.1} className="inv-main">
        <p className="label">01 — With the blessings of our families</p>
        <h2 id="inv-title" className="display">
          <span>{wedding.groom}</span><i>and</i><span>{wedding.bride}</span>
        </h2>
        <p className="message">{wedding.message}</p>
      </Reveal>
      <Reveal delay={0.15} className="inv-events">
        <p className="label">{wedding.dateLabel}</p>
        <div className="inv-rows">
          {([wedding.ceremony, wedding.reception] as const).map((e) => (
            <p key={e.title}><strong>{e.title}</strong><span>{e.time}</span><em>{e.venue}, {e.location}</em></p>
          ))}
        </div>
        <p className="blessing">May God bless our union. We look forward to celebrating with you.</p>
      </Reveal>
    </section>
  );
}
