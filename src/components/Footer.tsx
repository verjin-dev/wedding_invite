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
  const ticker = `${wedding.groom.toUpperCase()} & ${wedding.bride.toUpperCase()} · 17 MAY 2027 · `;
  return (
    <footer className="footer">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track"><span>{ticker.repeat(4)}</span><span>{ticker.repeat(4)}</span></div>
      </div>
      <Reveal className="footer-inner">
        <blockquote className="verse small-verse">“{wedding.verse.text}”<cite>{wedding.verse.ref}</cite></blockquote>
        <p className="lead">We look forward to celebrating with you</p>
        <button type="button" className="pill solid" onClick={share}><Share2 size={16} aria-hidden="true" /> Share invitation</button>
        <p className="share-status" role="status" aria-live="polite">{status}</p>
      </Reveal>
    </footer>
  );
}
