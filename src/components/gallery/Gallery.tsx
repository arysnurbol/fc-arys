"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import type { LightboxLabels } from "./Lightbox";
import type { GalleryImage, Locale } from "@/types/football";

const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

export function Gallery({ images, locale, labels }: {
  images: GalleryImage[];
  locale: Locale;
  labels: LightboxLabels & { open: string };
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const lastOpened = useRef(0);

  const open = (i: number) => {
    lastOpened.current = i;
    setOpenAt(i);
  };
  const onClose = useCallback(() => {
    setOpenAt(null);
    triggers.current[lastOpened.current]?.focus(); // return focus to the photo that opened it
  }, []);

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {images.map((img, i) => (
          <li key={img.src} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              ref={(el) => { triggers.current[i] = el; }}
              type="button"
              onClick={() => open(i)}
              aria-label={`${labels.open}: ${img.alt[locale]}`}
              className="group relative block w-full overflow-hidden rounded-lg bg-ink"
            >
              <Image
                src={img.src}
                alt={img.alt[locale]}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 30vw, 48vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-3 pt-10 text-left text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {img.category[locale]}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {openAt !== null && (
        <Lightbox images={images} start={openAt} locale={locale} labels={labels} onClose={onClose} />
      )}
    </>
  );
}
