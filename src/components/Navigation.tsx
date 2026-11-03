import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['#day', 'The day'],
  ['#gallery', 'Gallery'],
  ['#rsvp', 'RSVP'],
  ['#directions', 'Directions'],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a className="nav-brand" href="#top" aria-label="Verjin and Jesmi, top of page">V<span>&amp;</span>J</a>
      <nav id="nav-links" className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="nav-links" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}
