import { motion } from 'framer-motion';

/** Top-left and bottom-right watercolor corners (same artwork, rotated). Decorative only. */
export default function Florals({ className = '' }: { className?: string }) {
  return (
    <div className={`florals ${className}`} aria-hidden="true">
      <motion.img
        className="floral floral-tl"
        src="/florals/corner-blue-hydrangea.svg"
        alt=""
        decoding="async"
        animate={{ rotate: [0, 1.2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.img
        className="floral floral-br"
        src="/florals/corner-blue-hydrangea.svg"
        alt=""
        decoding="async"
        animate={{ rotate: [180, 181.2, 180] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
