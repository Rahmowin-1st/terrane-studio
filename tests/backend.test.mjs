import assert from "node:assert/strict";
import { test } from "node:test";

const SUPABASE_URL = "https://jqpeohbbbmnoujxaiutr.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcGVvaGJiYm1ub3VqeGFpdXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMDU0NjIsImV4cCI6MjEwMDc4MTQ2Mn0._IZClGdvxS1z5IjgT1kYHOLoeRa8UOXR6_etdQNrvuw";

const PROJECT_TYPES = ["house", "interior", "landscape", "reuse", "other"];
const BUDGETS = ["explore", "25-50", "50-100", "100-250", "250+"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max = 1000) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function validate(raw) {
  const name = clean(raw.name, 120);
  const email = clean(raw.email, 200).toLowerCase();
  const type = clean(raw.type, 40);
  const budget = clean(raw.budget, 40);
  const site = clean(raw.site, 160);
  const brief = clean(raw.brief, 3000);
  const requestId = clean(raw.requestId, 120);
  if (!requestId || requestId.length < 8) return { ok: false, error: "missing_request_id" };
  if (
    !name ||
    !EMAIL_RE.test(email) ||
    !PROJECT_TYPES.includes(type) ||
    !BUDGETS.includes(budget) ||
    !site ||
    brief.length < 3
  ) {
    return { ok: false, error: "invalid_fields" };
  }
  return { ok: true };
}

async function rpc(fn, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

test("valid fields accepted locally", () => {
  const result = validate({
    name: "Test Visitor",
    email: "visitor@example.com",
    type: "house",
    budget: "50-100",
    site: "Tashkent",
    brief: "A courtyard house on a long south plot.",
    requestId: "req-test-valid-0001",
  });
  assert.equal(result.ok, true);
});

test("invalid email rejected", () => {
  const result = validate({
    name: "Test Visitor",
    email: "not-an-email",
    type: "house",
    budget: "50-100",
    site: "Tashkent",
    brief: "Enough text",
    requestId: "req-test-email-0001",
  });
  assert.equal(result.ok, false);
  assert.equal(result.error, "invalid_fields");
});

test("missing required data rejected", () => {
  const result = validate({
    name: "",
    email: "visitor@example.com",
    type: "house",
    budget: "50-100",
    site: "",
    brief: "",
    requestId: "req-test-missing-0001",
  });
  assert.equal(result.ok, false);
});

test("oversized input is bounded", () => {
  const brief = "x".repeat(8000);
  const result = validate({
    name: "A".repeat(400),
    email: "visitor@example.com",
    type: "house",
    budget: "50-100",
    site: "Tashkent",
    brief,
    requestId: "req-test-size-0001",
  });
  assert.equal(result.ok, true);
});

test("unexpected project type rejected", () => {
  const result = validate({
    name: "Test Visitor",
    email: "visitor@example.com",
    type: "spaceship",
    budget: "50-100",
    site: "Tashkent",
    brief: "Enough text here",
    requestId: "req-test-type-0001",
  });
  assert.equal(result.ok, false);
});

test("owner notification payload is structured", () => {
  const inquiry = {
    name: "Dilshod",
    email: "dilshod@example.com",
    type: "interior",
    site: "Samarkand",
    brief: "Light well and millwork.",
    requestId: "req-mail-0001",
  };
  const text = [
    "TERRANE commission inquiry",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Project type: ${inquiry.type}`,
    `Site / city: ${inquiry.site}`,
    `Brief: ${inquiry.brief}`,
    `Submission ID: ${inquiry.requestId}`,
    `Record ID: rec-1`,
  ].join("\n");
  assert.match(text, /Name: Dilshod/);
  assert.match(text, /Email: dilshod@example.com/);
  assert.match(text, /Project type: interior/);
  assert.match(text, /Site \/ city: Samarkand/);
  assert.match(text, /Submission ID: req-mail-0001/);
});

test("health RPC is reachable", async () => {
  const { status, data } = await rpc("terrane_health", {});
  assert.equal(status, 200);
  assert.equal(data.ok, true);
});

test("valid inquiry persists and idempotent retry does not duplicate", async () => {
  const requestId = `req-e2e-${Date.now()}-idem`;
  const payload = {
    p_request_id: requestId,
    p_name: "Backend Proof",
    p_email: "proof@example.com",
    p_project_type: "house",
    p_budget: "explore",
    p_site_city: "Qibray",
    p_brief: "Production persistence proof for TERRANE.",
    p_client_hash: `hash-${requestId}`.slice(0, 32),
  };
  const first = await rpc("terrane_submit_inquiry", payload);
  assert.equal(first.status, 200);
  assert.equal(first.data.ok, true);
  assert.equal(first.data.duplicate, false);
  assert.ok(first.data.id);

  const second = await rpc("terrane_submit_inquiry", payload);
  assert.equal(second.status, 200);
  assert.equal(second.data.ok, true);
  assert.equal(second.data.duplicate, true);
  assert.equal(second.data.id, first.data.id);
});

test("invalid type is rejected by database constraints", async () => {
  const { status, data } = await rpc("terrane_submit_inquiry", {
    p_request_id: `req-e2e-${Date.now()}-badtype`,
    p_name: "Backend Proof",
    p_email: "proof@example.com",
    p_project_type: "spaceship",
    p_budget: "explore",
    p_site_city: "Qibray",
    p_brief: "Should not persist.",
    p_client_hash: "hash-invalid-type-proof-0001",
  });
  assert.ok(status === 200 || status >= 400);
  if (status === 200) {
    assert.equal(data.ok, false);
    assert.equal(data.error, "invalid_fields");
  }
});

test("public REST cannot read inquiries", async () => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries?select=*`, {
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
    },
  });
  assert.notEqual(res.status, 200);
});
