
"use client";

import { useState } from "react";

type Album = {
  id: number;
  ad: string;
};

export default function GalleryAddForm({
  albums,
}: {
  albums: Album[];
}) {
  const [baslik, setBaslik] = useState("");
  const [dosya, setDosya] = useState<File | null>(null);
  const [cekimTarihi, setCekimTarihi] = useState("");
  const [konum, setKonum] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [kendiCekimim, setKendiCekimim] = useState(true);
  const [yayinda, setYayinda] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!dosya) {
      setMessage("Lütfen bilgisayarından bir fotoğraf seç.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("dosya", dosya);
      formData.append("baslik", baslik);
      formData.append("cekim_tarihi", cekimTarihi);
      formData.append("konum", konum);
      formData.append("kategori_id", kategoriId);
      formData.append("kendi_cekimim", String(kendiCekimim));
      formData.append("yayinda", String(yayinda));

      const response = await fetch("/api/admin-gallery-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fotoğraf yüklenemedi.");
      }

      setMessage("Fotoğraf başarıyla eklendi!");
      setBaslik("");
      setDosya(null);
      setCekimTarihi("");
      setKonum("");
      setKategoriId("");
      setKendiCekimim(true);
      setYayinda(false);

      const fileInput = document.getElementById(
        "gallery-photo-file"
      ) as HTMLInputElement | null;

      if (fileInput) fileInput.value = "";
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #493052",
    background: "#0b0614",
    color: "#fff",
    boxSizing: "border-box" as const,
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: "14px",
        padding: "24px",
        marginTop: "24px",
        background: "#1b1024",
        border: "1px solid #493052",
        borderRadius: "16px",
      }}
    >
      <h2>Yeni fotoğraf ekle</h2>

      <label>
        Fotoğraf başlığı *
        <input
          required
          value={baslik}
          onChange={(e) => setBaslik(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label>
        Bilgisayarından fotoğraf seç *
        <input
          id="gallery-photo-file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required
          onChange={(e) => setDosya(e.target.files?.[0] ?? null)}
          style={inputStyle}
        />
      </label>

      <label>
        Çekim tarihi
        <input
          type="date"
          value={cekimTarihi}
          onChange={(e) => setCekimTarihi(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label>
        Konum
        <input
          value={konum}
          onChange={(e) => setKonum(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label>
        Albüm *
        <select
          required
          value={kategoriId}
          onChange={(e) => setKategoriId(e.target.value)}
          style={inputStyle}
        >
          <option value="">Albüm seç</option>
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
          checked={kendiCekimim}
          onChange={(e) => setKendiCekimim(e.target.checked)}
        />{" "}
        Kendi çekimim
      </label>

      <label>
        <input
          type="checkbox"
          checked={yayinda}
          onChange={(e) => setYayinda(e.target.checked)}
        />{" "}
        Hemen yayına al
      </label>

      <button
        type="submit"
        disabled={loading || albums.length === 0}
        style={{
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          background: "#f04bd8",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {loading ? "Yükleniyor..." : "Fotoğraf ekle"}
      </button>

      {albums.length === 0 && <p>Henüz albüm bulunamadı.</p>}
      {message && <p role="status">{message}</p>}
    </form>
  );
}
