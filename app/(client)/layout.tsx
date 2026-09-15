import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="page-container">{children}</main>
      <Footer />
    </>
  );
}
