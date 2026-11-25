import { RotateCcw, Share2 } from 'lucide-react';
import { useState } from 'react';
import { imageAssets } from '../data/assets';
import { weddingConfig } from '../data/wedding';
import Reveal from './Reveal';
import { Doves } from './Flourishes';

export default function Footer({ onReplay }: { onReplay: () => void }) {
  const [status, setStatus] = useState('');
  const image = imageAssets.heroChurch;
  const share = async () => {
    const data = { title: `${weddingConfig.couple.displayNames} | Wedding Invitation`, text: `You are invited to our wedding on ${weddingConfig.wedding.dateLabel}.`, url: window.location.href };
    try { if (navigator.share) { await navigator.share(data); return; } } catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return; }
    try { await navigator.clipboard.writeText(data.url); setStatus('Link copied to clipboard.'); } catch { setStatus(`Copy this link: ${data.url}`); }
  };
  // The backdrop sits under a near-opaque gradient, so the smallest srcSet candidate is enough;
  // the full-size fallback was a 396 KB jpeg fetched on every load for an image nobody sees in detail.
  const backdrop = image.srcSet?.split(',')[0].trim().split(' ')[0] ?? image.src;
  return <footer className="footer closing-section" style={{ backgroundImage: `linear-gradient(180deg,rgba(55,19,30,.54),rgba(55,19,30,.94)),url(${backdrop})` }}>
    <Doves />
    <Reveal className="footer-inner"><p className="eyebrow">With gratitude and love</p><p className="lead closing-words">{weddingConfig.closing.line}</p><p className="closing-subtitle">{weddingConfig.closing.subtitle}</p><svg className="footer-flourish" viewBox="0 0 240 36" aria-hidden="true"><path d="M108 18C84 2 60 34 36 18S10 8 6 18"/><path d="M132 18c24-16 48 16 72 0s26-10 30 0"/><path d="M120 10l8 8-8 8-8-8z"/></svg><p className="blessing signature">{weddingConfig.couple.displayNames}</p>
      <button type="button" className="pill" onClick={onReplay}><RotateCcw size={16} aria-hidden="true"/> Replay invitation</button><button type="button" className="pill solid" onClick={share}><Share2 size={16} aria-hidden="true"/> Share invitation</button><p className="share-status" role="status" aria-live="polite">{status}</p>
    </Reveal>
  </footer>;
}
