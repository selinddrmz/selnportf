import { requireAdmin } from "../../lib/auth";
import { neon } from "@neondatabase/serverless";
import MesajIslemleri from "./MesajIslemleri";

export default async function MesajlarPage() {
  await requireAdmin();

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL tanımlanmamış.");
  }

  const sql = neon(databaseUrl);

  const messages = await sql`
    SELECT id, ad_soyad, eposta, mesaj, kvkk_onay, okundu, gonderim_zamani
    FROM iletisim_mesajlari
    ORDER BY gonderim_zamani DESC
  `;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0614",
        color: "#fff",
        padding: "32px 24px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <a href="/admin/panel" style={{ color: "#f04bd8" }}>
          ← Yönetim paneli
        </a>

        <h1 style={{ marginTop: "24px" }}>İletişim Mesajları</h1>
        <p style={{ color: "#b9a9c4" }}>
          Toplam mesaj: {messages.length}
        </p>

        {messages.length === 0 ? (
          <p>Henüz mesaj bulunmuyor.</p>
        ) : (
          <div style={{ overflowX: "auto", marginTop: "24px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr>
                  {["Ad Soyad", "E-posta", "Mesaj", "Tarih", "Durum"].map(
                    (title) => (
                      <th
                        key={title}
                        style={{
                          padding: "12px",
                          borderBottom: "1px solid #493052",
                        }}
                      >
                        {title}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>
                      {message.ad_soyad}
                    </td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>
                      {message.eposta}
                    </td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #302039", maxWidth: "350px", overflowWrap: "anywhere" }}>
                      {message.mesaj}
                    </td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>
                      {new Date(message.gonderim_zamani).toLocaleString("tr-TR")}
                    </td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>
                      {message.okundu ? "Okundu" : "Okunmadı"}
              
                    </td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>
  <MesajIslemleri
    id={Number(message.id)}
    okundu={Boolean(message.okundu)}
  />
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
