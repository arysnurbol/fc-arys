import Image from "next/image";
import { partners, type Partner } from "@/data/partners";
import { cn } from "@/lib/utils";
import { sections } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/football";

/** Logos when a file exists; otherwise a neutral name plate (we don't redraw anyone's brand). */
export function Partners({ t, locale }: { t: Dictionary; locale: Locale }) {
  if (partners.length === 0) return null;
  const groups = [
    { key: "kit" as const, label: t.partners.kit },
    { key: "club" as const, label: t.partners.club },
  ].filter((g) => partners.some((p) => p.tier === g.key));

  return (
    <section id={sections.partners}aria-labelledby="partners-title" className="bg-paper py-16 text-crest md:py-20">
      <div className="container-x">
        <h2 id="partners-title" className="section-title">{t.partners.title}</h2>
        <div className="mt-10 space-y-10">
          {groups.map((g) => (
            <div key={g.key}>
              <h3 className="text-sm font-semibold text-gold-deep">{g.label}</h3>
              {/* flex-wrap + grow: an incomplete last row stretches instead of leaving empty cells */}
              <ul className="mt-4 flex flex-wrap gap-px overflow-hidden rounded-xl border border-crest/15 bg-crest/15">
                {partners.filter((p) => p.tier === g.key).map((p) => {
                  const name = typeof p.name === "string" ? p.name : p.name[locale];
                  return (
                  <li key={name} className="grow basis-[calc(50%-1px)] bg-chalk md:basis-[calc(25%-1px)]">
                    <Plate partner={p} name={name} large={g.key === "kit"} />
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Plate({ partner, name, large }: { partner: Partner; name: string; large: boolean }) {
  const content = partner.logo ? (
    <Image src={partner.logo} alt={name} width={160} height={64} className="h-10 w-auto object-contain md:h-12" />
  ) : (
    <span className={cn("text-center font-semibold text-crest/80", large ? "text-xl md:text-2xl" : "text-lg")}>{name}</span>
  );
  const cls = cn("grid place-items-center px-4 transition-colors", large ? "h-28 md:h-32" : "h-20 md:h-24");
  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noopener noreferrer" className={cn(cls, "hover:bg-paper")}>{content}</a>
  ) : (
    <div className={cls}>{content}</div>
  );
}
