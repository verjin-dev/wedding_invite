import { useEffect, useRef, useState } from 'react';

type Props = { onOpened: () => void };

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export default function DoorGate({ onOpened }: Props) {
  const [opening, setOpening] = useState(false);
  const [announce, setAnnounce] = useState('');
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const complete = () => {
    onOpened();
    // The opening plays on every load, so it always hands over at the hero.
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  };

  const openDoors = () => {
    if (opening) return;
    if (prefersReducedMotion()) { complete(); return; }
    setOpening(true);
    setAnnounce('The doors are opening.');
    timers.current.push(window.setTimeout(complete, 2100));
  };

  const skip = () => {
    timers.current.forEach(clearTimeout);
    complete();
  };

  return <div className={`gate${opening ? ' is-opening' : ''}`}>
    <div className="gate-sky" aria-hidden="true" />

    <header className="opening-heading">
      <p className="eyebrow">A Sacred Beginning</p>
      <p className="opening-line">Something beautiful is about to unfold.</p>
    </header>

    <div className="door-stage" aria-hidden="true">
      <div className="door-light" />
      <div className="door-leaf door-leaf-left"><span className="door-handle" /></div>
      <div className="door-leaf door-leaf-right"><span className="door-handle" /></div>
      <img
        className="door-arch"
        srcSet="/images/door/door-arch-480.webp 480w, /images/door/door-arch-640.webp 640w, /images/door/door-arch-900.webp 900w"
        sizes="(max-width: 760px) 480px, 900px"
        src="/images/door/door-arch-640.webp"
        width={1272} height={1237}
        alt="" fetchPriority="high" decoding="async"
      />
    </div>

    <div className="opening-controls">
      <button type="button" className="pill solid opening-button" onClick={openDoors} disabled={opening}>
        {opening ? 'Welcome…' : 'Open the doors'}
      </button>
      <p className="opening-tap">{opening ? '' : 'Tap to enter'}</p>
      <button type="button" className="skip-link" onClick={skip}>Skip intro</button>
    </div>

    <p className="sr-only" role="status" aria-live="polite">{announce}</p>
  </div>;
}
