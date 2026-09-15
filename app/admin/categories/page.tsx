import AdminCategoryManager from "../../components/AdminCategoryManager";

export default function AdminCategoriesPage() {
  return (
    <section className="admin-page">
      <div className="admin-heading">
        <p className="eyebrow">Quản trị</p>
        <h1>Quản lý danh mục</h1>
      </div>

      <AdminCategoryManager />
    </section>
  );
}
