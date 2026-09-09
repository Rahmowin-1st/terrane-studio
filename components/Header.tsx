"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("dark");
  const reduce = useReducedMotion();
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = 0;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (!open) {
          if (y < 72) setHidden(false);
          else if (y > last + 12) setHidden(true);
          else if (y < last - 12) setHidden(false);
        }
        setTone(y < window.innerHeight * 0.68 ? "dark" : "light");
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const el = glassRef.current;
    if (!el) return;
    let tx = 48;
    let ty = 38;
    let cx = 48;
    let cy = 38;
    let raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      el.style.setProperty("--lg-x", `${cx}%`);
      el.style.setProperty("--lg-y", `${cy}%`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100;
      ty = ((e.clientY - r.top) / Math.max(r.height, 1)) * 100;
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[max(0.7rem,env(safe-area-inset-top))] transition-transform duration-500 ${
          hidden ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div
          ref={glassRef}
          className="liquid-glass flex h-14 w-full max-w-[1180px] items-center justify-between rounded-full px-3 md:h-[4.15rem] md:px-5"
          data-tone={tone}
        >
          <Link href="/" className="flex items-center gap-2.5 pl-1 text-current" aria-label={`${site.name} home`}>
            <Logo className="h-8 w-8" />
            <span className="font-display text-[1.15rem] tracking-[0.08em]">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-[11px] font-medium tracking-[0.18em] uppercase opacity-80 transition-opacity hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/#commission"
              className="hidden min-h-10 items-center rounded-full bg-ink px-4 text-[11px] font-medium tracking-[0.16em] text-bone uppercase md:inline-flex"
            >
              Begin a commission
            </a>
            <button
              type="button"
              className="min-h-11 min-w-11 text-[11px] font-medium tracking-[0.18em] uppercase lg:hidden"
              aria-expanded={open}
              aria-controls="index-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Index"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.aside
            id="index-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bone px-6 pt-28 lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="border-b border-ink/10 py-5 font-display text-4xl font-light"
                >
                  <small className="mr-3 text-sm text-umber">0{i + 1}</small>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <a
              href="/#commission"
              onClick={() => setOpen(false)}
              className="mt-10 inline-flex min-h-12 items-center bg-ink px-6 text-[11px] tracking-[0.16em] text-bone uppercase"
            >
              Begin a commission
            </a>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
