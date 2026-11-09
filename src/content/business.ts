/**
 * Business details that only the owner can supply.
 *
 * Every field is optional: the page renders a block only when its data is
 * filled in, so nothing half-empty or "Đang cập nhật" ever reaches visitors.
 * Fill these in, then rebuild.
 */

export type Business = {
  /** Giá bản trọn gói, ví dụ "399.000đ". Hiện dưới bảng so sánh và trong FAQ. */
  fullPrice: string | null;
  /** Thời gian Dịch sư xem lại, ví dụ "trong 48 giờ". */
  reviewTurnaround: string | null;
  /** Phương thức thanh toán, ví dụ ["Chuyển khoản", "Ví MoMo"]. */
  paymentMethods: string[];
  /** Tên pháp lý, MST, địa chỉ: hiện ở chân trang khi có. */
  company: { name: string; taxCode?: string; address?: string; phone?: string } | null;
  /**
   * Link hồ sơ "Đã thông báo Bộ Công Thương" (online.gov.vn) nếu website đã đăng ký.
   * Chỉ điền khi đã có thật; badge này là dấu xác nhận pháp lý.
   */
  bctNotificationUrl: string | null;
  termsUrl: string | null;
  paymentPolicyUrl: string | null;
  refundPolicyUrl: string | null;
  socials: { label: string; href: string }[];
};

export const BUSINESS: Business = {
  fullPrice: null,
  reviewTurnaround: null,
  paymentMethods: [],
  company: null,
  bctNotificationUrl: null,
  termsUrl: null,
  paymentPolicyUrl: null,
  refundPolicyUrl: null,
  socials: [],
};
