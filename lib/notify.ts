import { buildOwnerNotification, type ValidInquiry } from "./inquiry";

export type NotifyResult =
  | { status: "sent"; providerId: string | null }
  | { status: "skipped_unconfigured" }
  | { status: "failed"; reason: "send_failed" | "send_unavailable" };

export async function notifyOwner(inquiry: ValidInquiry, storedId: string): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.OWNER_NOTIFICATION_EMAIL || process.env.CONSULTATION_TO;
  if (!apiKey || !recipient) return { status: "skipped_unconfigured" };

  const submittedAt = new Date().toISOString();
  const message = buildOwnerNotification(inquiry, storedId, submittedAt);
  const payload = {
    from: process.env.RESEND_FROM || "TERRANE <onboarding@resend.dev>",
    to: [recipient],
    subject: message.subject,
    reply_to: inquiry.email,
    html: message.html,
    text: message.text,
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `terrane-consultation/${inquiry.requestId}`,
      },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => ({}))) as { id?: string };
    if (!response.ok) return { status: "failed", reason: "send_failed" };
    return { status: "sent", providerId: data.id || null };
  } catch {
    return { status: "failed", reason: "send_unavailable" };
  }
}
