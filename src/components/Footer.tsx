import { Share2 } from 'lucide-react';
import { useState } from 'react';
import { wedding } from '../data/wedding';
import Reveal from './Reveal';

export default function Footer() {
  const [status, setStatus] = useState('');
  const share = async () => {
    const data = { title: `${wedding.displayNames} | Wedding Invitation`, text: `You are invited to our wedding on ${wedding.dateLabel}.`, url: window.location.href };
    try {
      if (navigator.share) { await navigator.share(data); return; }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
    }
    try { await navigator.clipboard.writeText(data.url); setStatus('Link copied to clipboard.'); }
    catch { setStatus(`Copy this link: ${data.url}`); }
  };
  return (
    <footer className="footer" id="night">
      <div className="stars" aria-hidden="true" />
      <div className="moon" aria-hidden="true" />
      <Reveal className="footer-inner">
        <blockquote className="verse">“{wedding.verse.text}”<cite>— {wedding.verse.ref}</cite></blockquote>
        <h2 className="display"><span>{wedding.groom}</span><i>&amp;</i><span>{wedding.bride}</span></h2>
        <p className="label">{wedding.dateLabel}</p>
        <p className="closing">We look forward to celebrating with you</p>
        <button type="button" className="btn btn-gold" onClick={share}><Share2 size={16} aria-hidden="true" /> Share Invitation</button>
        <p className="share-status" role="status" aria-live="polite">{status}</p>
      </Reveal>
    </footer>
  );
}
