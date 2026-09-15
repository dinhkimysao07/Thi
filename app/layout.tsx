import type { Metadata } from "next";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chạm Kon Tum",
  description: "Khám phá địa điểm du lịch và đặc sản địa phương Kon Tum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
