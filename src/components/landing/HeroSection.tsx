import Image from "next/image";
import { BirthChartForm } from "./BirthChartForm";
import { HeroMarquee } from "./HeroMarquee";
import { StarField } from "./StarField";
import { TextLink } from "./TextLink";
import { TodayCard } from "./TodayCard";
import { ART } from "@/content/art";

const BULLETS = [
  "Lá số 12 cung và phần luận tính cách của riêng bạn",
  "1 cảnh báo nên biết sớm cho năm nay",
  "Điểm đặc biệt nhất trong lá số của bạn",
];

/** Phones: a narrow crop of the painting (the scholar among the pines) beside the heading. */
function ArtThumb() {
  return (
    <div aria-hidden="true" className="art-frame relative h-36 w-[96px] sm:h-48 sm:w-36 lg:hidden">
      <Image src={ART.waitingForMoon.src} alt="" fill sizes="144px" className="object-cover object-[38%_62%]" />
    </div>
  );
}

/**
 * Phones: the form comes first and fits the first screen (scripts/first-frame.mjs
 * checks this); the brand heading, bullets and today card follow. The form's own
 * title and the header logo carry the context. DOM order keeps the H1 first.
 * Desktop: copy column on the left, form on the right.
 */
export function HeroSection() {
  return (
    <section className="night-sky relative isolate overflow-hidden">
      <StarField className="absolute inset-0 -z-10" />
      <span aria-hidden="true" className="han-glyph -z-10 left-[4%] top-[6%]">
        命
      </span>
      <div className="shell relative grid gap-8 pb-8 pt-2.5 !px-3 sm:!px-8 sm:pt-8 lg:grid-cols-[1fr_minmax(0,540px)] lg:gap-14 lg:pb-16 lg:pt-12">
        <div className="contents lg:flex lg:flex-col">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-2 sm:px-0 lg:block">
            <div>
              <p className="type-kicker whitespace-nowrap text-muted max-sm:!text-[11px] max-sm:!tracking-[0.2em]">Luận giải Tử Vi Đẩu Số</p>
              <h1 className="type-h1 mt-3 font-display font-bold text-parchment [font-size:clamp(1.7rem,4.4vw,2.85rem)] sm:mt-4">
                {"Lá số Tử\u00a0Vi nói\u00a0gì về năm\u00a0nay của\u00a0bạn?"}
              </h1>
              <p className="mt-3 text-[clamp(1.05rem,3.4vw,1.35rem)] font-medium leading-snug text-gold sm:mt-4">
                Tri thiên mệnh, <span className="whitespace-nowrap">tận nhân lực</span>
              </p>
            </div>
            <ArtThumb />
          </div>

          <div className="order-last flex flex-col px-2 sm:px-0 lg:order-none lg:flex-1">
            <p className="max-w-md text-base leading-7 text-parchment lg:mt-6">
              Nhập ngày giờ sinh, bạn đọc được ngay:
            </p>
            <ul className="mt-5 flex flex-col gap-2">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base leading-7 text-muted">
                  <span aria-hidden="true" className="mt-[13px] h-px w-5 shrink-0 bg-gold/60" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-md text-[15px] leading-6 text-muted">
              Muốn đọc sâu hơn, bản trọn gói có Dịch sư hơn 10 năm nghiên cứu xem lại và viết lời dặn riêng cho bạn.
            </p>
            <TextLink href="#ban-mau" className="mt-4">
              Xem thử một bản luận giải mẫu
            </TextLink>
            <div className="mt-10 hidden lg:block">
              <figure>
                <div className="art-frame relative aspect-[1800/1421] w-full">
                  <Image
                    src={ART.waitingForMoon.src}
                    alt={ART.waitingForMoon.alt}
                    fill
                    sizes="470px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-muted">{ART.waitingForMoon.caption}</figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* "contents" on phones: form first, today card last. Stacked in the right column on desktop. */}
        <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-6 lg:self-start">
          <div
            id="lap-la-so"
            className="relative order-first min-w-0 rounded-2xl border border-line bg-surface/95 px-4 pb-4 pt-3.5 shadow-card sm:p-8 lg:order-none lg:backdrop-blur-[10px]"
          >
            <BirthChartForm />
          </div>
          <TodayCard className="order-last mx-2 min-w-0 sm:mx-0 lg:order-none" />
        </div>
      </div>
      <HeroMarquee />
    </section>
  );
}
