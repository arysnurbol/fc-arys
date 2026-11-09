"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { sections } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/football";

type NavKey = keyof Dictionary["nav"];
const NAV: NavKey[] = ["home", "club", "team", "matches", "news", "media", "contact"];

export function Header({
  locale,
  nav,
  a11y,
  crest,
  clubName,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
  crest: string;
  clubName: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,height] duration-300",
        scrolled || open
          ? "bg-night/92 shadow-[0_1px_0_var(--color-steel)] backdrop-blur-md"
          : "bg-gradient-to-b from-night/70 to-transparent",
      )}
    >
      <div className={cn("container-x flex items-center justify-between gap-6 transition-[height] duration-300", scrolled ? "h-16" : "h-20")}>
        <a href={`#${sections.home}`} className="flex shrink-0 items-center gap-3" title={clubName}>
          <Image src={crest} alt="" width={36} height={48} priority className="h-11 w-auto" />
          <span className="display text-2xl tracking-wide">
            ФК Арыс
          </span>
        </a>

        <nav aria-label={a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem] font-medium text-chalk/80">
            {NAV.map((key) => (
              <li key={key}>
                <a href={`#${sections[key]}`} className="relative py-2 transition-colors hover:text-chalk after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100">
                  {nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch locale={locale} label={a11y.language} />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md text-chalk lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? a11y.closeMenu : a11y.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100svh-5rem)] overflow-y-auto border-t border-steel bg-night lg:hidden"
      >
        <nav aria-label={a11y.mainNav} className="container-x py-6">
          <ul>
            {NAV.map((key) => (
              <li key={key} className="border-b border-steel/70">
                <a
                  href={`#${sections[key]}`}
                  onClick={() => setOpen(false)}
                  className="display block py-4 text-4xl text-chalk transition-colors hover:text-gold"
                >
                  {nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full border border-steel p-0.5 text-sm font-semibold">
      {(["kz", "ru"] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}`}
          hrefLang={l === "kz" ? "kk" : "ru"}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "grid h-9 min-w-11 place-items-center rounded-full px-2.5 transition-colors",
            l === locale ? "bg-gold text-night" : "text-chalk/75 hover:text-chalk",
          )}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
