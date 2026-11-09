import { Counter } from "@/components/statistics/Counter";
import { InView } from "@/components/ui/InView";
import { Crest } from "@/components/ui/Crest";
import { standings } from "@/data/standings";
import { scorers, scorersSource } from "@/data/scorers";
import { getClub } from "@/data/clubs";
import { cn, formatDate, goalDifference } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/football";

/** Season statistics + league table. All numbers derive from src/data/standings.ts. */
export function Season({ t, locale }: { t: Dictionary; locale: Locale }) {
  const row = standings.rows.find((r) => r.club === "arys")!;
  const total = standings.rows.length;
  const pct = (n: number) => `${((n / row.played) * 100).toFixed(1)}%`;
  const avg = (n: number) => (n / row.played).toFixed(2).replace(".", locale === "ru" ? "," : ".");

  return (
    <section id="season" aria-labelledby="season-title" className="bg-paper py-20 text-crest md:py-28">
      <div className="container-x">
        <div>
          <h2 id="season-title" className="section-title">
            {t.stats.title} {standings.season}
          </h2>
          <p className="mt-3 text-crest/70">{standings.competition[locale]}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <InView className="min-w-0">
            {/* Position + points: the two numbers fans look for first */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-crest/15">
              <div className="bg-crest p-5 text-chalk sm:p-6">
                <dt className="text-sm text-chalk/70">{t.stats.position}</dt>
                <dd className="display mt-2 text-[4.5rem] leading-none sm:text-[5.5rem] text-gold num">
                  <Counter value={row.position} />
                  <span className="text-4xl text-chalk/50">/{total}</span>
                </dd>
              </div>
              <div className="bg-crest p-5 text-chalk sm:p-6">
                <dt className="text-sm text-chalk/70">{t.stats.points}</dt>
                <dd className="display mt-2 text-[4.5rem] leading-none sm:text-[5.5rem] num">
                  <Counter value={row.points} />
                </dd>
              </div>
            </dl>

            {/* W / D / L split */}
            <div className="mt-8">
              <dl className="grid grid-cols-2 gap-4 min-[420px]:grid-cols-4">
                {[
                  { label: t.stats.played, value: row.played },
                  { label: t.stats.won, value: row.won },
                  { label: t.stats.drawn, value: row.drawn },
                  { label: t.stats.lost, value: row.lost },
                ].map((s) => (
                  <div key={s.label}>
                    <dt className="text-sm text-crest/70">{s.label}</dt>
                    <dd className="display mt-1 text-5xl num"><Counter value={s.value} /></dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-crest/10" aria-hidden>
                <span className="grow-x bg-win" style={{ width: pct(row.won), "--i": 0 } as React.CSSProperties} />
                <span className="grow-x bg-crest/35" style={{ width: pct(row.drawn), "--i": 1 } as React.CSSProperties} />
                <span className="grow-x bg-signal" style={{ width: pct(row.lost), "--i": 2 } as React.CSSProperties} />
              </div>
              <p className="mt-2 text-sm text-crest/70">
                {t.stats.winRate}: <span className="font-semibold text-crest num">{Math.round((row.won / row.played) * 100)}%</span>
              </p>
            </div>

            {/* Goals */}
            <div className="mt-10 space-y-5">
              {[
                { label: t.stats.goalsFor, value: row.goalsFor, color: "bg-crest" },
                { label: t.stats.goalsAgainst, value: row.goalsAgainst, color: "bg-crest/35" },
              ].map((g, i) => {
                const max = Math.max(row.goalsFor, row.goalsAgainst);
                return (
                  <div key={g.label}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-semibold">{g.label}</span>
                      <span className="text-sm text-crest/70">
                        <span className="display mr-2 text-3xl text-crest num"><Counter value={g.value} /></span>
                        {avg(g.value)} {t.stats.perGame}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-crest/10" aria-hidden>
                      <div className={cn("grow-x h-full rounded-full", g.color)} style={{ width: `${(g.value / max) * 100}%`, "--i": i + 3 } as React.CSSProperties} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Top scorers */}
            <div className="mt-10">
              <h3 className="font-semibold">{t.stats.scorers}</h3>
              <ol className="mt-3 divide-y divide-crest/10 border-y border-crest/10">
                {scorers.map((s) => (
                  <li key={s.name.ru} className="flex items-center justify-between gap-4 py-2.5">
                    <span>
                      {s.name[locale]}
                      {s.leftClub && <span className="ml-2 text-sm text-crest/60">({t.stats.leftClub})</span>}
                    </span>
                    <span className="display text-2xl num">{s.goals}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-2 text-xs text-crest/60">
                {t.match.source}: <a href={scorersSource} className="underline underline-offset-2" target="_blank" rel="noopener">kffleague.kz</a>
              </p>
            </div>
          </InView>

          <LeagueTable t={t} locale={locale} />
        </div>
      </div>
    </section>
  );
}

function LeagueTable({ t, locale }: { t: Dictionary; locale: Locale }) {
  const c = t.table.cols;
  const head = (col: string[], cls?: string) => (
    <th scope="col" className={cn("px-2 py-3 font-semibold", cls)}>
      <abbr title={col[1]} className="no-underline">{col[0]}</abbr>
    </th>
  );
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="display text-4xl">{t.table.title}</h3>
        <p className="text-sm text-crest/70">
          {t.table.updated}: <time dateTime={standings.updatedAt}>{formatDate(standings.updatedAt, locale)}</time>
        </p>
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-crest/15 bg-chalk">
        <table className="w-full min-w-[22rem] text-sm num">
          <caption className="sr-only">
            {t.table.title}, {standings.competition[locale]} {standings.season}
          </caption>
          <thead className="border-b border-crest/15 text-crest/70">
            <tr>
              {head(c.pos, "w-8 pl-3 text-left sm:pl-4")}
              {head(c.club, "text-left")}
              {head(c.played, "text-center")}
              {head(c.won, "hidden text-center sm:table-cell")}
              {head(c.drawn, "hidden text-center sm:table-cell")}
              {head(c.lost, "hidden text-center sm:table-cell")}
              {head(c.gd, "text-center")}
              {head(c.points, "pr-3 text-right sm:pr-4")}
            </tr>
          </thead>
          <tbody>
            {standings.rows.map((r) => {
              const club = getClub(r.club);
              const ours = r.club === "arys";
              return (
                <tr
                  key={r.club}
                  aria-current={ours ? "true" : undefined}
                  className={cn("border-b border-crest/8 last:border-0", ours && "bg-crest font-semibold text-chalk")}
                >
                  <td className={cn("py-2.5 pl-3 sm:pl-4", ours ? "text-gold" : "text-crest/60")}>{r.position}</td>
                  <th scope="row" className="px-2 py-2.5 text-left font-medium">
                    <span className="flex items-center gap-2.5">
                      <Crest club={club} locale={locale} size={22} />
                      <span className={cn(ours && "font-bold")}>{club.name[locale]}</span>
                    </span>
                  </th>
                  <td className="px-2 text-center">{r.played}</td>
                  <td className="hidden px-2 text-center sm:table-cell">{r.won}</td>
                  <td className="hidden px-2 text-center sm:table-cell">{r.drawn}</td>
                  <td className="hidden px-2 text-center sm:table-cell">{r.lost}</td>
                  <td className="px-2 text-center">{goalDifference(r.goalsFor, r.goalsAgainst)}</td>
                  <td className={cn("pr-3 text-right font-bold sm:pr-4", ours && "text-gold")}>{r.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-crest/60">
        {t.match.source}:{" "}
        <a href={standings.source} className="underline underline-offset-2" target="_blank" rel="noopener">kffleague.kz</a>
        {", "}
        <a href="https://kazfootball.kz/leagues/first-league" className="underline underline-offset-2" target="_blank" rel="noopener">kazfootball.kz</a>
      </p>
    </div>
  );
}
