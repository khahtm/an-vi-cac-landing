import { getSampleChart } from "@/lib/sample-chart";
import { SAMPLE_EXCERPTS } from "@/content/sample-reading";
import { SectionCta } from "./SectionCta";
import { TuViChart } from "./TuViChart";

/** Shows what a reading actually looks like: a real computed chart plus excerpts tied to it. */
export async function SampleReadingSection() {
  const chart = await getSampleChart();
  return (
    <section id="ban-mau" className="section-pad relative overflow-hidden border-t border-line/60">
      <span aria-hidden="true" className="han-glyph left-[-4%] top-[4%] lg:left-[2%]">
        示
      </span>
      <div className="shell relative">
        <div data-reveal="true" className="mx-auto max-w-3xl text-center">
          <p className="type-kicker text-muted">Bản luận giải mẫu</p>
          <h2 className="type-h2 mt-4 font-display font-semibold text-parchment">Đây là những gì bạn sẽ đọc về chính mình</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
            Lá số của một người giả định, để bạn thấy luận giải cụ thể đến mức nào. Bản của bạn đi theo đúng lá số của bạn.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-12">
          <div data-reveal="true" className="min-w-0 lg:sticky lg:top-28">
            <TuViChart chart={chart} />
          </div>
          <div data-reveal="true" className="min-w-0">
            <div className="mb-3 flex items-center justify-between lg:hidden">
              <p className="text-sm font-medium text-parchment">Trích bản luận giải</p>
              <p className="text-xs text-muted">Vuốt ngang để xem {SAMPLE_EXCERPTS.length} phần</p>
            </div>
            <div className="swipe-row">
              {SAMPLE_EXCERPTS.map((e) => (
                <article
                  key={e.label}
                  className={`flex flex-col rounded-2xl border p-5 shadow-card sm:p-6 ${
                    e.tier === "full" ? "border-gold/40 bg-raised" : "border-line bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="type-kicker !tracking-[0.18em] text-gold">{e.label}</p>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        e.tier === "full" ? "bg-gold text-on-gold" : "border border-line text-muted"
                      }`}
                    >
                      {e.tier === "full" ? "Trọn gói" : "Miễn phí"}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-parchment sm:text-xl">
                    {e.title}
                  </h3>
                  <p
                    className={`mt-2 flex-1 leading-7 ${
                      e.tier === "full" ? "text-[15px] font-medium text-parchment" : "text-[15px] text-muted"
                    }`}
                  >
                    {e.body}
                  </p>
                  {e.note && <p className="mt-4 border-t border-line pt-3 text-xs leading-5 text-muted">{e.note}</p>}
                </article>
              ))}
            </div>
          </div>
        </div>

        <SectionCta className="mt-10 lg:mt-16" label="Xem bản của tôi" />
      </div>
    </section>
  );
}
