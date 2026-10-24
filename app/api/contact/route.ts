
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const adSoyad = String(formData.get("ad_soyad") ?? "").trim();
    const eposta = String(formData.get("eposta") ?? "").trim();
    const mesaj = String(formData.get("mesaj") ?? "").trim();
    const kvkkOnay = formData.get("kvkk_onay") === "on";
    const turnstileToken = String(
      formData.get("cf-turnstile-response") ?? ""
    );

    if (
      !adSoyad ||
      !eposta ||
      !mesaj ||
      adSoyad.length > 100 ||
      eposta.length > 254 ||
      mesaj.length > 2000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta) ||
      !kvkkOnay
    ) {
      return NextResponse.json(
        { error: "Bilgileri kontrol et ve KVKK onayını işaretle." },
        { status: 400 }
      );
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey || !turnstileToken) {
      return NextResponse.json(
        { error: "Robot doğrulaması yapılamadı. Lütfen tekrar dene." },
        { status: 400 }
      );
    }

    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: turnstileToken,
        }),
        cache: "no-store",
      }
    );

    if (!verificationResponse.ok) {
      return NextResponse.json(
        { error: "Robot doğrulama servisine ulaşılamadı." },
        { status: 502 }
      );
    }

    const verification = await verificationResponse.json();

    if (!verification.success) {
      return NextResponse.json(
        { error: "Robot doğrulaması başarısız. Lütfen tekrar dene." },
        { status: 400 }
      );
    }

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return NextResponse.json(
        { error: "Veritabanı yapılandırması eksik." },
        { status: 500 }
      );
    }

    const sql = neon(databaseUrl);

    await sql`
      INSERT INTO iletisim_mesajlari
        (ad_soyad, eposta, mesaj, kvkk_onay, okundu, gonderim_zamani)
      VALUES
        (${adSoyad}, ${eposta}, ${mesaj}, ${kvkkOnay}, false, NOW())
    `;

    return NextResponse.redirect(
      new URL("/?mesaj=gonderildi#contact", request.url),
      303
    );
  } catch (error) {
    console.error("İletişim formu hatası:", error);

    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen tekrar dene." },
      { status: 500 }
    );
  }
}
