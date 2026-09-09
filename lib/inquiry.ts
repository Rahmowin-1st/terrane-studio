export const PROJECT_TYPES = ["house", "interior", "landscape", "reuse", "other"] as const;
export const BUDGETS = ["explore", "25-50", "50-100", "100-250", "250+"] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type Budget = (typeof BUDGETS)[number];

export type InquiryInput = {
  name: string;
  email: string;
  type: string;
  budget: string;
  site: string;
  brief: string;
  requestId: string;
};

export type ValidInquiry = {
  name: string;
  email: string;
  type: ProjectType;
  budget: Budget;
  site: string;
  brief: string;
  requestId: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_RE = /^[A-Za-z0-9._:-]{8,120}$/;

export function clean(value: unknown, max = 1000) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function escapeHtml(value: string) {
  return clean(value, 5000).replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[ch]!,
  );
}

export function validateInquiry(raw: Record<string, unknown>):
  | { ok: true; value: ValidInquiry }
  | { ok: false; error: "invalid_fields" | "missing_request_id" } {
  const name = clean(raw.name, 120);
  const email = clean(raw.email, 200).toLowerCase();
  const type = clean(raw.type, 40);
  const budget = clean(raw.budget, 40);
  const site = clean(raw.site, 160);
  const brief = clean(raw.brief, 3000);
  const requestId = clean(raw.requestId, 120);

  if (!requestId || !REQUEST_RE.test(requestId)) {
    return { ok: false, error: "missing_request_id" };
  }
  if (
    name.length < 1 ||
    !EMAIL_RE.test(email) ||
    !(PROJECT_TYPES as readonly string[]).includes(type) ||
    !(BUDGETS as readonly string[]).includes(budget) ||
    site.length < 1 ||
    brief.length < 3
  ) {
    return { ok: false, error: "invalid_fields" };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      type: type as ProjectType,
      budget: budget as Budget,
      site,
      brief,
      requestId,
    },
  };
}

export function buildOwnerNotification(inquiry: ValidInquiry, storedId: string, submittedAt: string) {
  const text = [
    "TERRANE commission inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Project type: ${inquiry.type}`,
    `Budget: ${inquiry.budget}`,
    `Site / city: ${inquiry.site}`,
    `Brief: ${inquiry.brief}`,
    `Submission time: ${submittedAt}`,
    `Submission ID: ${inquiry.requestId}`,
    `Record ID: ${storedId}`,
  ].join("\n");

  const html = `
    <h2>TERRANE commission inquiry</h2>
    <p><strong>Name</strong><br>${escapeHtml(inquiry.name)}</p>
    <p><strong>Email</strong><br>${escapeHtml(inquiry.email)}</p>
    <p><strong>Project type</strong><br>${escapeHtml(inquiry.type)}</p>
    <p><strong>Budget</strong><br>${escapeHtml(inquiry.budget)}</p>
    <p><strong>Site / city</strong><br>${escapeHtml(inquiry.site)}</p>
    <p><strong>Brief</strong><br>${escapeHtml(inquiry.brief).replace(/\n/g, "<br>")}</p>
    <p><strong>Submission time</strong><br>${escapeHtml(submittedAt)}</p>
    <p><strong>Submission ID</strong><br>${escapeHtml(inquiry.requestId)}</p>
    <p><strong>Record ID</strong><br>${escapeHtml(storedId)}</p>
  `;

  return {
    subject: `TERRANE commission — ${inquiry.type} — ${inquiry.site}`,
    text,
    html,
  };
}
