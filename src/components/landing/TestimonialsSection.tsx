import { MIN_TESTIMONIALS_TO_SHOW, TESTIMONIALS } from "@/content/testimonials";

/**
 * Hidden until there are enough real, permission-given testimonials
 * (see src/content/testimonials.ts). Placeholder cards cost more trust than
 * an absent section.
 */
export function TestimonialsSection() {
  if (TESTIMONIALS.length < MIN_TESTIMONIALS_TO_SHOW) return null;
  return (
    <section className="section-pad border-t border-line/60">
      <div className="shell">
        <div data-reveal="true" className="text-center">
          <p className="type-kicker text-muted">Phản hồi</p>
          <h2 className="type-h2 mt-4 font-display font-semibold text-parchment">Người dùng nói gì</h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
            Phản hồi thật, được đăng khi người xem đồng ý.
          </p>
        </div>
        <div data-reveal="true" className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={`${t.name}-${t.quote.slice(0, 20)}`}
              className="flex flex-col justify-between gap-6 rounded-3xl border border-line border-t-edge bg-surface p-6 shadow-card"
            >
              <div>
                <span aria-hidden="true" className="font-[family-name:var(--font-glyph)] text-5xl leading-none text-gold/50">
                  “
                </span>
                <blockquote className="mt-1 text-[15px] leading-7 text-parchment">{t.quote}</blockquote>
              </div>
              <figcaption className="border-t border-line pt-4 text-sm leading-6">
                <span className="font-semibold text-parchment">{t.name}</span>
                {t.detail && <span className="text-muted"> · {t.detail}</span>}
                {t.context && <span className="block text-xs text-muted">{t.context}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
