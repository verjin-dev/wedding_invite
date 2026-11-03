import { wedding } from '../data/wedding';
import Polaroid from './Polaroid';
import { Drop, PenLine } from './Reveal';

export default function OurStory() {
  return (
    <section className="page story" id="story" aria-labelledby="story-title">
      <img className="story-accent" src="/florals/accent-spray.svg" alt="" aria-hidden="true" loading="lazy" />
      <Drop tilt={0.8} className="paper lined">
        <span className="tape tape-r" aria-hidden="true" />
        <p className="note">a little about us</p>
        <h2 id="story-title" className="hand-title sm"><span>{wedding.story.heading}</span></h2>
        <PenLine className="title-pen" />
        {wedding.story.paragraphs.map((p) => <p className="letter-line" key={p}>{p}</p>)}
        <p className="sign">with love, {wedding.displayNames}</p>
      </Drop>
      <Polaroid tilt={5} delay={0.2} className="story-pol" src="/images/IMG_1741.jpeg" alt="Jesmi smiling at Verjin, with a bouquet in the foreground" note="always smiling" />
    </section>
  );
}
