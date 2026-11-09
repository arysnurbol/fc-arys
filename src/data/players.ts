import type { Localized, Player, Position, StaffMember } from "@/types/football";

/**
 * FC Arys 2026 squad (checked 2026-11-09).
 * Numbers: identical on kpl.kz, transfermarkt and fc-arys.kz.
 * RU spelling: kpl.kz. KZ spelling: fc-arys.kz squad page (needs club confirmation).
 * Positions: majority of the three sources; conflicts listed in README.md.
 * Nationality: Kazakhstan per kpl.kz and transfermarkt (all players).
 * Photos: league photos exist but could not be downloaded (403) — add files to
 * /public/images/players/<slug>.webp and set `photo` to show them.
 */
const KPL = "https://kpl.kz/club/arys/?season=2026";
const KAZ: Localized = { kz: "Қазақстан", ru: "Казахстан" };

// [number, kz name, ru name, slug, position]
type Row = [number, string, string, string, Position];

const rows: Row[] = [
  [1, "Сержан Құрманас", "Сержан Курманас", "serzhan-kurmanas", "GK"],
  [16, "Береке Барлық", "Береке Барлык", "bereke-barlyk", "GK"],
  [25, "Бағлан Хантай", "Баглан Хантай", "baglan-khantay", "GK"],
  [30, "Нұралы Нұрғалиев", "Нуралы Нургалиев", "nuraly-nurgaliev", "GK"],

  [2, "Нұрсұлтан Пердебай", "Нурсултан Пердебай", "nursultan-perdebay", "DF"],
  [4, "Шахсұлтан Зубайділда", "Шахсултан Зубайдилда", "shakhsultan-zubaydilda", "DF"],
  [5, "Жан Рақымжанов", "Жан Рахымжанов", "zhan-rakhymzhanov", "DF"],
  [8, "Ерболат Құралбаев", "Ерболат Куралбаев", "erbolat-kuralbaev", "DF"],
  [10, "Бақытжан Мәліков", "Бакытжан Маликов", "bakytzhan-malikov", "DF"],
  [12, "Мақсат Иманәлі", "Максат Иманали", "maksat-imanali", "DF"],
  [15, "Қажымұқан Қуатбекұлы", "Кажымукан Куатбекулы", "kazhymukan-kuatbekuly", "DF"],
  [17, "Қадырбек Асқар", "Кадырбек Аскар", "kadyrbek-askar", "DF"],
  [21, "Серік Рысбек", "Серик Рысбек", "serik-rysbek", "DF"],
  [22, "Бақдәулет Молдақараев", "Бакдаулет Молдакараев", "bakdaulet-moldakaraev", "DF"],
  [24, "Әли Қазақбай", "Али Казакбай", "ali-kazakbay", "DF"],
  [78, "Дамир Шілдебай", "Дамир Шилдебай", "damir-shildebay", "DF"],

  [6, "Жасар Зулыпбек", "Жасар Зулыпбек", "zhasar-zulypbek", "MF"],
  [7, "Ерсайын Бегалы", "Ерсайын Бегалы", "ersayyn-begaly", "MF"],
  [13, "Раман Абубакир", "Раман Абубакир", "raman-abubakir", "MF"],
  [18, "Шахриер Шакарбеков", "Шахриер Шакарбеков", "shakhrier-shakarbekov", "MF"],
  [23, "Дінмұхаммед Серікұлы", "Динмухамед Серикулы", "dinmukhamed-serikuly", "MF"],
  [29, "Аслан Қыстаубай", "Аслан Кыстаубай", "aslan-kystaubay", "MF"],
  [80, "Максим Ваганов", "Максим Ваганов", "maksim-vaganov", "MF"],

  [9, "Даниял Таханов", "Даниял Таханов", "daniyal-takhanov", "FW"],
  [11, "Бекзат Мансұров", "Бекзат Мансуров", "bekzat-mansurov", "FW"],
  [14, "Нұрзат Ілгербай", "Нурзат Илгербай", "nurzat-ilgerbay", "FW"],
  [19, "Қайрат Әбдімуталипов", "Кайрат Абдимуталипов", "kairat-abdimutalipov", "FW"],
  [77, "Асхат Жаңбырбай", "Асхат Жанбырбай", "askhat-zhanbyrbay", "FW"],
  [79, "Мұхамед Садуақас", "Мухамед Садуакас", "mukhamed-saduakas", "FW"],
];

export const players: Player[] = rows
  .map(([number, kz, ru, slug, position]) => ({
    slug,
    number,
    name: { kz, ru },
    position,
    nationality: KAZ,
    source: slug === "damir-shildebay" ? "https://www.transfermarkt.world/fk-arys/kader/verein/98624/saison_id/2025" : KPL,
  }))
  .sort((a, b) => a.number - b.number);

/** Only staff confirmed by multiple sources (kpl.kz, transfermarkt, club lineup graphic). */
export const staff: StaffMember[] = [
  {
    slug: "galymzhan-esenbaev",
    name: { kz: "Ғалымжан Есенбаев", ru: "Галымжан Есенбаев" },
    role: { kz: "Бас бапкер", ru: "Главный тренер" },
    source: "https://kpl.kz/staff/galymzhan-esenbaev/",
  },
];

export const positionOrder: Position[] = ["GK", "DF", "MF", "FW"];
