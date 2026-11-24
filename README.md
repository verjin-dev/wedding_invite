# VJ Wedding — Verjin & Jesmi

A responsive Catholic wedding invitation site for Verjin V and Anto Jesmi DK (17 May 2027), built with React 19, TypeScript, Vite 6, Framer Motion, GSAP, Anime.js and Supabase, and deployed on Netlify at https://verjinwedsjesmi.netlify.app/.

All wedding facts live in `src/data/wedding.ts`; image provenance, responsive sizes and alt text live in `src/data/assets.ts`. Components read from these files and do not repeat dates, times or venues.

## Run locally

```sh
npm install
npm run dev
npm run build
npm run preview
```

There is no test suite or linter configured; `npm run build` runs the TypeScript check (`tsc -b`) before the Vite build.

## Wedding details (source of truth: `src/data/wedding.ts`)

| | |
|---|---|
| Ceremony | 17 May 2027, 10:00 AM, Christ the King Church, Iruthayapuram (Kuzhithurai Diocese) |
| Reception | 17 May 2027, 5:30 PM, Christ the King Community Hall, Iruthayapuram |
| Engagement | 2 October 2026, 11:30 AM, bride's home |
| Time zone | Asia/Kolkata; timestamps use the fixed `+05:30` offset (India has no daylight saving) |

## Implemented and checked

- Door-opening intro, hero, our story, love-story timeline, scripture (Genesis 2:24, a short phrase with no translation named), couple profiles, families with best wishes, gallery, formal invitation with scratch card, ceremony and reception cards, countdown, directions, RSVP, save the date, footer.
- Countdown to the ceremony in India Standard Time, with "married today" and "were married" states after the start; it never shows negative values.
- Calendar: a Google Calendar link per event (ceremony and reception) and one `.ics` file with both. Only start times are given; no end time is guessed.
- Directions: separate Google Maps links for the church and the reception hall, both supplied by the couple.
- Gallery: category filters and a lightbox with keyboard (arrows, Escape, focus trap) and swipe support.
- Animations respect `prefers-reduced-motion`. GSAP and Anime.js load only after the intro doors open.
- SEO and sharing: title, description, canonical URL, Open Graph and Twitter metadata with a 1200×630 couple image, favicon, `public/robots.txt` (keeps `/admin` out) and `public/sitemap.xml`.

## Images

Couple, bride, groom and both family pictures are the couple's own photographs. The reception hall is a photograph of the actual hall, supplied by the couple. The hero portrait and the sunset portrait are AI-generated portraits supplied by the couple (the hero says so on screen). The church exterior and interior scenes are generated interpretations of the couple's church photographs, and the rose-arch countdown background is generated. Every image path in `assets.ts` exists under `public/`.

## Music

Put an instrumental MP3 at `public/music/wedding.mp3` (ideally under 3 MB). It starts with the tap that opens the doors, fades in softly, loops and pauses while the tab is hidden; a round button in the bottom-right corner pauses and resumes it. Without the file nothing plays and the button stays hidden.

## RSVP and admin (requires Supabase credentials)

1. In the Supabase SQL editor, apply in order:
   - `supabase/migrations/20261106000000_rsvp.sql`: the table and row level security (anyone may insert; only admins may read, update or delete).
   - `supabase/migrations/20261109000000_rsvp_delete.sql`: admin delete.
   - `supabase/migrations/20261120000000_rsvp_rate_limit.sql`: server-side spam protection (at most 5 replies per visitor and one per name in 10 minutes, 60 in total in 10 minutes; trims input and checks the phone format). Visitors are identified only by a salted hash, kept for a day in a table no API role can read.
2. Create the administrator in Supabase Auth and set `app_metadata.role` to `admin` from the Supabase dashboard or another trusted server tool. Never set it from the browser; the role is read only from `app_metadata`, which users cannot change.
3. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. On Netlify, set the same two variables in the site's environment.
4. `/admin` signs in through Supabase Auth, lists replies, deletes them and exports CSV (cells that could run as spreadsheet formulas are neutralised). Non-admins see no rows because the database refuses them.

Only the public anon key belongs in `VITE_*` variables; never put a service-role key there. The RSVP form shows success only after Supabase confirms the insert, disables the button while sending, and explains a rate-limit refusal.

## Deployment

`netlify.toml` holds the build command, publish directory, Node version and the SPA fallback for `/admin`. Pushing to `main` deploys.

## Still needed from the couple

- A date or details for "when friendship became love"; the timeline leaves this chapter out until then.
- The year of the first family meeting (shown as "9 August").
- A Bible translation, if the Genesis 2:24 text should be credited.
- The background music MP3 (see Music).
- A contact phone or WhatsApp number and an RSVP reply-by date, if wanted.
- Applying `20261120000000_rsvp_rate_limit.sql` in Supabase, then one test reply to confirm.
