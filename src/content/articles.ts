/**
 * "Kiến thức Tử Vi Đẩu Số" articles.
 *
 * The section is hidden until at least one article has real content. Topics
 * already planned in the draft (write them, then move them into ARTICLES):
 *   - Ba sai lầm lớn nhất khi xem tử vi
 *   - Tử vi truyền thống và hiện đại khác nhau ở đâu
 *   - AI trong tử vi: dùng thế nào cho đúng
 *   - Tử vi giúp được gì và không giúp được gì
 *   - Bốn yếu tố ảnh hưởng đến số phận
 */
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2026-11-08". */
  publishedAt: string;
  /** Paragraphs of the article body. */
  body: string[];
  /** Han glyph used as the card artwork. */
  glyph?: string;
};

export const ARTICLES: Article[] = [];
