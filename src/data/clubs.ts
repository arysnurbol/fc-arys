import type { Club } from "@/types/football";

/**
 * 2026 First League clubs. Names: kffleague.kz (lang=ru / lang=kz).
 * Crests: kffleague.kz/storage/qfl-files/public/team-logos/.
 */
const list: Club[] = [
  { slug: "shakhter", name: { kz: "Шахтёр", ru: "Шахтёр" }, crest: "/images/clubs/shakhter.png" },
  { slug: "kairat-zhastar", name: { kz: "Қайрат-Жастар", ru: "Кайрат-Жастар" }, crest: "/images/clubs/kairat-zhastar.webp" },
  { slug: "turan", name: { kz: "Тұран", ru: "Туран" }, crest: "/images/clubs/turan.webp" },
  { slug: "akademiya-ontustik", name: { kz: "Академия Оңтүстік", ru: "Академия Оңтүстік" }, crest: "/images/clubs/akademiya-ontustik.png" },
  { slug: "astana-m", name: { kz: "Астана Ж", ru: "Астана М" }, crest: "/images/clubs/astana-m.webp" },
  { slug: "taraz", name: { kz: "Тараз", ru: "Тараз" }, crest: "/images/clubs/taraz.png" },
  { slug: "arys", name: { kz: "Арыс", ru: "Арыс" }, crest: "/images/clubs/arys.png" },
  { slug: "zhaiyk", name: { kz: "Жайық", ru: "Жайык" }, crest: "/images/clubs/zhaiyk.png" },
  { slug: "khan-tengri", name: { kz: "Хан-Тәңірі", ru: "Хан-Тенгри" }, crest: "/images/clubs/khan-tengri.png" },
  { slug: "kaspiy-m", name: { kz: "Каспий Ж", ru: "Каспий М" }, crest: "/images/clubs/kaspiy-m.webp" },
  { slug: "batyr", name: { kz: "Батыр", ru: "Батыр" }, crest: "/images/clubs/batyr.png" },
  { slug: "aktobe-m", name: { kz: "Ақтөбе-Ж", ru: "Актобе-М" }, crest: "/images/clubs/aktobe-m.webp" },
  { slug: "tobyl-m", name: { kz: "Тобыл Ж", ru: "Тобыл М" }, crest: "/images/clubs/tobyl-m.png" },
  { slug: "elimai-m", name: { kz: "Елімай Ж", ru: "Елимай М" }, crest: "/images/clubs/elimai-m.webp" },
  // Cup opponent (Premier League) — no crest downloaded, renders as initials.
  { slug: "aktobe", name: { kz: "Ақтөбе", ru: "Актобе" } },
];

export const clubs: Record<string, Club> = Object.fromEntries(list.map((c) => [c.slug, c]));

export function getClub(slug: string): Club {
  const c = clubs[slug];
  if (!c) throw new Error(`Unknown club slug: ${slug}`);
  return c;
}
