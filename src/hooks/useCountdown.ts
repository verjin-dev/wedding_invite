import { useEffect, useState } from 'react';

export type CountdownPhase = 'counting' | 'today' | 'complete';
export type CountdownState = { days: number; hours: number; minutes: number; seconds: number; phase: CountdownPhase; ready: boolean };

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };
const DAY_MS = 24 * 60 * 60 * 1000;

function split(remaining: number) {
  const total = Math.max(0, Math.floor(remaining / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
  };
}

/** Offset-aware countdown; first render is deterministic and the wake event refreshes background tabs. */
export function useCountdown(targetIso: string): CountdownState {
  const [state, setState] = useState<CountdownState>({ ...ZERO, phase: 'counting', ready: false });
  useEffect(() => {
    const target = new Date(targetIso).getTime();
    if (Number.isNaN(target)) { setState({ ...ZERO, phase: 'complete', ready: true }); return; }
    let frame = 0;
    const tick = () => {
      const remaining = target - Date.now();
      const phase: CountdownPhase = remaining > 0 ? 'counting' : remaining > -DAY_MS ? 'today' : 'complete';
      setState({ ...(phase === 'counting' ? split(remaining) : ZERO), phase, ready: true });
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    const onVisible = () => { if (document.visibilityState === 'visible') frame = window.requestAnimationFrame(tick); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { window.clearInterval(interval); window.cancelAnimationFrame(frame); document.removeEventListener('visibilitychange', onVisible); };
  }, [targetIso]);
  return state;
}
