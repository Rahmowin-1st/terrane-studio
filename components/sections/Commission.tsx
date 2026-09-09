"use client";

import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { budgets, projectTypes, site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "failed" | "offline";

export function Commission() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reduce = useReducedMotion();
  const requestIdRef = useRef<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return;

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "")) next.email = "Valid email required";
    if (!data.type) next.type = "Choose one";
    if (!data.budget) next.budget = "Choose one";
    if (!data.site?.trim()) next.site = "Required";
    if (!data.brief || data.brief.trim().length < 3) next.brief = "A few sentences are enough";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }

    if (!requestIdRef.current) {
      requestIdRef.current = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`.replace(/\./g, "");
    }
    const requestId = requestIdRef.current;
    setStatus("sending");
    const started = Date.now();
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Request-Id": requestId },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          type: data.type,
          budget: data.budget,
          site: data.site,
          brief: data.brief,
          requestId,
        }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      const wait = Math.max(0, 1800 - (Date.now() - started));
      if (wait && !reduce) await new Promise((r) => setTimeout(r, wait));
      const payload = await res.json().catch(() => ({}));
      if (res.ok && payload.ok) {
        setStatus("success");
        requestIdRef.current = "";
        form.reset();
      } else {
        setStatus("failed");
      }
    } catch {
      setStatus(navigator.onLine ? "failed" : "offline");
    }
  }

  return (
    <section id="commission" className="scroll-mt-24 border-t border-ink/10 bg-bone" aria-labelledby="commission-heading">
      <div className="mx-auto mb-6 max-w-[1180px] px-5 pt-16 md:px-8">
        <div className="border border-ink/10 bg-paper px-6 py-10 md:px-10" data-enter="tilt">
          <p className="text-[11px] tracking-[0.18em] text-umber uppercase">Start from the real problem</p>
          <h2 className="mt-3 font-display text-3xl font-light md:text-4xl">Bring four things.</h2>
          <p className="mt-4 max-w-xl text-ink/75">The site, the lives it must hold, the budget range, and timing. A finished presentation is not required.</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 pb-20 md:grid-cols-12 md:px-8 md:pb-28">
        <div className="md:col-span-5" data-enter="left">
          <p className="text-[11px] tracking-[0.18em] text-umber uppercase">Consultation</p>
          <h2 id="commission-heading" className="mt-3 font-display text-4xl font-light md:text-5xl">
            Write to the studio
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/80">
            We reply within a week. We decline more work than we take — so the work we accept can be finished properly.
            This form is the recorded path; the note is stored with the studio before any reply is written.
          </p>
          <p className="mt-6 text-sm text-umber">
            Brand correspondence:{" "}
            <span className="text-ink">{site.email}</span>
          </p>
        </div>

        <div className="relative md:col-span-7" data-enter="right">
          <form onSubmit={onSubmit} className="liquid-panel grid gap-5 px-5 py-8 md:grid-cols-2 md:px-8 md:py-10" noValidate>
            <label className="sr-only" aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <Field label="Name" name="name" error={errors.name} autoComplete="name" />
            <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
            <SelectField label="Project type" name="type" error={errors.type} options={projectTypes} />
            <SelectField label="Budget range" name="budget" error={errors.budget} options={budgets} />
            <Field label="Site / city" name="site" error={errors.site} className="md:col-span-2" />
            <label className="md:col-span-2">
              <span className="text-[11px] tracking-[0.16em] text-umber uppercase">Brief</span>
              <textarea
                name="brief"
                rows={5}
                aria-invalid={!!errors.brief}
                className="mt-2 w-full resize-y border-b border-ink/25 bg-transparent py-3 outline-none focus:border-ink"
              />
              {errors.brief && <small className="text-xs text-[#b64747]">{errors.brief}</small>}
            </label>
            <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-umber">No mailing list. Critical decisions stay documented.</p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex min-h-12 items-center justify-center bg-ink px-8 text-[11px] font-medium tracking-[0.18em] text-bone uppercase hover:bg-moss disabled:opacity-60"
              >
                Request consultation
              </button>
            </div>
          </form>

          <AnimatePresence>
            {status !== "idle" && (
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="send-veil absolute inset-0 flex items-center justify-center p-6"
                role="status"
              >
                <div className="w-full max-w-sm border border-bone/20 bg-ink px-6 py-8 text-center text-bone">
                  <p className="font-display text-3xl font-light">
                    {status === "sending" && "Sending."}
                    {status === "success" && "Received."}
                    {status === "failed" && "Not held yet."}
                    {status === "offline" && "Offline."}
                  </p>
                  <p className="mt-4 text-sm text-bone/70">
                    {status === "sending" && "The studio is recording your brief."}
                    {status === "success" && "The studio has your note. We reply within a week."}
                    {status === "failed" && "Your words are still in the form. Try again."}
                    {status === "offline" && "Reconnect and send again. Nothing was lost."}
                  </p>
                  {status !== "sending" && (
                    <button type="button" className="mt-6 text-[11px] tracking-[0.16em] uppercase underline" onClick={() => setStatus("idle")}>
                      Return
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="text-[11px] tracking-[0.16em] text-umber uppercase">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className="mt-2 min-h-12 w-full border-b border-ink/25 bg-transparent outline-none focus:border-ink"
      />
      {error && <small className="text-xs text-[#b64747]">{error}</small>}
    </label>
  );
}

function SelectField({
  label,
  name,
  error,
  options,
}: {
  label: string;
  name: string;
  error?: string;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <label>
      <span className="text-[11px] tracking-[0.16em] text-umber uppercase">{label}</span>
      <select
        name={name}
        defaultValue=""
        aria-invalid={!!error}
        className="mt-2 min-h-12 w-full appearance-none border-b border-ink/25 bg-transparent outline-none focus:border-ink"
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <small className="text-xs text-[#b64747]">{error}</small>}
    </label>
  );
}
