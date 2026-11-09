import Image from "next/image";
import { ART } from "@/content/art";
import type { ReactNode } from "react";

const icon = (children: ReactNode) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 shrink-0 text-gold sm:h-7 sm:w-7" aria-hidden="true">
    {children}
  </svg>
);

const PRINCIPLES = [
  {
    title: "Lá số chỉ ra khả năng",
    body: "Lá số cho thấy điểm mạnh, điểm yếu và những giai đoạn nên chú ý. Chọn con đường tiếp theo vẫn là quyết định của bạn.",
    icon: icon(<><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></>),
  },
  {
    title: "Đọc lá số ở hiện tại",
    body: "Ngày sinh là điểm bắt đầu. Công việc, tình cảm và điều bạn đang quan tâm giúp luận giải sát với bạn hôm nay.",
    icon: icon(<><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" /><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" /><path d="M5 21h14" /></>),
  },
  {
    title: "Kết quả được kiểm tra\u00a0lại",
    body: "AI tính toán nhanh nhưng vẫn có thể sai. Người có chuyên môn đọc lại để luận giải đúng với lá số của bạn.",
    icon: icon(<><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></>),
  },
  {
    title: "Dành cho mọi người",
    body: "Ẩn Vi Các hỗ trợ mọi giới tính và xu hướng tính dục. Bạn càng chia sẻ, lá số càng được đọc đúng với bạn.",
    icon: icon(<><path d="M18 21a8 8 0 0 0-16 0" /><circle cx="10" cy="8" r="5" /><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" /></>),
  },
];

const HELPS = [
  "Nhìn rõ các giai đoạn và bước ngoặt có thể gặp trong đời",
  "Hiểu thêm những chuyện mình đã trải qua",
  "Bớt lo lắng và thấy rõ hơn con đường cần đi",
  "Có cơ sở để lên kế hoạch cho công việc, tình cảm, tiền bạc",
];

/** Philosophy block: the draft's "Không phải mê tín" cards merged with "Hiểu đúng về lá số Tử Vi". */
export function PrinciplesSection() {
  return (
    <section className="section-pad relative overflow-hidden border-t border-line/60">
      <span aria-hidden="true" className="han-glyph right-[-4%] top-[6%] lg:right-[6%]">
        易
      </span>
      <div className="shell relative">
        <div data-reveal="true" className="mx-auto max-w-3xl text-center">
          <p className="type-kicker text-muted">Hiểu đúng về Tử Vi</p>
          <h2 className="type-h2 mt-4 font-display font-semibold text-parchment">{"Xem Tử Vi để chủ động hơn với cuộc\u00a0đời\u00a0mình"}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
            Đây là cách Ẩn Vi Các nhìn và dùng Tử Vi.
          </p>
        </div>

        <div data-reveal="true" className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card sm:flex-col sm:gap-0 sm:rounded-3xl sm:p-6"
            >
              {p.icon}
              <div>
                <h3 className="text-lg font-semibold leading-7 text-parchment sm:mt-5">{p.title}</h3>
                <p className="mt-1.5 text-[15px] leading-6 text-muted sm:mt-3 sm:text-base sm:leading-7">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal="true" className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h3 className="text-xl font-semibold text-parchment">Sau khi đọc lá số, bạn sẽ</h3>
            <ul className="mt-4 flex flex-col gap-3 text-base leading-7 text-muted">
              {HELPS.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-[13px] h-px w-4 shrink-0 bg-gold/60" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="grid grid-cols-[auto_1fr] items-center gap-5 sm:gap-8">
            <div className="art-frame relative h-44 w-[70px] sm:h-60 sm:w-24">
              <Image src={ART.bambooMoon.src} alt={ART.bambooMoon.alt} fill sizes="96px" className="object-cover" />
            </div>
            <div>
            <span aria-hidden="true" className="block font-[family-name:var(--font-glyph)] text-6xl leading-[0.6] text-gold/50">
              “
            </span>
            <blockquote className="mt-2 text-lg font-medium leading-relaxed text-parchment sm:text-xl">
              Tri thiên mệnh để tận nhân lực. Biết mệnh là để thấy mình có gì trong tay, rồi tự xây kế hoạch cho đời
              sống của mình.
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">Dịch sư Ẩn Vi Các</figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
