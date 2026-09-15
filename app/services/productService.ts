import { API_ROUTES } from "../constants/routes";
import type { Product } from "../data/products";

export async function getProducts(category?: string): Promise<Product[]> {
  const url = new URL(API_ROUTES.products, window.location.origin);

  if (category && category !== "Tất cả") {
    url.searchParams.set("category", category);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm");
  }

  return response.json();
}

export async function getAdminProducts(): Promise<Product[]> {
  const response = await fetch(API_ROUTES.adminProducts);

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm admin");
  }

  return response.json();
}

export async function createAdminProduct(product: Product): Promise<Product> {
  const response = await fetch(API_ROUTES.adminProducts, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Không thể thêm sản phẩm");
  }

  return response.json();
}

export async function updateAdminProduct(product: Product): Promise<Product> {
  const response = await fetch(API_ROUTES.adminProduct(product.id), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Không thể sửa sản phẩm");
  }

  return response.json();
}

export async function deleteAdminProduct(productId: string): Promise<void> {
  const response = await fetch(API_ROUTES.adminProduct(productId), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Không thể xóa sản phẩm");
  }
}
