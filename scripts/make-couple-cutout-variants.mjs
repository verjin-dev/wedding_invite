// Generates the responsive variants for the cut-out couple revealed by the opening doors.
// Run: node scripts/make-couple-cutout-variants.mjs
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const source = 'assets/Elegant Indian Wedding Portrait.png';
const outDir = 'public/images/couple';
// The doorway is at most ~170 CSS px wide, so 640 covers it even on a 3x phone.
const widths = [320, 480, 640];

mkdirSync(outDir, { recursive: true });

for (const width of widths) {
  const file = `${outDir}/couple-cutout-${width}.webp`;
  const { size } = await sharp(source)
    // Trim the transparent margin so the subject's own edges drive the layout.
    .trim({ threshold: 10 })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 92, effort: 6 })
    .toFile(file);
  console.log(`${file}  ${Math.round(size / 1024)} KB`);
}
