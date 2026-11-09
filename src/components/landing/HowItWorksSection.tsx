import { TextLink } from "./TextLink";

const STEPS = [
  {
    title: "Nhập ngày giờ sinh",
    body: "Họ tên, email, giới tính, ngày và giờ sinh. Chưa rõ giờ sinh vẫn xem được.",
  },
  {
    title: "Hệ thống an lá số",
    body: "Lá số Tử Vi 12 cung được lập theo đúng giờ, ngày, tháng, năm sinh của bạn.",
  },
  {
    title: "Đọc kết quả ngay",
    body: "Tính cách, 1 cảnh báo cho năm nay và điểm đặc biệt trong lá số hiện ngay trên trang kết quả.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="cach-hoat-dong" className="section-pad relative overflow-hidden border-t border-line/60">
      <span aria-hidden="true" className="han-glyph left-1/2 top-6 -translate-x-1/2">
        運
      </span>
      <div className="shell relative">
        <div data-reveal="true" className="text-center">
          <p className="type-kicker text-muted">Quy trình</p>
          <h2 className="type-h2 mt-4 font-display font-semibold text-parchment">Xem Tử Vi trong khoảng 2 phút</h2>
        </div>
        <ol data-reveal="true" className="relative mt-10 grid gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-8">
          <li
            aria-hidden="true"
            className="absolute inset-x-16 top-[60px] hidden h-px list-none bg-gradient-to-r from-transparent via-gold/40 to-transparent sm:block"
          />
          {/* Vertical thread joining the steps on phones. */}
          <li aria-hidden="true" className="absolute bottom-10 left-[43px] top-10 w-px list-none bg-gold/25 sm:hidden" />
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="relative flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card sm:flex-col sm:items-center sm:gap-5 sm:p-8 sm:text-center"
            >
              <span
                aria-hidden="true"
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-canvas text-lg font-bold leading-none text-gold sm:h-14 sm:w-14 sm:text-xl"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold leading-snug text-parchment sm:text-xl">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-6 text-muted sm:mt-2 sm:max-w-[30ch] sm:leading-7">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p data-reveal="true" className="mt-8 text-center">
          <TextLink href="#ban-mau">Xem một bản luận giải mẫu</TextLink>
        </p>
      </div>
    </section>
  );
}
