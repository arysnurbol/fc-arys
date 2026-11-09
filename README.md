# FC Arys — official website

Bilingual (Kazakh by default, Russian) one-page site for FC Arys (Arys, Turkistan region), First League of Kazakhstan.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /kz
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` (default `https://fc-arys.kz`) so canonical URLs, sitemap and Open Graph point at the real domain.

## Structure

```
src/
  app/[lang]/        layout (fonts, metadata, JSON-LD) + page; /kz and /ru are statically generated
  app/sitemap.ts     /sitemap.xml with hreflang alternates
  app/robots.ts      /robots.txt
  components/
    layout/          Header (sticky, mobile menu, KZ/RU), Footer (contacts)
    sections/        Hero, MatchCenter, News, Team, Season (stats + table), ClubIdentity, Media
    match/ players/ statistics/ gallery/ ui/
  data/              all football data — no data lives in components
  i18n/              locale config + interface dictionaries (kz, ru)
  types/football.ts  data contracts (a CMS/API only has to return these shapes)
```

Only four components ship JavaScript to the browser: Header, SquadTabs, Gallery (lightbox) and the small InView/Counter helpers. Everything else is a server component.

## Design system

- **Colour** — sampled from the official 2026 crest: navy `#0B003A`, gold `#D6B253`, star red `#A8201A`. Tokens live in `src/app/globals.css` (`@theme`): `night`, `ink`, `steel`, `mist`, `paper`, `gold`, `gold-deep`, `crest`, `signal`, `win`.
- **Type** — Fira Sans Extra Condensed 900 for display (kit-number voice), Golos Text for body. Both were checked to render every Kazakh letter (Ә Ғ Қ Ң Ө Ұ Ү Һ І) with standard Russian letterforms.
- **Signature** — the crest's locomotive references Arys as a railway junction, so scores are drawn as split-flap tiles on a departure board (`components/match/FlapScore.tsx`). That is the one bold element; everything around it stays quiet.
- **Motion** — one CSS load sequence in the hero, flap tiles and bars when scrolled into view, a CSS scroll-driven parallax on the hero image, counters, tab and lightbox transitions. All of it respects `prefers-reduced-motion`.

## Updating data

| What | File |
|---|---|
| League table | `src/data/standings.ts` — edit rows, then `updatedAt` |
| Fixtures/results | `src/data/matches.ts` — one row per match; add `status: "scheduled"` matches for next season and the match centre switches to "next match" automatically |
| Squad / staff | `src/data/players.ts` |
| News | `src/data/news.ts` |
| Gallery | `src/data/gallery.ts` + files in `public/images/gallery/` |
| Club facts, contacts | `src/data/club.ts` |
| Interface text | `src/i18n/dictionaries.ts` |

Season statistics, form guide, hero result and "last updated" dates are computed from these files, never typed twice.

## QA (9 Nov 2026, production build, Edge)

- No horizontal overflow at 360 / 390 / 430 / 768 / 1024 / 1440 / 1920 px; no console errors; no broken images.
- Mobile menu, anchor navigation, KZ ⇄ RU switch, squad tabs (keyboard arrows too), lightbox (arrows, Esc, focus return) tested.
- Lighthouse mobile: Performance 88–94 (varies per run), Accessibility 100, Best Practices 82–100 (varies per run), SEO 100. Desktop: Performance 99–100, Accessibility 100, SEO 100, Best Practices 81. In the low Best Practices runs, audits that don't apply to this build (unminified JS, missing compression, deprecations) flip between runs on headless Edge. A detailed re-run listed no failing weighted Best Practices audit. Re-check in Chrome / PageSpeed Insights after deploy.
- Remaining mobile LCP cost is the headline webfont on simulated slow 4G (LCP element is the hero headline).

## Data sources (verified 9 Nov 2026)

- **Table and all 26 league results** — kffleague.kz (official league site, season 204), cross-checked against kazfootball.kz: identical. Season finished on 22 Oct 2026; Arys 7th, 10-3-13, 35:46, 33 pts.
- **Last match details** (Жайык 1:2 Арыс, scorers, attendance, video, protocol) — kffleague.kz match 1322.
- **Cup** — Арыс 0:4 Актобе, 9 Apr 2026 (kffleague.kz, kazpravda.kz).
- **Scorers** — counted from the goal events of all 26 matches (35 goals incl. one opponent own goal).
- **Squad** (29 players) — kpl.kz, transfermarkt and the fc-arys.kz squad page; shirt numbers match in all three. Head coach Ғалымжан Есенбаев — kpl.kz, transfermarkt, club lineup graphic.
- **Crest** — official navy/gold crest from the kffleague.kz team logo. Opponent crests from the same source.
- **News and photos** — fc-arys.kz posts (images are the club's own Instagram graphics).

## Missing information — needs the club

1. **Who runs fc-arys.kz.** Its footer says «Жанкүйерлер клубы / Фан-клуб «Арыс»». News and photos were taken from it; the club must confirm the rights to use them (the site's robots.txt opts out of AI training crawlers).
2. **Contacts** — no street address, phone or email is published anywhere. The footer shows only "Арыс, Түркістан облысы"; add `phone`/`email` in `club.ts` and they appear automatically.
3. **Social accounts** — only Instagram @fc.arys was found.
4. **Stadium capacity** — not verified (field left empty).
5. **Partners/sponsors** — logos appear in club graphics (MANTA, dprint, BOSSTON, BAYSAN and others) but there is no official list, so no partner section is shown.
6. **Player photos** — official league photos exist for 24 players (kffleague.kz/storage/qfl-files/player_photos/) but the server refused automated download (403). Save them as `public/images/players/<slug>.webp` and add `photo: "/images/players/<slug>.webp"` in `players.ts`. Until then cards lead with the shirt number.
7. **Kazakh spellings of player names** come only from the fan site; Russian spellings are from kpl.kz. Please confirm.
8. **Positions with conflicting sources** — #11 Мансуров (FW/MF/CB), #14 Илгербай (DF/MF/FW), #6, #10, #13, #17, #19, #29, #80. Majority used.
9. **Assistant coaches** — only one source (transfermarkt, Latin spelling) for Kuldosh Eshdzhonov, so he is not listed.
10. **Seasons 2024–2025** — league positions not verified, so the club timeline shows 2022, 2023 and 2026 only.
11. **Copy to approve** — the hero slogan ("Бір қала. Бір команда. Бір мақсат."), mission, values and crest description are creative proposals, not official statements.
12. **High-quality match photography** — the best available hero image is a training-ground team photo. A wide match-day photo would make the hero stronger (`public/images/hero/hero.jpg`, ≥ 2400 px wide).
