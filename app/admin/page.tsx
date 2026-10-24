
"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eposta: email.trim(),
          sifre: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Giriş başarısız. Bilgilerini kontrol et.");
        return;
      }

      window.location.href = "/admin/panel";
    } catch {
      setError("Sunucuya ulaşılamadı. Lütfen tekrar dene.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0614",
        color: "#fff",
        padding: "24px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "32px",
          border: "1px solid #493052",
          borderRadius: "20px",
          background: "#1b1024",
          boxSizing: "border-box",
        }}
      >
        <div style={{ color: "#f04bd8", fontSize: "14px", marginBottom: "12px" }}>
          SD. / YÖNETİM
        </div>

        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>
          Yönetici Girişi
        </h1>

        <p style={{ color: "#b9a9c4", marginBottom: "28px" }}>
          Portföy yönetim paneline giriş yap.
        </p>

        <label htmlFor="email" style={{ display: "block", marginBottom: "8px" }}>
          E-posta
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresin"
          style={{
            width: "100%",
            padding: "13px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #493052",
            background: "#100a18",
            color: "#fff",
            boxSizing: "border-box",
          }}
        />

        <label htmlFor="password" style={{ display: "block", marginBottom: "8px" }}>
          Şifre
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifren"
          style={{
            width: "100%",
            padding: "13px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #493052",
            background: "#100a18",
            color: "#fff",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p role="alert" style={{ color: "#ff8b9c", margin: "0 0 16px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: "#f04bd8",
            color: "#16091a",
            fontWeight: "bold",
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>

        <a
          href="/"
          style={{
            display: "block",
            marginTop: "22px",
            textAlign: "center",
            color: "#c8b6d3",
            textDecoration: "none",
          }}
        >
          ← Portföye dön
        </a>
      </form>
    </main>
  );
}
