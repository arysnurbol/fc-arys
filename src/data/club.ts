import type { Localized } from "@/types/football";

/**
 * Club facts. Every field cites its source; fields we could not verify are
 * left undefined and documented in README.md ("Missing information").
 */
export const club = {
  slug: "arys",
  name: { kz: "«Арыс» футбол клубы", ru: "Футбольный клуб «Арыс»" } satisfies Localized,
  shortName: { kz: "Арыс", ru: "Арыс" } satisfies Localized,
  crest: "/images/brand/arys-crest-gold.png", // official 2026 crest, kffleague.kz team logo
  founded: 2022, // fc-arys.kz/ru/club/, kpl.kz/club/arys/
  city: { kz: "Арыс, Түркістан облысы", ru: "Арыс, Туркестанская область" } satisfies Localized,
  stadium: {
    name: { kz: "Орталық стадион", ru: "Центральный стадион" } satisfies Localized,
    capacity: undefined as number | undefined, // not verified
  },
  league: { kz: "Қазақстан Бірінші лигасы", ru: "Первая лига Казахстана" } satisfies Localized,
  url: "https://fc-arys.kz",
  contacts: {
    address: { kz: "Арыс қ., Түркістан облысы", ru: "г. Арыс, Туркестанская область" } satisfies Localized,
    phone: undefined as string | undefined, // not published anywhere we could verify
    email: undefined as string | undefined,
  },
  social: [{ id: "instagram", label: "Instagram", url: "https://www.instagram.com/fc.arys/" }] as const,
  sources: {
    club: "https://fc-arys.kz/ru/club/",
    kpl: "https://kpl.kz/club/arys/",
  },
};

/** Season-by-season record. Source: https://fc-arys.kz/ru/club/ (2026: kffleague.kz). */
export const history: { season: number; league: Localized; position: number; note?: Localized }[] = [
  { season: 2022, league: { kz: "Екінші лига", ru: "Вторая лига" }, position: 4 },
  { season: 2023, league: { kz: "Бірінші лига", ru: "Первая лига" }, position: 8 },
];

/**
 * Editorial copy for the identity section. This is a creative proposal written
 * for the site, not an official club statement — needs approval by the club.
 */
export const identity = {
  story: {
    kz: "«Арыс» 2022 жылы Түркістан облысының Арыс қаласында құрылды. Алғашқы маусымда Екінші лигада төртінші орын алып, 2023 жылдан бастап Қазақстан Бірінші лигасында ойнап келеді.",
    ru: "«Арыс» основан в 2022 году в городе Арыс Туркестанской области. В первом сезоне команда заняла четвёртое место во Второй лиге, а с 2023 года выступает в Первой лиге Казахстана.",
  },
  crest: {
    kz: "Елтаңбадағы паровоз — Арыстың ірі теміржол торабы ретіндегі тарихына құрмет. Қала мен команда бір бағытқа қарай қозғалады.",
    ru: "Паровоз на гербе — дань истории Арыса как крупного железнодорожного узла. Город и команда движутся в одном направлении.",
  },
  mission: {
    kz: "Арыс пен облыстың жас футболшыларына кәсіби жол ашу және әр үй ойынын қала мерекесіне айналдыру.",
    ru: "Открывать профессиональный путь молодым футболистам Арыса и области и превращать каждый домашний матч в праздник для города.",
  },
  values: [
    { kz: "Мінез", ru: "Характер" },
    { kz: "Бірлік", ru: "Единство" },
    { kz: "Еңбек", ru: "Труд" },
    { kz: "Жанкүйерге құрмет", ru: "Уважение к болельщикам" },
  ] satisfies Localized[],
};
