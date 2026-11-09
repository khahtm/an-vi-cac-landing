/**
 * Vietnamese lunar calendar (âm lịch), Hồ Ngọc Đức's algorithm, timezone UTC+7.
 *
 * Uses the Vietnamese meridian, so dates that differ from the Chinese calendar
 * (e.g. Tết 1985) come out the Vietnamese way. Pure functions, no dependencies.
 */

const TZ = 7;
const { PI, sin, floor } = Math;

export const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
export const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const TIET_KHI = [
  "Xuân phân", "Thanh minh", "Cốc vũ", "Lập hạ", "Tiểu mãn", "Mang chủng",
  "Hạ chí", "Tiểu thử", "Đại thử", "Lập thu", "Xử thử", "Bạch lộ",
  "Thu phân", "Hàn lộ", "Sương giáng", "Lập đông", "Tiểu tuyết", "Đại tuyết",
  "Đông chí", "Tiểu hàn", "Đại hàn", "Lập xuân", "Vũ thủy", "Kinh trập",
];
const THU = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

export function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + floor((153 * m + 2) / 5) + 365 * y + floor(y / 4) - floor(y / 100) + floor(y / 400) - 32045;
  if (jd < 2299161) jd = dd + floor((153 * m + 2) / 5) + 365 * y + floor(y / 4) - 32083;
  return jd;
}

function newMoon(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
  let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  jd1 += 0.00033 * sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * sin(M * dr) + 0.0021 * sin(2 * dr * M);
  C1 = C1 - 0.4068 * sin(Mpr * dr) + 0.0161 * sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * sin(dr * 2 * F) - 0.0051 * sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * sin(dr * (M - Mpr)) + 0.0004 * sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * sin(dr * (2 * F - M)) - 0.0006 * sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.001 * sin(dr * (2 * F - Mpr)) + 0.0005 * sin(dr * (2 * Mpr + M));
  const deltat =
    T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return jd1 + C1 - deltat;
}

/** Sun longitude in radians, normalised to [0, 2π). */
function sunLongitude(jdn: number): number {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * sin(dr * 2 * M) + 0.00029 * sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L -= PI * 2 * floor(L / (PI * 2));
  return L;
}

const sunSegment = (dayNumber: number, parts: number) =>
  floor((sunLongitude(dayNumber - 0.5 - TZ / 24) / PI) * (parts / 2));
const newMoonDay = (k: number) => floor(newMoon(k) + 0.5 + TZ / 24);

function lunarMonth11(yy: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = floor(off / 29.530588853);
  const nm = newMoonDay(k);
  return sunSegment(nm, 12) >= 9 ? newMoonDay(k - 1) : nm;
}

function leapMonthOffset(a11: number): number {
  const k = floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let i = 1;
  let arc = sunSegment(newMoonDay(k + i), 12);
  let last: number;
  do {
    last = arc;
    i++;
    arc = sunSegment(newMoonDay(k + i), 12);
  } while (arc !== last && i < 14);
  return i - 1;
}

export type LunarDate = { day: number; month: number; year: number; leap: boolean };

export function solarToLunar(dd: number, mm: number, yy: number): LunarDate {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = newMoonDay(k + 1);
  if (monthStart > dayNumber) monthStart = newMoonDay(k);
  let a11 = lunarMonth11(yy);
  let b11 = a11;
  let year: number;
  if (a11 >= monthStart) {
    year = yy;
    a11 = lunarMonth11(yy - 1);
  } else {
    year = yy + 1;
    b11 = lunarMonth11(yy + 1);
  }
  const day = dayNumber - monthStart + 1;
  const diff = floor((monthStart - a11) / 29);
  let leap = false;
  let month = diff + 11;
  if (b11 - a11 > 365) {
    const leapDiff = leapMonthOffset(a11);
    if (diff >= leapDiff) {
      month = diff + 10;
      if (diff === leapDiff) leap = true;
    }
  }
  if (month > 12) month -= 12;
  if (month >= 11 && diff < 4) year -= 1;
  return { day, month, year, leap };
}

/**
 * Giờ hoàng đạo: starting hour by day branch ("Dần Thân gia Tý, Mão Dậu gia Dần…"),
 * then the 12 spirits; Thanh Long, Minh Đường, Kim Quỹ, Bảo Quang, Ngọc Đường,
 * Tư Mệnh (offsets 0, 1, 4, 5, 7, 10) are the auspicious ones.
 */
const HOANG_DAO_START = [8, 10, 0, 2, 4, 6, 8, 10, 0, 2, 4, 6];
const HOANG_DAO_OFFSETS = [0, 1, 4, 5, 7, 10];
const HOUR_RANGE = [
  "23h đến 1h", "1h đến 3h", "3h đến 5h", "5h đến 7h", "7h đến 9h", "9h đến 11h",
  "11h đến 13h", "13h đến 15h", "15h đến 17h", "17h đến 19h", "19h đến 21h", "21h đến 23h",
];

export type DayInfo = {
  weekday: string;
  solar: { day: number; month: number; year: number };
  lunar: LunarDate;
  dayCanChi: string;
  monthCanChi: string;
  yearCanChi: string;
  tietKhi: string;
  goodHours: { chi: string; range: string }[];
};

export function dayInfo(date: Date): DayInfo {
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yy = date.getFullYear();
  const jd = jdFromDate(dd, mm, yy);
  const lunar = solarToLunar(dd, mm, yy);
  const dayChi = (jd + 1) % 12;
  const start = HOANG_DAO_START[dayChi];
  return {
    weekday: THU[date.getDay()],
    solar: { day: dd, month: mm, year: yy },
    lunar,
    dayCanChi: `${CAN[(jd + 9) % 10]} ${CHI[dayChi]}`,
    monthCanChi: `${CAN[(lunar.year * 12 + lunar.month + 3) % 10]} ${CHI[(lunar.month + 1) % 12]}`,
    yearCanChi: `${CAN[(lunar.year + 6) % 10]} ${CHI[(lunar.year + 8) % 12]}`,
    tietKhi: TIET_KHI[sunSegment(jd + 1, 24)],
    goodHours: HOANG_DAO_OFFSETS.map((o) => (start + o) % 12)
      .sort((a, b) => a - b)
      .map((i) => ({ chi: CHI[i], range: HOUR_RANGE[i] })),
  };
}
