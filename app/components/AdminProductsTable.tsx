"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Product } from "../data/products";
import type { Category } from "../services/categoryService";
import { getAdminCategories } from "../services/categoryService";
import {
  createAdminProduct,
  deleteAdminProduct,
  getAdminProducts,
  updateAdminProduct,
} from "../services/productService";
import ProductForm from "./ProductForm";

export default function AdminProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = useCallback(async () => {
    const [productData, categoryData] = await Promise.all([
      getAdminProducts(),
      getAdminCategories(),
    ]);
    setProducts(productData);
    setCategories(categoryData);
    setError("");
  }, []);

  useEffect(() => {
    Promise.all([getAdminProducts(), getAdminCategories()])
      .then(([productData, categoryData]) => {
        setProducts(productData);
        setCategories(categoryData);
        setError("");
      })
      .catch((fetchError) => {
        setError(fetchError.message);
      });
  }, []);

  async function handleSave(product: Product) {
    try {
      if (editingProduct) {
        await updateAdminProduct(product);
        setEditingProduct(null);
        setSuccess("Đã cập nhật sản phẩm");
      } else {
        await createAdminProduct(product);
        setSuccess("Đã thêm sản phẩm mới");
      }

      setShowForm(false);
      await loadData();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Không thể lưu sản phẩm");
    }
  }

  async function handleDelete(productId: string) {
    const confirmed = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteAdminProduct(productId);
      setSuccess("Đã xóa sản phẩm");
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Không thể xóa sản phẩm"
      );
    }
  }

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <strong>Quản lý sản phẩm</strong>
          <span>{products.length} sản phẩm</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          Thêm sản phẩm
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      {showForm && (
        <section className="admin-editor">
          <div className="admin-editor-heading">
            <h2>{editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h2>
            <button
              className="logout-button"
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setShowForm(false);
              }}
            >
              Đóng
            </button>
          </div>
          <ProductForm
            categories={categories}
            editingProduct={editingProduct}
            key={editingProduct?.id ?? "create-product"}
            onCancelEdit={() => {
              setEditingProduct(null);
              setShowForm(false);
            }}
            onSave={handleSave}
          />
        </section>
      )}

      <div className="admin-table" role="table" aria-label="Danh sách sản phẩm">
        <div className="admin-table-row admin-table-head admin-product-row" role="row">
          <span role="columnheader">Ảnh</span>
          <span role="columnheader">Tên</span>
          <span role="columnheader">Danh mục</span>
          <span role="columnheader">Giá</span>
          <span role="columnheader">Thao tác</span>
        </div>
        {products.map((product) => (
          <div className="admin-table-row admin-product-row" role="row" key={product.id}>
            <span className="admin-thumb-wrap" role="cell">
              <Image
                className="admin-thumb"
                src={product.image}
                alt={product.name}
                width={52}
                height={52}
              />
            </span>
            <span role="cell">{product.name}</span>
            <span role="cell">{product.category}</span>
            <span role="cell">{product.price}</span>
            <span className="admin-actions" role="cell">
              <button
                className="logout-button"
                type="button"
                onClick={() => {
                  setEditingProduct(product);
                  setShowForm(true);
                }}
              >
                Sửa
              </button>
              <button
                className="logout-button"
                type="button"
                onClick={() => handleDelete(product.id)}
              >
                Xóa
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
