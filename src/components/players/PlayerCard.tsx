import Image from "next/image";
import type { Locale, Player, StaffMember } from "@/types/football";

function splitName(full: string) {
  const [first, ...rest] = full.split(" ");
  return { first, last: rest.join(" ") || first };
}

/**
 * Number-led card: the shirt number is the hero when no verified photo exists,
 * echoing kit typography. With a photo, the number sits behind the player.
 */
export function PlayerCard({ player, locale, positionLabel }: { player: Player; locale: Locale; positionLabel: string }) {
  const { first, last } = splitName(player.name[locale]);
  return (
    <article className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-steel bg-[linear-gradient(160deg,var(--color-ink),var(--color-night))] transition-colors hover:border-gold/60">
      <span
        aria-hidden
        className="display absolute -right-2 -top-3 text-[9.5rem] leading-none text-transparent num transition-colors duration-500 [-webkit-text-stroke:1.5px_var(--color-gold)] group-hover:text-gold/15 sm:text-[11rem]"
      >
        {player.number}
      </span>
      {player.photo && (
        <Image src={player.photo} alt="" fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover object-top" />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/80 to-transparent p-4 pt-16 sm:p-5">
        <p className="text-sm text-mist">
          <span className="sr-only">№ </span>
          <span className="font-semibold text-gold num">{player.number}</span>
          <span className="mx-2 text-steel" aria-hidden>|</span>
          {positionLabel}
        </p>
        <h4 className="mt-1.5 leading-none">
          <span className="block text-base font-medium text-chalk/85">{first}</span>
          <span className="display block text-3xl sm:text-4xl">{last}</span>
        </h4>
        {player.nationality && <p className="mt-2 text-xs text-mist">{player.nationality[locale]}</p>}
      </div>
    </article>
  );
}

export function StaffCard({ member, locale }: { member: StaffMember; locale: Locale }) {
  const { first, last } = splitName(member.name[locale]);
  return (
    <article className="relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-xl border border-steel bg-[linear-gradient(160deg,var(--color-ink),var(--color-night))] p-5">
      <p className="text-sm font-semibold text-gold">{member.role[locale]}</p>
      <h4 className="mt-1.5 leading-none">
        <span className="block text-base font-medium text-chalk/85">{first}</span>
        <span className="display block text-4xl">{last}</span>
      </h4>
    </article>
  );
}
