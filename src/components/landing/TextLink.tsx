import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

/** Inline gold link with an arrow icon (replaces the "→" text symbol). */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`focus-gold group inline-flex w-fit items-center gap-2 rounded text-[15px] font-medium text-gold underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}
