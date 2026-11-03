import { Drop } from './Reveal';

type Props = {
  src: string;
  alt: string;
  tilt?: number;
  delay?: number;
  className?: string;
  note?: string;
  eager?: boolean;
};

/** A taped-down instant photo. `note` is a handwritten caption on the white border. */
export default function Polaroid({ src, alt, tilt = 0, delay = 0, className = '', note, eager }: Props) {
  return (
    <Drop tilt={tilt} delay={delay} className={`polaroid ${className}`}>
      <span className="tape" aria-hidden="true" />
      <div className="polaroid-img">
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </div>
      {note && <p className="polaroid-note">{note}</p>}
    </Drop>
  );
}
