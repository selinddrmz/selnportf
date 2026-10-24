
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  try {
    const { eposta, sifre } = await request.json();

    if (!eposta || !sifre) {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı." },
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

    const admins = await sql`
      SELECT id, eposta, sifre_hash
      FROM yoneticiler
      WHERE eposta = ${eposta}
      LIMIT 1
    `;

    if (
      admins.length === 0 ||
      !(await bcrypt.compare(
        sifre,
        String(admins[0].sifre_hash)
      ))
    ) {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    const token = randomBytes(32).toString("hex");

    await sql`
      INSERT INTO oturumlar (token, yonetici_id, bitis)
      VALUES (
        ${token},
        ${admins[0].id},
        NOW() + INTERVAL '2 hours'
      )
    `;

    await sql`
      INSERT INTO islem_kayitlari
        (yonetici_id, islem, tablo_adi)
      VALUES
        (${admins[0].id}, 'giris', 'yoneticiler')
    `;

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    return response;
  } catch (error) {
    console.error("Yönetici giriş hatası:", error);

    return NextResponse.json(
      { error: "Giriş sırasında bir sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
