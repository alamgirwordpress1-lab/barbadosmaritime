# Barbados Maritime Ship Registry — Homepage redesign

A redesign of the barbadosmaritime.com homepage, built with Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP (scroll and slider animation), Three.js (the "sea of light" at the foot of the hero, `components/motion/WaveField.tsx`) and Lenis (smooth scrolling).

The look follows the client-approved "night watch" mockup: deep navy, teal and gold accents, Instrument Serif headings with an italic teal-to-gold phrase, and Manrope for text. Every section of the current homepage is kept (restyled), and the mockup's new sections are added: credentials ticker, four-step process, FAQ, enquiry form and emergency desk.

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
| Colours, fonts, shared styles | `app/globals.css` (`@theme` tokens) |
| Page composition (section order) | `app/page.tsx` |
| Header, top bars, footer | `components/layout/` |
| Homepage sections | `components/sections/` |
| Images and videos | `public/images/`, `public/videos/` |

## Before launch

- **New copy to confirm (marked DRAFT in `lib/content.ts`)**: the hero lead line, the four registration steps and the "provisional in 24 hours" timing, and FAQ answers 1–3 (eligibility, registration speed, mortgages) come from the mockup, not the current site. The registry must confirm they are accurate.
- **Testimonials**: the mockup's "What the bridge says about us" section is not built, because it needs real, attributable client quotes. Add it once the registry supplies them.
- **Forms**: the enquiry form (`components/sections/Enquiry.tsx`) and the "Stay Connected" sign-up (`components/sections/StayConnected.tsx`) are front-end stubs. Connect them to the registry's inbox and mailing-list provider.
- **Images**: the files in `public/images/` were cut from a full-page screenshot, because the live site's bot protection blocked direct access. They have been enlarged with AI upscaling (EDSR) and colour-graded, but the originals will still be sharper. Replace them with the original high-resolution files from the WordPress media library, keeping the same filenames. The hero photo had its old headline removed digitally, so replace it first.
- **Videos**: both are free Pexels clips, and both ships show a company name on the hull, so swap them for unbranded or Barbados-flagged footage before launch.
  - Hero slide 1: `public/videos/ship-at-sea.mp4`, "Aerial Footage Of A Cargo Ship At Sea" by Alexander Bobrov (1280×720, 9.9 MB). Hull shows "MSC".
  - Stats band: `public/videos/cargo-ship-sailing.mp4`, "A Footage of a Cargo Ship Floating on the Sea" by Maria Marin (1280×720, 3.9 MB). Hull shows "Ciner".
- **Your own video (e.g. from Higgsfield)**: any hero slide can play a looping background video. Export a short clip as MP4 (H.264, 1920px wide, ideally under 4 MB and 6–10 seconds, no sound), put it in `public/videos/`, and set `video: "/videos/your-clip.mp4"` on that slide in `heroSlides` (`lib/content.ts`). The slide's `image` is shown as the poster until the video plays. The stats band uses `statsBackdrop` the same way.
- **Menu dropdowns**: the sub-menu items in `lib/content.ts → mainNav` are best guesses based on the pages the homepage links to. Check them against the live menu, and add sub-pages for Seafarers and Investigations.
- **Links**: internal `href`s follow the likely WordPress slugs. The LinkedIn URL also needs confirming.
- **Hero panel clock**: the "Office open/closed" status and London time in the hero panel is calculated from the stated opening hours (Mon–Fri, 9am–5pm UK time). It does not account for public holidays.
