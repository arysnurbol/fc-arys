import type { Standings } from "@/types/football";

/**
 * Final 2026 First League table after round 26 (season ended 22 Oct 2026).
 * Identical on kffleague.kz (API /seasons/204/table) and kazfootball.kz.
 * To update: edit the rows below and `updatedAt`.
 */
export const standings: Standings = {
  season: "2026",
  competition: { kz: "Бірінші лига", ru: "Первая лига" },
  updatedAt: "2026-11-09",
  source: "https://kffleague.kz/ru/first-league",
  rows: [
    { position: 1, club: "shakhter", played: 26, won: 21, drawn: 2, lost: 3, goalsFor: 68, goalsAgainst: 12, points: 65 },
    { position: 2, club: "kairat-zhastar", played: 26, won: 19, drawn: 6, lost: 1, goalsFor: 72, goalsAgainst: 15, points: 63 },
    { position: 3, club: "turan", played: 26, won: 18, drawn: 3, lost: 5, goalsFor: 55, goalsAgainst: 22, points: 57 },
    { position: 4, club: "akademiya-ontustik", played: 26, won: 13, drawn: 4, lost: 9, goalsFor: 36, goalsAgainst: 32, points: 43 },
    { position: 5, club: "astana-m", played: 26, won: 12, drawn: 3, lost: 11, goalsFor: 55, goalsAgainst: 53, points: 39 },
    { position: 6, club: "taraz", played: 26, won: 10, drawn: 7, lost: 9, goalsFor: 39, goalsAgainst: 35, points: 37 },
    { position: 7, club: "arys", played: 26, won: 10, drawn: 3, lost: 13, goalsFor: 35, goalsAgainst: 46, points: 33 },
    { position: 8, club: "zhaiyk", played: 26, won: 9, drawn: 5, lost: 12, goalsFor: 24, goalsAgainst: 33, points: 32 },
    { position: 9, club: "khan-tengri", played: 26, won: 9, drawn: 5, lost: 12, goalsFor: 35, goalsAgainst: 48, points: 32 },
    { position: 10, club: "kaspiy-m", played: 26, won: 8, drawn: 4, lost: 14, goalsFor: 37, goalsAgainst: 49, points: 28 },
    { position: 11, club: "batyr", played: 26, won: 7, drawn: 6, lost: 13, goalsFor: 34, goalsAgainst: 59, points: 27 },
    { position: 12, club: "aktobe-m", played: 26, won: 6, drawn: 6, lost: 14, goalsFor: 46, goalsAgainst: 81, points: 24 },
    { position: 13, club: "tobyl-m", played: 26, won: 6, drawn: 5, lost: 15, goalsFor: 51, goalsAgainst: 64, points: 23 },
    { position: 14, club: "elimai-m", played: 26, won: 3, drawn: 3, lost: 20, goalsFor: 22, goalsAgainst: 60, points: 12 },
  ],
};
