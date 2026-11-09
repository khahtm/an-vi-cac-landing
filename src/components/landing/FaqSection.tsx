import { FAQS } from "@/content/faq";

export function FaqSection() {
  return (
    <section id="cau-hoi" className="section-pad relative overflow-hidden border-t border-line/60">
      <span aria-hidden="true" className="han-glyph right-[-6%] top-[8%] lg:right-[4%]">
        問
      </span>
      <div className="shell relative">
        <div data-reveal="true" className="mx-auto max-w-3xl text-center">
          <p className="type-kicker text-muted">Giải đáp</p>
          <h2 className="type-h2 mt-4 font-display font-semibold text-parchment">Câu hỏi thường gặp</h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl border-t border-line">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group border-b border-line" open={i === 0}>
              <summary className="focus-gold flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-medium text-parchment transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0 text-gold">
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-200 ease-out group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-7 pr-10 leading-8 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
