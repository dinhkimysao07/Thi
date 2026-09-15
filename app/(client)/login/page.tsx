"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "../../constants/routes";
import { isAdminUser, useUser } from "../../context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { currentUser, login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    router.replace(isAdminUser(currentUser) ? ROUTES.admin : ROUTES.home);
  }, [currentUser, router]);

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isSuccess = login(username, password);

    if (!isSuccess) {
      setMessage("Tên đăng nhập hoặc mật khẩu không đúng.");
      return;
    }

    setMessage("Đăng nhập thành công.");
    router.replace(username.trim().toLowerCase() === "admin" ? ROUTES.admin : ROUTES.home);
  }

  return (
    <section className="page-card auth-page">
      <h1>Đăng nhập</h1>

      <form className="form" onSubmit={handleLogin}>
        <label htmlFor="txtUsername">
          Tên đăng nhập
          <input
            id="txtUsername"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Nhập tên đăng nhập"
            required
          />
        </label>

        <label htmlFor="txtPassword">
          Mật khẩu
          <input
            id="txtPassword"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Nhập mật khẩu"
            required
          />
        </label>

        <button type="submit">Đăng nhập</button>
        {message && <p className="form-message">{message}</p>}

        <p>
          Chưa có tài khoản? <Link href={ROUTES.register}>Đăng ký ngay</Link>
        </p>
      </form>
    </section>
  );
}
