
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";

export async function PATCH(request: Request) {
  try {
    const token = (await cookies()).get("admin_session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Yönetici girişi gerekli." },
        { status: 401 }
      );
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return NextResponse.json(
        { error: "Veritabanı bağlantısı bulunamadı." },
        { status: 500 }
      );
    }

    const sql = neon(databaseUrl);

    const sessions = await sql`
      SELECT yonetici_id
      FROM oturumlar
      WHERE token = ${token}
        AND bitis > NOW()
      LIMIT 1
    `;

    if (sessions.length === 0) {
      return NextResponse.json(
        { error: "Oturum geçersiz veya süresi dolmuş." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const id = Number(body.id);
    const baslik = String(body.baslik || "").trim();
    const konum = String(body.konum || "").trim();
    const cekimTarihi = String(body.cekim_tarihi || "");
    const kategoriId = Number(body.kategori_id);
    const kendiCekimim = body.kendi_cekimim === true;

    if (
      !Number.isInteger(id) || id <= 0 ||
      !baslik ||
      !Number.isInteger(kategoriId) || kategoriId <= 0
    ) {
      return NextResponse.json(
        { error: "Fotoğraf bilgileri geçersiz." },
        { status: 400 }
      );
    }

    const albums = await sql`
      SELECT id FROM albumler
      WHERE id = ${kategoriId}
      LIMIT 1
    `;

    if (albums.length === 0) {
      return NextResponse.json(
        { error: "Seçilen albüm bulunamadı." },
        { status: 400 }
      );
    }

    const existing = await sql`
      SELECT id FROM galeri_fotograflari
      WHERE id = ${id}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Fotoğraf bulunamadı." },
        { status: 404 }
      );
    }

    await sql`
      UPDATE galeri_fotograflari
      SET
        baslik = ${baslik},
        konum = ${konum || null},
        cekim_tarihi = ${cekimTarihi || null},
        kategori_id = ${kategoriId},
        kendi_cekimim = ${kendiCekimim}
      WHERE id = ${id}
    `;

    await sql`
      INSERT INTO islem_kayitlari
        (yonetici_id, islem, tablo_adi, kayit_id)
      VALUES (
        ${sessions[0].yonetici_id},
        'guncelle',
        'galeri_fotograflari',
        ${id}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fotoğraf düzenleme hatası:", error);

    return NextResponse.json(
      { error: "Fotoğraf güncellenirken sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
