"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "../../constants/routes";
import { useUser } from "../../context/UserContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isSuccess = register(name, email, password);

    if (!isSuccess) {
      setMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setMessage("Đăng ký tài khoản thành công.");
    router.push(ROUTES.home);
  }

  return (
    <section className="page-card auth-page">
      <h1>Đăng ký</h1>

      <form className="form" onSubmit={handleRegister}>
        <label htmlFor="txtName">
          Họ tên
          <input
            id="txtName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nhập họ tên"
            required
          />
        </label>

        <label htmlFor="txtEmail">
          Email
          <input
            id="txtEmail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Nhập email"
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

        <button type="submit">Đăng ký</button>
        {message && <p className="form-message">{message}</p>}

        <p>
          Đã có tài khoản? <Link href={ROUTES.login}>Đăng nhập</Link>
        </p>
      </form>
    </section>
  );
}
