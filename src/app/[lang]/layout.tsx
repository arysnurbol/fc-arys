import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Fira_Sans_Extra_Condensed, Golos_Text } from "next/font/google";
import "../globals.css";
import { htmlLang, isLocale, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { club } from "@/data/club";
import { siteUrl } from "@/lib/site";

// Both faces verified to render all Kazakh letters (Ә Ғ Қ Ң Ө Ұ Ү Һ І) with
// standard Russian letterforms. (Sofia Sans was dropped: Bulgarian forms by default.)
const golos = Golos_Text({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-body",
  preload: false, // body copy is not the LCP; let the headline font load first
  display: "swap",
});
const firaXc = Fira_Sans_Extra_Condensed({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: "900",
  variable: "--font-headline",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#06051c",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  const url = `${siteUrl}/${lang}`;
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: url,
      languages: { kk: `${siteUrl}/kz`, ru: `${siteUrl}/ru`, "x-default": `${siteUrl}/kz` },
    },
    openGraph: {
      type: "website",
      url,
      siteName: club.shortName[lang],
      title: t.meta.title,
      description: t.meta.description,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      images: [{ url: "/images/hero/hero.jpg", width: 2560, height: 1200, alt: club.name[lang] }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/images/hero/hero.jpg"],
    },
    icons: { icon: club.crest, apple: club.crest },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "@id": `${siteUrl}/#club`,
    name: club.name[lang],
    alternateName: ["FC Arys", "ФК Арыс"],
    sport: "Football",
    url: `${siteUrl}/${lang}`,
    logo: `${siteUrl}${club.crest}`,
    foundingDate: String(club.founded),
    location: {
      "@type": "Place",
      name: club.stadium.name[lang],
      address: { "@type": "PostalAddress", addressLocality: "Арыс", addressRegion: club.city[lang], addressCountry: "KZ" },
    },
    memberOf: { "@type": "SportsOrganization", name: club.league[lang] },
    sameAs: club.social.map((s) => s.url),
  };

  return (
    <html lang={htmlLang[lang]} data-scroll-behavior="smooth" className={`${golos.variable} ${firaXc.variable}`}>
      <body>
        <noscript>
          <style>{`.flip-in,.rise,.rise-soft,.grow-x{animation:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
