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
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
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
      const wait = Math.max(0, 950 - (Date.now() - started));
      if (wait && !reduce) await new Promise((r) => setTimeout(r, wait));
      const payload = await res.json().catch(() => ({}));
      if (res.ok && payload.ok) {
        setStatus("success");
        requestIdRef.current = "";
        form.reset();
        setErrors({});
      } else {
        setStatus("failed");
      }
    } catch {
      setStatus(navigator.onLine ? "failed" : "offline");
    }
  }

  return (
    <section id="commission" className="commission-scene relative scroll-mt-24 overflow-hidden bg-ink text-bone" aria-labelledby="commission-heading">
      <div className="commission-grid absolute inset-0" aria-hidden="true" />
      <div className="commission-orbit commission-orbit-a" aria-hidden="true" />
      <div className="commission-orbit commission-orbit-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px] px-5 py-20 sm:px-7 md:px-10 md:py-28 lg:px-12 lg:py-36">
        <div className="commission-layout grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="commission-copy md:col-span-5 md:flex md:min-h-[44rem] md:flex-col md:justify-between">
            <div>
              <p className="commission-kicker text-[10px] font-semibold tracking-[0.2em] text-sand uppercase">Commission / start with the real problem</p>
              <h2 id="commission-heading" className="commission-title mt-5 font-display text-[3.25rem] leading-[0.92] font-light tracking-[-0.045em] text-bone sm:text-7xl md:text-[5.2rem]">
                Start with<br />the site.
              </h2>
              <p className="commission-lead mt-7 max-w-md text-[15px] leading-[1.78] text-bone/66">
                Send the place, what must change, the budget range and the timing. No polished deck is required. The form is the recorded path: a success state appears only after the server has accepted and stored the brief.
              </p>
            </div>

            <div className="commission-responsibility mt-10 border-t border-bone/18 pt-6 md:mt-16">
              <p className="text-[9px] font-semibold tracking-[0.18em] text-clay uppercase">What this surface guarantees</p>
              <div className="mt-5 grid gap-4 text-[11px] leading-[1.55] text-bone/62 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <span>Server-confirmed success</span>
                <span>Idempotent request path</span>
                <span>Input retained on failure</span>
                <span>No mailing list</span>
              </div>
              <p className="mt-7 text-[11px] leading-relaxed text-bone/48">
                Brand correspondence: <span className="text-bone/76">{site.email}</span>. This address is brand copy and is not presented as proof of notification delivery.
              </p>
            </div>
          </div>

          <div className="commission-form-wrap relative md:col-span-7">
            <div className="commission-form-cap mb-4 flex items-center justify-between gap-4 text-[9px] tracking-[0.16em] text-bone/48 uppercase">
              <span>Project brief / secure recorded path</span><span>02nd portfolio system</span>
            </div>
            <form onSubmit={onSubmit} className="consultation-plane relative grid gap-x-6 gap-y-6 overflow-hidden rounded-[1.75rem] px-5 py-7 text-ink sm:px-7 md:grid-cols-2 md:px-9 md:py-10" noValidate>
              <div className="consultation-plane-shine absolute inset-0" aria-hidden="true" />
              <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <Field label="Name" name="name" error={errors.name} autoComplete="name" />
              <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
              <SelectField label="Project type" name="type" error={errors.type} options={projectTypes} />
              <SelectField label="Budget range" name="budget" error={errors.budget} options={budgets} />
              <Field label="Site / city" name="site" error={errors.site} className="md:col-span-2" />
              <label className="form-field md:col-span-2">
                <span className="form-label">Brief</span>
                <textarea name="brief" rows={6} aria-invalid={!!errors.brief} className="form-control min-h-[9rem] resize-y" placeholder="What needs to change? What must remain?" />
                {errors.brief && <small className="form-error">{errors.brief}</small>}
              </label>

              <div className="md:col-span-2 mt-1 flex flex-col gap-5 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-[11px] leading-[1.5] text-umber">No polished brief needed. Critical decisions stay documented.</p>
                <button type="submit" disabled={status === "sending"} className="consultation-submit group inline-flex min-h-13 items-center justify-center gap-5 rounded-full bg-ink px-7 text-[10px] font-semibold tracking-[0.18em] text-bone uppercase disabled:cursor-wait disabled:opacity-60">
                  Request consultation <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
                </button>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {status !== "idle" && (
                <motion.div
                  key={status}
                  initial={reduce ? false : { opacity: 0, scale: 0.985, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.992, y: -6 }}
                  transition={{ duration: reduce ? 0.12 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="consultation-status absolute inset-0 z-20 flex items-center justify-center rounded-[1.75rem] p-5"
                  role="status"
                  aria-live="polite"
                >
                  <div className="consultation-status-card w-full max-w-md border border-bone/18 bg-ink/94 px-7 py-10 text-center text-bone shadow-2xl backdrop-blur-xl sm:px-9">
                    <p className="text-[9px] font-semibold tracking-[0.18em] text-clay uppercase">
                      {status === "sending" ? "Recording brief" : status === "success" ? "Server confirmed" : "Not recorded"}
                    </p>
                    <p className="mt-4 font-display text-[2.6rem] leading-none font-light">
                      {status === "sending" && "Holding the note."}
                      {status === "success" && "Received."}
                      {status === "failed" && "Not held yet."}
                      {status === "offline" && "Offline."}
                    </p>
                    <p className="mx-auto mt-5 max-w-xs text-sm leading-[1.65] text-bone/62">
                      {status === "sending" && "The studio path is validating and storing your brief."}
                      {status === "success" && "The server accepted and stored the brief. Notification delivery depends on the configured owner channel."}
                      {status === "failed" && "Your words remain in the form. Return and try again."}
                      {status === "offline" && "Reconnect and send again. Your entered text remains in place."}
                    </p>
                    {status === "sending" ? (
                      <div className="consultation-progress mx-auto mt-8 h-px w-36 overflow-hidden bg-bone/15"><span className="block h-full w-1/2 bg-clay" /></div>
                    ) : (
                      <button type="button" className="mt-8 min-h-10 text-[10px] font-semibold tracking-[0.18em] uppercase underline decoration-bone/30 underline-offset-4" onClick={() => setStatus("idle")}>Return to brief</button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, error, type = "text", autoComplete, className = "" }: { label: string; name: string; error?: string; type?: string; autoComplete?: string; className?: string }) {
  return (
    <label className={`form-field ${className}`}>
      <span className="form-label">{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} aria-invalid={!!error} className="form-control" />
      {error && <small className="form-error">{error}</small>}
    </label>
  );
}

function SelectField({ label, name, error, options }: { label: string; name: string; error?: string; options: readonly { value: string; label: string }[] }) {
  return (
    <label className="form-field">
      <span className="form-label">{label}</span>
      <select name={name} defaultValue="" aria-invalid={!!error} className="form-control appearance-none">
        <option value="" disabled>Select</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <small className="form-error">{error}</small>}
    </label>
  );
}
