import Reveal from './Reveal';
import { weddingConfig } from '../data/wedding';

export default function Scripture() {
  return <section className="scripture" aria-label="Scripture"><Reveal className="scripture-inner"><span className="cross-mark" aria-hidden="true">{"\u271d"}</span><p className="eyebrow">A blessing for their beginning</p><blockquote className="verse">“{weddingConfig.scripture.text}”<cite>{weddingConfig.scripture.reference}</cite></blockquote></Reveal></section>;
}
