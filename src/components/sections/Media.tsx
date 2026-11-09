import { Gallery } from "@/components/gallery/Gallery";
import { gallery } from "@/data/gallery";
import { club } from "@/data/club";
import { sections } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/football";

export function Media({ t, locale }: { t: Dictionary; locale: Locale }) {
  const instagram = club.social.find((s) => s.id === "instagram");
  return (
    <section id={sections.media} aria-labelledby="media-title" className="bg-night py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="media-title" className="section-title">{t.gallery.title}</h2>
            <p className="mt-3 max-w-xl text-mist">{t.gallery.lead}</p>
          </div>
          {instagram && (
            <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-gold decoration-2 underline-offset-4 hover:text-gold">
              @fc.arys
            </a>
          )}
        </div>
        <div className="mt-10">
          <Gallery
            images={gallery}
            locale={locale}
            labels={{ close: t.a11y.close, prev: t.a11y.prev, next: t.a11y.next, open: t.gallery.open }}
          />
        </div>
      </div>
    </section>
  );
}
