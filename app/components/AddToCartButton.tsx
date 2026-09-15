"use client";

import { useState } from "react";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { isAdminUser, useUser } from "../context/UserContext";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { currentUser } = useUser();
  const [added, setAdded] = useState(false);

  if (!currentUser || isAdminUser(currentUser)) {
    return null;
  }

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button className="cart-button" type="button" onClick={handleAddToCart}>
      {added ? "Đã thêm" : "Thêm giỏ"}
    </button>
  );
}
