import { Flame } from 'lucide-react';
import { useState } from 'react';
import Reveal, { SplitTitle } from './Reveal';

const prayer = [
  'May God bless the beginning of our new journey,',
  'guide our steps, strengthen our love,',
  'and make our home a place of faith, peace and joy.',
];

/** An optional moment of prayer: the guest lights the candle and the blessing appears. */
export default function Blessing() {
  const [lit, setLit] = useState(false);
  return <section className={`blessing-section${lit ? ' is-lit' : ''}`} id="blessing" aria-labelledby="blessing-title">
    <div className="blessing-glow" aria-hidden="true" />
    <Reveal className="blessing-inner">
      <p className="eyebrow">A moment of prayer</p>
      <SplitTitle id="blessing-title" text="Light a candle"/>
      <div className="candle" aria-hidden="true">
        <div className="candle-flame"><i/></div>
        <img className="candle-art" src="/images/candle.webp" width="420" height="318" alt="" loading="lazy" decoding="async" />
        {lit && <div className="candle-motes">{Array.from({ length: 9 }, (_, i) => <span key={i} style={{ ['--i' as string]: i }}/>)}</div>}
      </div>
      {!lit && <button type="button" className="pill solid" onClick={() => setLit(true)}><Flame size={16} aria-hidden="true"/> Light a candle</button>}
      <div className="blessing-prayer" role="status" aria-live="polite">
        {lit && <p>{prayer.map(line => <span key={line}>{line}</span>)}</p>}
        {lit && <p className="blessing-amen">Amen.</p>}
      </div>
    </Reveal>
  </section>;
}
