// Generates the nav monogram variants from the supplied logo artwork.
// Run: node scripts/make-logo-variants.mjs
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const source = 'assets/logo.png';
const outDir = 'public/images/brand';
// The mark sits inside a wide transparent halo; these bounds are the mark itself.
const mark = { left: 253, top: 38, width: 1015, height: 936 };
// It renders about 40px tall in the nav, so 192 covers a 3x screen with room to spare.
const widths = [96, 144, 192];

mkdirSync(outDir, { recursive: true });

for (const width of widths) {
  const file = `${outDir}/monogram-${width}.webp`;
  const { size } = await sharp(source)
    .extract(mark)
    .resize({ width })
    .webp({ quality: 88, alphaQuality: 95, effort: 6 })
    .toFile(file);
  console.log(`${file}  ${Math.round(size / 1024)} KB`);
}
