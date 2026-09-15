"use client";

import Link from "next/link";
import { ROUTES } from "../constants/routes";
import { isAdminUser, useUser } from "../context/UserContext";

export default function AdminGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const { currentUser } = useUser();

  if (!currentUser) {
    return (
      <section className="page-card auth-page">
        <h1>Vui lòng đăng nhập</h1>
        <p>Bạn cần đăng nhập bằng tài khoản admin để vào trang quản trị.</p>
        <Link className="primary-link" href={ROUTES.login}>
          Đăng nhập
        </Link>
      </section>
    );
  }

  if (!isAdminUser(currentUser)) {
    return (
      <section className="page-card auth-page">
        <h1>Không có quyền truy cập</h1>
        <p>Tài khoản user không được vào khu vực admin.</p>
        <Link className="primary-link" href={ROUTES.home}>
          Về trang chủ
        </Link>
      </section>
    );
  }

  return <>{children}</>;
}
