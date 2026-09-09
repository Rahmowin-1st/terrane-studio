import { NextResponse } from "next/server";
import { dbHealth } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const db = await dbHealth();
  const mailConfigured = Boolean(
    process.env.RESEND_API_KEY && (process.env.OWNER_NOTIFICATION_EMAIL || process.env.CONSULTATION_TO),
  );
  return NextResponse.json(
    {
      ok: db,
      service: "terrane",
      db: db ? "up" : "down",
      notification: mailConfigured ? "configured" : "unconfigured",
    },
    { status: db ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}
