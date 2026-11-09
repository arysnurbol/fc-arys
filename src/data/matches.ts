import type { Localized, Match } from "@/types/football";

/**
 * FC Arys 2026 fixtures and results.
 * Source: kffleague.kz API (/teams/333/games?season_id=204), cross-checked with
 * the kazfootball.kz calendar — all 26 league scores identical.
 * Kick-off times are local (Asia/Almaty, UTC+5).
 */
const SOURCE = "https://kffleague.kz/ru/first-league";
const league: Localized = { kz: "Бірінші лига", ru: "Первая лига" };
const cup: Localized = { kz: "Қазақстан кубогы", ru: "Кубок Казахстана" };
const homeVenue: Localized = { kz: "Орталық стадион, Арыс", ru: "Центральный стадион, Арыс" };

// [round, date+time, home, away, homeScore, awayScore]
type Row = [number, string, string, string, number, number];

const leagueRows: Row[] = [
  [1, "2026-04-02T15:00", "arys", "zhaiyk", 0, 1],
  [2, "2026-04-16T18:00", "turan", "arys", 1, 0],
  [3, "2026-04-23T15:00", "arys", "shakhter", 0, 6],
  [4, "2026-04-30T16:00", "arys", "astana-m", 3, 1],
  [5, "2026-05-07T14:00", "tobyl-m", "arys", 4, 3],
  [6, "2026-05-15T16:00", "arys", "khan-tengri", 0, 1],
  [7, "2026-05-22T17:00", "taraz", "arys", 2, 1],
  [8, "2026-05-26T17:00", "arys", "kairat-zhastar", 0, 3],
  [9, "2026-06-12T17:00", "batyr", "arys", 1, 1],
  [10, "2026-06-18T18:00", "arys", "kaspiy-m", 1, 2],
  [11, "2026-06-25T18:00", "aktobe-m", "arys", 3, 1],
  [12, "2026-07-03T17:00", "arys", "elimai-m", 3, 2],
  [13, "2026-07-09T17:00", "akademiya-ontustik", "arys", 1, 2],
  [14, "2026-07-16T18:00", "arys", "turan", 0, 4],
  [15, "2026-07-24T18:00", "shakhter", "arys", 4, 1],
  [16, "2026-07-31T19:00", "astana-m", "arys", 2, 0],
  [17, "2026-08-07T17:00", "arys", "tobyl-m", 3, 0],
  [18, "2026-08-15T10:00", "khan-tengri", "arys", 0, 0],
  [19, "2026-08-20T17:00", "arys", "taraz", 1, 1],
  [20, "2026-08-27T17:00", "kairat-zhastar", "arys", 1, 0],
  [21, "2026-09-03T17:00", "arys", "batyr", 3, 1],
  [22, "2026-09-11T17:00", "kaspiy-m", "arys", 1, 2],
  [23, "2026-09-17T16:00", "arys", "aktobe-m", 4, 1],
  [24, "2026-10-08T15:00", "elimai-m", "arys", 2, 3],
  [25, "2026-10-15T15:00", "arys", "akademiya-ontustik", 1, 0],
  [26, "2026-10-22T14:00", "zhaiyk", "arys", 1, 2],
];

/** Extra detail for individual matches (kffleague API /games/{id}). */
const details: Record<number, Partial<Match>> = {
  26: {
    venue: { kz: "П. Атоян атындағы стадион, Орал", ru: "Стадион им. П. Атояна, Уральск" },
    attendance: 500,
    goals: [
      { side: "away", name: { kz: "Жасар Зулыпбек", ru: "Жасар Зулыпбек" }, minute: 5 },
      { side: "home", name: { kz: "Роман Чирков", ru: "Роман Чирков" }, minute: 61, penalty: true },
      { side: "away", name: { kz: "Серік Рысбек", ru: "Серік Рысбек" }, minute: 90 },
    ],
    links: [
      { label: { kz: "Матч видеосы", ru: "Видео матча" }, url: "https://www.youtube.com/watch?v=kQeYcHmWgg0" },
      {
        label: { kz: "Матч хаттамасы (PDF)", ru: "Протокол матча (PDF)" },
        url: "https://kffleague.kz/storage/qfl-files/protocol_pdfs/2bba1d39-c48f-493d-8fd3-9160e9eca6b9.pdf",
      },
    ],
    source: "https://kffleague.kz/ru/first-league",
  },
};

export const leagueMatches: Match[] = leagueRows.map(([round, date, home, away, hs, as]) => ({
  id: `fl-2026-${round}`,
  date,
  round,
  competition: league,
  home,
  away,
  status: "finished",
  homeScore: hs,
  awayScore: as,
  venue: home === "arys" ? homeVenue : undefined,
  source: SOURCE,
  ...details[round],
}));

/** Kazakhstan Cup 2026, 1/16 final (kffleague API season 202; kazpravda.kz). */
export const cupMatches: Match[] = [
  {
    id: "cup-2026-r32",
    date: "2026-04-09T15:00",
    competition: cup,
    home: "arys",
    away: "aktobe",
    status: "finished",
    homeScore: 0,
    awayScore: 4,
    attendance: 1500,
    source: "https://kazpravda.kz/n/legkih-progulok-ne-ozhidaetsya/",
  },
];

export const allMatches = [...leagueMatches, ...cupMatches].sort((a, b) => a.date.localeCompare(b.date));

/** Season is over: show the latest completed match, not a fake "next" one. */
export function getFeaturedMatch(): { match: Match; upcoming: boolean } {
  const next = allMatches.find((m) => m.status === "scheduled");
  if (next) return { match: next, upcoming: true };
  return { match: allMatches.filter((m) => m.status === "finished").at(-1)!, upcoming: false };
}

export type Outcome = "W" | "D" | "L";

export function outcomeFor(m: Match, team = "arys"): Outcome | undefined {
  if (m.status !== "finished" || m.homeScore == null || m.awayScore == null) return undefined;
  const ours = m.home === team ? m.homeScore : m.awayScore;
  const theirs = m.home === team ? m.awayScore : m.homeScore;
  return ours > theirs ? "W" : ours < theirs ? "L" : "D";
}
