import { useEffect, useState } from 'react';

export type Remaining = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function compute(target: number): Remaining {
  const total = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
    done: total === 0,
  };
}

/** Ticks every second. The ISO string carries its own +05:30 offset, so IST is exact on any device. */
export function useCountdown(iso: string): Remaining {
  const target = new Date(iso).getTime();
  const [time, setTime] = useState(() => compute(target));
  useEffect(() => {
    const id = window.setInterval(() => setTime(compute(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);
  return time;
}
