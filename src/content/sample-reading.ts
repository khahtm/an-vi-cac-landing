/**
 * Excerpts for the sample chart (fictional "An", nữ, 18/10/1990, giờ Mùi).
 *
 * Every claim is tied to a placement in the computed chart:
 * - Mệnh tại Mão: Thái Dương (Miếu, Hóa Lộc) + Thiên Lương (Miếu) + Văn Xương
 *   → cách Dương Lương Xương Lộc.
 * - 2026 Bính Ngọ: Liêm Trinh hóa Kỵ ở Tật Ách; lưu niên Mệnh tại Ngọ = Điền Trạch
 *   có Địa Kiếp; Văn Xương hóa Khoa ở Mệnh.
 * Have the Dịch sư read and adjust this wording before launch.
 */
export type Excerpt = { label: string; tier: "free" | "full"; title: string; body: string; note?: string };

export const SAMPLE_EXCERPTS: Excerpt[] = [
  {
    label: "Tính cách",
    tier: "free",
    title: "Người giữ chữ tín, thích lo cho người khác",
    body: "Thái Dương và Thiên Lương cùng miếu địa ở Mệnh, lại có Văn Xương và Hóa Lộc. Bạn sáng sủa, nói thẳng, có duyên với chữ nghĩa và hay đứng ra che chở người khác. Bạn hợp những việc cần uy tín và chuyên môn như giảng dạy, tư vấn, y, luật. Điểm cần lưu ý: Bạn dễ ôm việc của người khác vào mình vì cả nể.",
  },
  {
    label: "Cảnh báo 2026",
    tier: "free",
    title: "Giữ sức khỏe, chậm lại với nhà đất",
    body: "Năm Bính Ngọ, Liêm Trinh hóa Kỵ rơi vào cung Tật Ách. Bạn nên để ý căng thẳng kéo dài và giấc ngủ, đi khám định kỳ sớm. Lưu niên đi vào Điền Trạch gặp Địa Kiếp, việc mua bán nhà đất nên đợi giấy tờ rõ ràng rồi mới xuống tiền.",
  },
  {
    label: "Điểm đặc biệt",
    tier: "free",
    title: "Năm thuận cho học thêm và tạo tên tuổi",
    body: "Văn Xương hóa Khoa đi vào Mệnh trong năm nay. Đây là lúc nên học thêm, thi chứng chỉ, viết hoặc chia sẻ chuyên môn. Công sức bỏ ra năm nay dễ được ghi nhận hơn mọi năm.",
  },
  {
    label: "Lời dặn của Dịch sư",
    tier: "full",
    title: "Giữ chữ tín, đi chậm mà chắc",
    body: "Lá số đẹp nhất ở chữ tín. Năm nay việc học thì làm ngay, việc nhà đất thì chậm một nhịp. Ai nhờ gì cũng nhận là lúc bạn dễ kiệt sức nhất, hãy cho mình 1 ngày suy nghĩ trước khi gật đầu.",
    note: "Mẫu minh họa. Ở bản trọn gói, Dịch sư viết lời dặn riêng cho lá số của bạn.",
  },
];
