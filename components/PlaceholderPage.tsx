export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="content-wrap">
      <section className="route-panel">
        <h1>{title}</h1>
        <p>Route {title} đã được tạo và có thể mở từ menu.</p>
      </section>
    </main>
  );
}
