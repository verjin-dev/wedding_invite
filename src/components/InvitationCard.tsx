import { wedding } from '../data/wedding';
import { Card } from './Reveal';

export default function InvitationCard() {
  return (
    <Card className="b-invite">
      <p className="eyebrow">The invitation</p>
      <blockquote className="verse">{wedding.verse.ref}<cite>Scripture reference</cite></blockquote>
      <p className="lead">A Sacred Beginning</p>
      <p className="body">With grateful hearts and God&#39;s abundant blessings, we joyfully invite you to celebrate the wedding of Verjin and Jesmi. We request the honour of your presence and prayers.</p>
      <p className="blessing">May God bless our union. We look forward to celebrating with you.</p>
    </Card>
  );
}
