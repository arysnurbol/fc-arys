import { clsx, type ClassValue } from "clsx";
import { htmlLang } from "@/i18n/config";
import type { Locale } from "@/types/football";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const KZ_MONTHS = [
  "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым",
  "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан",
];

/**
 * Kazakh month names are spelled out by hand: ICU data for "kk" differs
 * between Node and browsers, which would cause hydration mismatches.
 */
export function formatDate(iso: string, locale: Locale, withYear = true) {
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  if (locale === "kz") {
    const base = `${d.getDate()} ${KZ_MONTHS[d.getMonth()]}`;
    return withYear ? `${base} ${d.getFullYear()} ж.` : base;
  }
  return new Intl.DateTimeFormat(htmlLang[locale], {
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" } : {}),
  }).format(d);
}

export function goalDifference(gf: number, ga: number) {
  const gd = gf - ga;
  return gd > 0 ? `+${gd}` : String(gd);
}
