import { wedding } from '../data/wedding';
import Reveal from './Reveal';

export default function OurStory() {
  return (
    <section className="section story" id="story" aria-labelledby="story-title">
      <img className="story-accent" src="/florals/accent-spray.svg" alt="" aria-hidden="true" loading="lazy" />
      <Reveal>
        <p className="label">A little about us</p>
        <h2 id="story-title" className="script">{wedding.story.heading}</h2>
        <div className="story-grid">
          <img src="/images/IMG_1741.jpeg" alt="Jesmi smiling at Verjin, with a bouquet in the foreground" loading="lazy" decoding="async" />
          <div>
            {wedding.story.paragraphs.map((p) => <p className="serif" key={p}>{p}</p>)}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
