/** Public origin of the site. Set NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fc-arys.kz").replace(/\/$/, "");

/** Section anchors shared by header, footer and sections. */
export const sections = {
  home: "top",
  club: "club",
  team: "team",
  matches: "matches",
  news: "news",
  media: "media",
  contact: "contact",
} as const;
