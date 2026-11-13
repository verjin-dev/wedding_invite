import { imageAssets } from '../data/assets';
import { weddingConfig } from '../data/wedding';
import Reveal, { SplitTitle } from './Reveal';
import { HeartFlourish } from './Flourishes';

export default function CoupleSection() {
  const profiles = [
    { key: 'groom', label: 'The groom', person: weddingConfig.couple.groom, image: imageAssets.groomPortrait },
    { key: 'bride', label: 'The bride', person: weddingConfig.couple.bride, image: imageAssets.bridePortrait },
  ];
  return <section className="couple-section" id="couple" aria-labelledby="couple-title"><div className="block couple-inner">
    <Reveal className="block-head"><HeartFlourish /><p className="eyebrow">The couple</p><SplitTitle id="couple-title" text="Two lives, one beginning"/></Reveal>
    <div className="profiles-grid">{profiles.map(({ key, label, person, image }, index) => <Reveal className={`profile-card profile-${key}`} key={key} delay={index * .12}>
      <figure className="profile-photo"><img src={image.src} srcSet={image.srcSet} sizes="(max-width: 760px) 90vw, 42vw" width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async"/><figcaption>{label}</figcaption></figure>
      <div className="profile-copy"><p className="eyebrow">{label}</p><h3>{person.name}</h3>{weddingConfig.profiles[key === 'groom' ? 'groomIntroduction' : 'brideIntroduction'] && <p className="body">{weddingConfig.profiles[key === 'groom' ? 'groomIntroduction' : 'brideIntroduction']}</p>}</div>
    </Reveal>)}</div>
  </div></section>;
}
