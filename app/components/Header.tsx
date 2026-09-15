"use client";

import Link from "next/link";
import { ROUTES } from "../constants/routes";
import { useCart } from "../context/CartContext";
import { isAdminUser, useUser } from "../context/UserContext";

export default function Header() {
  const { currentUser, logout } = useUser();
  const { totalItems } = useCart();
  const isAdmin = isAdminUser(currentUser);
  const isUser = currentUser && !isAdmin;

  return (
    <header className="site-header">
      <Link className="brand" href={ROUTES.home}>
        Chạm Kon Tum
      </Link>
      <nav className="nav-links" aria-label="Điều hướng chính">
        <Link href={ROUTES.home}>Trang chủ</Link>
        <Link href={ROUTES.destinations}>Địa điểm</Link>
        <Link href={ROUTES.culture}>Văn hóa</Link>
        <Link href={ROUTES.cuisine}>Ẩm thực</Link>
        <Link href={ROUTES.specialties}>Đặc sản</Link>
        <Link href={ROUTES.about}>Giới thiệu</Link>
        {isUser && (
          <Link className="cart-nav-link" href={ROUTES.cart}>
            Giỏ hàng ({totalItems})
          </Link>
        )}
        {isAdmin && (
          <Link className="admin-nav-link" href={ROUTES.admin}>
            Quản trị
          </Link>
        )}
        {currentUser ? (
          <>
            <span className="user-pill">
              {isAdmin ? "Admin" : "User"}: {isAdmin ? "Admin" : currentUser.name}
            </span>
            <button className="logout-button" type="button" onClick={logout}>
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link href={ROUTES.login}>Đăng nhập</Link>
            <Link className="nav-button" href={ROUTES.register}>
              Đăng ký
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
