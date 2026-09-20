"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
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
    if (!data.brief || data.brief.trim().length < 3) next.brief = "A few lines are enough";

    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      form.querySelector<HTMLElement>(`[data-field="${first}"],[name="${first}"]`)?.focus();
      return;
    }

    if (!requestIdRef.current) {
      requestIdRef.current = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`.replace(/\./g, "");
    }

    setStatus("sending");
    const requestId = requestIdRef.current;
    const started = Date.now();

    try {
      const ctrl = new AbortController();
      const timer = window.setTimeout(() => ctrl.abort(), 12000);
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

      const wait = Math.max(0, 700 - (Date.now() - started));
      if (wait && !reduce) await new Promise((resolve) => window.setTimeout(resolve, wait));

      const payload = await res.json().catch(() => ({}));
      if (res.ok && payload.ok) {
        setStatus("success");
        requestIdRef.current = "";
        form.reset();
        setErrors({});
        window.setTimeout(() => setStatus("idle"), 2800);
      } else {
        setStatus("failed");
      }
    } catch {
      setStatus(navigator.onLine ? "failed" : "offline");
    }
  }

  return (
    <section id="commission" className="commission-scene relative scroll-mt-24 overflow-hidden bg-paper text-ink" aria-labelledby="commission-heading">
      <div className="relative mx-auto max-w-[1280px] px-5 py-20 sm:px-7 md:px-10 md:py-28 lg:px-12 lg:py-36">
        <div className="commission-layout grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="commission-copy md:col-span-5 md:flex md:min-h-[40rem] md:flex-col md:justify-between">
            <div>
              <p className="commission-kicker text-[10px] font-semibold tracking-[0.2em] text-clay uppercase">Start a project</p>
              <h2 id="commission-heading" className="commission-title mt-5 font-display text-[3.25rem] leading-[0.92] font-light tracking-[-0.045em] text-ink sm:text-7xl md:text-[5.2rem]">
                Tell us<br />the essentials.
              </h2>
              <p className="commission-lead mt-7 max-w-md text-[15px] leading-[1.72] text-ink/66">
                Share the site, scope, budget and timing. A few clear lines are enough.
              </p>
            </div>

            <div className="commission-responsibility mt-10 border-t border-ink/10 pt-6 md:mt-16">
              <p className="text-[9px] font-semibold tracking-[0.18em] text-clay uppercase">Useful to include</p>
              <div className="mt-5 grid gap-4 text-[11px] leading-[1.55] text-ink/62 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <span>Site or city</span>
                <span>What should change</span>
                <span>Budget range</span>
                <span>Timing</span>
              </div>
              <p className="mt-7 text-[11px] leading-relaxed text-ink/48">
                <span className="text-ink/76">{site.email}</span>
              </p>
            </div>
          </div>

          <div className="commission-form-wrap relative md:col-span-7">
            <div className="commission-form-cap mb-4 flex items-center justify-between gap-4 text-[9px] tracking-[0.16em] text-ink/48 uppercase">
              <span>Project brief</span><span>Tashkent</span>
            </div>

            <form onSubmit={onSubmit} className="consultation-plane relative grid gap-x-5 gap-y-5 rounded-[1.5rem] px-5 py-7 text-ink sm:px-7 md:grid-cols-2 md:px-8 md:py-9" noValidate>
              <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>

              <Field label="Name" name="name" error={errors.name} autoComplete="name" onEdit={() => setErrors((current) => ({ ...current, name: "" }))} />
              <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" onEdit={() => setErrors((current) => ({ ...current, email: "" }))} />
              <CustomSelect label="Project type" name="type" error={errors.type} options={projectTypes} onValueChange={() => setErrors((current) => ({ ...current, type: "" }))} />
              <CustomSelect label="Budget range" name="budget" error={errors.budget} options={budgets} onValueChange={() => setErrors((current) => ({ ...current, budget: "" }))} />
              <Field label="Site / city" name="site" error={errors.site} className="md:col-span-2" onEdit={() => setErrors((current) => ({ ...current, site: "" }))} />

              <label className="form-field md:col-span-2">
                <span className="form-label">Brief</span>
                <textarea
                  data-field="brief"
                  name="brief"
                  rows={5}
                  aria-invalid={!!errors.brief}
                  className="form-control min-h-[8.5rem] resize-y"
                  placeholder="What needs to change? What must remain?"
                  onChange={() => setErrors((current) => ({ ...current, brief: "" }))}
                />
                {errors.brief && <small className="form-error">{errors.brief}</small>}
              </label>

              <div className="md:col-span-2 mt-1 flex flex-col gap-5 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-[11px] leading-[1.5] text-umber">A short brief is enough.</p>
                <button type="submit" disabled={status === "sending"} className="consultation-submit inline-flex min-h-12 items-center justify-center gap-4 rounded-full px-6 text-[10px] font-semibold tracking-[0.18em] uppercase disabled:cursor-wait disabled:opacity-60">
                  Send brief <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />
                </button>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {status !== "idle" && (
                <motion.div
                  key={status}
                  initial={reduce ? false : { opacity: 0, scale: 0.988, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.994, y: -5 }}
                  transition={{ duration: reduce ? 0.12 : 0.36, ease: [0.16, 1, 0.3, 1] }}
                  className="consultation-status absolute inset-0 z-40 flex items-center justify-center rounded-[1.5rem] p-5"
                  role="status"
                  aria-live="polite"
                >
                  <div className="consultation-status-card w-full max-w-md px-7 py-9 text-center sm:px-9">
                    <p className="text-[9px] font-semibold tracking-[0.18em] text-clay uppercase">
                      {status === "sending" ? "Sending" : status === "success" ? "Received" : "Could not send"}
                    </p>
                    <p className="mt-4 font-display text-[2.5rem] leading-none font-light">
                      {status === "sending" && "Sending."}
                      {status === "success" && "Received."}
                      {status === "failed" && "Try again."}
                      {status === "offline" && "Offline."}
                    </p>
                    <p className="mx-auto mt-5 max-w-xs text-sm leading-[1.65]">
                      {status === "sending" && "Sending your project brief."}
                      {status === "success" && "Your brief was received."}
                      {status === "failed" && "Your text is still here."}
                      {status === "offline" && "Reconnect and send again."}
                    </p>
                    {status !== "sending" && (
                      <button type="button" className="mt-7 min-h-10 text-[10px] font-semibold tracking-[0.16em] uppercase" onClick={() => setStatus("idle")}>Back</button>
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

function Field({
  label,
  name,
  error,
  type = "text",
  autoComplete,
  className = "",
  onEdit,
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
  onEdit?: () => void;
}) {
  return (
    <label className={`form-field ${className}`}>
      <span className="form-label">{label}</span>
      <input data-field={name} name={name} type={type} autoComplete={autoComplete} aria-invalid={!!error} className="form-control" onChange={onEdit} />
      {error && <small className="form-error">{error}</small>}
    </label>
  );
}

function CustomSelect({
  label,
  name,
  error,
  options,
  onValueChange,
}: {
  label: string;
  name: string;
  error?: string;
  options: readonly { value: string; label: string }[];
  onValueChange?: () => void;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((option) => option.value === value);
  const listRef = useRef<HTMLDivElement>(null);

  const focusOption = (index: number) => {
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
    if (!buttons?.length) return;
    const safe = (index + buttons.length) % buttons.length;
    buttons[safe]?.focus();
  };

  const openList = () => {
    setOpen(true);
    requestAnimationFrame(() => {
      const index = Math.max(0, options.findIndex((option) => option.value === value));
      focusOption(index);
    });
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const form = wrapRef.current?.closest("form");
    const onReset = () => {
      setValue("");
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    form?.addEventListener("reset", onReset);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      form?.removeEventListener("reset", onReset);
    };
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openList();
    }
  }

  return (
    <div ref={wrapRef} className={`form-field custom-select ${open ? "is-open" : ""}`}>
      <span className="form-label">{label}</span>
      <input type="hidden" name={name} value={value} readOnly />
      <button
        ref={buttonRef}
        data-field={name}
        type="button"
        className="custom-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={!!error}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span className={selected ? "" : "is-placeholder"}>{selected?.label ?? "Select"}</span>
        <i aria-hidden="true" />
      </button>

      {open && (
        <div ref={listRef} className="custom-select-panel" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              className={value === option.value ? "is-selected" : ""}
              onKeyDown={(event) => {
                const buttons = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? []);
                const index = buttons.indexOf(event.currentTarget);
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  focusOption(index + 1);
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  focusOption(index - 1);
                } else if (event.key === "Escape") {
                  event.preventDefault();
                  setOpen(false);
                  buttonRef.current?.focus();
                } else if (event.key === "Home") {
                  event.preventDefault();
                  focusOption(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  focusOption(buttons.length - 1);
                }
              }}
              onClick={() => {
                setValue(option.value);
                onValueChange?.();
                setOpen(false);
                requestAnimationFrame(() => buttonRef.current?.focus());
              }}
            >
              <span>{option.label}</span><i aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      {error && <small className="form-error">{error}</small>}
    </div>
  );
}
