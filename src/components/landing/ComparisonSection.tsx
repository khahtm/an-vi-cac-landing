import type { ReactNode } from "react";
import { SectionCta } from "./SectionCta";

const icon = (children: ReactNode, className = "text-muted") => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 sm:h-6 sm:w-6 ${className}`} aria-hidden="true">
    {children}
  </svg>
);

const CROSS = <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>;
const CHECK = <path d="M20 6 9 17l-5-5" />;

type Column = { title: string; icon: ReactNode; ours?: boolean; points: { title?: string; text: string }[] };

const COLUMNS: Column[] = [
  {
    title: "Tử vi chỉ theo ngày\u00a0sinh",
    icon: icon(<><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></>),
    points: [
      { text: "Cùng ngày giờ sinh thì nhận cùng một kết quả" },
      { text: "Bỏ qua công việc, tình cảm và điều bạn đang quan tâm" },
      { text: "Dễ khiến người xem tự đóng khung mình trong một lời phán" },
    ],
  },
  {
    title: "App tử vi tự\u00a0động hoàn\u00a0toàn",
    icon: icon(<><path d="M12 20v2" /><path d="M12 2v2" /><path d="M17 20v2" /><path d="M17 2v2" /><path d="M2 12h2" /><path d="M2 17h2" /><path d="M2 7h2" /><path d="M20 12h2" /><path d="M20 17h2" /><path d="M20 7h2" /><path d="M7 20v2" /><path d="M7 2v2" /><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="8" y="8" width="8" height="8" rx="1" /></>),
    points: [
      { text: "Kết quả không có người thật xem lại" },
      { text: "AI diễn giải sai thì không có ai đối chiếu" },
      { text: "Dừng ở mô tả, thiếu việc cụ thể để làm" },
    ],
  },
  {
    title: "Cách của Ẩn Vi Các",
    ours: true,
    icon: icon(<><path d="M12 21V7" /><path d="m16 12 2 2 4-4" /><path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" /></>, "text-gold"),
    points: [
      { title: "Đọc đúng hoàn cảnh của bạn", text: "Luận giải dựa trên hơn 10 thông tin của riêng bạn" },
      { title: "Có người thật kiểm tra", text: "Bản trả phí được Dịch sư xem lại và thêm lời dặn riêng" },
      { title: "Biết việc cần làm tiếp theo", text: "Mỗi luận giải khép lại bằng những việc nên làm và nên tránh trong năm" },
    ],
  },
];

export function ComparisonSection() {
  return (
    <section className="section-pad border-t border-line/60">
      <div className="shell">
        <div data-reveal="true" className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
          <h2 className="type-h2 font-display font-semibold text-parchment">{"Vì sao cùng ngày giờ sinh mà đời mỗi người mỗi\u00a0khác?"}</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Vì lá số chỉ là phần khung. Ẩn Vi Các đọc lá số cùng công việc, tình cảm và những gì đang diễn ra trong đời bạn.
          </p>
        </div>
        <div data-reveal="true" className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-8">
          {COLUMNS.map((c) => (
            <div
              key={c.title}
              className={`flex flex-col rounded-3xl border px-5 py-6 shadow-card sm:px-6 sm:py-8 ${
                c.ours ? "order-first border-gold/60 bg-gold-dp/[0.12] lg:order-last" : "border-line bg-surface"
              }`}
            >
              <div className="flex items-center gap-4 lg:block">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border sm:h-14 sm:w-14 lg:mb-6 ${
                    c.ours ? "border-gold/40" : "border-line"
                  }`}
                >
                  {c.icon}
                </div>
                <h3 className="text-lg font-semibold leading-snug text-parchment sm:text-xl lg:mb-8">{c.title}</h3>
              </div>
              <ul className="mt-5 space-y-4 lg:mt-0 lg:space-y-6">
                {c.points.map((p) => (
                  <li key={p.text} className="flex items-start gap-3">
                    {icon(c.ours ? CHECK : CROSS, `mt-1 !h-4 !w-4 shrink-0 ${c.ours ? "text-gold" : "text-muted"}`)}
                    <span className="text-[15px] leading-6 sm:text-base sm:leading-7">
                      {p.title && <span className="block font-semibold text-parchment">{p.title}</span>}
                      <span className="text-muted">{p.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <SectionCta className="mt-10 sm:mt-16" label="Xem lá số của riêng bạn" note="Miễn phí, có kết quả ngay." />
      </div>
    </section>
  );
}
