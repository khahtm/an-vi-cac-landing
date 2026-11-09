import { FORM_ANCHOR } from "@/lib/site";
import Image from "next/image";
import { ART } from "@/content/art";

const POINTS = ["Bản miễn phí có ngay", "Dịch sư đã luận giải cho hơn 500 người", "Dữ liệu chỉ dùng cho bạn"];

/**
 * Closing call to action. The draft repeated the whole form here, which gave the
 * page two forms with separate state; this sends readers to the one form instead.
 */
export function FinalCtaSection() {
  return (
    <section data-final-cta className="relative isolate overflow-hidden border-t border-line/60 bg-canvas">
      {/* Misty landscape fading up into the page colour. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[78%] opacity-45 [mask-image:linear-gradient(to_top,#000_35%,transparent)]">
        <Image src={ART.mistyScreen.src} alt="" fill sizes="100vw" className="object-cover object-bottom" />
      </div>
      <div className="mx-auto w-full max-w-3xl px-5 pb-28 pt-16 text-center sm:px-8 lg:pb-40 lg:pt-24">
        <p data-reveal="true" className="type-kicker text-gold">
          Lập lá số
        </p>
        <h2 data-reveal="true" className="type-h2 mt-4 font-display font-semibold text-parchment">
          Cùng Ẩn Vi Các đọc lá số của chính bạn
        </h2>
        <p data-reveal="true" className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
          Năm nay nên tiến hay nên giữ, điều gì cần đề phòng sớm? Bắt đầu từ ngày giờ sinh của bạn, chỉ khoảng 2 phút.
        </p>
        <div data-reveal="true" className="mt-8 flex flex-col items-center gap-5">
          <a href={FORM_ANCHOR} className="btn-gold focus-gold w-full sm:w-auto sm:min-w-72">
            Xem lá số của tôi
          </a>
          <ul className="flex flex-col items-center gap-2 text-sm text-muted sm:flex-row sm:gap-6">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gold" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
