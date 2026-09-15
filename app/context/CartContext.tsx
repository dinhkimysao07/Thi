"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { Product } from "../data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CheckoutInfo = {
  name: string;
  phone: string;
  address: string;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: (info: CheckoutInfo) => string;
};

const cartKey = "chamKonTumCart";
const ordersKey = "chamKonTumOrders";
const cartChangedEvent = "cartChanged";

const CartContext = createContext<CartContextValue | null>(null);

function getCartJson() {
  if (typeof window === "undefined") {
    return "[]";
  }

  return localStorage.getItem(cartKey) ?? "[]";
}

function parseCart(cartJson: string): CartItem[] {
  try {
    const items = JSON.parse(cartJson) as CartItem[];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(cartKey, JSON.stringify(items));
  window.dispatchEvent(new Event(cartChangedEvent));
}

function subscribeCartChange(onStoreChange: () => void) {
  window.addEventListener(cartChangedEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(cartChangedEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function getProductPriceValue(price: string) {
  const match = price.replace(/\./g, "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const cartJson = useSyncExternalStore(
    subscribeCartChange,
    getCartJson,
    () => "[]"
  );

  const items = useMemo(() => parseCart(cartJson), [cartJson]);

  const addToCart = useCallback(
    (product: Product) => {
      const nextItems = [...items];
      const existingItem = nextItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        nextItems.push({ product, quantity: 1 });
      }

      saveCart(nextItems);
    },
    [items]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      const nextItems = items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0);

      saveCart(nextItems);
    },
    [items]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      saveCart(items.filter((item) => item.product.id !== productId));
    },
    [items]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
  }, []);

  const checkout = useCallback(
    (info: CheckoutInfo) => {
      const orderId = `DH${Date.now()}`;
      const ordersJson = localStorage.getItem(ordersKey) ?? "[]";
      const orders = JSON.parse(ordersJson) as unknown[];

      orders.push({
        id: orderId,
        customer: info,
        items,
        totalPrice: items.reduce(
          (sum, item) =>
            sum + getProductPriceValue(item.product.price) * item.quantity,
          0
        ),
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem(ordersKey, JSON.stringify(orders));
      saveCart([]);
      return orderId;
    },
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + getProductPriceValue(item.product.price) * item.quantity,
        0
      ),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems,
      totalPrice,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      checkout,
    }),
    [
      addToCart,
      checkout,
      clearCart,
      items,
      removeFromCart,
      totalItems,
      totalPrice,
      updateQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart phải được dùng bên trong CartProvider");
  }

  return context;
}
