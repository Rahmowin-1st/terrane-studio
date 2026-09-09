/**
 * Production path: isolated schema `terrane` on Veltrix Hom.
 * Access is RPC-only. Anon/publishable key is the intended public API key.
 * Env overrides exist for rotation; fallbacks keep the landing durable
 * because Vercel env wiring is not available from this deploy path.
 */
const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://jqpeohbbbmnoujxaiutr.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcGVvaGJiYm1ub3VqeGFpdXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMDU0NjIsImV4cCI6MjEwMDc4MTQ2Mn0._IZClGdvxS1z5IjgT1kYHOLoeRa8UOXR6_etdQNrvuw";

export type PersistResult =
  | {
      ok: true;
      duplicate: boolean;
      id: string;
      requestId: string;
      notificationStatus: string;
    }
  | { ok: false; error: "rate_limited" | "invalid_fields" | "persist_failed" };

async function rpc<T>(fn: string, body: Record<string, unknown>): Promise<{ status: number; data: T | null }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => null)) as T | null;
  return { status: res.status, data };
}

export async function persistInquiry(input: {
  requestId: string;
  name: string;
  email: string;
  type: string;
  budget: string;
  site: string;
  brief: string;
  clientHash: string;
}): Promise<PersistResult> {
  try {
    const { status, data } = await rpc<{
      ok?: boolean;
      duplicate?: boolean;
      id?: string;
      request_id?: string;
      notification_status?: string;
      error?: string;
    }>("terrane_submit_inquiry", {
      p_request_id: input.requestId,
      p_name: input.name,
      p_email: input.email,
      p_project_type: input.type,
      p_budget: input.budget,
      p_site_city: input.site,
      p_brief: input.brief,
      p_client_hash: input.clientHash,
    });

    if (!data || status >= 400 || data.ok === false) {
      if (data?.error === "rate_limited") return { ok: false, error: "rate_limited" };
      if (data?.error === "invalid_fields") return { ok: false, error: "invalid_fields" };
      return { ok: false, error: "persist_failed" };
    }
    if (!data.id || !data.request_id) return { ok: false, error: "persist_failed" };

    return {
      ok: true,
      duplicate: Boolean(data.duplicate),
      id: String(data.id),
      requestId: String(data.request_id),
      notificationStatus: String(data.notification_status || "pending"),
    };
  } catch {
    return { ok: false, error: "persist_failed" };
  }
}

export async function markNotification(
  requestId: string,
  status: "sent" | "failed" | "skipped_unconfigured" | "duplicate_suppressed",
  error?: string,
) {
  try {
    await rpc("terrane_mark_notification", {
      p_request_id: requestId,
      p_status: status,
      p_error: error ?? null,
    });
  } catch {
    // Inquiry already persisted. Notification bookkeeping must not throw.
  }
}

export async function dbHealth(): Promise<boolean> {
  try {
    const { status, data } = await rpc<{ ok?: boolean }>("terrane_health", {});
    return status < 400 && data?.ok === true;
  } catch {
    return false;
  }
}
