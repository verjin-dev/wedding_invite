import { motion } from 'framer-motion';

type Props = { text: string; ready: boolean; delay?: number };

/** Letters rise one by one from behind a mask once `ready` is true. Lines only wrap between words. */
export default function SplitText({ text, ready, delay = 0 }: Props) {
  let n = 0;
  return (
    <span className="split" aria-label={text}>
      {text.split(' ').map((word, w) => (
        <span key={w} aria-hidden="true">
          {w > 0 && ' '}
          <span className="split-word">
            {Array.from(word).map((ch, i) => (
              <span className="split-mask" key={i}>
                <motion.span
                  className="split-ch"
                  initial={{ y: '115%', rotate: 6 }}
                  animate={ready ? { y: '0%', rotate: 0 } : { y: '115%', rotate: 6 }}
                  transition={{ duration: 0.9, delay: delay + n++ * 0.045, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
