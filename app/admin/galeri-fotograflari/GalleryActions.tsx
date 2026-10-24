
"use client";

import { useState } from "react";

type Album = {
  id: number;
  ad: string;
};

type GalleryActionsProps = {
  id: number;
  yayinda: boolean;
  baslik: string;
  konum: string | null;
  cekimTarihi: string | null;
  kategoriId: number;
  kendiCekimim: boolean;
  albums: Album[];
};

export default function GalleryActions({
  id,
  yayinda,
  baslik,
  konum,
  cekimTarihi,
  kategoriId,
  kendiCekimim,
  albums,
}: GalleryActionsProps) {
  const [isPublished, setIsPublished] = useState(yayinda);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(baslik);
  const [location, setLocation] = useState(konum || "");
  const [date, setDate] = useState(
    cekimTarihi ? cekimTarihi.slice(0, 10) : ""
  );
  const [albumId, setAlbumId] = useState(String(kategoriId));
  const [ownPhoto, setOwnPhoto] = useState(kendiCekimim);

  async function togglePublished() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "İşlem başarısız.");
      setIsPublished(data.yayinda);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  async function deletePhoto() {
    if (!window.confirm("Bu fotoğraf kalıcı olarak silinsin mi?")) return;

    setDeleting(true);
    setError("");

    try {
      const response = await fetch("/api/admin-gallery-delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Fotoğraf silinemedi.");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
      setDeleting(false);
    }
  }

  async function saveEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin-gallery-edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          baslik: title,
          konum: location,
          cekim_tarihi: date,
          kategori_id: Number(albumId),
          kendi_cekimim: ownPhoto,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Güncelleme başarısız.");

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ display: "grid", gap: "8px", minWidth: "150px" }}>
      <button type="button" onClick={() => setEditing(!editing)}>
        {editing ? "Düzenlemeyi kapat" : "Düzenle"}
      </button>

      {editing && (
        <form onSubmit={saveEdit} style={{ display: "grid", gap: "10px" }}>
          <label>
            Başlık
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label>
            Konum
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label>
            Çekim tarihi
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label>
            Albüm
            <select
              required
              value={albumId}
              onChange={(e) => setAlbumId(e.target.value)}
              style={inputStyle}
            >
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.ad}
                </option>
              ))}
            </select>
          </label>

          <label>
            <input
              type="checkbox"
              checked={ownPhoto}
              onChange={(e) => setOwnPhoto(e.target.checked)}
            />{" "}
            Kendi çekimim
          </label>

          <button type="submit" disabled={saving}>
            {saving ? "Kaydediliyor..." : "Değişiklikleri kaydet"}
          </button>
        </form>
      )}

      <button type="button" onClick={togglePublished} disabled={loading || deleting}>
        {loading ? "İşleniyor..." : isPublished ? "Yayından kaldır" : "Yayına al"}
      </button>

      <button type="button" onClick={deletePhoto} disabled={loading || deleting}>
        {deleting ? "Siliniyor..." : "Sil"}
      </button>

      {error && <p style={{ color: "#ff8c8c" }}>{error}</p>}
    </div>
  );
}
