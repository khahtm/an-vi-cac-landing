"use client";

import { useEffect, useState } from "react";
import { FORM_ANCHOR, ZALO_URL } from "@/lib/site";
import { ZaloIcon } from "./icons";

/**
 * Phones only: a bottom bar with Zalo and "Lập lá số" once the reader has
 * scrolled past the form. It hides while the form or the closing call to action
 * is on screen, so it never sits on top of fields or repeats a visible button.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = [document.querySelector(FORM_ANCHOR), document.querySelector("[data-final-cta]")].filter(
      (el): el is Element => el !== null,
    );
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") return;
    const onScreen = new Set<Element>();
    let pastForm = false;
    const update = () => setVisible(pastForm && onScreen.size === 0);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
        if (entry.target === targets[0]) pastForm = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      }
      update();
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-16px_#3c2d0a40] backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Liên hệ qua Zalo"
          tabIndex={visible ? 0 : -1}
          className="focus-gold flex h-12 shrink-0 items-center gap-2 rounded-md border border-gold/50 px-3.5 text-sm font-semibold text-gold"
        >
          <ZaloIcon className="h-5 w-5" />
          Zalo
        </a>
        <a href={FORM_ANCHOR} tabIndex={visible ? 0 : -1} className="btn-gold focus-gold !min-h-12 flex-1 text-[15px]">
          Xem lá số miễn phí
        </a>
      </div>
    </div>
  );
}
