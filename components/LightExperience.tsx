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

      const firstImages = projects.map((project) => project.cover);
      for (const src of firstImages) {
        if (cancelled) return;
        const image = new Image();
        image.decoding = "async";
        image.src = imageAtWidth(src, innerWidth < 720 ? 720 : 1100);
        try {
          await image.decode();
        } catch {}
        await new Promise<void>((resolve) => setTimeout(resolve, 40));
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
