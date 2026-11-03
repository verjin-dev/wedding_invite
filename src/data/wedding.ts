export const wedding = {
  groom: 'Verjin V',
  bride: 'Anto Jesmi D K',
  displayNames: 'Verjin & Jesmi',
  dateLabel: 'Monday, 17 May 2027',
  dateShort: '17 · May · 2027',
  ceremonyStart: '2027-05-17T10:30:00+05:30',
  verse: { text: 'So they are no longer two, but one flesh.', ref: 'Matthew 19:6' },
  message:
    'With the blessings of our families, we cordially invite you to join us on the auspicious occasion of our Holy Matrimony. Your presence and prayers will be a great blessing to us.',
  story: {
    heading: 'Our Story',
    paragraphs: [
      'Two families, one faith, and a quiet promise made with grateful hearts.',
      'We begin this new chapter together, trusting in God’s blessings and the love of all of you who have walked with us.',
    ],
  },
  ceremony: {
    title: 'Holy Matrimony',
    time: '10:30 AM',
    venue: 'Christ the King Church',
    location: 'Iruthayapuram',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Christ+the+King+Church+Iruthayapuram',
  },
  reception: {
    title: 'Wedding Reception',
    time: '5:00 PM – 9:00 PM',
    venue: 'Christ the King Community Hall',
    location: 'Kulappuram',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Christ+the+King+Community+Hall+Kulappuram',
  },
  // RSVP: set ONE of these to enable it. Digits only with country code, e.g. '919876543210'.
  rsvp: { whatsappNumber: '919080181819', email: 'verjin2001@gmail.com' },
  gallery: [
    { src: '/images/IMG_2012(1).jpeg', alt: 'Verjin and Jesmi standing together in a sunlit garden' },
    { src: '/images/IMG_1741.jpeg', alt: 'Verjin and Jesmi sharing a smile, with a bouquet in the foreground' },
    { src: '/images/couple-wedding-3d.webp', alt: 'Stylised portrait of Verjin and Jesmi (illustrative edit)' },
    { src: '/images/couple-candid-3d.webp', alt: 'Stylised candid portrait of Verjin and Jesmi (illustrative edit)' },
    { src: '/images/ivory-blush-rose-spray.webp', alt: 'Ivory and blush roses' },
    { src: '/images/cinematic-church-hero.webp', alt: 'Illustrative church scene (not the actual venue)' },
  ],
} as const;
