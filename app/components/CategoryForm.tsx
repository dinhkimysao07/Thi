"use client";

import { useState } from "react";
import type { Category } from "../services/categoryService";

type CategoryFormProps = {
  editingCategory: Category | null;
  onCancelEdit: () => void;
  onSave: (categoryName: string) => void;
};

export default function CategoryForm({
  editingCategory,
  onCancelEdit,
  onSave,
}: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState(editingCategory?.name ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!categoryName.trim()) {
      return;
    }

    onSave(categoryName.trim());
    setCategoryName("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="txtCategoryName">
        Tên danh mục
        <input
          id="txtCategoryName"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
          placeholder="Nhập tên danh mục"
          required
        />
      </label>

      <div className="product-actions">
        <button type="submit">{editingCategory ? "Lưu chỉnh sửa" : "Thêm danh mục"}</button>
        {editingCategory && (
          <button className="logout-button" type="button" onClick={onCancelEdit}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
