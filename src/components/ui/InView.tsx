"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Marks its subtree with data-inview once it enters the viewport.
 * CSS animations inside wait for it (see globals.css), so below-the-fold
 * motion plays when seen, without shipping an animation library for it.
 */
export function InView({ children, className, as: Tag = "div" }: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-inview={seen} className={className}>
      {children}
    </Tag>
  );
}
