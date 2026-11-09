import { useState, type CSSProperties, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import Reveal from './Reveal';
import { weddingConfig } from '../data/wedding';

type Sent = { name: string; attending: boolean; guests: number };

const petals = Array.from({ length: 9 }, (_, i) => i);

export default function RSVP() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [sent, setSent] = useState<Sent | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    // Read the form before any await: React clears currentTarget once the handler yields.
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get('name') ?? '').trim();
    const attendance = String(form.get('attendance'));
    const guests = Number(form.get('guests'));
    const { supabase } = await import('../lib/supabase');
    if (!supabase) { setStatus('RSVP is being prepared. Please contact the couple directly for now.'); return; }
    setBusy(true); setStatus('');
    const { error } = await supabase.from('rsvps').insert({
      full_name: name,
      phone: String(form.get('phone') ?? '').trim() || null,
      attendance,
      guest_count: guests,
      message: String(form.get('message') ?? '').trim() || null,
    });
    setBusy(false);
    if (error) { setStatus('We could not save your reply. Please try again later.'); return; }
    formEl.reset();
    const attending = attendance === 'attending';
    setSent({ name, attending, guests });
    // Confetti belongs to an acceptance only; a regret gets drifting petals instead.
    if (attending) {
      const { pop } = await import('../lib/confetti');
      pop(window.innerWidth / 2, window.innerHeight * 0.44);
      window.setTimeout(() => pop(window.innerWidth * 0.24, window.innerHeight * 0.52), 320);
      window.setTimeout(() => pop(window.innerWidth * 0.76, window.innerHeight * 0.52), 560);
    }
  }
  if (sent) {
    const first = sent.name.split(/\s+/)[0] || 'friend';
    return <section className="block" id="rsvp" aria-labelledby="rsvp-title">
      <Reveal className="block-head"><p className="eyebrow">Kindly reply</p><h2 className="block-title" id="rsvp-title">RSVP</h2></Reveal>
      <div className={`card rsvp-joy ${sent.attending ? 'is-joy' : 'is-warm'}`} role="status" aria-live="polite">
        <div className="joy-petals" aria-hidden="true">{petals.map(i => <span key={i} style={{ '--i': i } as CSSProperties} />)}</div>
        <span className="joy-mark" aria-hidden="true">{sent.attending ? '✦' : '✝'}</span>
        <p className="eyebrow">{sent.attending ? 'Joyfully received' : 'Received with love'}</p>
        <h3 className="joy-title">{sent.attending ? `We'll see you there, ${first}.` : `We'll miss you, ${first}.`}</h3>
        <p className="joy-copy">{sent.attending
          ? `Your place is kept${sent.guests > 1 ? ` for all ${sent.guests} of you` : ''}. It would not be the same day without you, and we cannot wait to celebrate together.`
          : 'Thank you for letting us know. You will be in our hearts and in our prayers on the day, and we hope to celebrate with you very soon.'}</p>
        <p className="blessing">{weddingConfig.couple.displayNames}</p>
      </div>
    </section>;
  }

  return <section className="block" id="rsvp" aria-labelledby="rsvp-title"><Reveal className="block-head"><p className="eyebrow">Kindly reply</p><h2 className="block-title" id="rsvp-title">RSVP</h2></Reveal>
    <Reveal className="card rsvp-card"><p className="body">Please let us know if you can join us for the ceremony.</p>
      <form className="rsvp-form" onSubmit={submit}>
        <label>Full name<input name="name" autoComplete="name" required maxLength={120} /></label>
        <label>Phone number <span className="small">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={32} /></label>
        <label>Will you attend?<select name="attendance" required defaultValue=""><option value="" disabled>Select a response</option><option value="attending">Joyfully accepts</option><option value="declined">Regretfully declines</option></select></label>
        <label>Number of guests<input name="guests" type="number" min="1" max="10" defaultValue="1" required /></label>
        <label className="rsvp-wide">A message <span className="small">(optional)</span><textarea name="message" rows={3} maxLength={1000} /></label>
        <button className="pill solid" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send RSVP'} <Send size={16} /></button>
      </form><p className="rsvp-status" role="status" aria-live="polite">{status}</p>
    </Reveal></section>;
}
