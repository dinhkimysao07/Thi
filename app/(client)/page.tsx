import Link from "next/link";
import ProductList from "../components/ProductList";
import { ROUTES } from "../constants/routes";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Du lịch - văn hóa - ẩm thực</p>
          <h1>Chạm vào nhịp sống Kon Tum</h1>
          <p>
            Khám phá những điểm đến nổi bật, nét văn hóa Tây Nguyên và các món
            đặc sản địa phương đáng thử khi đến Kon Tum.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href={ROUTES.homeCategories}>
              Khám phá ngay
            </Link>
            <Link className="ghost-link" href={ROUTES.specialties}>
              Xem đặc sản
            </Link>
          </div>
        </div>
      </section>

      <section className="culture-band">
        <div className="section-heading">
          <p className="eyebrow">Nội dung chính</p>
          <h2>Kon Tum có gì nổi bật?</h2>
          <p>
            Website tập trung vào ba nhóm nội dung: địa điểm du lịch, văn hóa
            bản địa và ẩm thực - đặc sản.
          </p>
        </div>
        <div className="culture-grid">
          <Link className="culture-card" href={ROUTES.homeByCategory("Địa điểm")}>
            <span>Địa điểm</span>
            <p>Măng Đen, cầu treo Kon Klor và các điểm dừng chân nổi bật.</p>
          </Link>
          <Link className="culture-card" href={ROUTES.homeByCategory("Văn hóa")}>
            <span>Văn hóa</span>
            <p>Nhà rông, cồng chiêng và đời sống cộng đồng Tây Nguyên.</p>
          </Link>
          <Link className="culture-card" href={ROUTES.homeByCategory("Ẩm thực")}>
            <span>Ẩm thực</span>
            <p>Cơm lam, gà nướng, bò một nắng và quà địa phương.</p>
          </Link>
        </div>
      </section>

      <ProductList balancedOnAll />
    </>
  );
}
