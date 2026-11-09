import type { GalleryImage } from "@/types/football";

const team = { kz: "Команда", ru: "Команда" };
const matchday = { kz: "Матч күні", ru: "Матчдей" };

/** Photos published by the club on fc-arys.kz (2026 season). */
export const gallery: GalleryImage[] = [
  {
    src: "/images/gallery/gallery-1.jpg",
    width: 2560,
    height: 2119,
    category: team,
    alt: {
      kz: "«Арыс» құрамы мен бапкерлер штабы жаттығу алаңында",
      ru: "Состав и тренерский штаб «Арыса» на тренировочном поле",
    },
    source: "https://fc-arys.kz/news/bir-mausym-bir-komanda-bir-otbasy/",
  },
  {
    src: "/images/gallery/gallery-3.jpg",
    width: 894,
    height: 1584,
    category: matchday,
    alt: {
      kz: "Ақ формадағы «Арыс» ойыншылары голды тойлап жатыр",
      ru: "Игроки «Арыса» в белой форме празднуют гол",
    },
    source: "https://fc-arys.kz/news/erbolat-quralbaevtyng-goly-bizge-zhengis-akeldi/",
  },
  {
    src: "/images/gallery/gallery-8.jpg",
    width: 1088,
    height: 1440,
    category: matchday,
    alt: {
      kz: "«Ақтөбе-Ж» командасын 4:1 есебімен жеңгеннен кейінгі қуаныш",
      ru: "Радость после победы над «Актобе-Ж» со счётом 4:1",
    },
    source: "https://fc-arys.kz/news/bizding-komanda-aqtobe-zh-komandasyn-zhengdi/",
  },
  {
    src: "/images/gallery/gallery-6.jpg",
    width: 1440,
    height: 1920,
    category: matchday,
    alt: {
      kz: "«Арыс» — «Оңтүстік» матчы, есеп 1:0",
      ru: "Матч «Арыс» — «Онтустик», счёт 1:0",
    },
    source: "https://fc-arys.kz/news/bizding-komanda-qatarynan-besinshi-zhengisine-zhetti/",
  },
  {
    src: "/images/gallery/gallery-4.jpg",
    width: 1440,
    height: 1920,
    category: matchday,
    alt: {
      kz: "Сырт алаңдағы «Каспий» — «Арыс» матчы, есеп 1:2",
      ru: "Выездной матч «Каспий» — «Арыс», счёт 1:2",
    },
    source: "https://fc-arys.kz/news/syrt-alangdaghy-mangyzdy-zhengis/",
  },
  {
    src: "/images/gallery/gallery-2.jpg",
    width: 720,
    height: 1280,
    category: matchday,
    alt: {
      kz: "Алаң шетінен түсірілген матч сәті",
      ru: "Эпизод матча, снятый у бровки",
    },
    source: "https://fc-arys.kz/news/bizding-nazarymyzda-erbolat-kuralbaev-esimi/",
  },
];
