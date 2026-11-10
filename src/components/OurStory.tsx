import { imageAssets } from '../data/assets';
import { weddingConfig } from '../data/wedding';
import Reveal from './Reveal';

export default function OurStory() {
  const portrait = imageAssets.couplePortrait;
  return <section className="story-section" id="story" aria-labelledby="story-title"><div className="story-inner">
    <Reveal className="story-marker"><p className="eyebrow">Our story</p><span className="cross-mark" aria-hidden="true">{"\u271d"}</span></Reveal>
    <div className="story-editorial">
      <Reveal className="story-image"><img src={portrait.src} srcSet={portrait.srcSet} sizes="(max-width: 800px) 100vw, 48vw" width={portrait.width} height={portrait.height} alt={weddingConfig.story.imageAlt} loading="lazy" decoding="async"/><span className="story-image-caption">A moment together</span></Reveal>
      <Reveal className="story-copy"><p className="eyebrow">A sacred beginning</p><h2 id="story-title" className="story-title">{weddingConfig.story.title}</h2>
        <div className="story-paragraphs">{weddingConfig.story.paragraphs.map((paragraph,index)=><p className={index===0?'story-opening':''} key={paragraph}>{paragraph}</p>)}</div>
        <p className="sign">{weddingConfig.couple.displayNames}</p>
      </Reveal>
    </div>
    <div className="story-rule" aria-hidden="true"><span>{"\u2726"}</span></div>
  </div></section>;
}
