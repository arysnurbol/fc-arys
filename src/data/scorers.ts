import type { Localized } from "@/types/football";

/**
 * FC Arys league goals 2026, counted from goal events of all 26 matches
 * (kffleague.kz API /games/{id}); total 35 incl. one opponent own goal.
 * Spelling follows src/data/players.ts.
 */
export const scorers: { name: Localized; goals: number; leftClub?: boolean }[] = [
  { name: { kz: "Бекзат Мансұров", ru: "Бекзат Мансуров" }, goals: 5 },
  { name: { kz: "Мұхамед Садуақас", ru: "Мухамед Садуакас" }, goals: 4 },
  { name: { kz: "Асхат Жаңбырбай", ru: "Асхат Жанбырбай" }, goals: 4 },
  // Moved to Zhaiyk on 15.07.2026 (kpl.kz); all 3 goals scored for Arys.
  { name: { kz: "Шадман Бакиров", ru: "Шадман Бакиров" }, goals: 3, leftClub: true },
];

export const scorersSource = "https://kffleague.kz/ru/first-league";
