import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Club, Locale } from "@/types/football";

/** Club crest, or an initials badge when no verified crest file exists. */
export function Crest({
  club,
  locale,
  size = 40,
  className,
  priority,
}: {
  club: Club;
  locale: Locale;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  if (!club.crest) {
    const initials = club.name[locale].replace(/[«»"-]/g, " ").trim().slice(0, 2).toUpperCase();
    return (
      <span
        aria-hidden
        className={cn("inline-grid place-items-center rounded-full border border-current/30 font-display font-black", className)}
        style={{ width: size, height: size, fontSize: size * 0.38 }}
      >
        {initials}
      </span>
    );
  }
  return (
    <Image
      src={club.crest}
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}
