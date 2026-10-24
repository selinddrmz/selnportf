import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return NextResponse.json(
        { error: "DATABASE_URL tanımlanmamış." },
        { status: 500 }
      );
    }

    const sql = neon(databaseUrl);

    const photos = await sql`
      SELECT
        id,
        baslik,
        gorsel_url,
        cekim_tarihi,
        konum,
        begeni,
        kendi_cekimim,
        kategori_id
      FROM galeri_fotograflari
      WHERE yayinda = true
      ORDER BY id DESC
    `;

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Galeri verileri alınamadı:", error);

    return NextResponse.json(
      { error: "Galeri verileri alınamadı." },
      { status: 500 }
    );
  }
}