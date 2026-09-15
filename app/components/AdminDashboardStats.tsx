"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "../data/products";
import { getAdminCategories } from "../services/categoryService";
import { getAdminProducts } from "../services/productService";

export default function AdminDashboardStats() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getAdminProducts(), getAdminCategories()])
      .then(([productData, categoryData]) => {
        setProducts(productData);
        setTotalCategories(categoryData.length);
        setError("");
      })
      .catch((fetchError) => {
        setError(fetchError.message);
      });
  }, []);

  const totalLikes = useMemo(() => {
    return products.reduce((sum, product) => sum + product.likes, 0);
  }, [products]);

  if (error) {
    return <p className="form-error">{error}</p>;
  }

  return (
    <div className="admin-stats">
      <article>
        <span>Sản phẩm</span>
        <strong>{products.length}</strong>
      </article>
      <article>
        <span>Danh mục</span>
        <strong>{totalCategories}</strong>
      </article>
      <article>
        <span>Lượt thích</span>
        <strong>{totalLikes}</strong>
      </article>
    </div>
  );
}
