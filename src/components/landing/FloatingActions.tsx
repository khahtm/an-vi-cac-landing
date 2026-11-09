"use client";

import { useEffect, useState } from "react";
import { ZALO_URL } from "@/lib/site";
import { ArrowUpIcon } from "./icons";

/** Zalo shortcut, plus a back-to-top button once the reader is 30% down the page. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShowTop((max > 0 ? window.scrollY / max : 0) >= 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-4 z-40 hidden flex-col items-center gap-3 lg:flex">
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Liên hệ qua Zalo"
        className="focus-gold flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-surface text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-on-gold"
      >
        Zalo
      </a>
      {showTop && (
        <button
          type="button"
          aria-label="Về đầu trang"
          title="Về đầu trang"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="focus-gold flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-parchment transition-colors hover:border-gold/60 hover:text-gold"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
