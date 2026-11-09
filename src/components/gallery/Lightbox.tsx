"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage, Locale } from "@/types/football";

export type LightboxLabels = { close: string; prev: string; next: string };

/** Loaded on first photo click (next/dynamic), so Framer Motion stays out of the initial bundle. */
export default function Lightbox({ images, start, locale, labels, onClose }: {
  images: GalleryImage[];
  start: number;
  locale: Locale;
  labels: LightboxLabels;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(start);
  const [dir, setDir] = useState(0);

  const step = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i + d + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step, onClose]);

  const close = () => dialogRef.current?.close();
  const closeOnBackdrop = (e: React.MouseEvent) => e.target === e.currentTarget && close();
  const current = images[index];

  return (
    <MotionConfig reducedMotion="user">
      <dialog
        ref={dialogRef}
        aria-label={current.alt[locale]}
        onClick={closeOnBackdrop}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-night/95 p-0 text-chalk backdrop:bg-night/80"
      >
        <div className="flex h-full flex-col" onClick={closeOnBackdrop}>
          <div className="flex items-center justify-between p-3 sm:p-5">
            <p className="text-sm text-mist num">{`${index + 1} / ${images.length}`}</p>
            <button type="button" onClick={close} aria-label={labels.close} className="grid size-11 place-items-center rounded-full border border-steel hover:border-gold hover:text-gold">
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden" onClick={closeOnBackdrop}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.figure
                key={current.src}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center px-3 pb-4 sm:px-20"
              >
                <div className="relative h-full w-full">
                  <Image src={current.src} alt={current.alt[locale]} fill sizes="100vw" quality={85} className="object-contain" />
                </div>
                <figcaption className="mt-3 max-w-2xl text-center text-sm text-chalk/80">{current.alt[locale]}</figcaption>
              </motion.figure>
            </AnimatePresence>
            <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-night/70 hover:text-gold sm:left-5">
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label={labels.next} className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-night/70 hover:text-gold sm:right-5">
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>
      </dialog>
    </MotionConfig>
  );
}
