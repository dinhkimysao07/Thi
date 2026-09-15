"use client";

import { useCallback, useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import type { Category } from "../services/categoryService";
import {
  createAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  updateAdminCategory,
} from "../services/categoryService";

export default function AdminCategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadCategories = useCallback(async () => {
    const data = await getAdminCategories();
    setCategories(data);
    setError("");
  }, []);

  useEffect(() => {
    getAdminCategories()
      .then((data) => {
        setCategories(data);
        setError("");
      })
      .catch((fetchError) => {
        setError(fetchError.message);
      });
  }, []);

  async function handleSave(categoryName: string) {
    try {
      if (editingCategory) {
        await updateAdminCategory(editingCategory.id, categoryName);
        setEditingCategory(null);
        setSuccess("Đã cập nhật danh mục");
      } else {
        await createAdminCategory(categoryName);
        setSuccess("Đã thêm danh mục mới");
      }

      setShowForm(false);
      await loadCategories();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Không thể lưu danh mục");
    }
  }

  async function handleDelete(category: Category) {
    const confirmed = window.confirm("Bạn có chắc muốn xóa danh mục này?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteAdminCategory(category.id);
      setSuccess("Đã xóa danh mục");
      await loadCategories();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Không thể xóa danh mục"
      );
    }
  }

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <strong>Quản lý danh mục</strong>
          <span>{categories.length} danh mục</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
        >
          Thêm danh mục
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      {showForm && (
        <section className="admin-editor">
          <div className="admin-editor-heading">
            <h2>{editingCategory ? "Sửa danh mục" : "Thêm danh mục"}</h2>
            <button
              className="logout-button"
              type="button"
              onClick={() => {
                setEditingCategory(null);
                setShowForm(false);
              }}
            >
              Đóng
            </button>
          </div>
          <CategoryForm
            editingCategory={editingCategory}
            key={editingCategory?.id ?? "create-category"}
            onCancelEdit={() => {
              setEditingCategory(null);
              setShowForm(false);
            }}
            onSave={handleSave}
          />
        </section>
      )}

      <div className="admin-table" role="table" aria-label="Danh sách danh mục">
        <div className="admin-table-row admin-table-head admin-category-row" role="row">
          <span role="columnheader">Tên danh mục</span>
          <span role="columnheader">Số sản phẩm</span>
          <span role="columnheader">Thao tác</span>
        </div>
        {categories.map((category) => (
          <div className="admin-table-row admin-category-row" role="row" key={category.id}>
            <span role="cell">{category.name}</span>
            <span role="cell">{category.totalProducts}</span>
            <span className="admin-actions" role="cell">
              <button
                className="logout-button"
                type="button"
                onClick={() => {
                  setEditingCategory(category);
                  setShowForm(true);
                }}
              >
                Sửa
              </button>
              <button
                className="logout-button"
                type="button"
                onClick={() => handleDelete(category)}
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
