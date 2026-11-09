const ROW_A = [
  "Năm nay nên tiến hay nên giữ?",
  "Điều gì cần đề phòng sớm?",
  "Điểm mạnh của bạn nằm ở đâu?",
  "Lá số của bạn có gì đặc biệt?",
  "Dịch sư dặn bạn điều gì?",
];
const ROW_B = [
  "Người thế nào hợp với bạn?",
  "Nghề nào hợp mệnh?",
  "Năm nào được, năm nào hao?",
  "Sức khỏe cần giữ ở đâu?",
  "Từng tháng nên làm gì?",
  "Giai đoạn nào nên bứt phá?",
];

function Pill({ label }: { label: string }) {
  return (
    <div className="flex h-10 w-max items-center justify-center gap-3 rounded-full border border-line bg-surface/70 px-3 py-2 sm:h-14 sm:p-3">
      <p className="break-words text-xs font-normal text-muted sm:text-sm">{label}</p>
    </div>
  );
}

/**
 * Two rows of pills drifting in opposite directions.
 *
 * The original drives this with Swiper autoplay (delay 0, linear, loop). A CSS
 * keyframe loop over a doubled list gives the same motion without the library;
 * reduced-motion users get the static wrapped list, as in the original.
 */
function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Three copies per half keep the track wider than any common viewport.
  const half = Array.from({ length: 3 }, () => items).flat();
  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track [--marquee-duration:220s] [--marquee-gap:12px] sm:[--marquee-gap:16px] min-[1440px]:[--marquee-duration:360s]"
        data-reverse={reverse || undefined}
      >
        {[...half, ...half].map((label, i) => (
          <Pill key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}

export function HeroMarquee() {
  return (
    <div aria-hidden="true" className="relative w-full py-6 sm:py-12">
      <div className="relative z-20 flex flex-col gap-3 overflow-hidden motion-reduce:hidden sm:gap-4">
        <Row items={ROW_A} />
        <Row items={ROW_B} reverse />
      </div>
      <div className="shell hidden flex-wrap justify-center gap-3 motion-reduce:flex">
        {[...ROW_A, ...ROW_B].map((label) => (
          <Pill key={label} label={label} />
        ))}
      </div>
    </div>
  );
}
