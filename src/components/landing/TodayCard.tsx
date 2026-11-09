"use client";

import { useMemo, useSyncExternalStore } from "react";
import { dayInfo } from "@/lib/amlich";

// The page is prerendered once, so "today" must be read in the visitor's browser.
// The snapshot is a date key, so it stays stable for the whole day.
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
};
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
const serverKey = () => null;

/** "Hôm nay" card: âm lịch, can chi, tiết khí and giờ hoàng đạo for the visitor's date. */
export function TodayCard({ className = "" }: { className?: string }) {
  const key = useSyncExternalStore(subscribe, todayKey, serverKey);
  const info = useMemo(() => {
    if (!key) return null;
    const [y, m, d] = key.split("-").map(Number);
    return dayInfo(new Date(y, m - 1, d, 12));
  }, [key]);

  return (
    <div
      className={`rounded-2xl border border-line border-t-edge bg-surface/95 p-5 shadow-card ${className}`}
      aria-live="polite"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="type-kicker text-gold">Hôm nay</p>
        <p className="text-xs text-muted">{info ? info.weekday : " "}</p>
      </div>
      {info ? (
        <>
          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="text-[1.75rem] font-bold leading-none tracking-[-0.02em] text-parchment">
              {info.solar.day}/{info.solar.month}
              <span className="ml-1 text-base text-muted">/{info.solar.year}</span>
            </p>
            <p className="text-right text-sm leading-5 text-muted">
              Âm lịch{" "}
              <strong className="font-semibold text-parchment">
                {info.lunar.day}/{info.lunar.month}
                {info.lunar.leap ? " (nhuận)" : ""}
              </strong>
              <br />
              năm {info.yearCanChi}
            </p>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
            {[
              ["Ngày", info.dayCanChi],
              ["Tháng", info.monthCanChi],
              ["Tiết khí", info.tietKhi],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">{label}</dt>
                <dd className="mt-1 text-sm font-semibold text-parchment">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 border-t border-line pt-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted">Giờ hoàng đạo</p>
            <ul className="mt-2 grid grid-cols-3 gap-1.5">
              {info.goodHours.map((h) => (
                <li key={h.chi} className="rounded-md bg-gold/[0.07] px-2 py-1.5 text-center leading-tight">
                  <span className="block text-sm font-semibold text-parchment">{h.chi}</span>
                  <span className="block text-[11px] text-muted">{h.range}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        // Same height as the filled card, so nothing jumps when the date arrives.
        <div aria-hidden="true" className="mt-3 h-[236px]" />
      )}
    </div>
  );
}
