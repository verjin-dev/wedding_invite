import { useState, type FormEvent } from 'react';
import { wedding } from '../data/wedding';
import Reveal from './Reveal';

export default function RSVP() {
  const { whatsappNumber, email } = wedding.rsvp;
  const configured = Boolean(whatsappNumber || email);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = [
      `RSVP — ${wedding.displayNames} wedding, ${wedding.dateLabel}`,
      `Name: ${f.get('name')}`,
      `Guests: ${f.get('guests')}`,
      `Attending: ${f.get('attending')}`,
      f.get('message') ? `Message: ${f.get('message')}` : '',
    ].filter(Boolean).join('\n');
    const url = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
      : `mailto:${email}?subject=${encodeURIComponent('Wedding RSVP')}&body=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section className="section rsvp" id="rsvp" aria-labelledby="rsvp-title">
      <Reveal>
        <p className="label">07 - Kindly respond</p>
        <h2 id="rsvp-title" className="display"><span>RSVP</span></h2>
        {!configured && (
          <p className="notice" role="note">RSVP is not enabled yet. The hosts will add a WhatsApp number or email soon — nothing entered here is sent or stored.</p>
        )}
        <form className="rsvp-form" onSubmit={submit}>
          <fieldset disabled={!configured}>
            <label>Guest name<input name="name" required autoComplete="name" /></label>
            <label>Number of guests<input name="guests" type="number" min={1} max={20} defaultValue={1} required /></label>
            <div className="radio-row" role="radiogroup" aria-label="Attendance">
              <label><input type="radio" name="attending" value="Attending" defaultChecked /> Attending</label>
              <label><input type="radio" name="attending" value="Not attending" /> Not attending</label>
            </div>
            <label>Message (optional)<textarea name="message" rows={3} /></label>
            <button className="btn btn-gold" type="submit">{whatsappNumber ? 'Send via WhatsApp' : 'Send via email'}</button>
          </fieldset>
        </form>
        {sent && <p className="notice" role="status">Your app should have opened with the RSVP message ready. It is only delivered once you press send there.</p>}
      </Reveal>
    </section>
  );
}
