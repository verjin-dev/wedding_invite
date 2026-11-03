# Verjin V & Anto Jesmi D K — Wedding E‑Invitation Website
## Detailed Build Specification (From Scratch)

**Project type:** Responsive, mobile-first wedding e-invitation website  
**Couple:** Verjin V & Anto Jesmi D K  
**Wedding date:** 17 May 2027  
**Primary timezone:** Asia/Kolkata (IST, UTC+05:30)  
**Visual direction:** Premium Christian wedding invitation; ivory, champagne gold, burgundy, blush pink and warm white  
**Suggested stack:** React + TypeScript + Vite + Tailwind CSS (or plain CSS if preferred)

---

## 1. Project objective

Build a polished, shareable wedding invitation website that feels like a digital version of a premium printed invitation. It should be easy to open on a phone from a WhatsApp link, load quickly on mobile data, present all event information clearly, and make venue directions easy to access.

The experience should tell a short story:

1. A dramatic invitation cover.
2. A personal welcome from the couple.
3. A couple photograph.
4. A countdown to the wedding.
5. Ceremony and reception information.
6. A closing message and optional RSVP.

The website must work without requiring visitors to sign in or install an app.

## 2. Confirmed event information

Use these details as the source of truth throughout the site.

| Field | Value |
|---|---|
| Groom | Verjin V |
| Bride | Anto Jesmi D K |
| Wedding date | Monday, 17 May 2027 |
| Ceremony | Holy Matrimony |
| Ceremony time | 10:30 AM |
| Ceremony venue | Christ the King Church |
| Ceremony location | Iruthayapuram |
| Reception | Wedding Reception |
| Reception time | 5:00 PM – 9:00 PM |
| Reception venue | Christ the King Community Hall |
| Reception location | Kulappuram |

### Family details (verify before publishing)

These names were supplied in earlier invitation details. Confirm spelling and permission before publishing:

- Groom's parents: Mr. John Mathew and Mrs. Elsy John
- Bride's parents: Mr. Thomas George and Mrs. Mercy Thomas

Do not invent postal addresses, phone numbers, map coordinates, RSVP contacts, or family details.

## 3. Design direction

### 3.1 Theme

Create a refined, romantic, church-wedding aesthetic rather than a generic party invitation.

**Palette**

| Token | Suggested value | Usage |
|---|---|---|
| Burgundy | `#4B1F2B` | Hero, footer, emphasis panels |
| Deep burgundy | `#3B1923` | Hero gradient |
| Champagne gold | `#C6A46A` | Borders, ornaments, highlights |
| Warm ivory | `#FBF5EB` | Main page background |
| Blush pink | `#E8C8C5` | Floral accents |
| Warm white | `#FFFAF3` | Cards and text panels |
| Ink | `#382A27` | Main body text |
| Muted taupe | `#806E63` | Secondary text |

Use gold sparingly. Prioritize contrast and readability over decoration.

### 3.2 Typography

Use web-safe fallbacks and load licensed fonts from Google Fonts or another approved font provider.

- **Names / romantic accents:** Great Vibes or a similar elegant script.
- **Headings / dates:** Cinzel or a similar classical serif.
- **Body / venue details:** Cormorant Garamond or a readable serif.
- **UI labels:** A clean sans-serif such as Inter.

Do not use script fonts for long paragraphs, times, directions, or small mobile text.

### 3.3 Visual motifs

- Fine gold ornamental dividers.
- Subtle floral or botanical line art.
- Church cross motif used respectfully and sparingly.
- Pink and white rose accents.
- Soft light gradients and restrained shadows.
- Thin gold borders around photographs and event cards.

Avoid clutter, excessive animation, flashing effects, and text placed over busy photography.

## 4. Information architecture

Build the page as a single scrolling invitation with these sections, in this order:

1. **Hero / cover**
2. **Invitation message**
3. **Couple portrait**
4. **Countdown**
5. **Ceremony details**
6. **Reception details**
7. **Optional family blessings**
8. **Closing message**
9. **Footer**

A sticky navigation bar is optional. On mobile, a compact “Event Details” anchor button is usually sufficient.

## 5. Section-by-section requirements

### 5.1 Hero / invitation cover

**Purpose:** Create the first emotional impression and immediately communicate who is getting married and when.

**Content:**
- Small cross or restrained ornamental motif.
- “Together with God’s blessings”
- “The wedding celebration of”
- “Verjin & Jesmi”
- “17 May 2027”
- Button: “Open Invitation” or “View Details”

**Layout:**
- Full viewport height on desktop; at least 85svh on mobile.
- Deep burgundy gradient background.
- Centered content with generous spacing.
- Couple names in large script type, date in uppercase serif.
- Thin gold decorative rings or line ornaments may frame the content.

**Motion:**
- Gentle fade-in and upward reveal.
- Avoid long intro animations that delay access to event details.
- Respect `prefers-reduced-motion`.

### 5.2 Invitation message

Suggested copy:

> With the blessings of God and our families, we joyfully invite you to celebrate the beginning of our life together. Your presence and blessings will make our day truly special.

Keep the text centered, short, and readable. Do not make visitors scroll through a long paragraph before seeing the event details.

### 5.3 Couple portrait

Use the supplied couple portrait as the primary image if the couple approves it.

Requirements:
- Use a high-quality, optimized image.
- Keep the image ratio consistent; a portrait crop is suitable.
- Use `object-fit: cover` only if the crop does not cut off faces.
- Add descriptive alt text, e.g. `Portrait of Verjin and Jesmi`.
- Provide a graceful fallback if the image cannot load.
- Do not use a generated image as a claim of exact photographic identity if it does not accurately represent the couple.

Recommended file location:
`public/images/couple-portrait.webp`

Optional future gallery:
- Groom portrait.
- Bride portrait.
- Couple portrait.
- Engagement photographs.
- Family photographs, only with permission.

### 5.4 Countdown

Display days, hours, minutes, and seconds until the ceremony begins.

Target timestamp:
`2027-05-17T10:30:00+05:30`

Implementation requirements:
- Use the explicit `+05:30` offset so the countdown is anchored to India Standard Time.
- Update once per second.
- When the target time is reached, replace the countdown with a short message such as “Today is the day!”
- Do not show negative values.
- Clean up the interval on component unmount.
- Use accessible labels; do not rely only on visual position.
- Test the countdown with a temporary date close to the current time.

### 5.5 Ceremony card

**Heading:** Holy Matrimony

**Details:**
- Date: Monday, 17 May 2027
- Time: 10:30 AM
- Venue: Christ the King Church
- Location: Iruthayapuram

Add a “View on Google Maps” link. Use a Google Maps search URL until the exact venue pin has been checked:

`https://www.google.com/maps/search/?api=1&query=Christ+the+King+Church+Iruthayapuram`

Do not claim that this search link is a verified exact pin. Replace it with a confirmed venue pin if available.

### 5.6 Reception card

**Heading:** Wedding Reception

**Details:**
- Date: Monday, 17 May 2027
- Time: 5:00 PM – 9:00 PM
- Venue: Christ the King Community Hall
- Location: Kulappuram

Add a “View on Google Maps” link:

`https://www.google.com/maps/search/?api=1&query=Christ+the+King+Community+Hall+Kulappuram`

Verify the correct hall before publishing. Replace the search URL with a precise pin if the venue owner provides one.

### 5.7 Family blessings (optional)

Only include this section after confirming the family names and obtaining consent.

Suggested layout:
- “With the blessings of our families”
- Groom’s parents
- Bride’s parents

Use two balanced columns on desktop and a single column on mobile. Do not use tiny text.

### 5.8 Closing section

Suggested copy:

**United in love, bound by faith**

“We look forward to celebrating this beautiful day with you. Your presence will make our day special.”

Finish with:
- “With love”
- “Verjin & Jesmi”
- A subtle gold ornament or cross motif.

### 5.9 Footer

Display:
`VERJIN V & ANTO JESMI D K · 17 MAY 2027`

Avoid unnecessary copyright claims or fabricated contact information.

## 6. Functional requirements

### Required for first release

- Responsive layout for mobile, tablet, and desktop.
- Smooth in-page navigation.
- Countdown to ceremony time in IST.
- Clickable Google Maps links for both venues.
- Optimized couple portrait.
- Accessible text contrast and keyboard navigation.
- Working page title and social-sharing metadata.
- No login requirement.
- No broken links or placeholder text in production.

### Optional enhancements

- Opening envelope interaction.
- Background music with a visible play/pause control.
- RSVP form.
- WhatsApp RSVP link.
- Photo gallery with lightbox.
- Add-to-calendar links for ceremony and reception.
- Share invitation button using Web Share API with copy-link fallback.
- Tamil version or bilingual English/Tamil content.

Do not autoplay music with sound. Browsers commonly block it, and unexpected audio can frustrate guests. If music is included, start muted/off and let visitors opt in.

## 7. RSVP design (optional; requires real contact details)

If RSVP is requested, collect only necessary information:
- Guest name.
- Attendance: attending / unable to attend.
- Number of guests, if relevant.
- Optional short message.

Possible implementation options:
1. A WhatsApp link with a prefilled message.
2. A form service or serverless endpoint.
3. A small backend with validation and spam protection.

Do not create a fake “Submit” action that silently discards responses. State clearly where the response goes and who can access it.

A WhatsApp RSVP link needs the host’s confirmed phone number in international format. Do not invent one.

Example message template:

`Hello! I am [Guest Name]. I would like to confirm my attendance for Verjin and Jesmi's wedding on 17 May 2027. [Number of guests] guest(s).`

## 8. Recommended technical architecture

### Option A — React + TypeScript + Vite

Recommended for a maintainable, component-based implementation.

Suggested structure:

```text
wedding-invitation/
├── public/
│   ├── images/
│   │   ├── couple-portrait.webp
│   │   ├── groom-portrait.webp
│   │   └── bride-portrait.webp
│   ├── favicon.svg
│   └── og-wedding.jpg
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── InvitationMessage.tsx
│   │   ├── CouplePortrait.tsx
│   │   ├── Countdown.tsx
│   │   ├── EventCard.tsx
│   │   ├── FamilyBlessings.tsx
│   │   ├── ClosingSection.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── wedding.ts
│   ├── hooks/
│   │   └── useCountdown.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── README.md
```

### Option B — Plain HTML, CSS, and JavaScript

Suitable for a lightweight static page. Use semantic HTML, CSS variables, and a small countdown script. This option is easy to host and does not require a build system.

## 9. Data model

Keep wedding details in one configuration file rather than repeating strings across components.

Example `src/data/wedding.ts`:

```ts
export const wedding = {
  groom: "Verjin V",
  bride: "Anto Jesmi D K",
  displayNames: "Verjin & Jesmi",
  dateLabel: "Monday, 17 May 2027",
  ceremony: {
    title: "Holy Matrimony",
    time: "10:30 AM",
    venue: "Christ the King Church",
    location: "Iruthayapuram",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Christ+the+King+Church+Iruthayapuram",
  },
  reception: {
    title: "Wedding Reception",
    time: "5:00 PM – 9:00 PM",
    venue: "Christ the King Community Hall",
    location: "Kulappuram",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Christ+the+King+Community+Hall+Kulappuram",
  },
  ceremonyStart: "2027-05-17T10:30:00+05:30",
};
```

## 10. Countdown implementation notes

A React hook should:
1. Parse the explicit ISO timestamp.
2. Calculate the remaining milliseconds.
3. Derive days, hours, minutes, and seconds.
4. Update every second.
5. Clear the interval when the component unmounts.
6. Show the “Today is the day!” state at zero.

Do not hardcode a countdown value. Always calculate it from the target timestamp.

## 11. Responsive design requirements

### Mobile (primary target)
- Single-column layout.
- Couple names should fit without clipping.
- Event cards stacked vertically.
- Buttons at least 44px high.
- Body text around 16–18px.
- Avoid horizontal scrolling.
- Keep the most important event details visible without excessive scrolling.

### Tablet
- Centered content with comfortable margins.
- Event cards may appear in two columns.
- Maintain portrait image proportions.

### Desktop
- Maximum content width around 960–1100px.
- Two-column event cards.
- Generous whitespace.
- Do not stretch the portrait image beyond its natural quality.

## 12. Accessibility and quality

- Use semantic elements: `header`, `main`, `section`, `article`, `footer`.
- Maintain WCAG-friendly color contrast.
- Provide meaningful image alt text.
- Ensure links and buttons work with keyboard navigation.
- Add visible focus states.
- Respect `prefers-reduced-motion`.
- Do not communicate event details through color alone.
- Use descriptive link text such as “View ceremony venue on Google Maps”.
- Ensure the countdown is not announced every second by screen readers; use a restrained live-region strategy.

## 13. Performance and SEO

- Convert images to WebP or AVIF where supported.
- Resize images to the maximum display dimensions.
- Lazy-load images below the fold.
- Avoid large video backgrounds on mobile.
- Keep JavaScript minimal.
- Set a descriptive page title and meta description.
- Add Open Graph metadata so WhatsApp and social apps show a suitable preview image and title.
- Set a favicon.
- Test the social preview after deployment; some platforms cache previews.

Suggested metadata:

```html
<title>Verjin & Jesmi | Wedding Invitation</title>
<meta
  name="description"
  content="Join us to celebrate the wedding of Verjin V and Anto Jesmi D K on 17 May 2027."
/>
<meta property="og:title" content="Verjin & Jesmi — Wedding Invitation" />
<meta
  property="og:description"
  content="Together with God's blessings. 17 May 2027."
/>
<meta property="og:type" content="website" />
<meta property="og:image" content="/og-wedding.jpg" />
```

## 14. Build plan

### Phase 1 — Foundation
- Create the Vite React TypeScript project (or static HTML project).
- Set global colors, typography, spacing, and responsive breakpoints.
- Add the wedding data configuration.
- Add the page metadata and favicon.

### Phase 2 — Main invitation
- Build the hero.
- Add the invitation message.
- Add the couple portrait.
- Build ceremony and reception cards.
- Add the closing section and footer.

### Phase 3 — Interaction
- Implement the IST countdown.
- Add Google Maps links.
- Add smooth scrolling.
- Add optional share and RSVP controls only when their destinations are configured.

### Phase 4 — Polish
- Add subtle animations.
- Optimize images.
- Test mobile and desktop layouts.
- Verify every spelling, date, time, and venue.
- Test the page on a real phone.

### Phase 5 — Deployment
- Deploy as a static site using a hosting provider such as Vercel, Netlify, or GitHub Pages.
- Configure the final public URL.
- Test the link in WhatsApp and common mobile browsers.
- Confirm that the Open Graph preview is correct.

## 15. Acceptance checklist

Before sharing the invitation publicly, confirm:

- [ ] Groom name is exactly “Verjin V”.
- [ ] Bride name is exactly “Anto Jesmi D K”.
- [ ] Wedding date is 17 May 2027.
- [ ] Ceremony is at 10:30 AM.
- [ ] Ceremony venue is Christ the King Church, Iruthayapuram.
- [ ] Reception is from 5:00 PM to 9:00 PM.
- [ ] Reception venue is Christ the King Community Hall, Kulappuram.
- [ ] Both map links open and point to the correct venues.
- [ ] Couple photo is approved and displays correctly.
- [ ] Countdown uses Asia/Kolkata time.
- [ ] Family names are verified before publication, if included.
- [ ] RSVP destination is real and tested, if included.
- [ ] Page works on mobile without horizontal scrolling.
- [ ] All buttons and links work.
- [ ] Social preview image and text are correct.
- [ ] No placeholder copy, fake details, or broken images remain.

## 16. Final creative direction

The finished website should feel like a premium digital wedding card: graceful, personal, romantic, and easy to use. Keep the experience focused on the couple and the practical event details. Use motion as a subtle enhancement, not as a barrier to reading the invitation.

**Core message:**  
“United in love, bound by faith.”

**Final invitation line:**  
“Your presence will make our day special.”
