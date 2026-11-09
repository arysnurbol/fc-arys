import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MatchCenter } from "@/components/sections/MatchCenter";
import { News } from "@/components/sections/News";
import { Team } from "@/components/sections/Team";
import { Season } from "@/components/sections/Season";
import { ClubIdentity } from "@/components/sections/ClubIdentity";
import { Media } from "@/components/sections/Media";
import { Partners } from "@/components/sections/Partners";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { club } from "@/data/club";
import { getFeaturedMatch } from "@/data/matches";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const { match, upcoming } = getFeaturedMatch();

  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded-md bg-gold px-4 py-2 font-semibold text-night focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {t.a11y.skip}
      </a>
      <Header locale={lang} nav={t.nav} a11y={t.a11y} crest={club.crest} clubName={club.name[lang]} />
      <main id="main">
        <Hero t={t} locale={lang} match={match} />
        <MatchCenter t={t} locale={lang} featured={match} upcoming={upcoming} />
        <News t={t} locale={lang} />
        <Team t={t} locale={lang} />
        <Season t={t} locale={lang} />
        <ClubIdentity t={t} locale={lang} />
        <Media t={t} locale={lang} />
        <Partners t={t} />
      </main>
      <Footer t={t} locale={lang} />
    </>
  );
}
