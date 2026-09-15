"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "../data/products";
import { getCategoriesFromProducts } from "../services/categoryService";
import { getProducts } from "../services/productService";
import ProductItem from "./ProductItem";

type ProductListProps = {
  balancedOnAll?: boolean;
  initialCategory?: Product["category"] | "Tất cả";
  title?: string;
  description?: string;
};

type CategoryFilter = Product["category"] | "Tất cả";

export default function ProductList({
  balancedOnAll = false,
  initialCategory = "Tất cả",
  title = "Khám phá và đặc sản nổi bật",
  description = "Mỗi danh mục có một vài gợi ý để người xem dễ chọn điểm đi, món ăn hoặc đặc sản muốn mua.",
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(() => {
    if (typeof window === "undefined") {
      return initialCategory;
    }

    const category = new URLSearchParams(window.location.search).get("category");
    return category ? (category as Product["category"]) : initialCategory;
  });
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setError("");
      })
      .catch((fetchError) => {
        setError(fetchError.message);
      });
  }, []);

  const categories = useMemo(() => {
    return ["Tất cả", ...getCategoriesFromProducts(products)] as CategoryFilter[];
  }, [products]);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "Tất cả") {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  const balancedProducts = useMemo(() => {
    return categories
      .filter((category): category is Product["category"] => category !== "Tất cả")
      .flatMap((category) =>
        products.filter((product) => product.category === category).slice(0, 2)
      );
  }, [categories, products]);

  function handleCategoryClick(category: CategoryFilter) {
    setActiveCategory(category);

    const url = new URL(window.location.href);
    if (category === "Tất cả") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }

    url.hash = "danh-muc";
    window.history.replaceState(null, "", url);
  }

  const displayProducts =
    balancedOnAll && activeCategory === "Tất cả" ? balancedProducts : visibleProducts;

  return (
    <section className="products-section" id="danh-muc">
      <div className="section-heading">
        <p className="eyebrow">Danh mục chọn lọc</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="category-list" aria-label="Lọc danh mục">
        {categories.map((category) => (
          <button
            className={`category-filter ${
              activeCategory === category ? "category-filter-active" : ""
            }`}
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {displayProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
