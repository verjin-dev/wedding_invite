export type AssetSource = 'actual photograph' | 'user-provided reference photo' | 'generated interpretation';
export type ImageAsset = {
  id: string;
  src: string;
  srcSet?: string;
  fallback?: string;
  width: number;
  height: number;
  description: string;
  sourceType: AssetSource;
  alt: string;
  usage: string;
  /** Provenance line shown over the image. Only set where guests deserve the disclosure. */
  note?: string;
};

export const imageAssets = {
  heroCouple: {
    id: 'hero-couple-portrait', src: '/images/couple/hero-couple.jpg',
    srcSet: '/images/couple/hero-couple-640.webp 640w, /images/couple/hero-couple-1200.webp 1200w, /images/couple/hero-couple-1672.webp 1672w',
    fallback: '/images/couple/hero-couple.jpg', width: 1672, height: 941,
    description: 'Portrait of Verjin and Jesmi before a flowering arch, supplied by the couple.',
    sourceType: 'user-provided reference photo', alt: 'Verjin and Jesmi together before a flowering arch', usage: 'Hero section',
  },
  coupleCutout: {
    id: 'couple-cutout', src: '/images/couple/couple-cutout-640.webp',
    srcSet: '/images/couple/couple-cutout-320.webp 320w, /images/couple/couple-cutout-480.webp 480w, /images/couple/couple-cutout-640.webp 640w',
    width: 640, height: 609,
    description: 'Background-removed portrait of Verjin and Jesmi, supplied by the couple.',
    sourceType: 'user-provided reference photo', alt: '', usage: 'Revealed in the doorway as the opening doors part',
  },
  heroChurch: {
    id: 'hero-church-generated', src: '/images/generated/church-exterior-from-reference.webp',
    srcSet: '/images/generated/church-exterior-from-reference-640.webp 640w, /images/generated/church-exterior-from-reference-1200.webp 1200w, /images/generated/church-exterior-from-reference.webp 1672w',
    fallback: '/images/generated/church-exterior-from-reference.jpg', width: 1672, height: 941,
    description: 'Golden-hour architectural interpretation generated from two user-supplied church exterior photographs.',
    sourceType: 'generated interpretation', alt: 'AI-generated golden-hour interpretation of the church exterior, based on the provided reference photos', usage: 'Closing section',
    note: 'Generated architectural interpretation from the supplied church photographs',
  },
  churchInterior: {
    id: 'church-interior-generated', src: '/images/generated/church-interior-reference.webp',
    srcSet: '/images/generated/church-interior-reference-640.webp 640w, /images/generated/church-interior-reference-1200.webp 1200w, /images/generated/church-interior-reference.webp 1672w',
    fallback: '/images/generated/church-interior-reference.jpg', width: 1672, height: 941,
    description: 'Generated interior interpretation based on the supplied church altar and mosaic reference photo.',
    sourceType: 'generated interpretation', alt: 'Generated interpretation of the church interior and mosaic altar based on the supplied reference', usage: 'Wedding ceremony section',
  },
  receptionHall: {
    id: 'reception-hall-illustrative', src: '/images/generated/reception-hall-illustrative.webp',
    srcSet: '/images/generated/reception-hall-illustrative-640.webp 640w, /images/generated/reception-hall-illustrative-1200.webp 1200w, /images/generated/reception-hall-illustrative.webp 1672w',
    fallback: '/images/generated/reception-hall-illustrative.jpg', width: 1672, height: 941,
    description: 'Generic generated community reception hall for illustration only; it is not the confirmed venue.',
    sourceType: 'generated interpretation', alt: 'Illustrative wedding reception hall; not a photograph of the confirmed community hall', usage: 'Reception section',
  },
  roseArch: {
    id: 'rose-arch-generated', src: '/images/generated/rose-arch/rose-arch-2400.webp',
    srcSet: '/images/generated/rose-arch/rose-arch-480.webp 480w, /images/generated/rose-arch/rose-arch-800.webp 800w, /images/generated/rose-arch/rose-arch-1200.webp 1200w, /images/generated/rose-arch/rose-arch-1600.webp 1600w, /images/generated/rose-arch/rose-arch-2400.webp 2400w',
    width: 2848, height: 1600, description: 'Generated golden-hour garden path framed by a white rose arch.',
    sourceType: 'generated interpretation', alt: 'Golden-hour garden path under a soft arch of white roses', usage: 'Countdown background',
  },
  churchReference1: {
    id: 'church-reference-exterior-1', src: '/images/church/reference-exterior-1.webp',
    srcSet: '/images/church/reference-exterior-1-640.webp 640w, /images/church/reference-exterior-1-1200.webp 1200w, /images/church/reference-exterior-1.webp 1800w',
    fallback: '/images/church/reference-exterior-1.jpg', width: 1800, height: 1200,
    description: 'First church exterior photograph supplied by the user.', sourceType: 'user-provided reference photo',
    alt: 'Church exterior in the first supplied reference photograph', usage: 'Location section and reference record',
  },
  churchReference2: {
    id: 'church-reference-exterior-2', src: '/images/church/reference-exterior-2.webp',
    srcSet: '/images/church/reference-exterior-2-640.webp 640w, /images/church/reference-exterior-2-1200.webp 1200w, /images/church/reference-exterior-2.webp 2448w',
    fallback: '/images/church/reference-exterior-2.jpg', width: 2448, height: 3264,
    description: 'Second church exterior photograph supplied by the user.', sourceType: 'user-provided reference photo',
    alt: 'Front view of the church exterior in the second supplied reference photograph', usage: 'Location section and reference record',
  },
  couplePortrait: {
    id: 'couple-portrait-2012', src: '/images/IMG_2012(1).jpeg',
    srcSet: '/images/couple/IMG_20121-480.webp 480w, /images/couple/IMG_20121-900.webp 900w',
    width: 1024, height: 1536, description: 'User-supplied original photograph of Verjin and Jesmi.', sourceType: 'actual photograph',
    alt: 'Verjin and Jesmi together outdoors', usage: 'Story, couple portraits, memories, and social preview',
  },
  coupleMemory: {
    id: 'couple-memory-1741', src: '/images/IMG_1741.jpeg',
    srcSet: '/images/couple/IMG_1741-480.webp 480w, /images/couple/IMG_1741-900.webp 900w',
    width: 1024, height: 1536, description: 'User-supplied original photograph of Verjin and Jesmi.', sourceType: 'actual photograph',
    alt: 'Verjin and Jesmi sharing a smile', usage: 'Memories gallery',
  },
  coupleSunset: {
    id: 'couple-sunset-generated', src: '/images/couple/couple-sunset.webp',
    srcSet: '/images/couple/couple-sunset.webp 1024w',
    width: 1024, height: 1536, description: 'Generated sunset portrait of Verjin and Jesmi supplied by the couple.', sourceType: 'generated interpretation',
    alt: 'Verjin and Jesmi sharing a sunset moment with a bouquet of roses', usage: 'Couple memories gallery',
  },
  bridePortrait: {
    id: 'bride-portrait-original', src: '/images/people/bride-1024.webp',
    srcSet: '/images/people/bride-480.webp 480w, /images/people/bride-900.webp 900w, /images/people/bride-1024.webp 1024w',
    width: 1024, height: 1536, description: 'Bride portrait supplied in the project source-photos folder.', sourceType: 'actual photograph',
    alt: 'Bride Anto Jesmi DK in a white embroidered sari with a bouquet', usage: 'Bride profile and memories gallery',
  },
  groomPortrait: {
    id: 'groom-portrait-original', src: '/images/people/groom-1024.webp',
    srcSet: '/images/people/groom-480.webp 480w, /images/people/groom-900.webp 900w, /images/people/groom-1024.webp 1024w',
    width: 1024, height: 1536, description: 'Groom portrait supplied in the project source-photos folder.', sourceType: 'actual photograph',
    alt: 'Groom Verjin V in an ivory suit with a rose boutonniere', usage: 'Groom profile and memories gallery',
  },
  brideFamily: {
    id: 'bride-family-original', src: '/images/people/bride-family-1920.webp',
    srcSet: '/images/people/bride-family-640.webp 640w, /images/people/bride-family-1200.webp 1200w, /images/people/bride-family-1920.webp 1920w',
    width: 1920, height: 1280, description: 'Bride family photograph supplied by the user.', sourceType: 'actual photograph',
    alt: "Anto Jesmi with her family", usage: 'Families section and memories gallery',
  },
  groomFamily: {
    id: 'groom-family-original', src: '/images/people/groom-family-1920.webp',
    srcSet: '/images/people/groom-family-640.webp 640w, /images/people/groom-family-1200.webp 1200w, /images/people/groom-family-1920.webp 1920w',
    width: 1920, height: 1280, description: 'Groom family photograph supplied by the user.', sourceType: 'actual photograph',
    alt: 'Verjin V with his family', usage: 'Families section and memories gallery',
  },
} satisfies Record<string, ImageAsset>;

export const imageAssetManifest = Object.values(imageAssets);
