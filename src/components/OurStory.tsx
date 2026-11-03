import { wedding } from '../data/wedding';
import { Card } from './Reveal';

export default function OurStory() {
  return (
    <Card className="b-story blush" delay={0.1}>
      <p className="eyebrow">A little about us</p>
      <h2 className="story-title">{wedding.story.heading}</h2>
      {wedding.story.paragraphs.map((p) => <p className="body" key={p}>{p}</p>)}
      <p className="sign">{wedding.displayNames}</p>
    </Card>
  );
}
