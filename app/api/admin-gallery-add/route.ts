import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Oturum gerekli." },
        { status: 401 }
      );
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return NextResponse.json(
        { error: "Sunucu yapılandırması eksik." },
        { status: 500 }
      );
    }

    const sql = neon(databaseUrl);

    const sessions = await sql`
      SELECT yonetici_id
      FROM oturumlar
      WHERE token = ${token} AND bitis > NOW()
      LIMIT 1
    `;

    if (sessions.length === 0) {
      return NextResponse.json(
        { error: "Oturum geçersiz." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const baslik =
      typeof body.baslik === "string" ? body.baslik.trim() : "";
    const gorsel_url =
      typeof body.gorsel_url === "string" ? body.gorsel_url.trim() : "";
    const konum =
      typeof body.konum === "string" ? body.konum.trim() : "";
    const cekim_tarihi =
      typeof body.cekim_tarihi === "string" ? body.cekim_tarihi : "";
    const kategori_id = Number(body.kategori_id);
    const kendi_cekimim = body.kendi_cekimim === true;
    const yayinda = body.yayinda === true;

    if (!baslik) {
      return NextResponse.json(
        { error: "Fotoğraf başlığı zorunludur." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(kategori_id) || kategori_id <= 0) {
      return NextResponse.json(
        { error: "Geçerli bir albüm seçmelisin." },
        { status: 400 }
      );
    }

    if (gorsel_url) {
      try {
        const url = new URL(gorsel_url);
        if (url.protocol !== "https:" && url.protocol !== "http:") {
          throw new Error("Geçersiz URL");
        }
      } catch {
        return NextResponse.json(
          { error: "Görsel adresi geçerli bir HTTP veya HTTPS adresi olmalıdır." },
          { status: 400 }
        );
      }
    }

    const albums = await sql`
      SELECT id FROM albumler
      WHERE id = ${kategori_id}
      LIMIT 1
    `;

    if (albums.length === 0) {
      return NextResponse.json(
        { error: "Seçilen albüm bulunamadı." },
        { status: 400 }
      );
    }

    const inserted = await sql`
      INSERT INTO galeri_fotograflari (
        baslik,
        gorsel_url,
        cekim_tarihi,
        konum,
        begeni,
        kendi_cekimim,
        kategori_id,
        yayinda
      )
      VALUES (
        ${baslik},
        ${gorsel_url || null},
        ${cekim_tarihi || null},
        ${konum || null},
        0,
        ${kendi_cekimim},
        ${kategori_id},
        ${yayinda}
      )
      RETURNING id
    `;

    const newId = Number(inserted[0].id);

    await sql`
      INSERT INTO islem_kayitlari (
        yonetici_id,
        islem,
        tablo_adi,
        kayit_id
      )
      VALUES (
        ${sessions[0].yonetici_id},
        'ekle',
        'galeri_fotograflari',
        ${newId}
      )
    `;

    return NextResponse.json(
      { success: true, id: newId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Fotoğraf ekleme hatası:", error);

    return NextResponse.json(
      { error: "Fotoğraf eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}