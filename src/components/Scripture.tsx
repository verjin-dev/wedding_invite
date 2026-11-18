import Reveal from './Reveal';
import { weddingConfig } from '../data/wedding';
import { Stars } from './Flourishes';

export default function Scripture() {
  return <section className="scripture" aria-label="Scripture"><Stars /><Reveal className="scripture-inner"><span className="cross-mark" aria-hidden="true">{"\u271d"}</span><p className="eyebrow">A blessing for their beginning</p><blockquote className="verse"><span className="sr-only">“{weddingConfig.scripture.text}”</span><span aria-hidden="true">{`“${weddingConfig.scripture.text}”`.split(' ').map((word, index) => <span key={index}><span className="verse-word">{word}</span>{' '}</span>)}</span><cite>{weddingConfig.scripture.reference}</cite></blockquote></Reveal></section>;
}
