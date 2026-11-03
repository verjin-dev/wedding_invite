import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, Sunset } from 'lucide-react';
import { useState } from 'react';

const STOPS = [0, 0.3, 0.6, 0.9];
const TOP = ['#e3eefb', '#fdf4e3', '#f5ddd3', '#e8c2c9'];
const BOTTOM = ['#f7fbff', '#fff9ee', '#fbeae0', '#f3d1d2'];

function clockFor(p: number) {
  const mins = Math.round((6 * 60 + p * 16 * 60) / 5) * 5; // 06:00 -> 22:00
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const part = h24 < 12 ? 'Morning' : h24 < 17 ? 'Afternoon' : h24 < 20 ? 'Evening' : 'Night';
  return { text: `${h12}:${String(m).padStart(2, '0')} ${h24 < 12 ? 'AM' : 'PM'}`, part, h24 };
}

/** Fixed sky that follows the wedding day (06:00 -> 22:00) as the guest scrolls, plus a small sun-dial clock. */
export default function Sky() {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, STOPS, TOP);
  const bottom = useTransform(scrollYProgress, STOPS, BOTTOM);
  const background = useMotionTemplate`linear-gradient(180deg, ${top}, ${bottom})`;
  const dash = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const [clock, setClock] = useState(() => clockFor(0));

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = clockFor(Math.min(1, Math.max(0, p)));
    setClock((prev) => (prev.text === next.text ? prev : next));
  });

  const Icon = clock.h24 < 17 ? Sun : clock.h24 < 20 ? Sunset : Moon;

  return (
    <>
      <motion.div className="sky" style={{ background }} aria-hidden="true" />
      <div className="sundial" aria-hidden="true">
        <svg viewBox="0 0 44 44" width="44" height="44">
          <circle cx="22" cy="22" r="19" className="sd-track" />
          <motion.circle cx="22" cy="22" r="19" className="sd-arc" pathLength={100} strokeDasharray={100} style={{ strokeDashoffset: dash }} transform="rotate(-90 22 22)" />
        </svg>
        <Icon size={18} strokeWidth={1.4} className="sd-icon" />
        <span className="sd-text"><b>{clock.text}</b><i>{clock.part}</i></span>
      </div>
    </>
  );
}
