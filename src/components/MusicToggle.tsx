import { VolumeX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { subscribeMusic, toggleMusic, type MusicState } from '../lib/music';

/** A floating play/pause control, shown only once the music has actually started. */
export default function MusicToggle() {
  const [state, setState] = useState<MusicState>('idle');
  useEffect(() => subscribeMusic(setState), []);
  if (state === 'idle' || state === 'unavailable') return null;
  const playing = state === 'playing';
  return <button type="button" className={`music-btn${playing ? ' is-playing' : ''}`} aria-pressed={playing} aria-label={playing ? 'Pause music' : 'Play music'} onClick={toggleMusic}>
    {playing ? <span className="music-bars" aria-hidden="true"><i/><i/><i/><i/></span> : <VolumeX size={18} aria-hidden="true"/>}
  </button>;
}
