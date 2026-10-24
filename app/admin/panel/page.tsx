
import { requireAdmin } from "../../lib/auth";
import { neon } from "@neondatabase/serverless";

export default async function AdminPanelPage() {
  await requireAdmin();

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL tanımlanmamış.");
  }

  const sql = neon(databaseUrl);

  const [photoResult, messageResult] = await Promise.all([
    sql`SELECT COUNT(*)::int AS toplam FROM galeri_fotograflari`,
    sql`SELECT COUNT(*)::int AS toplam FROM iletisim_mesajlari WHERE okundu = false`,
  ]);

  const photoCount = Number(photoResult[0]?.toplam ?? 0);
  const unreadCount = Number(messageResult[0]?.toplam ?? 0);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0614",
        color: "#fff",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ color: "#f04bd8" }}>SD. / YÖNETİM</p>
        <h1>Yönetim Paneli</h1>
        <p style={{ color: "#b9a9c4" }}>
          Portföy yönetim paneline hoş geldin.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <section
            style={{
              padding: "24px",
              border: "1px solid #493052",
              borderRadius: "16px",
              background: "#1b1024",
            }}
          >
            <p style={{ color: "#b9a9c4" }}>Galeri fotoğrafları</p>
            <h2 style={{ fontSize: "36px", margin: "8px 0" }}>
              {photoCount}
            </h2>
            <a href="/admin/galeri-fotograflari" style={{ color: "#f04bd8" }}>
              Fotoğrafları yönet →
            </a>
          </section>

          <section
            style={{
              padding: "24px",
              border: "1px solid #493052",
              borderRadius: "16px",
              background: "#1b1024",
            }}
          >
            <p style={{ color: "#b9a9c4" }}>Okunmamış mesajlar</p>
            <h2 style={{ fontSize: "36px", margin: "8px 0" }}>
              {unreadCount}
            </h2>
            <a href="/admin/mesajlar" style={{ color: "#f04bd8" }}>
              Mesajları görüntüle →
            </a>
          </section>
          <section
  style={{
    padding: "24px",
    border: "1px solid #493052",
    borderRadius: "16px",
    background: "#1b1024",
    marginTop: "20px",
  }}
>
  <p style={{ color: "#b9a9c4" }}>Güvenlik</p>
  <h2 style={{ fontSize: "24px", margin: "8px 0" }}>
    İşlem Kayıtları
  </h2>
  <p style={{ color: "#b9a9c4" }}>
    Yönetici işlemlerinin geçmişini görüntüle.
  </p>
  <a href="/admin/kayitlar" style={{ color: "#f04bd8" }}>
    Kayıtları görüntüle →
  </a>
</section>
        </div>

        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: "28px",
            color: "#f04bd8",
            textDecoration: "none",
          }}
        >
          ← Portföye dön
        </a>
      </div>
    </main>
  );
}
