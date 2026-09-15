import ProductList from "../../components/ProductList";

export default function CulturePage() {
  return (
    <>
      <section className="page-card page-intro">
        <p className="eyebrow">Văn hóa Kon Tum</p>
        <h1>Nét văn hóa bản địa Tây Nguyên</h1>
        <p>
          Tìm hiểu nhà rông, cồng chiêng và những không gian sinh hoạt cộng
          đồng đặc trưng của Kon Tum.
        </p>
      </section>

      <ProductList
        initialCategory="Văn hóa"
        title="Văn hóa nổi bật"
        description="Các nội dung giúp người xem hiểu hơn về bản sắc văn hóa, lễ hội và đời sống cộng đồng địa phương."
      />
    </>
  );
}
