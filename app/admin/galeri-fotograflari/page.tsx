import GalleryAddForm from "./GalleryAddForm";

import GalleryActions from "./GalleryActions";
import { requireAdmin } from "../../lib/auth";
import { neon } from "@neondatabase/serverless";

export default async function GalleryAdminPage() {
  await requireAdmin();

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL tanımlanmamış.");
  }

  const sql = neon(databaseUrl);

  const albums = await sql`
  SELECT id, ad
  FROM albumler
  ORDER BY ad ASC
`;
  const photos = await sql`
    SELECT
      g.id,
      g.baslik,
      g.gorsel_url,
      g.cekim_tarihi,
      g.konum,
      g.begeni,
      g.kendi_cekimim,
      g.yayinda, 
      g.kategori_id,
      a.ad AS album_adi
    FROM galeri_fotograflari g
    LEFT JOIN albumler a ON a.id = g.kategori_id
    ORDER BY g.id DESC
  `;

  return (
    <main style={{ minHeight: "100vh", background: "#0b0614", color: "#fff", padding: "32px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <a href="/admin/panel" style={{ color: "#f04bd8" }}>← Yönetim paneli</a>
        <h1 style={{ marginTop: "24px" }}>Galeri Fotoğrafları</h1>
        <p style={{ color: "#b9a9c4" }}>Toplam kayıt: {photos.length}</p>
        <GalleryAddForm
  albums={albums.map((album) => ({
    id: Number(album.id),
    ad: String(album.ad),
  }))}
/>

        <div style={{ overflowX: "auto", marginTop: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr>
              {["ID", "Başlık", "Albüm", "Beğeni", "Kendi çekimim", "Yayında", "İşlem"].map((title) => (
  <th key={title} style={{ padding: "12px", borderBottom: "1px solid #493052" }}>
    {title}
  </th>
))}
              </tr>
            </thead>
            <tbody>
              {photos.map((photo) => (
                <tr key={photo.id}>
                  <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>{photo.id}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>{photo.baslik}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>{photo.album_adi ?? "Albüm yok"}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>{photo.begeni}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>{photo.kendi_cekimim ? "Evet" : "Hayır"}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>{photo.yayinda ? "Evet" : "Hayır"}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #302039" }}>
                  <GalleryActions
  id={Number(photo.id)}
  yayinda={Boolean(photo.yayinda)}
  baslik={String(photo.baslik)}
  konum={photo.konum ? String(photo.konum) : null}
  cekimTarihi={
    photo.cekim_tarihi
      ? String(photo.cekim_tarihi).slice(0, 10)
      : null
  }
  kategoriId={Number(photo.kategori_id)}
  kendiCekimim={Boolean(photo.kendi_cekimim)}
  albums={albums.map((album) => ({
    id: Number(album.id),
    ad: String(album.ad),
  }))}
/>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
