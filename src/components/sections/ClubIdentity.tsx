import Image from "next/image";
import { club, history, identity } from "@/data/club";
import { standings } from "@/data/standings";
import { sections } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/football";

export function ClubIdentity({ t, locale }: { t: Dictionary; locale: Locale }) {
  const current = standings.rows.find((r) => r.club === "arys")!;
  const seasons = [
    ...history,
    { season: Number(standings.season), league: standings.competition, position: current.position },
  ];

  return (
    <section id={sections.club} aria-labelledby="club-title" className="relative overflow-hidden bg-ink py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="relative">
          <h2 id="club-title" className="section-title">{t.club.title}</h2>
          <div className="relative mx-auto mt-10 w-48 sm:w-60 lg:mx-0 lg:w-72">
            <Image src={club.crest} alt={locale === "kz" ? "«Арыс» ФК елтаңбасы" : "Герб ФК «Арыс»"} width={385} height={512} sizes="18rem" className="h-auto w-full drop-shadow-[0_20px_50px_rgba(214,178,83,0.18)]" />
          </div>
          <p className="mt-8 max-w-md text-chalk/80">{identity.crest[locale]}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gold">{t.club.story}</h3>
          <p className="mt-3 text-2xl font-medium leading-snug md:text-3xl">{identity.story[locale]}</p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-steel py-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-mist">{t.club.founded}</dt>
              <dd className="display mt-1 text-4xl text-gold num">{club.founded}</dd>
            </div>
            <div>
              <dt className="text-sm text-mist">{t.club.city}</dt>
              <dd className="mt-2 font-semibold">{club.city[locale]}</dd>
            </div>
            <div>
              <dt className="text-sm text-mist">{t.club.stadium}</dt>
              <dd className="mt-2 font-semibold">{club.stadium.name[locale]}</dd>
            </div>
          </dl>

          {/* Season record: a real sequence, so it reads as a timeline. */}
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl bg-steel sm:grid-cols-3">
            {seasons.map((s) => (
              <li key={s.season} className="bg-ink p-5">
                <p className="display text-3xl num">{s.season}</p>
                <p className="mt-1 text-sm text-mist">{s.league[locale]}</p>
                <p className="mt-3 font-semibold">
                  <span className="display text-4xl text-gold num">{s.position}</span>
                  <span className="ml-1.5">{t.club.place}</span>
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-gold">{t.club.mission}</h3>
              <p className="mt-3 leading-relaxed text-chalk/85">{identity.mission[locale]}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gold">{t.club.values}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {identity.values.map((v) => (
                  <li key={v.ru} className="rounded-full border border-steel px-4 py-1.5 text-sm">{v[locale]}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
