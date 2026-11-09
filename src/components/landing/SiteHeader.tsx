"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FORM_ANCHOR, NAV_LINKS } from "@/lib/site";
import { MenuIcon, XIcon } from "./icons";

const PANEL_ID = "site-header-mobile-panel";

/** `linkBase` is "" on the home page and "/" elsewhere, so section anchors resolve to the home page. */
export function SiteHeader({ linkBase = "" }: { linkBase?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className="shell flex h-[52px] items-center justify-between gap-6 md:h-20">
          <a href={linkBase || "#"} aria-label="Ẩn Vi Các — về đầu trang" className="focus-gold group flex items-center gap-3 rounded">
            <Image
              src="/images/logo-seal.svg"
              alt=""
              width={36}
              height={36}
              priority
              unoptimized
              className="h-[34px] w-[34px] transition-transform group-hover:-rotate-3"
            />
            <span className="text-base font-semibold tracking-[0.06em] text-parchment transition-colors group-hover:text-gold">
              Ẩn Vi Các
            </span>
          </a>
          <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.slice(1).map(({ href, label }) => (
              <a
                key={href}
                href={`${linkBase}${href}`}
                className="focus-gold rounded text-[15px] text-muted transition-colors hover:text-parchment"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={`${linkBase}${FORM_ANCHOR}`} className="btn-gold focus-gold !min-h-10 !px-5 text-sm max-sm:hidden">
              Lập lá số
            </a>
            <button
              type="button"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              aria-controls={PANEL_ID}
              onClick={() => setOpen((v) => !v)}
              className="focus-gold flex h-10 w-10 items-center justify-center rounded-md text-parchment lg:hidden"
            >
              {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div
          id={PANEL_ID}
          className="fixed inset-x-0 top-[52px] z-40 border-b border-line bg-canvas px-5 py-3 shadow-card md:top-20 lg:hidden"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={`${linkBase}${href}`}
              onClick={() => setOpen(false)}
              className="focus-gold block rounded-md py-3 text-[15px] font-medium text-parchment hover:text-gold"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
