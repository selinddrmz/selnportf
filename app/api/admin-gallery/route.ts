
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return NextResponse.json({ error: "Sunucu yapılandırması eksik." }, { status: 500 });
  }

  const sql = neon(databaseUrl);

  const sessions = await sql`
    SELECT yonetici_id
    FROM oturumlar
    WHERE token = ${token} AND bitis > NOW()
    LIMIT 1
  `;

  if (sessions.length === 0) {
    return NextResponse.json({ error: "Oturum geçersiz." }, { status: 401 });
  }

  const body = await request.json();
  const photoId = Number(body.id);

  if (!Number.isInteger(photoId) || photoId <= 0) {
    return NextResponse.json({ error: "Fotoğraf ID'si geçersiz." }, { status: 400 });
  }

  const photos = await sql`
    SELECT id, yayinda
    FROM galeri_fotograflari
    WHERE id = ${photoId}
    LIMIT 1
  `;

  if (photos.length === 0) {
    return NextResponse.json({ error: "Fotoğraf bulunamadı." }, { status: 404 });
  }

  const newStatus = !photos[0].yayinda;

  await sql`
    UPDATE galeri_fotograflari
    SET yayinda = ${newStatus}
    WHERE id = ${photoId}
  `;

  await sql`
    INSERT INTO islem_kayitlari (yonetici_id, islem, tablo_adi, kayit_id)
    VALUES (${sessions[0].yonetici_id}, 'guncelle', 'galeri_fotograflari', ${photoId})
  `;

  return NextResponse.json({ success: true, yayinda: newStatus });
}
