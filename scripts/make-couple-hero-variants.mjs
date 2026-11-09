// Generates the responsive variants for the hero couple portrait.
// Run: node scripts/make-couple-hero-variants.mjs
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const source = 'assets/generated/originals/couple-hero-source.webp';
const outDir = 'public/images/couple';
const widths = [640, 1200, 1672];

mkdirSync(outDir, { recursive: true });

for (const width of widths) {
  const file = `${outDir}/hero-couple-${width}.webp`;
  const { size } = await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(file);
  console.log(`${file}  ${Math.round(size / 1024)} KB`);
}

// Only pre-srcset browsers read this, so it stays deliberately small.
const fallback = `${outDir}/hero-couple.jpg`;
const { size } = await sharp(source)
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 72, progressive: true, mozjpeg: true })
  .toFile(fallback);
console.log(`${fallback}  ${Math.round(size / 1024)} KB`);
