import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { imageAssets } from '../data/assets';
import { weddingConfig } from '../data/wedding';
import Reveal, { SplitTitle } from './Reveal';

/** In-app browsers such as WhatsApp's often refuse the Clipboard API but still honour execCommand. */
function copyWithSelection(text: string) {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand('copy');
  field.remove();
  return ok;
}

/** Copies the venue and its map link, ready to paste to a driver or into a chat. */
function CopyAddress({ venue, location, mapUrl }: { venue: string; location: string; mapUrl: string | null }) {
  const [copied, setCopied] = useState(false);
  const text = [`${venue}, ${location}`, mapUrl].filter(Boolean).join('\n');
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch {
      // Last resort: show the text to copy by hand. Some in-app browsers block prompt() too.
      if (!copyWithSelection(text)) { try { window.prompt('Copy this address:', text); } catch { /* nothing more to try */ } return; }
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };
  return <button type="button" className="pill" onClick={copy} aria-label={`Copy the address of ${venue}`}>
    {copied ? <Check size={16} aria-hidden="true"/> : <Copy size={16} aria-hidden="true"/>} {copied ? 'Copied' : 'Copy address'}
    <span className="sr-only" role="status">{copied ? 'Address copied' : ''}</span>
  </button>;
}

export default function VenueDirections() {
  const reference = imageAssets.churchReference2;
  const hall = imageAssets.receptionHall;
  const { ceremony, reception } = weddingConfig;
  return <section className="block directions-section" id="directions" aria-labelledby="dir-title">
    <Reveal className="block-head"><p className="eyebrow">The places we gather</p><SplitTitle id="dir-title" text="Where to find us"/><p className="body">Our celebration will take place in Iruthayapuram. Open either venue in Google Maps for directions.</p></Reveal>
    <div className="venue-reference-grid">
      <Reveal className="venue-reference"><img src={reference.src} srcSet={reference.srcSet} sizes="(max-width: 760px) 100vw, 50vw" width={reference.width} height={reference.height} alt={reference.alt} loading="lazy" decoding="async"/><div className="venue-copy"><p className="eyebrow">Wedding</p><h3>{ceremony.venue}</h3><p>{ceremony.location} · {ceremony.diocese} · {weddingConfig.wedding.ceremonyTime}</p><div className="venue-actions">{ceremony.mapUrl && <a className="pill" href={ceremony.mapUrl} target="_blank" rel="noreferrer">Open directions ↗</a>}<CopyAddress venue={ceremony.venue} location={ceremony.location} mapUrl={ceremony.mapUrl}/></div></div></Reveal>
      <Reveal className="venue-reference"><img src={hall.fallback} srcSet={hall.srcSet} sizes="(max-width: 760px) 100vw, 50vw" width={hall.width} height={hall.height} alt={hall.alt} loading="lazy" decoding="async"/><div className="venue-copy"><p className="eyebrow">Wedding reception</p><h3>{reception.venue}</h3><p>{reception.location}{reception.time ? ` · ${reception.time}` : ' · Timing to be announced'}</p><div className="venue-actions">{reception.mapUrl && <a className="pill" href={reception.mapUrl} target="_blank" rel="noreferrer">Open directions ↗</a>}<CopyAddress venue={reception.venue} location={reception.location} mapUrl={reception.mapUrl}/></div></div></Reveal>
    </div>
  </section>;
}
