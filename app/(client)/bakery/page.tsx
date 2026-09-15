import ProductList from "../../components/ProductList";

export default function CuisinePage() {
  return (
    <>
      <section className="page-card page-intro">
        <p className="eyebrow">Ẩm thực Kon Tum</p>
        <h1>Món ngon và hương vị địa phương</h1>
        <p>
          Tổng hợp các món ăn, thức uống và đặc sản gắn với trải nghiệm du lịch
          Kon Tum.
        </p>
      </section>

      <ProductList
        initialCategory="Ẩm thực"
        title="Ẩm thực nên thử"
        description="Các món ăn địa phương và đặc sản phù hợp để thưởng thức hoặc mua làm quà."
      />
    </>
  );
}
