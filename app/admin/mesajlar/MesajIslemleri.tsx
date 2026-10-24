
"use client";

export default function MesajIslemleri({
  id,
  okundu,
}: {
  id: number;
  okundu: boolean;
}) {
  async function okunduYap() {
    const response = await fetch("/api/admin-mesajlar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      alert("Mesaj güncellenemedi.");
      return;
    }

    window.location.reload();
  }

  async function sil() {
    if (!window.confirm("Bu mesajı silmek istediğine emin misin?")) return;

    const response = await fetch("/api/admin-mesajlar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      alert("Mesaj silinemedi.");
      return;
    }

    window.location.reload();
  }

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {!okundu && (
        <button type="button" onClick={okunduYap}>
          Okundu işaretle
        </button>
      )}
      <button type="button" onClick={sil}>
        Sil
      </button>
    </div>
  );
}
