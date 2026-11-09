export type Locale = "kz" | "ru";

/** Text in both site languages. */
export type Localized = Record<Locale, string>;

/** Every data record carries where it came from, so it can be re-verified. */
export interface Sourced {
  source: string;
}

export interface Club {
  slug: string;
  name: Localized;
  /** Path under /public, or undefined to render an initials badge. */
  crest?: string;
}

export type MatchStatus = "finished" | "scheduled";

export interface Match extends Sourced {
  id: string;
  /** ISO date, optionally with time (Asia/Almaty local time). */
  date: string;
  round?: number;
  competition: Localized;
  home: string; // club slug
  away: string; // club slug
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  venue?: Localized;
  attendance?: number;
  goals?: Goal[];
  /** Extra links (video, protocol). */
  links?: { label: Localized; url: string }[];
}

export interface Goal {
  side: "home" | "away";
  name: Localized;
  minute: number;
  penalty?: boolean;
}

export interface StandingRow {
  position: number;
  club: string; // club slug
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Standings extends Sourced {
  season: string;
  competition: Localized;
  /** ISO date the table was last checked against the source. */
  updatedAt: string;
  rows: StandingRow[];
}

export type Position = "GK" | "DF" | "MF" | "FW";

export interface Player extends Sourced {
  slug: string;
  name: Localized;
  number?: number;
  position: Position;
  nationality?: Localized;
  photo?: string;
}

export interface StaffMember extends Sourced {
  slug: string;
  name: Localized;
  role: Localized;
  photo?: string;
}

export interface NewsItem extends Sourced {
  id: string;
  date: string;
  category: Localized;
  title: Localized;
  excerpt?: Localized;
  image?: string;
  /** Link to the full article (official site). */
  url: string;
}

export interface GalleryImage extends Sourced {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  category: Localized;
}
