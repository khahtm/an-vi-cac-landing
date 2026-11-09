import type { CSSProperties } from "react";
import { STARS } from "./stars";

/** Twinkling star layer behind the night-sky sections (positions from the original). */
export function StarField({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* 40 of the 80 stars: same look on the light theme, far fewer animated elements. */}
      {STARS.slice(0, 40).map((s, i) => (
        <span
          key={i}
          className="star"
          style={
            {
              "--x": s.x,
              "--y": s.y,
              "--s": s.s,
              "--o": s.o,
              "--dur": s.dur,
              "--delay": s.delay,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
