/** Field definitions for the two-step birth chart form (verbatim from the original). */

export type FieldOption = { value: string; label: string };

export type Field = {
  key: string;
  label: string;
  type: "text" | "email" | "tel" | "radio" | "select" | "date";
  required: boolean;
  placeholder?: string;
  half?: boolean;
  hint?: string;
  /** Hide the hint on phones so step 1 fits on the first screen (the label already says enough). */
  hintFromSm?: boolean;
  /** Text of the empty first option of a select. */
  emptyOption?: string;
  options?: FieldOption[];
};

export type Step = {
  title: string;
  /** Phones show the form before the hero copy, so the form title carries the hook there. */
  mobileTitle?: string;
  subtitle: string;
  fields: Field[];
};

export const BIRTH_HOURS = [
  { name: "Tý", value: "Tý (23-01)", from: "23", to: "01" },
  { name: "Sửu", value: "Sửu (01-03)", from: "01", to: "03" },
  { name: "Dần", value: "Dần (03-05)", from: "03", to: "05" },
  { name: "Mão", value: "Mão (05-07)", from: "05", to: "07" },
  { name: "Thìn", value: "Thìn (07-09)", from: "07", to: "09" },
  { name: "Tỵ", value: "Tỵ (09-11)", from: "09", to: "11" },
  { name: "Ngọ", value: "Ngọ (11-13)", from: "11", to: "13" },
  { name: "Mùi", value: "Mùi (13-15)", from: "13", to: "15" },
  { name: "Thân", value: "Thân (15-17)", from: "15", to: "17" },
  { name: "Dậu", value: "Dậu (17-19)", from: "17", to: "19" },
  { name: "Tuất", value: "Tuất (19-21)", from: "19", to: "21" },
  { name: "Hợi", value: "Hợi (21-23)", from: "21", to: "23" },
];

export const STEPS: Step[] = [
  {
    title: "Lập lá số Tử\u00a0Vi",
    mobileTitle: "Năm nay của bạn ra\u00a0sao?",
    subtitle: "Bản miễn phí hiện ngay khi bạn nhập xong.",
    fields: [
      { key: "name", label: "Họ tên khai sinh", type: "text", required: true, placeholder: "Nguyễn Văn A" },
      {
        key: "email",
        label: "Email nhận lá số",
        type: "email",
        required: true,
        placeholder: "ban@email.com",
        hint: "Để gửi lá số cho bạn và liên hệ khi cần.",
        hintFromSm: true,
      },
      {
        key: "gender",
        label: "Giới tính",
        type: "radio",
        required: true,
        options: [
          { value: "male", label: "Nam" },
          { value: "female", label: "Nữ" },
          { value: "non_binary", label: "Non-binary" },
          { value: "other", label: "Khác" },
        ],
      },
      { key: "dob", label: "Ngày sinh dương lịch", type: "date", required: true },
      {
        key: "birthTime",
        label: "Giờ sinh (theo canh)",
        type: "select",
        required: true,
        options: [
          { value: "Chưa biết giờ", label: "Chưa biết giờ" },
          ...BIRTH_HOURS.map((h) => ({ value: h.value, label: `${h.name} (${h.from}h đến ${h.to}h)` })),
        ],
        emptyOption: "Chọn giờ sinh",
        hint: 'Chọn khung canh giờ; chưa rõ thì chọn "Chưa biết giờ"',
        hintFromSm: true,
      },
    ],
  },
  {
    title: "Thêm vài điều để luận sát hơn",
    subtitle:
      "Càng nhiều thông tin, luận giải càng sát với bạn. Bước này không bắt buộc, mục nào chưa muốn trả lời thì cứ để trống.",
    fields: [
      { key: "commonName", label: "Tên thường dùng", type: "text", required: false, placeholder: "Tên bạn bè hay gọi" },
      {
        key: "concern",
        label: "Điều bạn quan tâm nhất",
        type: "radio",
        required: false,
        options: [
          { value: "love", label: "Tình duyên" },
          { value: "career", label: "Sự nghiệp" },
          { value: "health", label: "Sức khỏe" },
          { value: "finance", label: "Tài chính" },
          { value: "study", label: "Học tập" },
          { value: "general", label: "Tổng quan" },
        ],
      },
      {
        key: "relationshipStatus",
        label: "Tình trạng hôn nhân",
        type: "radio",
        required: false,
        options: [
          { value: "single", label: "Độc thân" },
          { value: "in_relationship", label: "Đang hẹn hò" },
          { value: "married", label: "Đã kết hôn" },
          { value: "divorced", label: "Đã ly hôn" },
          { value: "widowed", label: "Góa" },
        ],
      },
      { key: "occupation", label: "Nghề nghiệp", type: "text", required: false, placeholder: "VD: Kinh doanh, kỹ sư…" },
      {
        key: "incomeRange",
        label: "Thu nhập hàng tháng",
        type: "select",
        required: false,
        options: [
          { value: "under_5m", label: "Dưới 5 triệu" },
          { value: "5m_10m", label: "5 – 10 triệu" },
          { value: "10m_20m", label: "10 – 20 triệu" },
          { value: "over_20m", label: "Trên 20 triệu" },
          { value: "dependent", label: "Phụ thuộc người thân" },
        ],
      },
      {
        key: "sexualOrientation",
        label: "Xu hướng tính dục",
        type: "select",
        required: false,
        options: [
          { value: "heterosexual", label: "Dị tính (thích người khác giới)" },
          { value: "homosexual", label: "Đồng tính (thích người cùng giới)" },
          { value: "bisexual", label: "Song tính (thích cả hai giới)" },
          { value: "asexual", label: "Vô tính (không bị hấp dẫn tính dục)" },
          { value: "other", label: "Khác / không muốn nói" },
        ],
        hint: "Giúp luận giải cung Phu Thê đúng với bạn. Chỉ được dùng khi bạn đánh dấu ô đồng ý riêng bên dưới và tự xoá sau 7 ngày.",
      },
      { key: "phone", label: "Số điện thoại", type: "tel", required: false, placeholder: "09xxxxxxxx", half: true, hint: "Để thầy liên hệ khi cần." },
      { key: "zalo", label: "Zalo", type: "tel", required: false, placeholder: "Nếu khác số điện thoại", half: true },
    ],
  },
];

export const INVALID_DATE = "invalid-date";

export function validateField(field: Field, raw: string | undefined): string {
  const v = (raw ?? "").trim();
  if (field.required && !v) return "Vui lòng nhập thông tin này";
  if (!v) return "";
  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Email không hợp lệ (VD: ban@email.com)";
  if (field.type === "tel" && !/^(0\d{9}|\+?84\d{9})$/.test(v)) return "Số điện thoại không hợp lệ (VD: 0901234567)";
  if (field.key === "dob") {
    if (v === INVALID_DATE) return "Ngày này không có thật (ví dụ 31/02). Bạn kiểm tra lại ngày và tháng.";
    const d = new Date(v);
    if (Number.isNaN(d.getTime()) || d > new Date()) return "Ngày sinh không hợp lệ";
  }
  return "";
}
