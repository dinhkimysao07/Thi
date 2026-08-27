type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const priceFormatter = new Intl.NumberFormat("vi-VN");

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="product-section">
      <h1>Cà Phê Tại Nhà</h1>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="image-box">
              <img src={product.image} alt={product.name} />
            </div>
            <h2>{product.name}</h2>
            <p>{priceFormatter.format(product.price)} đ</p>
          </article>
        ))}
      </div>
    </section>
  );
}
