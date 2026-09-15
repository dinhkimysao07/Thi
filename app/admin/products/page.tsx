import AdminProductsTable from "../../components/AdminProductsTable";

export default function AdminProductsPage() {
  return (
    <section className="admin-page">
      <div className="admin-heading">
        <p className="eyebrow">Quản trị</p>
        <h1>Quản lý sản phẩm</h1>
      </div>

      <AdminProductsTable />
    </section>
  );
}
