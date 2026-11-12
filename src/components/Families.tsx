import { imageAssets } from '../data/assets';
import { weddingConfig } from '../data/wedding';
import Reveal from './Reveal';

const families = [
  { key: 'groom', label: "Verjin's family", parents: weddingConfig.couple.groom.parents, wishes: weddingConfig.couple.groom.wishes, photo: imageAssets.groomFamily },
  { key: 'bride', label: "Jesmi's family", parents: weddingConfig.couple.bride.parents, wishes: weddingConfig.couple.bride.wishes, photo: imageAssets.brideFamily },
];

export default function Families() {
  return <section className="block family-section" id="families" aria-labelledby="families-title">
    <Reveal className="block-head">
      <p className="eyebrow">With the blessings of our families</p>
      <h2 className="block-title" id="families-title">The families who raised us</h2>
      <p className="body">With gratitude for the love, faith and support that have brought us to this day.</p>
    </Reveal>
    <div className="family-grid">
      {families.map(({ key, label, parents, wishes, photo }, index) => <Reveal className="family-card" key={key} delay={index * .12}>
        <figure className="family-photo">
          <img src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 760px) 92vw, 46vw" width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async"/>
          <figcaption>{label}<small>{parents}</small></figcaption>
        </figure>
        <div className="family-wishes"><p className="eyebrow">With best wishes from</p><ul>{wishes.map(name => <li key={name}>{name}</li>)}</ul></div>
      </Reveal>)}
    </div>
  </section>;
}
