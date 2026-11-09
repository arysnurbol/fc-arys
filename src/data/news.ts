import type { NewsItem } from "@/types/football";

const category = { kz: "Жаңалықтар", ru: "Новости" };
const result = { kz: "Матч", ru: "Матч" };
const video = { kz: "Видео", ru: "Видео" };

/**
 * Latest posts from fc-arys.kz (titles and dates as published; RU titles for
 * items 1–2 as published on /ru/news/, the rest translated from Kazakh).
 * Replace with a CMS feed later; the UI only depends on the NewsItem type.
 */
export const news: NewsItem[] = [
  {
    id: "season-2026",
    date: "2026-10-31",
    category,
    title: {
      kz: "Біздің команданың 2026 жылғы маусымы",
      ru: "Футбольный сезон 2026 нашего клуба",
    },
    image: "/images/news/news-2.jpg",
    url: "https://fc-arys.kz/news/bizding-komandanyng-2026-zhylghy-mausymy/",
    source: "https://fc-arys.kz/news/bizding-komandanyng-2026-zhylghy-mausymy/",
  },
  {
    id: "season-goals",
    date: "2026-11-01",
    category: video,
    title: {
      kz: "Біздің футболшылардың маусым бойғы голдар топтамасы",
      ru: "Наши точные удары и лучшие голы сезона",
    },
    image: "/images/news/news-1.jpg",
    url: "https://fc-arys.kz/news/bizding-futbolshylardyng-mausym-boyghy-goldar-toptamasy/",
    source: "https://fc-arys.kz/news/bizding-futbolshylardyng-mausym-boyghy-goldar-toptamasy/",
  },
  {
    id: "jaiyq-win",
    date: "2026-10-22",
    category: result,
    title: {
      kz: "Маусымды «Жайыққа» қарсы кездесудегі жеңіспен аяқтадық",
      ru: "Завершили сезон победой над «Жайыком»",
    },
    image: "/images/news/news-4.jpg",
    url: "https://fc-arys.kz/news/mausymdy-zhayyqqa-qarsy-kezdesudegi-zhengispen-ayaqtadyq/",
    source: "https://fc-arys.kz/news/mausymdy-zhayyqqa-qarsy-kezdesudegi-zhengispen-ayaqtadyq/",
  },
  {
    id: "jaiyq-goals",
    date: "2026-10-22",
    category: video,
    title: {
      kz: "«Жайық» пен «Арыс» арасындағы кездесудің голдары",
      ru: "Голы матча «Жайык» — «Арыс»",
    },
    image: "/images/news/news-3.jpg",
    url: "https://fc-arys.kz/news/zhayyq-pen-arys-arasyndaghy-kezdesuding-goldary/",
    source: "https://fc-arys.kz/news/zhayyq-pen-arys-arasyndaghy-kezdesuding-goldary/",
  },
];
