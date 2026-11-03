// Generates the decorative watercolor SVGs in public/florals. Run: node scripts/make-florals.mjs
import { writeFileSync } from 'node:fs';

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const pick = (a) => a[Math.floor(rnd() * a.length)];
const blues = ['#9fbfe3', '#b7cfec', '#7fa3d1', '#c9dcf2', '#8fb0dc'];
const blush = ['#ecc3c8', '#f3d6d8', '#e0aab2'];
const leaf = ['#a6b7a0', '#93a88e', '#b9c9b2'];

function hydrangea(cx, cy, r) {
  let s = '';
  for (let i = 0; i < 46; i++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * r;
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d, pr = 7 + rnd() * 8;
    const c = pick(blues);
    s += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(rnd() * 90).toFixed(0)})" opacity="${(0.55 + rnd() * 0.35).toFixed(2)}">`;
    for (let k = 0; k < 4; k++) s += `<ellipse rx="${pr}" ry="${(pr * 0.55).toFixed(1)}" fill="${c}" transform="rotate(${k * 45})"/>`;
    s += `<circle r="1.6" fill="#fffdf9"/></g>`;
  }
  return s;
}
function leaves(x, y, ang, n, len) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = ang + (i - n / 2) * 14 + rnd() * 8, l = len * (0.7 + rnd() * 0.5);
    s += `<g transform="translate(${x} ${y}) rotate(${a.toFixed(0)})" opacity="0.8"><path d="M0 0 C ${l * 0.3} -${l * 0.16}, ${l * 0.7} -${l * 0.14}, ${l} 0 C ${l * 0.7} ${l * 0.14}, ${l * 0.3} ${l * 0.16}, 0 0Z" fill="${pick(leaf)}"/><path d="M0 0 L${l * 0.9} 0" stroke="#fffdf9" stroke-opacity=".5" stroke-width="1"/></g>`;
  }
  return s;
}
function bloom(cx, cy, r, cols, petals = 7) {
  let s = `<g transform="translate(${cx} ${cy})">`;
  for (let i = 0; i < petals; i++) s += `<ellipse cx="0" cy="${-r * 0.55}" rx="${r * 0.42}" ry="${r * 0.62}" fill="${pick(cols)}" opacity=".78" transform="rotate(${(360 / petals) * i})"/>`;
  return s + `<circle r="${r * 0.18}" fill="#c6a56a" opacity=".85"/></g>`;
}
function goldBranch(x, y, ang, len) {
  let s = `<g transform="translate(${x} ${y}) rotate(${ang})" stroke="#c6a56a" fill="none" stroke-linecap="round" opacity=".85"><path d="M0 0 C ${len * 0.3} -18, ${len * 0.6} 14, ${len} -4" stroke-width="1.6"/>`;
  for (let i = 1; i < 7; i++) {
    const t = i / 7, px = len * t, py = Math.sin(t * 5) * 9 - 2 * t;
    s += `<path d="M${px.toFixed(0)} ${py.toFixed(0)} q 8 -14 18 -12 q -6 12 -18 12Z" fill="#c6a56a" fill-opacity=".55" stroke-width=".8"/>`;
  }
  return s + '</g>';
}

const filter = `<defs><filter id="w" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9"/><feGaussianBlur stdDeviation=".7"/></filter></defs>`;

// Top-left corner spray (bottom-right is the same artwork rotated 180° in CSS).
let corner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520">${filter}<g filter="url(#w)">`;
corner += leaves(30, 30, 40, 9, 230) + leaves(40, 60, 70, 6, 190);
corner += goldBranch(20, 150, 20, 260) + goldBranch(140, 20, 78, 260);
corner += hydrangea(120, 110, 95) + hydrangea(250, 70, 62) + hydrangea(60, 260, 60) + hydrangea(190, 190, 50);
for (const [x, y, r] of [[180, 120, 30], [90, 190, 26], [300, 120, 22], [40, 330, 22]]) corner += bloom(x, y, r, blush);
for (const [x, y, r] of [[230, 175, 24], [140, 60, 20], [70, 80, 18]]) corner += bloom(x, y, r, ['#ffffff', '#f6f1ea'], 6);
corner += `</g></svg>`;
writeFileSync('public/florals/corner-blue-hydrangea.svg', corner);

// Small accent spray used near sections.
seed = 21;
let accent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 200">${filter}<g filter="url(#w)">${leaves(20, 170, -40, 6, 150)}${goldBranch(10, 180, -30, 190)}${hydrangea(110, 110, 55)}${bloom(160, 80, 22, blush)}${bloom(70, 70, 16, ['#ffffff'], 6)}</g></svg>`;
writeFileSync('public/florals/accent-spray.svg', accent);

// Floral divider.
writeFileSync('public/florals/divider.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 40" fill="none" stroke="#c6a56a" stroke-linecap="round"><path d="M10 20h110M200 20h110" stroke-width="1"/><path d="M120 20c10-14 20-14 40 0 20 14 30 14 40 0" stroke-width="1.2"/><circle cx="160" cy="20" r="4" fill="#c6a56a" stroke="none"/><circle cx="140" cy="14" r="2" fill="#9fbfe3" stroke="none"/><circle cx="180" cy="14" r="2" fill="#9fbfe3" stroke="none"/></svg>`);

// Wedding emblem: interlocked rings with initials.
writeFileSync('public/florals/emblem.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g fill="none" stroke="#c6a56a"><circle cx="100" cy="100" r="92" stroke-width="1.4"/><circle cx="100" cy="100" r="86" stroke-width=".6"/><circle cx="82" cy="112" r="26" stroke-width="2.4"/><circle cx="118" cy="112" r="26" stroke-width="2.4"/><path d="M100 60v-26M90 44h20" stroke-width="2"/></g><text x="100" y="164" text-anchor="middle" font-family="Great Vibes, cursive" font-size="30" fill="#263e60">V &amp; J</text></svg>`);

// Light blue watercolor paper texture.
writeFileSync('public/florals/paper-texture.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><filter id="p"><feTurbulence type="fractalNoise" baseFrequency=".012 .02" numOctaves="4" seed="9"/><feColorMatrix values="0 0 0 0 .78  0 0 0 0 .86  0 0 0 0 .95  0 0 0 .55 0"/></filter><rect width="400" height="400" fill="#eef4fb"/><rect width="400" height="400" filter="url(#p)"/></svg>`);
console.log('florals written');
