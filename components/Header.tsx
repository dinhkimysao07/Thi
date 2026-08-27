"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";

const navItems = [
  { label: "Cà phê", href: "/ca-phe" },
  { label: "Trà", href: "/tra" },
  { label: "Menu", href: "/menu", hasMenu: true },
  { label: "Chuyện Nhà", href: "/chuyen-nha", hasMenu: true },
  { label: "Cảm hứng CloudFee", href: "/cam-hung-cloudfee" },
  { label: "Cửa hàng", href: "/cua-hang" },
  { label: "Tuyển dụng", href: "/tuyen-dung" }
];

export default function Header() {
  const pathname = usePathname();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredUsername = username.trim();
    const enteredPassword = password.trim();

    if (enteredUsername === "pipi" && enteredPassword === "123456") {
      setLoggedInUser(enteredUsername);
      setMessage("Đăng nhập thành công.");
      setPassword("");
      return;
    }

    setMessage("Đăng nhập thất bại. Vui lòng kiểm tra username/password.");
  }

  function handleLogout() {
    setLoggedInUser("");
    setUsername("");
    setPassword("");
    setMessage("");
  }

  return (
    <header className="site-header">
      <div className="top-strip">
        <span className="info-item location-pin">143 Cửa hàng khắp cả nước</span>
        <span className="info-item phone-pin">Đặt hàng: 1800.6936</span>
      </div>

      <div className="main-nav">
        <Link className="brand" href="/">
          THE C<span>O</span>FFEE HOUSE
        </Link>

        <nav className="menu-links" aria-label="Menu chính">
          {navItems.map((item) => (
            <Link
              className={pathname === item.href || (pathname === "/" && item.href === "/ca-phe") ? "active" : ""}
              href={item.href}
              key={item.href}
            >
              {item.label}
              {item.hasMenu ? <small>▾</small> : null}
            </Link>
          ))}
        </nav>

        <div className="login-area">
          {loggedInUser ? (
            <div className="welcome-box">
              <span>
                Xin chào, <strong>{loggedInUser}</strong>
              </span>
              <button type="button" onClick={handleLogout}>
                Thoát
              </button>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleLogin}>
              <input
                aria-label="Username"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
                type="text"
                value={username}
              />
              <input
                aria-label="Password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
                value={password}
              />
              <button type="submit">Đăng nhập</button>
            </form>
          )}
          {message ? <p className="login-message">{message}</p> : null}
        </div>
      </div>
    </header>
  );
}
