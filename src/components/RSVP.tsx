import { useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import Reveal from './Reveal';

export default function RSVP() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const { supabase } = await import('../lib/supabase');
    if (!supabase) { setStatus('RSVP is being prepared. Please contact the couple directly for now.'); return; }
    const form = new FormData(event.currentTarget);
    setBusy(true); setStatus('');
    const { error } = await supabase.from('rsvps').insert({
      full_name: String(form.get('name') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim() || null,
      attendance: String(form.get('attendance')),
      guest_count: Number(form.get('guests')),
      message: String(form.get('message') ?? '').trim() || null,
    });
    setBusy(false);
    if (error) { setStatus('We could not save your reply. Please try again later.'); return; }
    event.currentTarget.reset(); setStatus('Thank you for being part of our special beginning. Your response has been received with gratitude.');
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
      </form><p className="rsvp-status" role="status" aria-live="polite">{status && (status.startsWith('Thank') ? <CheckCircle2 size={18} /> : null)}{status}</p>
    </Reveal></section>;
}
