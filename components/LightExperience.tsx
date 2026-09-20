"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { projects } from "@/lib/site";
import { imageAtWidth } from "@/lib/media";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const REVEAL_SELECTORS = [
  ".hero-primary-copy",
  ".hero-meta",
  ".practice-intro",
  ".practice-proof",
  ".work-intro",
  ".project-story",
  ".expertise-head",
  ".discipline-row",
  ".control-layout",
  ".control-step",
  ".approach-sticky",
  ".approach-step",
  ".studio-media",
  ".studio-copy",
  ".commission-copy",
  ".commission-form-wrap",
  ".case-hero-copy",
  ".case-brief",
  ".case-response",
  ".case-gallery-item",
  ".case-material > *",
  ".case-next > *",
].join(",");

export function LightExperience() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS));

    if (reduced) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.08 },
    );

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.92) {
        node.classList.add("is-visible");
        return;
      }
      node.classList.add("will-reveal");
      observer.observe(node);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);


  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>(".hero-scene");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let py = 0;
    let px = 0;

    const paint = () => {
      raf = 0;
      const y = Math.min(window.scrollY, window.innerHeight * 1.15);
      const mobile = window.innerWidth <= 768;
      root.style.setProperty("--hero-y", reduced ? "0px" : `${(y * (mobile ? 0.018 : 0.055)).toFixed(1)}px`);
      root.style.setProperty("--hero-copy-y", reduced || mobile ? "0px" : `${(-y * 0.01).toFixed(1)}px`);
      root.style.setProperty("--hero-px", reduced ? "0px" : `${px.toFixed(1)}px`);
      root.style.setProperty("--hero-py", reduced ? "0px" : `${py.toFixed(1)}px`);
      root.dataset.scrolled = window.scrollY > 36 ? "true" : "false";
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--page-progress", Math.max(0, Math.min(1, window.scrollY / maxScroll)).toFixed(4));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const onScroll = () => schedule();
    const onPointer = (event: PointerEvent) => {
      if (reduced || !hero || !matchMedia("(pointer:fine)").matches) return;
      const r = hero.getBoundingClientRect();
      if (event.clientY < r.top || event.clientY > r.bottom) return;
      const nx = (event.clientX - (r.left + r.width / 2)) / Math.max(r.width, 1);
      const ny = (event.clientY - (r.top + r.height / 2)) / Math.max(r.height, 1);
      px = Math.max(-7, Math.min(7, nx * 12));
      py = Math.max(-5, Math.min(5, ny * 9));
      schedule();
    };
    const onLeave = () => { px = 0; py = 0; schedule(); };

    paint();
    addEventListener("scroll", onScroll, { passive: true });
    hero?.addEventListener("pointermove", onPointer, { passive: true });
    hero?.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      hero?.removeEventListener("pointermove", onPointer);
      hero?.removeEventListener("pointerleave", onLeave);
      root.removeAttribute("data-scrolled");
      root.style.removeProperty("--hero-y");
      root.style.removeProperty("--hero-copy-y");
      root.style.removeProperty("--hero-px");
      root.style.removeProperty("--hero-py");
      root.style.removeProperty("--page-progress");
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.site-header nav a[href^="/#"]'));
    const sections = links
      .map((link) => {
        const hash = new URL(link.href).hash;
        const section = hash ? document.querySelector<HTMLElement>(hash) : null;
        return section ? { link, section } : null;
      })
      .filter((entry): entry is { link: HTMLAnchorElement; section: HTMLElement } => Boolean(entry));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        links.forEach((link) => link.removeAttribute("data-active"));
        const match = sections.find((entry) => entry.section === visible.target);
        match?.link.setAttribute("data-active", "true");
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, .12, .3, .55] },
    );

    sections.forEach(({ section }) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"],a[href^="/#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      if (!hash.startsWith("#") || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      history.replaceState(history.state, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  useEffect(() => {
    const idleWindow = window as IdleWindow;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };
    const constrained =
      Boolean(nav.connection?.saveData) ||
      nav.connection?.effectiveType === "slow-2g" ||
      nav.connection?.effectiveType === "2g";

    let cancelled = false;
    let idleId = 0;
    let timer = 0;

    const warm = async () => {
      projects.forEach((project) => router.prefetch(`/work/${project.slug}`));
      if (constrained) return;

      const primary = projects.map((project) => project.cover);
      const secondary = projects.flatMap((project) => project.images.slice(0, 2).map((image) => image.src));
      const roomy = (nav.deviceMemory ?? 6) >= 4;
      const queue = roomy ? [...primary, ...secondary] : primary;
      for (const src of queue) {
        if (cancelled) return;
        const image = new Image();
        image.decoding = "async";
        image.src = imageAtWidth(src, innerWidth < 720 ? 720 : 1200);
        try {
          await image.decode();
        } catch {}
        await new Promise<void>((resolve) => setTimeout(resolve, 55));
      }
    };

    const schedule = () => {
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(() => void warm(), { timeout: 1800 });
      } else {
        timer = window.setTimeout(() => void warm(), 900);
      }
    };

    if (document.readyState === "complete") schedule();
    else addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      removeEventListener("load", schedule);
      if (idleId && idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(idleId);
      if (timer) clearTimeout(timer);
    };
  }, [router]);

  return null;
}
