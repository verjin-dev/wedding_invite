import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { CalendarDays, Printer, Share2 } from 'lucide-react';
import { weddingConfig } from '../data/wedding';
import { imageAssets } from '../data/assets';
import { downloadIcs, googleCalendarUrl } from '../lib/calendar';
import Reveal from './Reveal';

export default function FormalInvite() {
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const scratchedRef = useRef(false);
  const markRef = useRef<HTMLImageElement | null>(null);
  const [markReady, setMarkReady] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = imageAssets.monogram.src;
    markRef.current = image;
    if (image.complete && image.naturalWidth) { setMarkReady(true); return; }
    const onLoad = () => setMarkReady(true);
    image.addEventListener('load', onLoad);
    return () => image.removeEventListener('load', onLoad);
  }, []);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const surface = surfaceRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !surface || !context) return;
    const rect = surface.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const foil = context.createLinearGradient(0, 0, rect.width, rect.height);
    foil.addColorStop(0, '#e9ddc6'); foil.addColorStop(.5, '#f8f2e8'); foil.addColorStop(1, '#d7c19a');
    context.fillStyle = foil; context.fillRect(0, 0, rect.width, rect.height);
    context.globalAlpha = .055; context.strokeStyle = '#fffefa'; context.lineWidth = 1;
    for (let y = 2; y < rect.height; y += 8) { context.beginPath(); context.moveTo(0, y); context.lineTo(rect.width, y); context.stroke(); }
    context.globalAlpha = 1;
    context.strokeStyle = 'rgba(128, 101, 58, .45)'; context.lineWidth = 1;
    context.strokeRect(20, 20, rect.width - 40, rect.height - 40);
    context.strokeStyle = 'rgba(255, 255, 255, .72)';
    context.strokeRect(25, 25, rect.width - 50, rect.height - 50);

    context.textAlign = 'center'; context.textBaseline = 'middle';
    // The monogram is artwork now; it paints as soon as it decodes, via markReady.
    const mark = markRef.current;
    if (mark && mark.complete && mark.naturalWidth) {
      const height = 68;
      const width = height * (mark.naturalWidth / mark.naturalHeight);
      context.drawImage(mark, rect.width / 2 - width / 2, rect.height / 2 - 40 - height / 2, width, height);
    }
    context.beginPath(); context.moveTo(rect.width / 2 - 38, rect.height / 2 + 4); context.lineTo(rect.width / 2 + 38, rect.height / 2 + 4);
    context.strokeStyle = 'rgba(128, 101, 58, .68)'; context.stroke();
    context.fillStyle = '#5c503e'; context.font = '600 9px Inter, sans-serif';
    context.fillText('GENTLY SCRATCH TO REVEAL', rect.width / 2, rect.height / 2 + 30);
    context.fillStyle = '#927747'; context.font = '18px Georgia, serif'; context.fillText('\u2726', rect.width / 2, rect.height / 2 + 58);
    scratchedRef.current = false;
  }, [markReady]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface || revealed) return;
    if (typeof ResizeObserver === 'undefined') {
      paintCover(); window.addEventListener('resize', paintCover);
      return () => window.removeEventListener('resize', paintCover);
    }
    const observer = new ResizeObserver(paintCover);
    observer.observe(surface); paintCover();
    return () => observer.disconnect();
  }, [paintCover, revealed]);

  const reveal = useCallback(() => setRevealed(true), []);
  const erase = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left; const y = event.clientY - rect.top;
    const point = canvas.dataset.previousPoint;
    const previous = point ? point.split(',').map(Number) : null;
    context.globalCompositeOperation = 'destination-out'; context.lineWidth = 38; context.lineCap = 'round'; context.lineJoin = 'round';
    context.beginPath(); context.moveTo(previous?.[0] ?? x, previous?.[1] ?? y); context.lineTo(x, y); context.stroke();
    context.globalCompositeOperation = 'source-over'; canvas.dataset.previousPoint = `${x},${y}`;
    scratchedRef.current = true;
  };

  const finishScratch = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !scratchedRef.current) return;
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const stride = Math.max(4, Math.floor(Math.min(canvas.width, canvas.height) / 48)) * 4;
    let total = 0; let cleared = 0;
    for (let index = 3; index < pixels.length; index += stride) { total++; if (pixels[index] < 24) cleared++; }
    canvas.dataset.previousPoint = '';
    if (total && cleared / total > .38) reveal();
  };

  const share = () => {
    const message = [
      'With grateful hearts, we joyfully invite you to celebrate the Wedding of *Verjin & Jesmi*. ❤️',
      '📅 Monday, 17 May 2027',
      '🕙 10:00 AM',
      '📍 Christ the King Church, Iruthayapuram',
      'Your presence and prayers would mean so much to us.',
      '💌 View our wedding invitation:',
      window.location.href,
    ].join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return <section className="invitation-section" id="invitation" aria-labelledby="invite-title">
    <Reveal className="print-invite">
      <div className="invitation-layout">
      <header className="invitation-heading">
        <div className="invitation-crest" aria-hidden="true"><span/><b>{"\u271d"}</b><span/></div>
        <p className="eyebrow">The Wedding Invitation</p>
        <h2 id="invite-title" className="invitation-title">A day to hold in your heart</h2>
        <p className="invite-intro">Scarcely able to contain the joy, we invite you to share our day.</p>
        <div className="invitation-ornament" aria-hidden="true"><img src={imageAssets.monogram.src} srcSet={imageAssets.monogram.srcSet} sizes="72px" width={imageAssets.monogram.width} height={imageAssets.monogram.height} alt="" decoding="async" /></div>
      </header>

      <div className="invitation-card-column">
      <div className="scratch-card">
        <div className="scratch-card__paper" aria-hidden={!revealed}>
          <div className="paper-cross" aria-hidden="true">{"\u271d"}</div>
          <div className="paper-rule" aria-hidden="true"><span>✦</span></div>
          <div className="invite-copy">{weddingConfig.invitation.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          <p className="invite-names"><span className="invite-name">{weddingConfig.couple.groom.name}</span><span className="invite-amp">&amp;</span><span className="invite-name">{weddingConfig.couple.bride.name}</span></p>
          <p className="save-date"><span>{weddingConfig.wedding.dateLong}</span><span>{weddingConfig.wedding.ceremonyTime}</span></p>
          <p className="paper-venue">{weddingConfig.ceremony.venue}<br/>{weddingConfig.ceremony.location} {"\u00b7"} {weddingConfig.ceremony.diocese}</p>
          <p className="paper-reception"><span>Reception</span>{weddingConfig.reception.venue}, {weddingConfig.reception.location}<br/><small>{weddingConfig.reception.time ? weddingConfig.reception.time : 'Timing to be announced'}</small></p>
        </div>
        {!revealed && <div className="scratch-card__surface" ref={surfaceRef}>
          <canvas ref={canvasRef} className="scratch-cover" onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.dataset.previousPoint = ''; erase(event); }} onPointerMove={event => { if (event.buttons !== 0 || event.pointerType === 'touch') erase(event); }} onPointerUp={finishScratch} onPointerCancel={finishScratch} aria-hidden="true"/>
          <span className="sr-only">Scratch the gold surface with a mouse or finger. Or use the reveal invitation button below.</span>
        </div>}
      </div>

      {!revealed
        ? <button type="button" className="pill scratch-accessible" onClick={reveal}>Reveal invitation</button>
        : <div className="invite-actions">
          <button className="pill" type="button" onClick={() => window.print()}><Printer size={16} aria-hidden="true"/> PRINT / SAVE PDF</button>
          <button className="pill" type="button" onClick={share}><Share2 size={16} aria-hidden="true"/> WHATSAPP</button>
          <a className="pill" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer"><CalendarDays size={16} aria-hidden="true"/> CALENDAR</a>
          <button className="pill" type="button" onClick={downloadIcs}>DOWNLOAD .ICS</button>
        </div>}
      </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{revealed ? 'Invitation revealed.' : ''}</p>
    </Reveal>
  </section>;
}
