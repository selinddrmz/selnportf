
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    redirect("/admin");
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL tanımlanmamış.");
  }

  const sql = neon(databaseUrl);

  const sessions = await sql`
    SELECT token
    FROM oturumlar
    WHERE token = ${token}
      AND bitis > NOW()
    LIMIT 1
  `;

  if (sessions.length === 0) {
    redirect("/admin");
  }
}
