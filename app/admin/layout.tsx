import Link from "next/link";
import AdminGuard from "../components/AdminGuard";
import { ROUTES } from "../constants/routes";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminGuard>
      <div className="admin-shell">
        <aside className="admin-sidebar" aria-label="Điều hướng quản trị">
          <Link className="admin-brand" href={ROUTES.admin}>
            Admin
          </Link>
          <nav className="admin-nav">
            <Link href={ROUTES.admin}>Tổng quan</Link>
            <Link href={ROUTES.adminProducts}>Sản phẩm</Link>
            <Link href={ROUTES.adminCategories}>Danh mục</Link>
            <Link href={ROUTES.home}>Về client</Link>
          </nav>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </AdminGuard>
  );
}
