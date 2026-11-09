/**
 * Sample person and chart types, shared by the server (chart computation in
 * sample-chart.ts) and the interactive chart component on the client.
 */
/**
 * The person behind the sample chart in "Bản luận giải mẫu".
 *
 * Computed at build time with iztro (MIT, Zi Wei Dou Shu engine) for a fictional
 * person, so every star placement is real rather than drawn by hand. NOTE: if
 * Ẩn Vi Các's own engine follows a different school (Tứ Hóa table, brightness),
 * export this chart from that engine instead so the sample matches what
 * customers will actually receive.
 */
export const SAMPLE_PERSON = {
  name: "An",
  gender: "female" as const,
  genderLabel: "Nữ",
  solarDate: "1990-10-18",
  solarLabel: "18/10/1990",
  /** iztro time index: 0 = Tý sớm, 1 = Sửu … 7 = Mùi … 12 = Tý muộn */
  timeIndex: 7,
  hourLabel: "giờ Mùi (13h đến 15h)",
};

export type ChartStar = { name: string; brightness?: { label: string; abbr: string }; mutagen?: string };
export type ChartPalace = {
  name: string;
  branch: string;
  stem: string;
  isSoul: boolean;
  isBody: boolean;
  major: ChartStar[];
  minor: ChartStar[];
  /** Age at which this palace's 10-year period (đại hạn) starts, as traditional charts show it. */
  decadalStart: number;
};
export type SampleChart = {
  palaces: ChartPalace[];
  lunarDate: string;
  chineseDate: string;
  fiveElementsClass: string;
  soul: string;
  body: string;
  bodyPalace: string;
};

