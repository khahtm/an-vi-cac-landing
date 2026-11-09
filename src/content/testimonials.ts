/**
 * Real feedback from people the Dịch sư has read for, shared with their permission.
 *
 * The "Người dùng nói gì" section stays hidden while this list is empty, so the
 * page never shows placeholder cards. Add at least 3 before it appears.
 *
 * Example:
 *   { quote: "…", name: "Chị H.", detail: "34 tuổi, TP.HCM", context: "Bản trọn gói, 09/2026" }
 */
export type Testimonial = { quote: string; name: string; detail?: string; context?: string };

export const TESTIMONIALS: Testimonial[] = [];

export const MIN_TESTIMONIALS_TO_SHOW = 3;
