import Image from "next/image";
import { Crest } from "@/components/ui/Crest";
import { FlapScore } from "@/components/match/FlapScore";
import { getClub } from "@/data/clubs";
import { standings } from "@/data/standings";
import { sections } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale, Match } from "@/types/football";

export function Hero({ t, locale, match }: { t: Dictionary; locale: Locale; match: Match }) {
  const home = getClub(match.home);
  const away = getClub(match.away);
  const arysRow = standings.rows.find((r) => r.club === "arys")!;
  const scoreLabel = `${home.name[locale]} ${match.homeScore}:${match.awayScore} ${away.name[locale]}`;

  return (
    <section id={sections.home} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div className="parallax absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero.jpg"
          alt={locale === "kz" ? "«Арыс» құрамы жаттығу алаңында" : "Состав «Арыса» на тренировочном поле"}
          fill
          loading="eager"
          sizes="100vw"
          quality={75}
          className="object-cover object-[50%_35%]"
        />
      </div>
      {/* Legibility: navy wash heavier at the bottom-left where the type sits. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-night)_8%,rgb(6_5_28/0.75)_45%,rgb(6_5_28/0.35)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(6_5_28/0.85),transparent_70%)]" />

      <div className="container-x flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-14">
        <h1 id="hero-title" className="display text-[clamp(3.4rem,13vw,10rem)] text-chalk">
          {t.hero.headline.map((line, i) => (
            <span key={line} className="rise-soft block" style={{ "--i": i } as React.CSSProperties}>
              {i === 2 ? <span className="text-gold">{line}</span> : line}
            </span>
          ))}
        </h1>
        <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-chalk/85 md:text-xl" style={{ "--i": 3 } as React.CSSProperties}>
          {t.hero.lead}
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
          <a href={`#${sections.matches}`} className="inline-flex h-12 items-center rounded-md bg-gold px-6 font-semibold text-night transition-colors hover:bg-chalk">
            {t.hero.ctaPrimary}
          </a>
          <a href={`#${sections.team}`} className="inline-flex h-12 items-center rounded-md border border-chalk/40 px-6 font-semibold text-chalk transition-colors hover:border-chalk hover:bg-chalk/10">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Departure-board strip: latest result + season position. */}
      <div className="border-t border-steel bg-night/85 backdrop-blur-sm">
        <div className="container-x grid gap-x-8 gap-y-4 py-5 md:grid-cols-[1fr_auto] md:items-center">
          <a href={`#${sections.matches}`} className="group flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="w-full text-sm text-mist md:w-auto">
              {t.hero.lastResult}
              <span className="block text-chalk/90">
                {formatDate(match.date, locale)}, {match.round}-{t.match.round}
              </span>
            </span>
            <span className="flex items-center gap-2 sm:gap-3">
              <span className="text-right font-semibold">{home.name[locale]}</span>
              <Crest club={home} locale={locale} size={32} />
              <FlapScore home={match.homeScore!} away={match.awayScore!} size="sm" label={scoreLabel} />
              <Crest club={away} locale={locale} size={32} />
              <span className="font-semibold">{away.name[locale]}</span>
            </span>
          </a>
          <dl className="flex gap-8 text-sm">
            <div>
              <dt className="text-mist">{t.stats.position}</dt>
              <dd className="display mt-1 text-3xl text-gold num">{arysRow.position}</dd>
            </div>
            <div>
              <dt className="text-mist">{t.stats.points}</dt>
              <dd className="display mt-1 text-3xl num">{arysRow.points}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
