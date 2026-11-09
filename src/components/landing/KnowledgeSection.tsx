import { ARTICLES } from "@/content/articles";

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

/**
 * Hidden until src/content/articles.ts has at least one written article;
 * the draft's "Đang cập nhật" cards are gone. Each article gets its own page
 * at /kien-thuc/[slug].
 */
export function KnowledgeSection() {
  if (ARTICLES.length === 0) return null;
  const [feature, ...rest] = ARTICLES;
  return (
    <section className="section-pad border-t border-line/60">
      <div className="shell flex flex-col items-center gap-10 sm:gap-14">
        <div data-reveal="true" className="mx-auto max-w-3xl text-center">
          <h2 className="type-h2 font-display font-semibold text-parchment">Kiến thức Tử Vi Đẩu Số</h2>
          <p className="mt-4 text-base leading-7 text-muted">Góc nhìn của Dịch sư về cách xem tử vi cho đúng.</p>
        </div>
        <div data-reveal="true" className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <a
            href={`/kien-thuc/${feature.slug}`}
            className="focus-gold group flex h-full flex-col overflow-hidden rounded-2xl border border-line border-t-edge bg-raised shadow-card"
          >
            <div aria-hidden="true" className="night-sky relative flex aspect-[16/8] items-center justify-center overflow-hidden">
              <span className="font-[family-name:var(--font-glyph)] text-7xl text-gold/40">{feature.glyph ?? "知"}</span>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
              <div>
                <h3 className="text-xl font-semibold leading-snug text-parchment transition-colors group-hover:text-gold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{feature.excerpt}</p>
              </div>
              <p className="text-xs text-muted">{formatDate(feature.publishedAt)}</p>
            </div>
          </a>
          {rest.length > 0 && (
            <div className="flex flex-col divide-y divide-line rounded-2xl border border-line border-t-edge bg-raised px-5 shadow-card sm:px-6">
              {rest.slice(0, 4).map((a) => (
                <a key={a.slug} href={`/kien-thuc/${a.slug}`} className="focus-gold group flex flex-1 flex-col justify-center gap-2 py-5">
                  <h3 className="text-lg font-semibold leading-snug text-parchment transition-colors group-hover:text-gold">
                    {a.title}
                  </h3>
                  <p className="text-xs text-muted">{formatDate(a.publishedAt)}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
