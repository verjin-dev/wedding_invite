import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['#invitation', 'Invitation'],
  ['#couple', 'Couple'],
  ['#countdown', 'Countdown'],
  ['#events', 'Events'],
  ['#gallery', 'Gallery'],
  ['#rsvp', 'RSVP'],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a className="nav-brand" href="#top" aria-label="Verjin and Jesmi, top of page">V <span>&amp;</span> J</a>
      <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="nav-links" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav id="nav-links" className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
