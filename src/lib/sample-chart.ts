import "server-only";
import { astro } from "iztro";
import { SAMPLE_PERSON, type ChartPalace, type ChartStar, type SampleChart } from "./sample-person";

export { SAMPLE_PERSON };
export type { ChartPalace, ChartStar, SampleChart };

// iztro's vi-VN labels that differ from the usual Vietnamese terms.
const PALACE_NAME: Record<string, string> = { "Tử Nữ": "Tử Tức" };
const BRIGHTNESS: Record<string, { label: string; abbr: string }> = {
  Miếu: { label: "Miếu", abbr: "M" },
  Vượng: { label: "Vượng", abbr: "V" },
  Đắc: { label: "Đắc", abbr: "Đ" },
  Lợi: { label: "Lợi", abbr: "L" },
  Bình: { label: "Bình", abbr: "B" },
  Bất: { label: "Bất", abbr: "Bt" },
  Hạn: { label: "Hãm", abbr: "H" },
  Hãm: { label: "Hãm", abbr: "H" },
};

const star = (s: { name: string; brightness?: string; mutagen?: string }): ChartStar => ({
  name: s.name,
  brightness: s.brightness ? BRIGHTNESS[s.brightness] ?? { label: s.brightness, abbr: s.brightness } : undefined,
  mutagen: s.mutagen || undefined,
});

/** Cached at build time: the chart is fixed, and iztro reads the clock internally. */
export async function getSampleChart(): Promise<SampleChart> {
  "use cache";
  const a = astro.bySolar(SAMPLE_PERSON.solarDate, SAMPLE_PERSON.timeIndex, SAMPLE_PERSON.gender, true, "vi-VN");
  const palaces = a.palaces.map((p) => ({
    name: PALACE_NAME[p.name] ?? p.name,
    branch: p.earthlyBranch,
    stem: p.heavenlyStem,
    isSoul: p.name === "Mệnh",
    isBody: p.isBodyPalace,
    major: p.majorStars.map(star),
    minor: p.minorStars.map(star),
    decadalStart: p.decadal.range[0],
  }));
  return {
    palaces,
    lunarDate: a.lunarDate,
    chineseDate: a.chineseDate.split(" - ").join(", "),
    fiveElementsClass: a.fiveElementsClass,
    soul: a.soul,
    body: a.body,
    bodyPalace: palaces.find((p) => p.isBody)?.name ?? "",
  };
}
