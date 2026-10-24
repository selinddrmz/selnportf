import { requireAdmin } from "../../lib/auth";
import { neon } from "@neondatabase/serverless";

export default async function KayitlarPage() {
  await requireAdmin();

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL tanımlanmamış.");
  }

  const sql = neon(databaseUrl);

  const kayitlar = await sql`
    SELECT
      i.id,
      i.yonetici_id,
      y.eposta,
      i.islem,
      i.tablo_adi,
      i.kayit_id,
      i.zaman
    FROM islem_kayitlari i
    LEFT JOIN yoneticiler y ON y.id = i.yonetici_id
    ORDER BY i.zaman DESC
    LIMIT 50
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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <a href="/admin/panel" style={{ color: "#f04bd8" }}>
          ← Yönetim paneli
        </a>

        <h1 style={{ marginTop: "24px" }}>İşlem Kayıtları</h1>

        <p style={{ color: "#b9a9c4" }}>
          Son 50 işlem listeleniyor.
        </p>

        {kayitlar.length === 0 ? (
          <p>Henüz işlem kaydı bulunmuyor.</p>
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
                  {[
                    "Tarih",
                    "Yönetici e-postası",
                    "İşlem",
                    "Tablo",
                    "Kayıt No",
                  ].map((baslik) => (
                    <th
                      key={baslik}
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #493052",
                      }}
                    >
                      {baslik}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {kayitlar.map((kayit) => (
                  <tr key={kayit.id}>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #302039",
                      }}
                    >
                      {new Date(kayit.zaman).toLocaleString("tr-TR")}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #302039",
                      }}
                    >
                      {kayit.eposta ?? "Bilinmiyor"}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #302039",
                      }}
                    >
                      {kayit.islem}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #302039",
                      }}
                    >
                      {kayit.tablo_adi ?? "—"}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #302039",
                      }}
                    >
                      {kayit.kayit_id ?? "—"}
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