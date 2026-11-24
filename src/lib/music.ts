/**
 * Background music. Started from the tap that opens the doors, because browsers only allow
 * audio to begin inside a user gesture. The volume rises through a Web Audio gain node, since
 * iOS ignores HTMLAudioElement.volume. If the file is missing or cannot play, the state becomes
 * 'unavailable' and the toggle stays hidden.
 */
export type MusicState = 'idle' | 'playing' | 'paused' | 'unavailable';

const SRC = '/music/wedding.mp3';
const TARGET_VOLUME = 0.55;
const FADE_SECONDS = 4;

let audio: HTMLAudioElement | null = null;
let gain: GainNode | null = null;
let context: AudioContext | null = null;
let state: MusicState = 'idle';
let pausedByVisibility = false;
const listeners = new Set<(state: MusicState) => void>();

function setState(next: MusicState) {
  state = next;
  listeners.forEach(listener => listener(next));
}

export function subscribeMusic(listener: (state: MusicState) => void) {
  listeners.add(listener);
  listener(state);
  return () => { listeners.delete(listener); };
}

function fadeTo(volume: number, seconds: number) {
  if (!gain || !context) return;
  const now = context.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(gain.gain.value, now);
  gain.gain.linearRampToValueAtTime(volume, now + seconds);
}

/** Call synchronously from a click or tap handler. */
export function startMusic() {
  if (audio) return;
  audio = new Audio(SRC);
  audio.loop = true;
  audio.preload = 'auto';
  const Context = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (Context) {
    try {
      context = new Context();
      gain = context.createGain();
      gain.gain.value = 0;
      context.createMediaElementSource(audio).connect(gain).connect(context.destination);
      void context.resume();
    } catch { context = null; gain = null; }
  }
  if (!gain) audio.volume = 0.35;
  audio.addEventListener('error', () => setState('unavailable'), { once: true });
  audio.play().then(() => { setState('playing'); fadeTo(TARGET_VOLUME, FADE_SECONDS); }).catch(() => { if (state !== 'playing') setState('unavailable'); });
  document.addEventListener('visibilitychange', onVisibility);
}

function onVisibility() {
  if (!audio) return;
  if (document.hidden && state === 'playing') { pausedByVisibility = true; audio.pause(); }
  else if (!document.hidden && pausedByVisibility) { pausedByVisibility = false; void audio.play(); }
}

export function toggleMusic() {
  if (!audio || state === 'unavailable') return;
  if (state === 'playing') {
    fadeTo(0, 0.4);
    const current = audio;
    window.setTimeout(() => { if (state === 'paused') current.pause(); }, 420);
    setState('paused');
  } else {
    void context?.resume();
    audio.play().then(() => { setState('playing'); fadeTo(TARGET_VOLUME, 1.5); }).catch(() => setState('unavailable'));
  }
}
