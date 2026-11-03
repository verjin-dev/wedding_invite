import { wedding } from '../data/wedding';
import { Card } from './Reveal';

export default function InvitationCard() {
  return (
    <Card className="b-invite">
      <p className="eyebrow">The invitation</p>
      <blockquote className="verse">
        “{wedding.verse.text}”
        <cite>{wedding.verse.ref}</cite>
      </blockquote>
      <p className="lead">With the blessings of our families</p>
      <p className="body">{wedding.message}</p>
      <p className="blessing">May God bless our union. We look forward to celebrating with you.</p>
    </Card>
  );
}
