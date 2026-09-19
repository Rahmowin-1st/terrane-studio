import { NextResponse } from "next/server";
import { clean, validateInquiry } from "@/lib/inquiry";
import { markNotification, persistInquiry } from "@/lib/db";
import { notifyOwner } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 16_384;

const DEFAULT_ALLOWED_ORIGINS = [
  "https://terrane-studio.vercel.app",
] as const;

function allowedOrigins() {
  const extra = (process.env.ALLOWED_ORIGINS || process.env.WEBFLOW_ALLOWED_ORIGIN || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return new Set<string>([...DEFAULT_ALLOWED_ORIGINS, ...extra]);
}

function corsOrigin(req: Request) {
  const origin = req.headers.get("origin") || "";
  if (!origin) return "";
  if (allowedOrigins().has(origin)) return origin;
  try {
    const host = new URL(origin).hostname;
    if (host === "webflow.io" || host.endsWith(".webflow.io")) return origin;
  } catch {}
  return "";
}

function corsHeaders(req: Request) {
  const origin = corsOrigin(req);
  const headers: Record<string, string> = {
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  if (origin) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type, X-Request-Id";
  }
  return headers;
}

function json(req: Request, body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: corsHeaders(req),
  });
}

async function clientHash(req: Request, email: string) {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "0";
  const raw = `${ip}|${email.toLowerCase()}`;
  const data = new TextEncoder().encode(raw);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = Array.from(new Uint8Array(digest));
  return bytes
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

export async function OPTIONS(req: Request) {
  if (!corsOrigin(req)) return new NextResponse(null, { status: 403, headers: corsHeaders(req) });
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

export async function GET(req: Request) {
  return json(req, { ok: false, error: "method_not_allowed" }, 405);
}

export async function POST(req: Request) {
  const length = Number(req.headers.get("content-length") || 0);
  if (length > MAX_BYTES) return json(req, { ok: false, error: "payload_too_large" }, 413);

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json(req, { ok: false, error: "invalid_json" }, 400);
  }

  if (clean(body.website, 200)) {
    return json(req, { ok: true, id: null, ignored: true });
  }

  const allowed = new Set(["name", "email", "type", "budget", "site", "brief", "requestId", "website"]);
  for (const key of Object.keys(body)) {
    if (!allowed.has(key)) return json(req, { ok: false, error: "unexpected_fields" }, 400);
  }

  const parsed = validateInquiry({
    ...body,
    requestId: body.requestId || req.headers.get("x-request-id"),
  });
  if (!parsed.ok) return json(req, { ok: false, error: parsed.error }, 400);

  const inquiry = parsed.value;
  const hash = await clientHash(req, inquiry.email);
  const stored = await persistInquiry({
    requestId: inquiry.requestId,
    name: inquiry.name,
    email: inquiry.email,
    type: inquiry.type,
    budget: inquiry.budget,
    site: inquiry.site,
    brief: inquiry.brief,
    clientHash: hash,
  });

  if (!stored.ok) {
    const status = stored.error === "rate_limited" ? 429 : stored.error === "invalid_fields" ? 400 : 503;
    return json(req, { ok: false, error: stored.error }, status);
  }

  if (stored.duplicate) {
    if (stored.notificationStatus !== "sent") {
      await markNotification(inquiry.requestId, "duplicate_suppressed");
    }
    console.info(
      JSON.stringify({
        scope: "terrane.inquiry",
        event: "duplicate",
        requestId: inquiry.requestId,
        notification: stored.notificationStatus,
      }),
    );
    return json(req, {
      ok: true,
      id: stored.id,
      requestId: stored.requestId,
      duplicate: true,
      notification: stored.notificationStatus,
    });
  }

  const notified = await notifyOwner(inquiry, stored.id);
  if (notified.status === "sent") {
    await markNotification(inquiry.requestId, "sent");
  } else if (notified.status === "skipped_unconfigured") {
    await markNotification(inquiry.requestId, "skipped_unconfigured");
  } else {
    await markNotification(inquiry.requestId, "failed", notified.reason);
  }

  console.info(
    JSON.stringify({
      scope: "terrane.inquiry",
      event: "accepted",
      requestId: inquiry.requestId,
      notification: notified.status,
    }),
  );

  return json(req, {
    ok: true,
    id: stored.id,
    requestId: stored.requestId,
    duplicate: false,
    notification: notified.status,
  });
}
