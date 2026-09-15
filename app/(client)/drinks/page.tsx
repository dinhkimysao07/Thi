import ProductList from "../../components/ProductList";

export default function DestinationsPage() {
  return (
    <>
      <section className="page-card page-intro">
        <p className="eyebrow">Địa điểm du lịch</p>
        <h1>Những nơi nên ghé ở Kon Tum</h1>
        <p>
          Gợi ý các điểm tham quan, check-in và trải nghiệm thiên nhiên nổi bật
          khi khám phá Kon Tum.
        </p>
      </section>

      <ProductList
        initialCategory="Địa điểm"
        title="Địa điểm du lịch nổi bật"
        description="Danh sách các địa điểm phù hợp để tham quan, chụp ảnh và lên lịch trình ngắn ngày."
      />
    </>
  );
}
