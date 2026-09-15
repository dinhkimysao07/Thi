import AdminDashboardStats from "../components/AdminDashboardStats";

export default function AdminPage() {
  return (
    <section className="admin-page">
      <div className="admin-heading">
        <p className="eyebrow">Quản trị</p>
        <h1>Tổng quan website</h1>
      </div>

      <AdminDashboardStats />
    </section>
  );
}
