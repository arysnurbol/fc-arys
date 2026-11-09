import { cn } from "@/lib/utils";

/**
 * Score rendered as split-flap tiles, like a railway departure board —
 * a nod to the locomotive on the Arys crest.
 */
export function FlapScore({
  home,
  away,
  size = "lg",
  label,
}: {
  home: number;
  away: number;
  size?: "sm" | "lg";
  label: string;
}) {
  const tile = size === "lg" ? "h-[4.5rem] w-14 text-6xl md:h-24 md:w-[4.5rem] md:text-7xl" : "h-12 w-9 text-4xl";
  return (
    <div className="flex items-center gap-1.5 num" role="img" aria-label={label}>
      <span className={cn("flap flip-in", tile)} style={{ "--i": 0 } as React.CSSProperties} aria-hidden>
        {home}
      </span>
      <span aria-hidden className={cn("font-display font-black text-gold/70", size === "lg" ? "text-5xl" : "text-3xl")}>
        :
      </span>
      <span className={cn("flap flip-in", tile)} style={{ "--i": 1 } as React.CSSProperties} aria-hidden>
        {away}
      </span>
    </div>
  );
}
