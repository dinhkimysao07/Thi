import Link from "next/link";
import { ROUTES } from "../constants/routes";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <strong>Chạm Kon Tum</strong>
        <p>
          Gợi ý điểm đến, món ngon và đặc sản địa phương cho người yêu Kon Tum.
        </p>
      </div>

      <div className="footer-column">
        <span>Khám phá</span>
        <Link href={ROUTES.homeCategories}>Điểm đến</Link>
        <Link href={ROUTES.specialties}>Đặc sản</Link>
        <Link href={ROUTES.about}>Về chúng tôi</Link>
      </div>

      <div className="footer-column">
        <span>Hỗ trợ</span>
        <Link href={ROUTES.login}>Đăng nhập</Link>
        <Link href={ROUTES.register}>Tạo tài khoản</Link>
        <a href="mailto:hello@chamkontum.vn">hello@chamkontum.vn</a>
      </div>

      <div className="footer-column">
        <span>Liên hệ</span>
        <p>Kon Tum, Việt Nam</p>
        <p>08:00 - 20:00 hằng ngày</p>
        <p>Đặc sản giao trong ngày tại nội thành</p>
      </div>
    </footer>
  );
}
