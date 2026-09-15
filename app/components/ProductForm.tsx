"use client";

import { useMemo, useState } from "react";
import type { Product } from "../data/products";
import type { Category } from "../services/categoryService";

type ProductFormProps = {
  categories: Category[];
  editingProduct: Product | null;
  onCancelEdit: () => void;
  onSave: (product: Product) => Promise<void>;
};

const emptyProduct: Product = {
  id: "",
  name: "",
  category: "",
  price: "",
  likes: 0,
  image: "",
  shortDescription: "",
  description: "",
  cultureNote: "",
};

export default function ProductForm({
  categories,
  editingProduct,
  onCancelEdit,
  onSave,
}: ProductFormProps) {
  const [product, setProduct] = useState<Product>(editingProduct ?? emptyProduct);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const categoryOptions = useMemo(() => categories.map((category) => category.name), [
    categories,
  ]);

  function updateField(field: keyof Product, value: string) {
    setProduct((currentProduct) => ({
      ...currentProduct,
      [field]: field === "likes" ? Number(value) : value,
    }));
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Không thể tải ảnh lên");
      }

      const data = (await response.json()) as { imageUrl: string };
      updateField("image", data.imageUrl);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = editingProduct?.id ?? "";

    if (!product.name.trim() || !product.category.trim()) {
      return;
    }

    try {
      setSaving(true);
      await onSave({
        ...product,
        id,
        name: product.name.trim(),
        category: product.category.trim(),
        price: product.price.trim(),
        image: product.image.trim(),
        shortDescription: product.shortDescription.trim(),
        description: product.description.trim(),
        cultureNote: product.cultureNote.trim(),
        likes: Number(product.likes) || 0,
      });

      if (!editingProduct) {
        setProduct(emptyProduct);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="form admin-product-form" onSubmit={handleSubmit}>
      <label htmlFor="txtProductName">
        Tên sản phẩm
        <input
          id="txtProductName"
          value={product.name}
          onChange={(event) => updateField("name", event.target.value)}
          required
        />
      </label>

      <label htmlFor="txtProductCategory">
        Danh mục
        <select
          id="txtProductCategory"
          value={product.category}
          onChange={(event) => updateField("category", event.target.value)}
          required
        >
          <option value="">Chọn danh mục</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="txtProductPrice">
        Giá
        <input
          id="txtProductPrice"
          value={product.price}
          onChange={(event) => updateField("price", event.target.value)}
        />
      </label>

      <label htmlFor="txtProductLikes">
        Like
        <input
          id="txtProductLikes"
          min="0"
          type="number"
          value={product.likes}
          onChange={(event) => updateField("likes", event.target.value)}
        />
      </label>

      <label htmlFor="txtProductImage">
        Ảnh
        <input
          id="txtProductImage"
          value={product.image}
          onChange={(event) => updateField("image", event.target.value)}
          placeholder="Dán link ảnh hoặc chọn file bên dưới"
        />
        <input
          accept="image/*"
          id="fileProductImage"
          type="file"
          onChange={handleImageUpload}
        />
        {uploading && <span className="form-hint">Đang tải ảnh...</span>}
      </label>

      <label htmlFor="txtProductShortDescription">
        Mô tả ngắn
        <textarea
          id="txtProductShortDescription"
          value={product.shortDescription}
          onChange={(event) => updateField("shortDescription", event.target.value)}
        />
      </label>

      <label htmlFor="txtProductDescription">
        Mô tả
        <textarea
          id="txtProductDescription"
          value={product.description}
          onChange={(event) => updateField("description", event.target.value)}
        />
      </label>

      <label htmlFor="txtProductCultureNote">
        Gợi ý
        <textarea
          id="txtProductCultureNote"
          value={product.cultureNote}
          onChange={(event) => updateField("cultureNote", event.target.value)}
        />
      </label>

      <div className="product-actions">
        <button type="submit" disabled={saving}>
          {editingProduct ? "Lưu sản phẩm" : "Thêm sản phẩm"}
        </button>
        {editingProduct && (
          <button className="logout-button" type="button" onClick={onCancelEdit}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
