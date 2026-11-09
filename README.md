# Ẩn Vi Các · landing page

Rebuild of the draft at https://an-vi-cac-landing-draft.vercel.app (Next.js 16, Tailwind v4), switched to a light theme and refined.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npx next start -p 3100
```

## What lives where

| Path | What |
|---|---|
| `src/app/page.tsx` | Section order of the home page |
| `src/app/globals.css` | Design tokens. `:root` = light theme; `[data-theme="dark"]` = original dark palette. One sans font everywhere (Be Vietnam Pro 400 to 700); decorative Han glyphs use a CJK serif stack (`--font-glyph`) |
| `src/components/landing/` | One file per section. `BirthChartForm` = the 2-step form (same fields, validation and payload as the draft; "Tên thường dùng" moved to step 2). `MobileCtaBar` = sticky Zalo + "Lập lá số" bar on phones. `FinalCtaSection` replaced the draft's second copy of the form |
| `src/app/api/quiz/route.ts` | Forwards form submissions to `NEXT_PUBLIC_APP_URL/api/quiz`, then the browser goes to `/ket-qua/{id}` |
| `src/content/` | **Everything you fill in yourself** (see below) |
| `src/lib/amlich.ts` | Vietnamese lunar calendar for the "Hôm nay" card (Hồ Ngọc Đức's algorithm, UTC+7) |
| `src/lib/sample-chart.ts` | Sample chart computed with `iztro` at build time |
| `scripts/shots.mjs`, `scripts/viewport-shots.mjs`, `scripts/measure.mjs`, `scripts/behavior-check.mjs` | Visual QA (full page and fixed-UI viewport shots) and interaction smoke test (uses your installed Chrome) |

Copy rules: no long dashes, no "X, không Y" lines, digits for numbers, capital after a colon.

## Artwork

All illustrations are public domain (CC0) paintings from the Cleveland Museum of Art Open Access collection, listed with captions and source links in `src/content/art.ts`; files are in `public/images/art/` (WebP, cropped). Credit line is in the footer (not legally required for CC0). `public/images/hero-dich-su.png` (the draft's fox-mask illustration) is no longer used on the page.

## Logo and favicon

Seal mark 隱微閣印 ("Ẩn Vi Các" + 印, seal), white characters on vermilion, read right column first: `public/images/logo-seal.svg` (vector, glyph outlines from Noto Serif TC, OFL) and `logo-seal.png` (512px). Favicon is a single 隱: `src/app/icon.svg`, `favicon.ico`, `apple-icon.png`. The old fox-mask `logo-an-vi-cac.png` is no longer used.

## Content you need to supply (`src/content/`)

Sections and lines stay hidden until their data exists, so nothing half-empty ships.

- `business.ts`: full-package price, Dịch sư turnaround, payment methods, company name/MST/address, Bộ Công Thương notification link, terms/payment/refund policy URLs, social links.
- `testimonials.ts`: at least 3 real testimonials (with permission) before the section appears.
- `articles.ts`: knowledge articles; each gets a page at `/kien-thuc/[slug]`.
- `sample-reading.ts`: sample excerpts. Ask the Dịch sư to review the wording.

## SEO and mobile

- Metadata in `src/lib/seo.ts`, `src/app/layout.tsx`, `src/app/page.tsx`. Structured data: Organization, WebSite, WebPage, Service, FAQPage (home), Article (`/kien-thuc/[slug]`). Also `robots.ts`, `sitemap.ts`, `manifest.ts`, `not-found.tsx`.
- Update `LAST_UPDATED` in `seo.ts` when content changes. The FAQ mentions "năm 2026": update it each year.
- Audit: `NEXT_PUBLIC_ALLOW_INDEXING=true npm run build && npx next start`, then Lighthouse in mobile mode. `scripts/first-frame.mjs` checks that the form fits a phone's first screen.

## Before launch

1. Point the real domain at this project, set `NEXT_PUBLIC_SITE_URL`, then `NEXT_PUBLIC_ALLOW_INDEXING=true`.
2. Submit one real test entry end to end (form → `/api/quiz` → result page). It was not tested here because it creates a record in the main app.
3. The sample chart comes from `iztro`. If the main app's engine follows a different school (Tứ Hóa table, brightness), export the sample from that engine instead so the preview matches what customers receive.
