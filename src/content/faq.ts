import { BUSINESS } from "./business";

/**
 * FAQ shown on the page and published as FAQPage structured data.
 * Answers restate facts already on the page (form, pricing table, consent copy).
 */
export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Tử Vi Đẩu Số là gì?",
    a: "Tử Vi Đẩu Số là môn luận mệnh cổ của phương Đông. Từ giờ, ngày, tháng, năm sinh, người xem lập nên lá số 12 cung rồi dựa vào các sao và ngũ hành để xem tính cách, xu hướng và các khía cạnh cuộc đời. Nội dung mang tính tham khảo văn hóa và tâm linh, giúp bạn hiểu bản thân và định hướng suy nghĩ.",
  },
  {
    q: "Xem Tử Vi cần những thông tin gì?",
    a: "Bạn nhập 5 mục bắt buộc: Họ tên khai sinh, email, giới tính, ngày sinh dương lịch và giờ sinh theo canh. Ở bước 2, bạn có thể thêm tên thường dùng, điều quan tâm, tình trạng hôn nhân, nghề nghiệp, thu nhập để luận giải sát hơn. Bước này không bắt buộc.",
  },
  {
    q: "Xem lá số có mất phí không?",
    a: "Bản miễn phí hiện ngay khi bạn nhập xong, gồm lá số Tử Vi 12 cung, phần luận tính cách, 1 cảnh báo cho năm nay và điểm đặc biệt trong lá số. Bạn chỉ trả phí khi muốn mở bản trọn gói.",
  },
  {
    q: "Bản trọn gói có thêm gì?",
    a: [
      "Luận sâu tình duyên, sự nghiệp, tài chính, sức khỏe, dự báo 12 tháng và lời khuyên hành động cho năm nay. Dịch sư thật xem lại lá số và thêm lời dặn riêng cho bạn.",
      BUSINESS.fullPrice ? `Giá bản trọn gói: ${BUSINESS.fullPrice}.` : "",
      BUSINESS.reviewTurnaround ? `Dịch sư xem lại và gửi lời dặn ${BUSINESS.reviewTurnaround}.` : "",
    ]
      .filter(Boolean)
      .join(" "),
  },
  {
    q: "Ẩn Vi Các khác các app tử vi ở điểm nào?",
    a: "Ẩn Vi Các cá nhân hóa theo hơn 10 thông tin của riêng bạn, ngoài ngày giờ sinh. Lá số được lập bằng engine riêng theo đúng các luật đã chốt, và bản trả phí có Dịch sư thật xem lại rồi thêm lời dặn riêng.",
  },
  {
    q: "Xem Tử Vi online có chính xác không?",
    a: "Lá số được an đúng theo giờ, ngày, tháng, năm sinh, nên giờ sinh càng rõ thì càng chuẩn. Phần luận giải mang tính tham khảo, giúp bạn hiểu mình và cân nhắc lựa chọn. Quyết định cuối cùng vẫn là của bạn.",
  },
  {
    q: "Có xem được vận hạn năm 2026 không?",
    a: "Có. Bản miễn phí có 1 cảnh báo cho năm nay. Bản trọn gói có dự báo 12 tháng, từng tháng nên làm gì và nên tránh gì.",
  },
  {
    q: "Không biết giờ sinh thì sao?",
    a: "Bạn vẫn xem được. Chọn “Chưa biết giờ” ở mục giờ sinh, hệ thống vẫn lập lá số cho bạn. Một số chi tiết phụ thuộc vào giờ (như cung Thân và vài sao theo giờ) sẽ kém chính xác hơn. Khi nhớ ra giờ sinh, bạn có thể lập lại để chuẩn hơn.",
  },
  {
    q: "Thông tin của tôi có được bảo mật không?",
    a: "Thông tin bạn nhập chỉ dùng để lập lá số, luận giải, gửi kết quả và hỗ trợ cho chính bạn. Trang kết quả được ẩn khỏi công cụ tìm kiếm. Ẩn Vi Các không bán và không chia sẻ dữ liệu của bạn cho bên thứ ba vì mục đích quảng cáo.",
  },
  {
    q: "Thu nhập và xu hướng tính dục được xử lý thế nào?",
    a: "2 mục này không bắt buộc. Chúng chỉ được gửi đi khi bạn đánh dấu ô đồng ý riêng ở bước 2, chỉ dùng để luận giải sát hơn (ví dụ cung Phu Thê) và tự xoá sau 7 ngày.",
  },
];
