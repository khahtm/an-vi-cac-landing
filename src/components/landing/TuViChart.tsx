"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { SAMPLE_PERSON, type ChartPalace, type SampleChart } from "@/lib/sample-person";

/** Traditional 4×4 layout: palaces run around the edge by earthly branch, info box in the middle. */
const POSITION: Record<string, [row: number, col: number]> = {
  Tỵ: [1, 1], Ngọ: [1, 2], Mùi: [1, 3], Thân: [1, 4],
  Thìn: [2, 1], Dậu: [2, 4],
  Mão: [3, 1], Tuất: [3, 4],
  Dần: [4, 1], Sửu: [4, 2], Tý: [4, 3], Hợi: [4, 4],
};
/** Branch order; increasing index runs clockwise around the chart. */
const BRANCHES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

const ZOOM = 2.2;
const STAGGER_MS = 70;
const ENTRANCE_MS = 520;

/** Tam phương tứ chính of a palace: the two trine palaces (±4) and the opposite one (+6). */
function relatedBranches(branch: string): string[] {
  const i = BRANCHES.indexOf(branch);
  return [4, 6, 8].map((o) => BRANCHES[(i + o) % 12]);
}

function MutagenChip({ value }: { value: string }) {
  const bad = value === "Kỵ";
  return (
    <span
      className={`inline-flex items-center rounded px-1 text-[9px] font-semibold leading-[1.5] sm:text-[10px] ${
        bad ? "bg-danger/12 text-danger-text" : "bg-gold/14 text-gold"
      }`}
    >
      Hóa {value}
    </span>
  );
}

type PalaceState = "idle" | "focus" | "related" | "dim";

function Palace({
  p,
  state,
  zoomed,
  entered,
  delay,
  pulse,
  onSelect,
  refCb,
}: {
  p: ChartPalace;
  state: PalaceState;
  zoomed: boolean;
  entered: boolean;
  delay: number;
  pulse: boolean;
  onSelect: () => void;
  refCb: (el: HTMLButtonElement | null) => void;
}) {
  const [row, col] = POSITION[p.branch];
  const tone =
    state === "focus"
      ? "bg-[color-mix(in_srgb,var(--gold)_14%,var(--surface))] shadow-[inset_0_0_0_2px_var(--gold)]"
      : state === "related"
        ? "bg-surface shadow-[inset_0_0_0_1.5px_color-mix(in_srgb,var(--gold)_55%,transparent)]"
        : p.isSoul
          ? "bg-[color-mix(in_srgb,var(--gold)_8%,var(--surface))]"
          : "bg-surface";
  return (
    <button
      ref={refCb}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      aria-pressed={state === "focus"}
      aria-label={`Cung ${p.name} (${p.stem} ${p.branch}): ${
        p.major.map((s) => s.name).join(", ") || "vô chính diệu"
      }. Đại hạn từ ${p.decadalStart} tuổi.`}
      style={{ gridRow: row, gridColumn: col, transitionDelay: `${delay}ms` } as CSSProperties}
      className={`focus-gold relative flex min-h-[112px] min-w-0 cursor-zoom-in flex-col p-1.5 text-left transition-[opacity,transform,background-color,box-shadow] duration-500 ease-out sm:min-h-[150px] sm:p-2.5 ${tone} ${
        entered ? "opacity-100 [transform:none]" : "scale-90 opacity-0"
      } ${state === "dim" ? "!opacity-35" : ""} ${state === "focus" ? "cursor-zoom-out" : ""} ${
        pulse ? "animate-[palace-pulse_1.8s_ease-out_1]" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-1">
        <p
          className={`text-[9.5px] font-semibold uppercase leading-tight tracking-[0.06em] sm:text-[11px] ${
            p.isSoul || state === "focus" ? "text-gold" : "text-muted"
          }`}
        >
          {p.name}
        </p>
        {p.isBody && (
          <span className="rounded-sm bg-gold/15 px-1 text-[8.5px] font-semibold leading-[1.6] text-gold sm:text-[10px]">
            Thân
          </span>
        )}
      </div>
      <ul className="mt-1 space-y-1">
        {p.major.length === 0 && <li className="text-[10px] leading-tight text-muted sm:text-xs">Vô chính diệu</li>}
        {p.major.map((s) => (
          <li key={s.name} className="flex flex-wrap items-center gap-x-1 gap-y-0.5 leading-tight">
            <span className="text-[11px] font-semibold text-parchment sm:text-[13px]">
              {s.name}
              {s.brightness && (
                <sup title={s.brightness.label} className="ml-0.5 text-[8px] font-medium text-muted sm:text-[9px]">
                  {s.brightness.abbr}
                </sup>
              )}
            </span>
            {s.mutagen && <MutagenChip value={s.mutagen} />}
          </li>
        ))}
      </ul>
      {p.minor.length > 0 && (
        <p className={`mt-1.5 text-[10.5px] leading-snug text-muted ${zoomed ? "block" : "hidden sm:block"}`}>
          {p.minor.map((s) => (s.mutagen ? `${s.name} (Hóa ${s.mutagen})` : s.name)).join(", ")}
        </p>
      )}
      <div className="mt-auto flex items-end justify-between gap-1 whitespace-nowrap pt-1.5 text-[8.5px] leading-none text-muted sm:text-[10.5px]">
        <span>
          {p.stem} {p.branch}
        </span>
        <span className="font-semibold text-parchment/70">{p.decadalStart}</span>
      </div>
    </button>
  );
}

/**
 * Interactive sample chart.
 * - Entrance: palaces appear one by one clockwise from Mệnh when the chart
 *   scrolls into view, then Mệnh pulses once.
 * - Tap a palace: the chart zooms in on it and outlines its tam phương tứ chính;
 *   tap another palace to glide there. Zoom out with the button, the centre
 *   box, a second tap on the same palace, or Esc.
 */
export function TuViChart({ chart }: { chart: SampleChart }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const palaceRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [entered, setEntered] = useState(false);
  const [settled, setSettled] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);
  const [transform, setTransform] = useState("none");

  const soulBranch = chart.palaces.find((p) => p.isSoul)?.branch ?? "Tý";
  const soulIndex = BRANCHES.indexOf(soulBranch);

  // Entrance once the chart is mostly on screen.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: number | undefined;
    const start = () => {
      setEntered(true);
      timer = window.setTimeout(() => setSettled(true), reduce ? 0 : 12 * STAGGER_MS + ENTRANCE_MS + 200);
    };
    if (reduce || typeof IntersectionObserver === "undefined") {
      start();
      return () => window.clearTimeout(timer);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  // Recompute the zoom transform for the focused palace (and on resize).
  const computeTransform = useCallback((branch: string | null) => {
    const grid = gridRef.current;
    const el = branch ? palaceRefs.current[branch] : null;
    if (!grid || !el) return "none";
    const W = grid.offsetWidth;
    const H = grid.offsetHeight;
    const cx = el.offsetLeft + el.offsetWidth / 2;
    const cy = el.offsetTop + el.offsetHeight / 2;
    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
    const tx = clamp(W / 2 - ZOOM * cx, W - ZOOM * W, 0);
    const ty = clamp(H / 2 - ZOOM * cy, H - ZOOM * H, 0);
    return `translate(${tx}px, ${ty}px) scale(${ZOOM})`;
  }, []);

  const select = (branch: string | null) => {
    setFocus(branch);
    setTransform(computeTransform(branch));
  };

  useEffect(() => {
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocus(null);
        setTransform("none");
      }
    };
    const onResize = () => setTransform(computeTransform(focus));
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [focus, computeTransform]);

  const related = focus ? relatedBranches(focus) : [];
  const focusedPalace = chart.palaces.find((p) => p.branch === focus);
  const stateOf = (branch: string): PalaceState =>
    !focus ? "idle" : branch === focus ? "focus" : related.includes(branch) ? "related" : "dim";

  return (
    <figure>
      <p className="sr-only">
        Lá số Tử Vi minh họa. Chọn một cung để phóng to và xem tam phương tứ chính của cung đó.
      </p>
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-2xl border border-line bg-line shadow-card"
        onClick={() => focus && select(null)}
      >
        <div
          ref={gridRef}
          style={{ transform, transformOrigin: "0 0" }}
          className="grid grid-cols-4 gap-px transition-transform duration-[650ms] ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform"
        >
          {chart.palaces.map((p) => {
            const order = (BRANCHES.indexOf(p.branch) - soulIndex + 12) % 12;
            return (
              <Palace
                key={p.branch}
                p={p}
                state={stateOf(p.branch)}
                zoomed={!!focus}
                entered={entered}
                delay={settled ? 0 : order * STAGGER_MS}
                pulse={settled && p.isSoul && !focus}
                onSelect={() => select(focus === p.branch ? null : p.branch)}
                refCb={(el) => {
                  palaceRefs.current[p.branch] = el;
                }}
              />
            );
          })}
          <div
            style={{ gridRow: "2 / span 2", gridColumn: "2 / span 2", transitionDelay: settled ? "0ms" : `${12 * STAGGER_MS}ms` }}
            className={`relative flex flex-col items-center justify-center overflow-hidden bg-raised p-3 text-center transition-[opacity,transform] duration-500 ease-out sm:p-6 ${
              entered ? "opacity-100" : "scale-95 opacity-0"
            } ${focus ? "!opacity-35" : ""}`}
          >
            <span aria-hidden="true" className="pointer-events-none absolute hidden font-[family-name:var(--font-glyph)] text-[11rem] leading-none text-gold/[0.07] sm:block">
              命
            </span>
            <p className="type-kicker !text-[9px] !tracking-[0.25em] text-gold sm:!text-[11px]">Lá số minh họa</p>
            <p className="mt-2 text-xl font-bold leading-none text-parchment sm:text-3xl">{SAMPLE_PERSON.name}</p>
            <p className="mt-2 text-[10.5px] leading-snug text-muted sm:text-sm">
              {SAMPLE_PERSON.genderLabel}, sinh {SAMPLE_PERSON.solarLabel}
              <br />
              {SAMPLE_PERSON.hourLabel}
            </p>
            <dl className="mt-3 grid gap-y-1 text-[10px] leading-snug sm:mt-4 sm:grid-cols-[auto_1fr] sm:gap-x-3 sm:text-left sm:text-[12.5px]">
              <dt className="hidden text-muted sm:block">Âm lịch</dt>
              <dd className="hidden text-parchment sm:block">{chart.lunarDate.replace("Âm lịch ", "")}</dd>
              <dt className="hidden text-muted sm:block">Bát tự</dt>
              <dd className="hidden text-parchment sm:block">{chart.chineseDate}</dd>
              <dt className="sr-only sm:not-sr-only sm:text-muted">Cục</dt>
              <dd className="font-medium text-parchment">{chart.fiveElementsClass}</dd>
              <dt className="hidden text-muted sm:block">Mệnh chủ</dt>
              <dd className="text-parchment">
                <span className="sm:hidden">Mệnh chủ </span>
                {chart.soul}
              </dd>
              <dt className="hidden text-muted sm:block">Thân chủ</dt>
              <dd className="text-parchment">
                <span className="sm:hidden">Thân chủ </span>
                {chart.body}
              </dd>
              <dt className="hidden text-muted sm:block">Thân cư</dt>
              <dd className="hidden text-parchment sm:block">{chart.bodyPalace}</dd>
            </dl>
          </div>
        </div>

        {focus && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              select(null);
            }}
            className="focus-gold absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-full border border-line bg-surface/95 px-3 py-1.5 text-xs font-semibold text-parchment shadow-card backdrop-blur"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M8 11h6" />
            </svg>
            Thu nhỏ
          </button>
        )}
      </div>
      <figcaption className="mt-3 min-h-10 text-center text-xs leading-5 text-muted" aria-live="polite">
        {focusedPalace ? (
          <>
            <span className="font-semibold text-parchment">Cung {focusedPalace.name}.</span> Viền vàng là tam phương tứ
            chính:{" "}
            {related.map((b) => chart.palaces.find((p) => p.branch === b)?.name).join(", ")}.
          </>
        ) : (
          <>
            Chạm vào một cung để phóng to.
            <br />M Miếu, V Vượng, Đ Đắc, L Lợi, B Bình, Bt Bất, H Hãm
          </>
        )}
      </figcaption>
    </figure>
  );
}
