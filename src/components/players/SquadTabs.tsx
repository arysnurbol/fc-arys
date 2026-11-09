"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PlayerCard, StaffCard } from "./PlayerCard";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale, Player, Position, StaffMember } from "@/types/football";

type Group = Position | "staff";
const GROUPS: Group[] = ["GK", "DF", "MF", "FW", "staff"];

const singular: Record<Locale, Record<Position, string>> = {
  kz: { GK: "Қақпашы", DF: "Қорғаушы", MF: "Жартылай қорғаушы", FW: "Шабуылшы" },
  ru: { GK: "Вратарь", DF: "Защитник", MF: "Полузащитник", FW: "Нападающий" },
};

export function SquadTabs({ players, staff, labels, listLabel, locale }: {
  players: Player[];
  staff: StaffMember[];
  labels: Dictionary["team"]["groups"];
  listLabel: string;
  locale: Locale;
}) {
  const [active, setActive] = useState<Group>("GK");
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = (g: Group) => (g === "staff" ? staff.length : players.filter((p) => p.position === g).length);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const next = e.key === "Home" ? 0 : e.key === "End" ? GROUPS.length - 1 : (i + delta + GROUPS.length) % GROUPS.length;
    setActive(GROUPS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div role="tablist" aria-label={listLabel}className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:px-0">
        {GROUPS.map((g, i) => {
          const selected = g === active;
          return (
            <button
              key={g}
              ref={(el) => { tabRefs.current[i] = el; }}
              role="tab"
              id={`${id}-tab-${g}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${g}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(g)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative shrink-0 whitespace-nowrap px-4 py-3 font-semibold transition-colors",
                selected ? "text-chalk" : "text-mist hover:text-chalk",
              )}
            >
              {labels[g]}
              <span className="ml-2 text-sm text-mist num">{count(g)}</span>
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-2 -bottom-px h-0.5 origin-center bg-gold transition-transform duration-300",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>
      <div className="h-px bg-steel" />

      {/* All panels are server-rendered (whole squad in the HTML for SEO); inactive ones are hidden. */}
      {GROUPS.map((g) => {
        const selected = g === active;
        return (
          <div
            key={g}
            role="tabpanel"
            id={`${id}-panel-${g}`}
            aria-labelledby={`${id}-tab-${g}`}
            hidden={!selected}
            tabIndex={0}
            className="mt-8 focus-visible:outline-offset-8"
          >
            <h3 className="sr-only">{labels[g]}</h3>
            <ul className="panel-in grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {g === "staff"
                ? staff.map((m) => (
                    <li key={m.slug}><StaffCard member={m} locale={locale} /></li>
                  ))
                : players
                    .filter((p) => p.position === g)
                    .map((p) => (
                      <li key={p.slug}>
                        <PlayerCard player={p} locale={locale} positionLabel={singular[locale][p.position]} />
                      </li>
                    ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
