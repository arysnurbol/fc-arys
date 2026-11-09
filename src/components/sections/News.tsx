import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { news } from "@/data/news";
import { club } from "@/data/club";
import { sections } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale, NewsItem } from "@/types/football";

export function News({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [featured, ...rest] = news;
  return (
    <section id={sections.news} aria-labelledby="news-title" className="bg-paper py-20 text-crest md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="news-title" className="section-title">{t.news.title}</h2>
          <a
            href={`${club.url}/${locale === "ru" ? "ru/" : ""}news/`}
            className="inline-flex items-center gap-1.5 font-semibold text-crest underline decoration-gold decoration-2 underline-offset-4 hover:decoration-crest"
          >
            {t.news.all}
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <FeaturedCard item={featured} t={t} locale={locale} />
          <ul className="flex flex-col divide-y divide-crest/15 border-y border-crest/15">
            {rest.map((item) => (
              <li key={item.id}>
                <CompactCard item={item} t={t} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Meta({ item, locale }: { item: NewsItem; locale: Locale }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 text-sm">
      <span className="font-semibold text-gold-deep">{item.category[locale]}</span>
      <time dateTime={item.date} className="text-crest/65">{formatDate(item.date, locale)}</time>
    </p>
  );
}

function FeaturedCard({ item, t, locale }: { item: NewsItem; t: Dictionary; locale: Locale }) {
  return (
    <article className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-crest/10">
        {item.image && (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-5">
        <Meta item={item} locale={locale} />
        <h3 className="display mt-2 text-4xl md:text-5xl">
          <a href={item.url} target="_blank" rel="noopener" className="after:absolute after:inset-0">
            {item.title[locale]}
          </a>
        </h3>
        <p className="mt-3 inline-flex items-center gap-1.5 font-semibold underline decoration-gold decoration-2 underline-offset-4">
          {t.news.readMore}
          <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
    </article>
  );
}

function CompactCard({ item, locale }: { item: NewsItem; t: Dictionary; locale: Locale }) {
  return (
    <article className="group relative grid grid-cols-[1fr_7rem] items-start gap-5 py-6 sm:grid-cols-[1fr_9rem]">
      <div>
        <Meta item={item} locale={locale} />
        <h3 className="mt-2 text-xl font-bold leading-snug text-crest group-hover:underline group-hover:decoration-gold group-hover:decoration-2 group-hover:underline-offset-4">
          <a href={item.url} target="_blank" rel="noopener" className="after:absolute after:inset-0">
            {item.title[locale]}
          </a>
        </h3>
      </div>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-crest/10">
        {item.image && <Image src={item.image} alt="" fill sizes="9rem" className="object-cover" />}
      </div>
    </article>
  );
}
