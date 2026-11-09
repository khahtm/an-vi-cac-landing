import Image from "next/image";
import { BUSINESS } from "@/content/business";
import { CONTACT_EMAIL, PRIVACY_URL, ZALO_PHONE, ZALO_URL } from "@/lib/site";

const linkClass = "focus-gold break-all text-[15px] text-parchment transition-colors hover:text-gold";
const headClass = "text-xs font-semibold uppercase tracking-[0.2em] text-muted";

/** Business, legal and social blocks render only once filled in src/content/business.ts. */
export function SiteFooter() {
  const policies = [
    { label: "Chính sách bảo mật", href: PRIVACY_URL },
    BUSINESS.termsUrl && { label: "Điều khoản sử dụng", href: BUSINESS.termsUrl },
    BUSINESS.paymentPolicyUrl && { label: "Chính sách thanh toán", href: BUSINESS.paymentPolicyUrl },
    BUSINESS.refundPolicyUrl && { label: "Chính sách hoàn tiền", href: BUSINESS.refundPolicyUrl },
  ].filter(Boolean) as { label: string; href: string }[];
  const company = BUSINESS.company;

  return (
    <footer className="border-t border-line bg-canvas pb-28 pt-12 text-sm lg:py-14">
      <div className="shell">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr] md:gap-10">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <Image src="/images/logo-seal.svg" alt="" width={40} height={40} unoptimized className="h-10 w-10" />
              <p className="text-base font-semibold tracking-[0.06em] text-parchment">Ẩn Vi Các</p>
            </div>
            <p className="mt-2 text-[15px] font-medium text-gold">Tri thiên mệnh, tận nhân lực</p>
            {company && (
              <div className="mt-6 space-y-1 text-[13px] leading-6 text-muted">
                <p className="font-semibold text-parchment">{company.name}</p>
                {company.taxCode && <p>MST: {company.taxCode}</p>}
                {company.address && <p>{company.address}</p>}
                {company.phone && <p>ĐT: {company.phone}</p>}
              </div>
            )}
            {BUSINESS.bctNotificationUrl && (
              <a
                href={BUSINESS.bctNotificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-gold mt-5 inline-block rounded text-[13px] font-medium text-gold underline-offset-4 hover:underline"
              >
                Đã thông báo Bộ Công Thương
              </a>
            )}
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className={headClass}>Liên hệ</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
            <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Zalo {ZALO_PHONE}
            </a>
            {BUSINESS.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className={headClass}>Thông tin</p>
            {policies.map((p) => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {p.label}
              </a>
            ))}
          </div>
        </div>
        <hr className="my-8 border-line" />
        <p className="max-w-2xl text-xs leading-6 text-muted">
          Nội dung mang tính tham khảo văn hóa và tâm linh, không thay thế tư vấn y tế, pháp lý hay tài chính.
        </p>
        <p className="mt-3 text-xs leading-6 text-muted">
          Tranh minh họa thuộc phạm vi công cộng (CC0), từ{" "}
          <a
            href="https://www.clevelandart.org/open-access"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-gold rounded underline underline-offset-2 hover:text-gold"
          >
            Bảo tàng Nghệ thuật Cleveland
          </a>
          .
        </p>
        <p className="mt-1 text-xs text-muted">© 2026 Ẩn Vi Các</p>
      </div>
    </footer>
  );
}
