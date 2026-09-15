import ProductList from "../../components/ProductList";

export default function SpecialtiesPage() {
  return (
    <>
      <section className="page-card page-intro">
        <p className="eyebrow">Đặc sản Kon Tum</p>
        <h1>Đặc sản và quà địa phương</h1>
        <p>
          Các món đặc sản, ẩm thực và quà tặng được chọn để người xem dễ tham
          khảo trước khi đặt mua.
        </p>
      </section>

      <ProductList
        initialCategory="Đặc sản"
        title="Đặc sản nổi bật"
        description="Bấm từng danh mục để xem đặc sản khô, món ăn địa phương hoặc quà tặng phù hợp."
      />
    </>
  );
}
