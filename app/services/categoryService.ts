import { API_ROUTES } from "../constants/routes";
import type { Product } from "../data/products";

export type Category = {
  id: string;
  name: string;
  totalProducts: number;
};

export function getCategoriesFromProducts(products: Product[]) {
  return Array.from(new Set(products.map((product) => product.category)));
}

export async function getAdminCategories(): Promise<Category[]> {
  const response = await fetch(API_ROUTES.adminCategories);

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách danh mục");
  }

  return response.json();
}

export async function createAdminCategory(name: string): Promise<Category> {
  const response = await fetch(API_ROUTES.adminCategories, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Không thể thêm danh mục");
  }

  return response.json();
}

export async function updateAdminCategory(
  categoryId: string,
  name: string
): Promise<Category> {
  const response = await fetch(API_ROUTES.adminCategory(categoryId), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Không thể sửa danh mục");
  }

  return response.json();
}

export async function deleteAdminCategory(categoryId: string): Promise<void> {
  const response = await fetch(API_ROUTES.adminCategory(categoryId), {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(data?.message ?? "Không thể xóa danh mục");
  }
}
