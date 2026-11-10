import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

type Img = { src: string; alt: string };
type Props = { images: readonly Img[]; index: number | null; onClose: () => void; onChange: (i: number) => void };

export default function Lightbox({ images, index, onClose, onChange }: Props) {
  const touchX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;

  // Move focus into the viewer while it is open and hand it back to the tile that opened it.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>('.lb-close')?.focus();
    return () => opener?.focus();
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const n = images.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onChange((index + 1) % n);
      else if (e.key === 'ArrowLeft') onChange((index - 1 + n) % n);
      else if (e.key === 'Tab') {
        const buttons = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button') ?? []);
        if (!buttons.length) return;
        const at = buttons.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        buttons[(at + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [index, images.length, onClose, onChange]);

  const step = (d: number) => index !== null && onChange((index + d + images.length) % images.length);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button className="lb-btn lb-close" onClick={onClose} aria-label="Close"><X /></button>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo"><ChevronLeft /></button>
          <img key={index} src={images[index].src} alt={images[index].alt} onClick={(e) => e.stopPropagation()} />
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo"><ChevronRight /></button>
          <p className="lb-count" aria-live="polite">{index + 1} / {images.length}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
