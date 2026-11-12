export type GalleryCategory = 'Couple' | 'Engagement' | 'Family' | 'Wedding' | 'Celebrations';

export const weddingConfig = {
  brand: { name: 'VJ Wedding', title: 'A Sacred Beginning', tagline: 'A Sacred Promise. A Lifetime of Love.' },
  couple: {
    groom: { name: 'Verjin V', displayName: 'Verjin', portrait: '/images/IMG_2012(1).jpeg', position: '35%', parents: 'Vargheese M & Lailakumari N' },
    bride: { name: 'Anto Jesmi DK', displayName: 'Jesmi', portrait: '/images/IMG_2012(1).jpeg', position: '68%', parents: 'Devaraj A & Kala' },
    displayNames: 'Verjin & Jesmi',
  },
  wedding: { date: '2027-05-17', dateLabel: '17 May 2027', dateLong: 'Monday, 17 May 2027', ceremonyTime: '10:30 AM', ceremonyTime24: '10:30', timezone: 'Asia/Kolkata' },
  ceremony: {
    title: 'Wedding', venue: 'Christ the King Church', location: 'Iruthayapuram', diocese: 'Kuzhithurai Diocese',
    mapUrl: 'https://maps.app.goo.gl/8n2qAGP3iD5eYdadA' as string | null, image: 'churchInterior', imageAlt: 'Generated interpretation of the altar and mosaic panels in the supplied church interior reference',
  },
  reception: {
    title: 'Wedding Reception', venue: 'Christ the King Community Hall', location: 'Iruthayapuram',
    time: '5:30 PM' as string | null, mapUrl: 'https://maps.app.goo.gl/m8UKbJJW82Tsv3TL7' as string | null, image: 'receptionHall',
    imageAlt: 'Illustrative generated wedding reception hall; not a photograph of the confirmed venue',
  },
  scripture: { reference: 'Genesis 2:24', translation: null as string | null, text: 'And the two shall become one flesh.' },
  story: {
    heading: 'Our Story', title: 'A Sacred Beginning',
    paragraphs: [
      'Some stories begin with a chance meeting. Some begin with a friendship. And some are written quietly by God, long before two hearts realise they are meant to walk together.',
      `Ours is a story of two lives, brought together by His grace, growing closer with every moment and discovering that love is not simply about finding someone \u2014 it is about finding the person with whom you wish to share every tomorrow.`,
      'As time passed, familiar smiles became precious memories, simple conversations became meaningful moments, and two separate journeys began to lead towards one beautiful destination.',
      `With faith in our hearts and gratitude to God, we made a promise to walk through life together \u2014 through every joy, every challenge, every prayer and every dream.`,
      'Now, surrounded by the love and blessings of our families, we are preparing to begin a new chapter: not just as two individuals, but as one family, united in marriage.',
    ],
    image: 'couplePortrait', imageAlt: 'Verjin and Jesmi together outdoors',
  },
  profiles: {
    groomIntroduction: 'BE Computer Science · Gen AI Engineer at TCS',
    brideIntroduction: 'B.Sc Maths, MBA · Accountant at St George Galaxy Eco School',
  },
  gallery: [
    { assetId: 'couplePortrait', alt: 'Verjin and Jesmi together outdoors', category: 'Couple' as GalleryCategory },
    { assetId: 'coupleMemory', alt: 'Verjin and Jesmi sharing a smile', category: 'Engagement' as GalleryCategory },
    { assetId: 'coupleSunset', alt: 'Verjin and Jesmi sharing a sunset moment with a bouquet of roses', category: 'Couple' as GalleryCategory },
    { assetId: 'bridePortrait', alt: 'Anto Jesmi DK in her bridal portrait', category: 'Wedding' as GalleryCategory },
    { assetId: 'groomPortrait', alt: 'Verjin V in his wedding portrait', category: 'Wedding' as GalleryCategory },
    { assetId: 'brideFamily', alt: "Anto Jesmi with her family", category: 'Family' as GalleryCategory },
    { assetId: 'groomFamily', alt: 'Verjin with his family', category: 'Family' as GalleryCategory },
  ],
  invitation: {
    paragraphs: [
      "With grateful hearts and God's abundant blessings, we joyfully invite you to witness and celebrate the wedding of our beloved Verjin and Jesmi.",
      'As they unite their lives in the sacrament of marriage, we request the honour of your presence and prayers on this blessed occasion.',
    ],
  },
  closing: { line: 'Two hearts. One promise. A lifetime together.', subtitle: 'A Sacred Promise. A Lifetime of Love.', image: 'heroChurch', imageAlt: 'Generated golden-hour interpretation of the church exterior in the supplied reference photographs' },
} as const;

export const wedding = {
  groom: weddingConfig.couple.groom.name, bride: weddingConfig.couple.bride.name, displayNames: weddingConfig.couple.displayNames,
  dateLabel: weddingConfig.wedding.dateLong, dateShort: `17 \u00b7 May \u00b7 2027`,
  ceremonyStart: `${weddingConfig.wedding.date}T${weddingConfig.wedding.ceremonyTime24}:00+05:30`,
  verse: { ref: weddingConfig.scripture.reference, translation: weddingConfig.scripture.translation, text: weddingConfig.scripture.text },
  tagline: weddingConfig.brand.tagline,
  ceremony: { ...weddingConfig.ceremony, time: weddingConfig.wedding.ceremonyTime },
  reception: weddingConfig.reception,
  story: { heading: weddingConfig.story.title, paragraphs: weddingConfig.story.paragraphs },
  gallery: weddingConfig.gallery,
} as const;
