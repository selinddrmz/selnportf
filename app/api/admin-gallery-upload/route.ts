
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Yönetici girişi gerekli." },
        { status: 401 }
      );
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return NextResponse.json(
        { error: "Veritabanı bağlantısı yapılandırılmamış." },
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

    const formData = await request.formData();
    const file = formData.get("dosya");

    const baslik = String(formData.get("baslik") || "").trim();
    const kategoriId = Number(formData.get("kategori_id"));
    const cekimTarihi = String(formData.get("cekim_tarihi") || "");
    const konum = String(formData.get("konum") || "").trim();
    const kendiCekimim = formData.get("kendi_cekimim") === "true";
    const yayinda = formData.get("yayinda") === "true";

    if (
      !baslik ||
      !Number.isInteger(kategoriId) ||
      kategoriId <= 0 ||
      !(file instanceof File) ||
      file.size === 0
    ) {
      return NextResponse.json(
        { error: "Başlık, albüm ve fotoğraf zorunludur." },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "JPG, PNG, WEBP veya GIF dosyası seç." },
        { status: 400 }
      );
    }

    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Fotoğraf en fazla 4 MB olabilir." },
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

    const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
        contentType: file.type,
        token: process.env.BLOB2_READ_WRITE_TOKEN,
      });

    const result = await sql`
      INSERT INTO galeri_fotograflari
        (baslik, gorsel_url, cekim_tarihi, konum, begeni,
         kendi_cekimim, kategori_id, yayinda)
      VALUES (
        ${baslik},
        ${blob.url},
        ${cekimTarihi || null},
        ${konum || null},
        0,
        ${kendiCekimim},
        ${kategoriId},
        ${yayinda}
      )
      RETURNING id
    `;

    await sql`
      INSERT INTO islem_kayitlari
        (yonetici_id, islem, tablo_adi, kayit_id)
      VALUES (
        ${sessions[0].yonetici_id},
        'ekle',
        'galeri_fotograflari',
        ${result[0].id}
      )
    `;

    return NextResponse.json(
      { success: true, id: result[0].id, url: blob.url },
      { status: 201 }
    );
  } catch (error) {
    console.error("Fotoğraf yükleme hatası:", error);

    return NextResponse.json(
      { error: "Fotoğraf yüklenirken sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
