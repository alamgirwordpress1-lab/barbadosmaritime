# Barbados Maritime Ship Registry — Homepage redesign

A modern redesign of the barbadosmaritime.com homepage, built with Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP (scroll and slider animation), Three.js (the "sea of light" at the foot of the hero, `components/motion/WaveField.tsx`) and Lenis (smooth scrolling).
The section order, copy, brand colours and typefaces (Quicksand + Nunito) are unchanged from the current site. Only the layout and presentation are new.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build: `npm run build && npm start`.

## Where things live

| What | Where |
| --- | --- |
| All homepage copy, links and image paths | `lib/content.ts` |
| Brand colours, fonts, shared styles | `app/globals.css` (`@theme` tokens) |
| Page composition (section order) | `app/page.tsx` |
| Header, top bars, footer | `components/layout/` |
| Homepage sections | `components/sections/` |
| Images | `public/images/` |

## Before launch

- **Images**: the files in `public/images/` were cut from a full-page screenshot, because the live site's bot protection blocked direct access. They have been enlarged with AI upscaling (EDSR) and colour-graded for a cleaner look, but the originals will still be sharper. Replace them with the original high-resolution files from the WordPress media library, keeping the same filenames. The hero photo had its old headline removed digitally, so replace it first.
- **Menu dropdowns**: the sub-menu items in `lib/content.ts → mainNav` are best guesses based on the pages the homepage links to. Check them against the live menu, and add sub-pages for Seafarers and Investigations.
- **Links**: internal `href`s follow the likely WordPress slugs. The LinkedIn URL also needs confirming.
- **Newsletter**: the "Stay Connected" form (`components/sections/StayConnected.tsx`) is a front-end stub. Connect it to the registry's mailing-list provider.
- **Hero slider**: the three slides reuse existing homepage headings, buttons and photos (`heroSlides` in `lib/content.ts`). Slides 2 and 3 use photos enlarged from the screenshot, so replace them with originals.
- **Hero video (optional, e.g. from Higgsfield)**: any hero slide can play a looping background video. Export a short clip as MP4 (H.264, 1920px wide, ideally under 4 MB and 6–10 seconds, no sound), put it in `public/videos/`, and add `video: "/videos/your-clip.mp4"` to that slide in `heroSlides` (`lib/content.ts`). The slide's photo is shown as the poster until the video plays.
- **Stats background video**: `public/videos/ship-at-sea.mp4` is "Aerial Footage Of A Cargo Ship At Sea" by Alexander Bobrov from Pexels (free licence, 1280×720, 9.9 MB). The ship's hull shows the "MSC" shipping-line name, so swap it for an unbranded or Barbados-flagged vessel clip if the registry prefers. Set the file in `statsBackdrop` (`lib/content.ts`).
- **Hero panel clock**: the "Office open/closed" status and London time in the hero panel is calculated from the stated opening hours (Mon–Fri, 9am–5pm UK time). It does not account for public holidays.
