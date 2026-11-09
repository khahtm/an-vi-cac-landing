import type { ReactNode } from "react";
import { BUSINESS } from "@/content/business";
import { FORM_ANCHOR } from "@/lib/site";

const svg = (children: ReactNode) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="hidden h-5 w-5 shrink-0 text-gold/80 sm:block"
    aria-hidden="true"
  >
    {children}
  </svg>
);

/** Rows and lucide icons verbatim from the draft. */
const ROWS: { title: string; detail?: string; free: boolean; icon: ReactNode }[] = [
  {
    title: "Lá số Tử Vi 12 cung",
    detail: "Tam Tài Thiên, Địa, Nhân",
    free: true,
    icon: svg(<><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" /></>),
  },
  {
    title: "Luận tính cách của bạn",
    detail: "Điểm mạnh, điểm yếu của riêng bạn",
    free: true,
    icon: svg(<><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></>),
  },
  {
    title: "1 cảnh báo cho năm nay",
    detail: "Điều nên đề phòng sớm",
    free: true,
    icon: svg(<><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="M12 8v4" /><path d="M12 16h.01" /></>),
  },
  {
    title: "Điểm đặc biệt trong lá số",
    detail: "Điều nổi bật nhất trong lá số của bạn",
    free: true,
    icon: svg(<><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" /></>),
  },
  {
    title: "Tình duyên",
    detail: "Duyên số ra sao, người thế nào hợp với bạn, lúc nào nên tiến",
    free: false,
    icon: svg(<path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" />),
  },
  {
    title: "Sự nghiệp",
    detail: "Nghề nào hợp mệnh, giai đoạn nào nên bứt phá",
    free: false,
    icon: svg(<><path d="M12 12h.01" /><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M22 13a18.15 18.15 0 0 1-20 0" /><rect width="20" height="14" x="2" y="6" rx="2" /></>),
  },
  {
    title: "Tài chính",
    detail: "Năm nào được, năm nào hao, giữ tiền thế nào",
    free: false,
    icon: svg(<><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></>),
  },
  {
    title: "Sức khỏe",
    detail: "Bộ phận nào cần giữ, giai đoạn nào cần đề phòng",
    free: false,
    icon: svg(<><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" /></>),
  },
  {
    title: "Dự báo 12 tháng",
    detail: "Từng tháng nên làm gì, nên tránh gì",
    free: false,
    icon: svg(<><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4" /><path d="M3 10h18" /><path d="M8 2v4" /><path d="M17 14h-6" /><path d="M13 18H7" /><path d="M7 14h.01" /><path d="M17 18h.01" /></>),
  },
  {
    title: "Lời khuyên hành động",
    detail: "Những việc cụ thể nên làm trong năm nay",
    free: false,
    icon: svg(<><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></>),
  },
  {
    title: "Dịch sư thật xem lại lá số",
    detail: "Thêm lời dặn viết riêng cho bạn",
    free: false,
    icon: svg(<><path d="M2 21a8 8 0 0 1 13.292-6" /><circle cx="10" cy="8" r="5" /><path d="m16 19 2 2 4-4" /></>),
  },
];

function Check({ label }: { label: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gold" role="img" aria-label={label}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Dash({ label }: { label: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted/50" role="img" aria-label={label}>
      <path d="M5 12h14" />
    </svg>
  );
}

function Row({ title, detail }: { title: string; detail?: string }) {
  return (
    <span className="leading-6">
      <span className="text-parchment">{title}</span>
      {detail && <span className="text-muted">: {detail}</span>}
    </span>
  );
}

function PlanItem({ title, detail }: { title: string; detail?: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span className="text-[15px] leading-6">
        <span className="block font-medium text-parchment">{title}</span>
        {detail && <span className="block text-muted">{detail}</span>}
      </span>
    </li>
  );
}

const colHead =
  "col-span-2 flex flex-col items-center justify-center px-1 py-4 text-center text-base font-semibold text-gold sm:py-6 sm:text-lg";

export function PricingSection() {
  const free = ROWS.filter((r) => r.free);
  const extra = ROWS.filter((r) => !r.free);
  const facts = [
    BUSINESS.reviewTurnaround && `Dịch sư xem lại ${BUSINESS.reviewTurnaround}`,
    BUSINESS.paymentMethods.length > 0 && `Thanh toán: ${BUSINESS.paymentMethods.join(", ")}`,
  ].filter(Boolean) as string[];
  const unlockNote = "Bản trọn gói mở ngay trên trang kết quả, sau khi bạn đã đọc bản miễn phí.";

  return (
    <section id="ban-luan-giai" className="section-pad border-t border-line/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-5 sm:gap-12 sm:px-8">
        <div data-reveal="true" className="mx-auto max-w-3xl text-center">
          <p className="type-kicker text-muted">Gói luận giải</p>
          <h2 className="type-h2 mt-4 font-display font-semibold text-parchment">
            Bản trọn gói trả lời những câu
            <br />
            bạn muốn hỏi nhất
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
            Bắt đầu với bản miễn phí. Khi muốn biết sâu hơn về tình duyên, công việc, tiền bạc, bạn mở bản trọn gói ngay trên trang kết quả.
          </p>
        </div>

        {/* Phones: two plan cards. A 3-column table is too cramped at this width. */}
        <div data-reveal="true" className="grid w-full gap-4 sm:hidden">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold text-parchment">Bản miễn phí</h3>
              <span className="text-sm font-semibold text-gold">0đ</span>
            </div>
            <ul className="mt-4 space-y-3">
              {free.map((r) => (
                <PlanItem key={r.title} title={r.title} detail={r.detail} />
              ))}
            </ul>
            <a href={FORM_ANCHOR} className="btn-ghost focus-gold mt-5 !min-h-12 w-full">
              Xem bản miễn phí ngay
            </a>
          </div>
          <div className="rounded-2xl border border-gold/50 bg-raised p-5 shadow-card">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xl font-semibold text-parchment">Bản trọn gói</h3>
              {BUSINESS.fullPrice && <span className="text-sm font-semibold text-gold">{BUSINESS.fullPrice}</span>}
            </div>
            <p className="mt-1 text-sm text-muted">Gồm toàn bộ bản miễn phí, thêm:</p>
            <ul className="mt-4 space-y-3">
              {extra.map((r) => (
                <PlanItem key={r.title} title={r.title} detail={r.detail} />
              ))}
            </ul>
            <a href={FORM_ANCHOR} className="btn-gold focus-gold mt-5 !min-h-12 w-full">
              Lập lá số để bắt đầu
            </a>
            <p className="mt-3 text-center text-xs leading-5 text-muted">{unlockNote}</p>
            {facts.length > 0 && <p className="mt-2 text-center text-xs font-medium text-parchment">{facts.join(" · ")}</p>}
          </div>
        </div>

        {/* Tablet and up: the comparison table. */}
        <div
          data-reveal="true"
          className="hidden w-full overflow-hidden rounded-3xl border border-line bg-raised shadow-card sm:block"
        >
          <div className="grid grid-cols-12 border-b border-line">
            <div className="col-span-8 flex items-center px-8 py-6 text-lg font-semibold text-parchment">
              Nội dung
            </div>
            <div className={colHead}>Miễn phí</div>
            <div className={colHead}>
              Trọn gói
              {BUSINESS.fullPrice && (
                <span className="mt-1 font-sans text-sm font-semibold text-parchment">{BUSINESS.fullPrice}</span>
              )}
            </div>
          </div>
          <div className="divide-y divide-line px-8">
            {ROWS.map((r) => (
              <div key={r.title} className="grid grid-cols-12 items-center py-5">
                <div className="col-span-8 flex items-center gap-3 pr-2 text-base">
                  {r.icon}
                  <Row title={r.title} detail={r.detail} />
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  {r.free ? <Check label="Có trong bản miễn phí" /> : <Dash label="Không có trong bản miễn phí" />}
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <Check label="Có trong bản trọn gói" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-6 border-t border-line bg-surface px-8 py-6">
            <p className="max-w-md text-sm leading-6 text-muted">
              {unlockNote}
              {facts.length > 0 && <span className="block font-medium text-parchment">{facts.join(" · ")}</span>}
            </p>
            <a href={FORM_ANCHOR} className="btn-gold focus-gold !min-h-12 shrink-0">
              Lập lá số miễn phí
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
