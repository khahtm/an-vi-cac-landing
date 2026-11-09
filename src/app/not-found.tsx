import Link from "next/link";
import { FORM_ANCHOR } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="type-kicker text-gold">Lỗi 404</p>
      <h1 className="type-h2 mt-4 font-semibold text-parchment">Không tìm thấy trang này</h1>
      <p className="mt-4 text-base leading-7 text-muted">Đường dẫn có thể đã thay đổi. Bạn quay về trang chủ để xem lá số nhé.</p>
      <Link href={`/${FORM_ANCHOR}`} className="btn-gold focus-gold mt-8 w-full sm:w-auto">
        Về trang chủ
      </Link>
    </main>
  );
}
