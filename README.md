# VJ Wedding — Verjin & Jesmi

A responsive Catholic wedding invitation site built with React 19, TypeScript, Vite 6, Framer Motion and Supabase. Wedding details live in `src/data/wedding.ts`; image provenance, responsive sizes and alt text live in `src/data/assets.ts`.

## Run locally

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Content and image sources

The public site uses the supplied bride and groom portraits, both supplied family photographs, two couple photographs, and both supplied church exterior reference photographs. Family and gallery images preserve their source proportions. Church exterior and interior scenes are generated interpretations based on the supplied references. The rose-arch countdown background is generated. The reception hall is a generic illustration and is labeled as such; it is not a photo of the confirmed venue. Generated originals and generation notes are kept under `assets/generated/originals` and `assets/generated/README.md`.

Edit names, dates, times, venue details, story copy, invitation copy, and gallery entries in `src/data/wedding.ts`. Set a ceremony or reception `mapUrl` only after confirming an official map destination. Reception time is intentionally unset. The family members are not named and no names or introductions have been invented.

## RSVP and admin setup

1. Apply `supabase/migrations/20261106000000_rsvp.sql` in the Supabase SQL editor.
2. Create an administrator in Supabase Auth and set the user's `app_metadata.role` to `admin` with a trusted server/admin tool. Never set admin app metadata from the browser.
3. Copy `.env.example` to `.env.local` and configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Restart Vite. `/admin` signs in through Supabase Auth and shows RSVP responses only to users with the admin claim.

Only the public anon/publishable key belongs in frontend environment variables. Never expose a service-role key through a `VITE_*` variable. The RSVP form reports a setup message while Supabase is unavailable and reports success only after a saved insert. The public insert policy needs server-side rate limiting or CAPTCHA before broad launch. The admin interface currently covers sign-in, RSVP review, and CSV export; gallery/content administration is not implemented.

The credentials and Supabase values previously shared in conversation are not stored in tracked files. Rotate any credentials that were exposed in chat before launch.

## Deployment

`netlify.toml` holds the Netlify build command, publish directory, Node version, and the SPA fallback redirect, so a site linked to this repository needs no build settings entered by hand. Set the two public Supabase variables in the site's environment; they are not in the file because only the dashboard should hold them.

Add the canonical URL, absolute Open Graph image URL, sitemap, and `robots.txt` sitemap declaration after confirming the production domain. The previous `vjwedding.netlify.app` URL was unverified, so it is not published as canonical metadata.

## Still needed

- Confirmed production domain and official Google Maps URLs.
- Reception time and schedule.
- Bible translation if a full Genesis quotation should be shown.
- Family names and introductions, if you want those published.
- Local file for the separately attached couple portrait, if it should be included.
- Supabase migration, Auth administrator, and production RSVP verification.
- Server-side RSVP spam protection before public launch.
