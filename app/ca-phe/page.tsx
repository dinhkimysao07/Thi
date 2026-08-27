import ProductGrid from "@/components/ProductGrid";
import products from "@/data/products.json";

export default function CoffeePage() {
  return (
    <main className="content-wrap">
      <ProductGrid products={products} />
    </main>
  );
}
