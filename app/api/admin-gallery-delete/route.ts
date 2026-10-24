import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Yetkisiz erişim." },
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

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { error: "Geçersiz fotoğraf numarası." },
        { status: 400 }
      );
    }

    const photos = await sql`
      SELECT id, baslik
      FROM galeri_fotograflari
      WHERE id = ${id}
      LIMIT 1
    `;

    if (photos.length === 0) {
      return NextResponse.json(
        { error: "Fotoğraf bulunamadı." },
        { status: 404 }
      );
    }

    await sql`
      DELETE FROM galeri_fotograflari
      WHERE id = ${id}
    `;

    await sql`
      INSERT INTO islem_kayitlari
        (yonetici_id, islem, tablo_adi, kayit_id)
      VALUES (
        ${sessions[0].yonetici_id},
        'sil',
        'galeri_fotograflari',
        ${id}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fotoğraf silme hatası:", error);

    return NextResponse.json(
      { error: "Fotoğraf silinirken sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}