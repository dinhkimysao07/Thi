"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatCurrency, getProductPriceValue, useCart } from "../../context/CartContext";
import { ROUTES } from "../../constants/routes";
import { isAdminUser, useUser } from "../../context/UserContext";

export default function CartPage() {
  const { currentUser } = useUser();
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkout,
  } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  if (!currentUser) {
    return (
      <section className="page-card cart-empty">
        <p className="eyebrow">Giỏ hàng</p>
        <h1>Vui lòng đăng nhập</h1>
        <p>Bạn cần đăng nhập tài khoản user để dùng giỏ hàng.</p>
        <Link className="detail-link" href={ROUTES.login}>
          Đăng nhập
        </Link>
      </section>
    );
  }

  if (isAdminUser(currentUser)) {
    return (
      <section className="page-card cart-empty">
        <p className="eyebrow">Giỏ hàng</p>
        <h1>Admin không dùng giỏ hàng</h1>
        <p>Giỏ hàng chỉ dành cho tài khoản user mua sản phẩm.</p>
        <Link className="detail-link" href={ROUTES.admin}>
          Về quản trị
        </Link>
      </section>
    );
  }

  function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      return;
    }

    const orderId = checkout({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
    });

    setName("");
    setPhone("");
    setAddress("");
    setMessage(`Đặt hàng thành công. Mã đơn: ${orderId}`);
  }

  if (items.length === 0) {
    return (
      <section className="page-card cart-empty">
        <p className="eyebrow">Giỏ hàng</p>
        <h1>Chưa có sản phẩm</h1>
        <p>Chọn đặc sản hoặc quà tặng để thêm vào giỏ hàng.</p>
        {message && <p className="form-success">{message}</p>}
        <Link className="detail-link" href={ROUTES.specialties}>
          Xem đặc sản
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="section-heading">
        <p className="eyebrow">Giỏ hàng</p>
        <h1>Thanh toán đơn hàng</h1>
        <p>{totalItems} sản phẩm trong giỏ hàng của bạn.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => {
            const priceValue = getProductPriceValue(item.product.price);

            return (
              <article className="cart-item" key={item.product.id}>
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={92}
                  height={92}
                />
                <div>
                  <span className="category-pill">{item.product.category}</span>
                  <h2>{item.product.name}</h2>
                  <p>{item.product.price}</p>
                  <strong>
                    {priceValue > 0
                      ? formatCurrency(priceValue * item.quantity)
                      : "Liên hệ"}
                  </strong>
                </div>
                <div className="cart-controls">
                  <input
                    min="1"
                    type="number"
                    value={item.quantity}
                    onChange={(event) =>
                      updateQuantity(item.product.id, Number(event.target.value))
                    }
                  />
                  <button
                    className="logout-button"
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Xóa
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="checkout-panel">
          <h2>Thông tin nhận hàng</h2>
          <form className="form" onSubmit={handleCheckout}>
            <label htmlFor="txtCheckoutName">
              Họ tên
              <input
                id="txtCheckoutName"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <label htmlFor="txtCheckoutPhone">
              Số điện thoại
              <input
                id="txtCheckoutPhone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </label>
            <label htmlFor="txtCheckoutAddress">
              Địa chỉ
              <textarea
                id="txtCheckoutAddress"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </label>
            <div className="checkout-total">
              <span>Tổng tiền</span>
              <strong>{formatCurrency(totalPrice)}</strong>
            </div>
            <button type="submit">Thanh toán</button>
            <button className="logout-button" type="button" onClick={clearCart}>
              Xóa giỏ hàng
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
