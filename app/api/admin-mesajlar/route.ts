
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { requireAdmin } from "../../lib/auth";

export async function PATCH(request: Request) {
  try {
    await requireAdmin();

    const { id } = await request.json();
    const messageId = Number(id);

    if (!Number.isInteger(messageId) || messageId <= 0) {
      return NextResponse.json(
        { error: "Geçersiz mesaj numarası." },
        { status: 400 }
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

    await sql`
      UPDATE iletisim_mesajlari
      SET okundu = true
      WHERE id = ${messageId}
    `;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "İşlem gerçekleştirilemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();

    const { id } = await request.json();
    const messageId = Number(id);

    if (!Number.isInteger(messageId) || messageId <= 0) {
      return NextResponse.json(
        { error: "Geçersiz mesaj numarası." },
        { status: 400 }
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

    await sql`
      DELETE FROM iletisim_mesajlari
      WHERE id = ${messageId}
    `;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "İşlem gerçekleştirilemedi." },
      { status: 500 }
    );
  }
}
