import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { club } from "@/data/club";
import { standings } from "@/data/standings";
import { sections } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/football";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const NAV = ["home", "club", "team", "matches", "news", "media", "partners"] as const;

export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const { contacts } = club;
  return (
    <footer id={sections.contact} aria-labelledby="contact-title" className="border-t border-steel bg-ink">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <h2 id="contact-title" className="section-title">{t.contact.title}</h2>
          <ul className="mt-8 space-y-4">
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>
                <span className="block text-sm text-mist">{t.contact.address}</span>
                {contacts.address[locale]}
              </span>
            </li>
            {contacts.phone && (
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
                <a href={`tel:${contacts.phone.replace(/\s/g, "")}`} className="hover:text-gold">{contacts.phone}</a>
              </li>
            )}
            {contacts.email && (
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
                <a href={`mailto:${contacts.email}`} className="hover:text-gold">{contacts.email}</a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gold">{t.contact.social}</h3>
          <ul className="mt-4 space-y-3">
            {club.social.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 font-semibold hover:text-gold">
                  <InstagramIcon className="size-6" />
                  {s.label}
                  <span className="font-normal text-mist">@fc.arys</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t.a11y.footerNav}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
            {NAV.map((key) => (
              <li key={key}>
                <a href={`#${sections[key]}`} className="inline-flex min-h-11 items-center text-chalk/80 hover:text-chalk">
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-steel">
        <div className="container-x flex flex-col gap-6 py-8 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image src={club.crest} alt="" width={30} height={40} className="h-10 w-auto" />
            <p>
              © {new Date(standings.updatedAt).getFullYear()} {club.name[locale]}. {t.footer.rights}
            </p>
          </div>
          <p className="max-w-md md:text-right">
            {t.footer.dataNote}{" "}
            <time dateTime={standings.updatedAt}>{formatDate(standings.updatedAt, locale)}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
