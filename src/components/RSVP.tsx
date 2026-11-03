import { useState, type FormEvent } from 'react';
import { wedding } from '../data/wedding';
import { Card } from './Reveal';

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
    <section className="block" id="rsvp" aria-labelledby="rsvp-title">
      <Card className="rsvp-card">
        <div className="rsvp-intro">
          <p className="eyebrow">Kindly respond</p>
          <h2 id="rsvp-title" className="block-title">RSVP</h2>
          <p className="body">Let us know if you can join us. Your reply opens in {whatsappNumber ? 'WhatsApp' : 'your email app'}, ready to send.</p>
          {!configured && (
            <p className="notice" role="note">RSVP is not enabled yet. The hosts will add a WhatsApp number or email soon — nothing entered here is sent or stored.</p>
          )}
          {sent && <p className="notice" role="status">Your app should have opened with the RSVP message ready. It is only delivered once you press send there.</p>}
        </div>
        <form className="rsvp-form" onSubmit={submit}>
          <fieldset disabled={!configured}>
            <label>Guest name<input name="name" required autoComplete="name" placeholder="Your full name" /></label>
            <label>Number of guests<input name="guests" type="number" min={1} max={20} defaultValue={1} required /></label>
            <div className="seg" role="radiogroup" aria-label="Attendance">
              <label><input type="radio" name="attending" value="Attending" defaultChecked /><span>Attending</span></label>
              <label><input type="radio" name="attending" value="Not attending" /><span>Not attending</span></label>
            </div>
            <label>Message (optional)<textarea name="message" rows={3} placeholder="A note for the couple" /></label>
            <button className="pill solid" type="submit">{whatsappNumber ? 'Send via WhatsApp' : 'Send via email'}</button>
          </fieldset>
        </form>
      </Card>
    </section>
  );
}
