import type { Product } from "../data/products";

export const ROUTES = {
  home: "/",
  homeCategories: "/#danh-muc",
  about: "/about",
  specialties: "/specialties",
  destinations: "/drinks",
  culture: "/snacks",
  cuisine: "/bakery",
  drinks: "/drinks",
  snacks: "/snacks",
  bakery: "/bakery",
  cart: "/cart",
  login: "/login",
  register: "/register",
  admin: "/admin",
  adminProducts: "/admin/products",
  adminCategories: "/admin/categories",
  detail: (productId: string) => `/detail/${productId}`,
  homeByCategory: (category: Product["category"]) =>
    `/?category=${encodeURIComponent(category)}#danh-muc`,
} as const;

export const API_ROUTES = {
  products: "/api/products",
  adminProducts: "/api/admin/products",
  adminProduct: (productId: string) =>
    `/api/admin/products/${encodeURIComponent(productId)}`,
  adminCategories: "/api/admin/categories",
  adminCategory: (categoryId: string) =>
    `/api/admin/categories/${encodeURIComponent(categoryId)}`,
  relatedProducts: (currentProductId: string) =>
    `/api/products?exclude=${encodeURIComponent(currentProductId)}`,
  cart: "/api/cart",
} as const;
