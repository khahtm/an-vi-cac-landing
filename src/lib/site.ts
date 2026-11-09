/**
 * Site-wide links and settings.
 *
 * The landing page only collects the birth details; the main app at APP_URL
 * builds the chart (/api/quiz) and shows the result (/ket-qua/{id}).
 */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://an-vi-cac.vercel.app").replace(/\/$/, "");

export const PRIVACY_URL = `${APP_URL}/chinh-sach-bao-mat`;
export const ZALO_URL = "https://zalo.me/0931341420";
export const CONTACT_EMAIL = "hoanganhdayvan@gmail.com";
export const ZALO_PHONE = "0931341420";

export const FORM_ANCHOR = "#lap-la-so";

export const NAV_LINKS = [
  { href: FORM_ANCHOR, label: "Lập lá số" },
  { href: "#cach-hoat-dong", label: "Cách hoạt động" },
  { href: "#ban-mau", label: "Bản mẫu" },
  { href: "#ban-luan-giai", label: "Gói luận giải" },
  { href: "#ve-dich-su", label: "Về Dịch sư" },
  { href: "#cau-hoi", label: "Câu hỏi" },
] as const;

export const resultUrl = (id: string) => `${APP_URL}/ket-qua/${encodeURIComponent(id)}`;
