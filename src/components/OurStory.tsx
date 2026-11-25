import { imageAssets } from '../data/assets';
import { weddingConfig } from '../data/wedding';
import Reveal, { ParallaxImage, SplitTitle } from './Reveal';
import Timeline from './Timeline';

export default function OurStory() {
  const portrait = imageAssets.couplePortrait;
  return <section className="story-section" id="story" aria-labelledby="story-title"><div className="story-inner">
    <Reveal className="story-marker"><p className="eyebrow">Our story</p><span className="cross-mark" aria-hidden="true">{"✝"}</span></Reveal>
    <div className="story-editorial">
      <Reveal className="story-image"><ParallaxImage src={portrait.src} srcSet={portrait.srcSet} sizes="(max-width: 800px) 100vw, 48vw" width={portrait.width} height={portrait.height} alt={weddingConfig.story.imageAlt} loading="lazy" decoding="async"/><span className="story-image-caption">A moment together</span></Reveal>
      <Reveal className="story-copy"><p className="eyebrow">A sacred beginning</p><SplitTitle id="story-title" className="story-title" text={weddingConfig.story.title}/>
        <div className="story-paragraphs">{weddingConfig.story.paragraphs.map((paragraph,index)=><p className={index===0?'story-opening':''} key={paragraph}>{paragraph}</p>)}</div>
      </Reveal>
    </div>
    <div className="story-rule" aria-hidden="true"><span>{"✦"}</span></div>
    {/* The chapters carry the story on; their closing line is the one signature. */}
    <Timeline />
  </div></section>;
}
