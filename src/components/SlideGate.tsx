import { useEffect, useRef, useState } from 'react';
import { weddingConfig } from '../data/wedding';

type Props = { onOpened: () => void };

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export default function SlideGate({ onOpened }: Props) {
  const [opening, setOpening] = useState(false);
  const [announce, setAnnounce] = useState('');
  const gateRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardBorderRef = useRef<SVGRectElement>(null);
  const paperLinesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; timelineRef.current?.kill(); };
  }, []);

  const complete = () => {
    onOpened();
    // The opening plays on every load, so it always hands over at the hero rather than part-way down.
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  };

  const skip = () => {
    timelineRef.current?.kill();
    complete();
  };

  const openInvitation = async () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    if (prefersReducedMotion()) { complete(); return; }
    setOpening(true);
    setAnnounce('Your invitation is opening.');

    const { gsap } = await import('gsap');
    if (!gateRef.current) return;
    gsap.set(cardRef.current, { autoAlpha: 0, yPercent: 70, rotation: -1.8, scale: .97 });
    gsap.set(paperLinesRef.current?.querySelectorAll('[data-reveal]') ?? [], { autoAlpha: 0, y: 12 });

    const border = cardBorderRef.current;
    if (border) {
      const length = border.getTotalLength();
      gsap.set(border, { strokeDasharray: length, strokeDashoffset: length });
    }

    const tl = gsap.timeline({ onComplete: complete });
    timelineRef.current = tl;

    // Scene 1 — warm paper and a gentle lift.
    tl.to(gateRef.current, { backgroundColor: '#fff9ef', duration: .8, ease: 'sine.inOut' }, 0)
      .to(envelopeRef.current, { y: -9, scale: 1.025, duration: .8, ease: 'power2.out' }, 0)
      .to(sealRef.current, { boxShadow: '0 0 36px rgba(181,138,80,.55)', duration: .55, ease: 'sine.inOut' }, .12)
      // Scene 2 — the embossed wax seal releases in a soft glimmer.
      .to(sealRef.current, { autoAlpha: 0, scale: .72, duration: .8, ease: 'power2.inOut' }, .82)
      // Scene 3 — the folded paper opens.
      .to(flapRef.current, { rotateX: -178, duration: 1.2, ease: 'power2.inOut' }, 1.42)
      // Scene 4 — invitation card slides out into the light.
      .to(cardRef.current, { autoAlpha: 1, yPercent: -7, rotate: -1.2, duration: 1.5, ease: 'power3.out' }, 1.92)
      .to(cardRef.current, { rotate: 0, scale: 1.025, duration: 1.1, ease: 'power2.out' }, 3.2)
      // Scene 5 — envelope recedes; the gold outline traces around the card.
      .to(envelopeRef.current, { autoAlpha: 0, y: 22, duration: .85, ease: 'power2.inOut' }, 3.35);
    if (border) tl.to(border, { strokeDashoffset: 0, duration: .9, ease: 'power2.inOut' }, 3.42);
    // Scene 6 — invitation details appear in a calm editorial rhythm.
    tl.to(paperLinesRef.current?.querySelectorAll('[data-reveal]') ?? [], { autoAlpha: 1, y: 0, duration: .68, stagger: .12, ease: 'power2.out' }, 3.62)
      .to(cardRef.current, { scale: 1, duration: .55, ease: 'power2.out' }, 4.65)
      .to(gateRef.current, { autoAlpha: 0, duration: .75, ease: 'power2.inOut' }, 5.05);
  };

  return <div className="gate" ref={gateRef} role="dialog" aria-modal="true" aria-labelledby="opening-title">
    <div className="gate-scene" aria-hidden="true">
      <div className="gate-glow"/><div className="gate-dust">
        {Array.from({ length: 12 }, (_, index) => <i key={index}/>) }
      </div>
    </div>

    <header className="opening-heading">
      <p className="opening-eyebrow">A Sacred Beginning</p>
      <h1 id="opening-title">Something beautiful is about to unfold.</h1>
    </header>

    <div className="opening-stage" aria-label="An ivory wedding invitation inside a gold-trimmed envelope">
      <div className="opening-card" ref={cardRef} aria-hidden={!opening}>
        <svg className="opening-card-border" viewBox="0 0 360 470" aria-hidden="true" preserveAspectRatio="none">
          <rect ref={cardBorderRef} x="7" y="7" width="346" height="456" rx="1"/>
        </svg>
        <div className="opening-card-inner" ref={paperLinesRef}>
          <span className="opening-cross" data-reveal>✝</span>
          <p className="opening-card-label" data-reveal>THE WEDDING INVITATION</p>
          <h2 className="opening-card-title" data-reveal>A day to hold<br/>in your heart</h2>
          <p className="opening-card-names" data-reveal>{weddingConfig.couple.groom.name}<i>&amp;</i>{weddingConfig.couple.bride.name}</p>
          <p className="opening-card-date" data-reveal>{weddingConfig.wedding.dateLong}<br/>{weddingConfig.wedding.ceremonyTime}</p>
          <p className="opening-card-venue" data-reveal>{weddingConfig.ceremony.venue}<br/>{weddingConfig.ceremony.location} · {weddingConfig.ceremony.diocese}</p>
          <p className="opening-card-reception" data-reveal>{weddingConfig.reception.venue}, {weddingConfig.reception.location}<br/><span>Timing to be announced</span></p>
        </div>
      </div>

      <div className="opening-envelope" ref={envelopeRef}>
        <div className="envelope-back"/>
        <div className="envelope-flap" ref={flapRef} aria-hidden="true"/>
        <div className="envelope-front" aria-hidden="true">
          <svg viewBox="0 0 560 320" preserveAspectRatio="none"><path d="M1 1 280 176 559 1M1 319l197-181m361 181L362 138"/><path d="M1 319h558V1H1z"/></svg>
        </div>
        <svg className="opening-botanical botanical-left" viewBox="0 0 110 110" aria-hidden="true"><path d="M10 98C42 77 42 41 88 13M32 76C17 63 16 53 18 42c12 2 21 10 23 22m13-25C45 25 47 15 51 7c12 7 18 16 17 29m-1 34c11-11 22-12 31-10-2 13-10 21-28 23"/><circle cx="88" cy="13" r="5"/><circle cx="78" cy="18" r="3"/><circle cx="94" cy="24" r="3"/></svg>
        <svg className="opening-botanical botanical-right" viewBox="0 0 110 110" aria-hidden="true"><path d="M10 98C42 77 42 41 88 13M32 76C17 63 16 53 18 42c12 2 21 10 23 22m13-25C45 25 47 15 51 7c12 7 18 16 17 29m-1 34c11-11 22-12 31-10-2 13-10 21-28 23"/><circle cx="88" cy="13" r="5"/><circle cx="78" cy="18" r="3"/><circle cx="94" cy="24" r="3"/></svg>
        <div className="opening-seal" ref={sealRef} aria-hidden="true"><span>✝</span><b>V <i>&amp;</i> J</b></div>
      </div>
    </div>

    <div className="opening-controls">
      <button type="button" className="opening-button" onClick={openInvitation} disabled={opening}>{opening ? 'OPENING YOUR INVITATION' : 'OPEN YOUR INVITATION'}</button>
      <p className="opening-tap">{opening ? 'A little moment, please…' : 'Tap to open'}</p>
      <button type="button" className="skip-link" onClick={skip}>Skip intro</button>
    </div>
    <p className="sr-only" aria-live="polite" role="status">{announce}</p>
  </div>;
}
