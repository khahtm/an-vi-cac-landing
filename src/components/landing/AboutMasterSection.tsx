import Image from "next/image";
import { SectionCta } from "./SectionCta";
import { ART } from "@/content/art";

const STATS = [
  { value: "2011", label: "Bắt đầu nghiên cứu Tử Vi" },
  { value: "500+", label: "Người được thầy luận giải" },
  { value: "100%", label: "Bản trả phí được thầy xem lại" },
];

/** The round fan painting, shown as a circle (as it was painted). */
function FanPainting({ className, sizes }: { className: string; sizes: string }) {
  return (
    <div className={`relative aspect-square overflow-hidden rounded-full shadow-card outline outline-1 -outline-offset-1 outline-line ${className}`}>
      <Image src={ART.risingClouds.src} alt={ART.risingClouds.alt} fill sizes={sizes} className="scale-[1.08] object-cover" />
    </div>
  );
}

export function AboutMasterSection() {
  return (
    <section id="ve-dich-su" className="section-pad border-t border-line/60">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-center lg:gap-20">
          <figure data-reveal="true" className="hidden lg:block">
            <FanPainting className="w-full" sizes="320px" />
            <figcaption className="mt-3 text-center text-xs text-muted">{ART.risingClouds.caption}</figcaption>
          </figure>
          <div>
            <div data-reveal="true" className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:block">
              <div>
                <p className="type-kicker text-muted">Về Dịch sư</p>
                <h2 className="type-h2 mt-4 font-display font-semibold text-parchment">Người đọc lại lá số của bạn</h2>
              </div>
              <FanPainting className="w-24 sm:w-32 lg:hidden" sizes="128px" />
            </div>
            <div data-reveal="true">
              <p className="mt-6 max-w-xl text-base leading-8 text-muted">
                {"Dịch sư của Ẩn Vi Các nghiên cứu Tử Vi Đẩu Số từ năm "}
                <strong className="font-medium text-parchment">2011</strong>
                {" và đã trực tiếp luận giải lá số cho "}
                <strong className="font-medium text-parchment">hơn 500 người</strong>.
              </p>
              <p className="mt-4 max-w-xl text-base leading-8 text-muted">
                {"Với mỗi "}
                <strong className="font-medium text-parchment">bản luận giải trả phí</strong>, thầy đích thân xem lại lá
                số và viết thêm lời dặn riêng cho bạn.
              </p>
            </div>
            <dl data-reveal="true" className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-6 sm:mt-12 sm:gap-8">
              {STATS.map((s) => (
                <div key={s.value}>
                  <dt className="text-2xl font-bold leading-none text-gold sm:text-[1.75rem]">
                    {s.value}
                  </dt>
                  <dd className="mt-2 text-[13px] leading-5 text-muted sm:mt-3 sm:text-sm sm:leading-6">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <SectionCta className="mt-12 sm:mt-14" label="Lập lá số của bạn" />
      </div>
    </section>
  );
}
