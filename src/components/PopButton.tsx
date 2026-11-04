import { PartyPopper } from 'lucide-react';
import { popFrom } from '../lib/confetti';

export default function PopButton() {
  return (
    <button type="button" className="pop-btn" aria-label="Celebrate with confetti" onClick={(e) => popFrom(e.currentTarget)}>
      <PartyPopper size={24} aria-hidden="true" />
    </button>
  );
}
