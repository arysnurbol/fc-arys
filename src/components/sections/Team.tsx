import { SquadTabs } from "@/components/players/SquadTabs";
import { players, staff } from "@/data/players";
import { sections } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/football";

export function Team({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id={sections.team} aria-labelledby="team-title" className="bg-night py-20 md:py-28">
      <div className="container-x">
        <h2 id="team-title" className="section-title">{t.team.title}</h2>
        <p className="mt-3 max-w-xl text-mist">{t.team.lead}</p>
        <div className="mt-10">
          <SquadTabs players={players} staff={staff} labels={t.team.groups} listLabel={t.team.title} locale={locale} />
        </div>
      </div>
    </section>
  );
}
