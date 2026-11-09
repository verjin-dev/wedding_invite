import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { imageAssets } from '../data/assets';

const monogram = imageAssets.monogram;

const links = [['#story', 'Our story'], ['#couple', 'The couple'], ['#gallery', 'Memories'], ['#invitation', 'Invitation'], ['#ceremony', 'Wedding day'], ['#rsvp', 'RSVP']];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="nav"><a className="nav-brand" href="#top" aria-label="Verjin and Jesmi, top of page"><img className="nav-logo" srcSet={monogram.srcSet} sizes="48px" src={monogram.src} width={monogram.width} height={monogram.height} alt="" decoding="async" /></a>
    <nav id="nav-links" className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">{links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="nav-links" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(value => !value)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
  </header>;
}
