import { weddingConfig } from '../data/wedding';
import Reveal, { SplitTitle } from './Reveal';

export default function Timeline() {
  const { title, opening, closing, chapters, finale } = weddingConfig.timeline;
  const { ceremony, wedding } = weddingConfig;
  return <section className="timeline-section" id="journey" aria-labelledby="timeline-title"><div className="timeline-inner">
    <Reveal className="timeline-head"><p className="eyebrow">Chapter by chapter</p><SplitTitle id="timeline-title" text={title}/><p className="timeline-opening">{opening}</p></Reveal>
    <div className="timeline"><span className="timeline-line" aria-hidden="true"/><ol>
      {chapters.map(chapter => <li className="timeline-item" key={chapter.title}><Reveal>
        <p className="eyebrow">{chapter.label}</p><h3>{chapter.title}</h3><p className="timeline-text">{chapter.text}</p>
        {chapter.when && <p className="timeline-when">{chapter.when}</p>}
      </Reveal></li>)}
      <li className="timeline-item timeline-item--final"><Reveal className="timeline-finale">
        <p className="eyebrow">{finale.label}</p><h3>{finale.title}</h3><p className="timeline-text">{finale.text}</p>
        <p className="timeline-when">Our wedding day · {ceremony.venue}, {ceremony.location} · {wedding.ceremonyTime}</p>
      </Reveal></li>
    </ol></div>
    <Reveal className="timeline-closing"><p>{closing}</p><p className="sign">{weddingConfig.couple.displayNames}</p></Reveal>
  </div></section>;
}
