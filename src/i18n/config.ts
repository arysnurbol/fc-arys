import type { Locale } from "@/types/football";

export const locales: Locale[] = ["kz", "ru"];
export const defaultLocale: Locale = "kz";

/** BCP-47 tags for <html lang> and Intl formatting. */
export const htmlLang: Record<Locale, string> = { kz: "kk", ru: "ru" };
export const ogLocale: Record<Locale, string> = { kz: "kk_KZ", ru: "ru_RU" };

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}
