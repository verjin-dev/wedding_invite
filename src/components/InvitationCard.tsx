import { wedding } from '../data/wedding';
import { Drop } from './Reveal';

export default function InvitationCard() {
  return (
    <section className="page" id="invitation" aria-labelledby="inv-title">
      <Drop tilt={-1} className="paper letter">
        <span className="tape tape-l" aria-hidden="true" />
        <blockquote className="verse">
          “{wedding.verse.text}”
          <cite>— {wedding.verse.ref}</cite>
        </blockquote>
        <p className="label">With the blessings of our families</p>
        <p className="message">{wedding.message}</p>
        <h2 id="inv-title" className="hand-title sm">
          <span>{wedding.groom}</span><i>and</i><span>{wedding.bride}</span>
        </h2>
        <div className="inv-rows">
          {([wedding.ceremony, wedding.reception] as const).map((e) => (
            <p key={e.title}><strong>{e.title}</strong><span>{e.time}</span><em>{e.venue}, {e.location}</em></p>
          ))}
        </div>
        <p className="blessing">May God bless our union. We look forward to celebrating with you.</p>
      </Drop>
    </section>
  );
}
