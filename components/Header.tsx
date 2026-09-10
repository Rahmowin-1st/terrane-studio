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
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const el = glassRef.current;
    if (!el || !window.matchMedia("(pointer:fine)").matches) return;
    let tx = 48, ty = 38, cx = 48, cy = 38, raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.13; cy += (ty - cy) * 0.13;
      el.style.setProperty("--lg-x", `${cx}%`); el.style.setProperty("--lg-y", `${cy}%`);
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100;
      ty = ((e.clientY - r.top) / Math.max(r.height, 1)) * 100;
    };
    raf = requestAnimationFrame(tick);
    el.addEventListener("pointermove", onMove);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={`site-header fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[max(0.7rem,env(safe-area-inset-top))] transition-transform duration-500 ${hidden ? "-translate-y-[130%]" : "translate-y-0"}`}>
        <div ref={glassRef} className="liquid-glass site-header-inner flex h-14 w-full max-w-[1180px] items-center justify-between rounded-full px-3 md:h-[4.15rem] md:px-5" data-tone={tone}>
          <Link href="/" className="flex items-center gap-2.5 pl-1 text-current" aria-label={`${site.name} home`}>
            <Logo className="h-8 w-8" />
            <span className="font-display text-[1.15rem] tracking-[0.08em]">{site.name}</span>
            <span className="hidden text-[8px] tracking-[0.14em] opacity-45 uppercase sm:inline">/ Tashkent</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((item, i) => (
              <a key={item.id} href={item.href} className="group relative text-[10px] font-semibold tracking-[0.18em] uppercase opacity-72 transition-opacity hover:opacity-100">
                <span className="mr-1 text-[8px] opacity-45">0{i + 1}</span>{item.label}
                <span className="absolute inset-x-0 -bottom-2 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="/#commission" className="hidden min-h-10 items-center rounded-full bg-ink px-4 text-[10px] font-semibold tracking-[0.16em] text-bone uppercase transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex">Begin a commission</a>
            <button type="button" className="min-h-11 min-w-11 text-[10px] font-semibold tracking-[0.18em] uppercase lg:hidden" aria-expanded={open} aria-controls="index-menu" onClick={() => setOpen((v) => !v)}>{open ? "Close" : "Index"}</button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.aside
            id="index-menu"
            initial={reduce ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.1 : 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink px-5 pt-28 text-bone sm:px-7 lg:hidden"
          >
            <div className="mx-auto max-w-xl">
              <p className="text-[9px] font-semibold tracking-[0.2em] text-clay uppercase">Terrane / index</p>
              <nav className="mt-7 flex flex-col" aria-label="Mobile">
                {nav.map((item, i) => (
                  <motion.a key={item.id} href={item.href} onClick={() => setOpen(false)} initial={reduce ? false : { x: -22, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: reduce ? 0 : .08 + i * .045, duration: .45, ease: [0.16, 1, 0.3, 1] }} className="flex items-end justify-between gap-4 border-b border-bone/14 py-5 font-display text-[2.7rem] leading-none font-light">
                    <span><small className="mr-3 align-middle text-[10px] text-clay">0{i + 1}</small>{item.label}</span><span className="pb-1 text-xl text-bone/35">↗</span>
                  </motion.a>
                ))}
              </nav>
              <div className="mt-10 flex items-center justify-between gap-5 border-t border-bone/14 pt-6">
                <p className="max-w-[14rem] text-xs leading-relaxed text-bone/52">Architecture of ground, light, and duration.</p>
                <a href="/#commission" onClick={() => setOpen(false)} className="inline-flex min-h-12 items-center rounded-full bg-bone px-5 text-[9px] font-semibold tracking-[0.16em] text-ink uppercase">Start brief ↗</a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
