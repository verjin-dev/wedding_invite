// Generates the responsive variants for the opening archway.
// Run: node scripts/make-door-variants.mjs
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const source = 'assets/generated/originals/door-arch-source.webp';
const outDir = 'public/images/door';
const widths = [480, 640, 900];

mkdirSync(outDir, { recursive: true });

for (const width of widths) {
  const file = `${outDir}/door-arch-${width}.webp`;
  const { size } = await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, alphaQuality: 90, effort: 6 })
    .toFile(file);
  console.log(`${file}  ${Math.round(size / 1024)} KB`);
}
