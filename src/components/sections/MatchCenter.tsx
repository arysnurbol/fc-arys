import { ExternalLink } from "lucide-react";
import { Crest } from "@/components/ui/Crest";
import { InView } from "@/components/ui/InView";
import { FlapScore } from "@/components/match/FlapScore";
import { allMatches, outcomeFor, type Outcome } from "@/data/matches";
import { getClub } from "@/data/clubs";
import { sections } from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale, Match } from "@/types/football";

const RECENT = 7;

export function MatchCenter({ t, locale, featured, upcoming }: {
  t: Dictionary;
  locale: Locale;
  featured: Match;
  upcoming: boolean;
}) {
  const home = getClub(featured.home);
  const away = getClub(featured.away);
  const finished = allMatches.filter((m) => m.status === "finished");
  const recent = finished.slice(-RECENT).reverse();
  const wins = recent.filter((m) => outcomeFor(m) === "W").length;
  const time = featured.date.slice(11, 16);

  return (
    <section id={sections.matches} aria-labelledby="matches-title" className="bg-night py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="matches-title" className="section-title">{t.match.title}</h2>
          {!upcoming && (
            <p className="rounded-full border border-gold/40 px-4 py-1.5 text-sm font-semibold text-gold">
              {t.match.seasonOver}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Featured match */}
          <InView as="div" className="rounded-xl border border-steel bg-ink p-5 md:p-8">
            <header className="flex flex-wrap justify-between gap-2 text-sm text-mist">
              <p>
                <span className="font-semibold text-chalk">{upcoming ? t.match.upcoming : t.match.latest}</span>
                {" — "}
                {featured.competition[locale]}
                {featured.round ? `, ${featured.round}-${t.match.round}` : ""}
              </p>
              <p className="num">
                <time dateTime={featured.date}>{formatDate(featured.date, locale)}{time && `, ${time}`}</time>
              </p>
            </header>

            <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
              <TeamSide club={home} locale={locale} highlight={home.slug === "arys"} />
              {featured.status === "finished" ? (
                <FlapScore
                  home={featured.homeScore!}
                  away={featured.awayScore!}
                  label={`${home.name[locale]} ${featured.homeScore}:${featured.awayScore} ${away.name[locale]}`}
                />
              ) : (
                <span className="display text-5xl text-mist">VS</span>
              )}
              <TeamSide club={away} locale={locale} highlight={away.slug === "arys"} />
            </div>

            {featured.goals && featured.goals.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
                <h3 className="sr-only">{t.match.goals}</h3>
                {(["home", "away"] as const).map((side) => (
                  <ul key={side} className={cn("space-y-1 text-chalk/80", side === "home" ? "text-right" : "text-left")}>
                    {featured.goals!.filter((g) => g.side === side).map((g) => (
                      <li key={`${g.minute}-${g.name.ru}`}>
                        <span className="num font-semibold text-gold">{g.minute}′</span> {g.name[locale]}
                        {g.penalty && <span className="text-mist"> ({t.match.penalty})</span>}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            )}

            <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-steel pt-5 text-sm">
              <dl className="flex flex-wrap gap-x-8 gap-y-2">
                {featured.venue && (
                  <div>
                    <dt className="text-mist">{t.match.venue}</dt>
                    <dd>{featured.venue[locale]}</dd>
                  </div>
                )}
                {featured.attendance && (
                  <div>
                    <dt className="text-mist">{t.match.attendance}</dt>
                    <dd className="num">{featured.attendance}</dd>
                  </div>
                )}
              </dl>
              {featured.links && (
                <ul className="flex flex-wrap gap-2">
                  {featured.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-md border border-steel px-3.5 font-medium transition-colors hover:border-gold hover:text-gold">
                        {l.label[locale]}
                        <ExternalLink aria-hidden className="size-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </footer>
          </InView>

          {/* Departure board: recent results */}
          <div className="rounded-xl border border-steel bg-ink">
            <div className="flex items-center justify-between gap-4 border-b border-steel px-5 py-4">
              <h3 className="font-semibold">{t.match.recent}</h3>
              <FormGuide recent={recent} t={t} />
            </div>
            <ol className="divide-y divide-steel/70">
              {recent.map((m) => (
                <ResultRow key={m.id} m={m} t={t} locale={locale} />
              ))}
            </ol>
            <p className="border-t border-steel px-5 py-3 text-sm text-mist">{t.match.winsInLast(wins, RECENT)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSide({ club, locale, highlight }: { club: ReturnType<typeof getClub>; locale: Locale; highlight: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Crest club={club} locale={locale} size={72} className="md:size-24!" />
      <p className={cn("display text-2xl md:text-3xl", highlight ? "text-gold" : "text-chalk")}>{club.name[locale]}</p>
    </div>
  );
}

const outcomeStyle: Record<Outcome, string> = {
  W: "bg-win text-night",
  D: "bg-mist/80 text-night",
  L: "bg-signal text-chalk",
};

function outcomeLabel(o: Outcome, t: Dictionary) {
  return o === "W" ? t.match.win : o === "D" ? t.match.draw : t.match.loss;
}

function FormGuide({ recent, t }: { recent: Match[]; t: Dictionary }) {
  const chronological = [...recent].reverse();
  return (
    <ol className="flex gap-1" aria-label={t.match.form}>
      {chronological.map((m) => {
        const o = outcomeFor(m)!;
        return (
          <li key={m.id} className={cn("grid size-6 place-items-center rounded-sm text-xs font-bold", outcomeStyle[o])}>
            {outcomeLabel(o, t)}
          </li>
        );
      })}
    </ol>
  );
}

function ResultRow({ m, t, locale }: { m: Match; t: Dictionary; locale: Locale }) {
  const atHome = m.home === "arys";
  const opponent = getClub(atHome ? m.away : m.home);
  const o = outcomeFor(m)!;
  return (
    <li className="grid grid-cols-[2.75rem_1fr_auto_auto] items-center gap-3 px-5 py-3">
      <time dateTime={m.date} className="text-sm text-mist num">
        {m.date.slice(8, 10)}.{m.date.slice(5, 7)}
      </time>
      <span className="flex min-w-0 items-center gap-2.5">
        <Crest club={opponent} locale={locale} size={24} />
        <span className="min-w-0">
          <span className="block truncate font-medium">{opponent.name[locale]}</span>
          <span className="block truncate text-xs text-mist">
            {atHome ? t.match.home : t.match.away}, {m.round ? `${m.round}-${t.match.round}` : m.competition[locale]}
          </span>
        </span>
      </span>
      <span className="display text-2xl text-gold num">
        {m.homeScore}:{m.awayScore}
      </span>
      <span className={cn("grid size-6 place-items-center rounded-sm text-xs font-bold", outcomeStyle[o])} title={outcomeLabel(o, t)}>
        {outcomeLabel(o, t)}
      </span>
    </li>
  );
}
