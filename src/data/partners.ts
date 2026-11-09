/**
 * Partners as seen in FC Arys's own materials (no official list is published).
 * - kit: names printed on the 2026 match kit (league round-26 graphic, team photos).
 * - club: names in the partner strip of the club's match graphics on fc-arys.kz.
 * Logos: none available yet — add a file under /public/images/partners/ and set `logo`.
 */
export interface Partner {
  name: string;
  tier: "kit" | "club";
  logo?: string;
  url?: string;
}

export const partners: Partner[] = [
  { name: "MANTA", tier: "kit" },
  { name: "dprint", tier: "kit" },
  { name: "BOSSTON", tier: "kit" },
  { name: "BAYSAN", tier: "kit" },
  { name: "Maki Maki Arys", tier: "club" },
  { name: "Erzhan Plov", tier: "club" },
  { name: "Эскулап Vita", tier: "club" },
  { name: "FORWARD", tier: "club" },
];

export const partnersSource =
  "https://fc-arys.kz/news/bizding-komandanyng-alghashqy-quramymen-tanysyngyzdar/";
