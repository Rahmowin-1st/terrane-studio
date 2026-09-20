"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { projects } from "@/lib/site";
import { imageAtWidth } from "@/lib/media";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const EXTRA_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=88",
  "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1800&q=86",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=82",
];

export function FinalExperience() {
  const pathname = usePathname();
  const router = useRouter();

  const warmRoutes = useMemo(
    () => ["/", ...projects.map((project) => `/work/${project.slug}`)],
    [],
  );

  const warmImages = useMemo(() => {
    const urls = new Set<string>(EXTRA_IMAGES);
    for (const project of projects) {
      urls.add(project.cover);
      for (const image of project.images) urls.add(image.src);
    }
    return Array.from(urls);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("terrane-v4");

    let raf = 0;
    let pointerRaf = 0;
    let px = 50;
    let py = 28;

    const paintScroll = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const progress = Math.max(0, Math.min(1, scrollY / max));
      root.style.setProperty("--v4-scroll", progress.toFixed(4));
      root.style.setProperty("--v4-scroll-shift", `${(progress * 140).toFixed(1)}px`);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paintScroll);
    };

    const paintPointer = () => {
      pointerRaf = 0;
      root.style.setProperty("--v4-mx", `${px.toFixed(1)}%`);
      root.style.setProperty("--v4-my", `${py.toFixed(1)}%`);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!matchMedia("(pointer:fine)").matches) return;
      px = Math.max(0, Math.min(100, (event.clientX / Math.max(1, innerWidth)) * 100));
      py = Math.max(0, Math.min(100, (event.clientY / Math.max(1, innerHeight)) * 100));
      if (!pointerRaf) pointerRaf = requestAnimationFrame(paintPointer);
    };

    paintScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (pointerRaf) cancelAnimationFrame(pointerRaf);
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onPointerMove);
      root.classList.remove("terrane-v4");
    };
  }, []);

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
      target.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  useEffect(() => {
    const idleWindow = window as IdleWindow;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    }).connection;
    const constrained =
      Boolean(connection?.saveData) ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    let cancelled = false;
    let idleId = 0;
    let timer = 0;

    const preloadImage = async (src: string) => {
      if (cancelled) return;
      const targetWidth = innerWidth < 720 ? 720 : innerWidth < 1280 ? 960 : 1280;
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      (img as HTMLImageElement & { fetchPriority?: "high" | "low" | "auto" }).fetchPriority = "low";
      img.src = imageAtWidth(src, targetWidth);
      try {
        await img.decode();
      } catch {
        // A warmup miss must never affect the visible site.
      }
    };

    const warm = async () => {
      if (cancelled) return;
      document.documentElement.dataset.warmup = "routes";
      warmRoutes.forEach((route) => router.prefetch(route));

      if (constrained) {
        document.documentElement.dataset.warmup = "ready";
        return;
      }

      document.documentElement.dataset.warmup = "media";
      let cursor = 0;
      const worker = async () => {
        while (!cancelled && cursor < warmImages.length) {
          const src = warmImages[cursor++];
          await preloadImage(src);
          await new Promise<void>((resolve) => {
            if (idleWindow.requestIdleCallback) {
              idleWindow.requestIdleCallback(() => resolve(), { timeout: 700 });
            } else {
              window.setTimeout(resolve, 28);
            }
          });
        }
      };

      await Promise.all([worker(), worker()]);
      if (!cancelled) document.documentElement.dataset.warmup = "ready";
    };

    const schedule = () => {
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(() => void warm(), { timeout: 1400 });
      } else {
        timer = window.setTimeout(() => void warm(), 650);
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
  }, [router, warmImages, warmRoutes]);

  return (
    <div className="terrane-v4-atmosphere" aria-hidden="true">
      <span className="terrane-v4-orb terrane-v4-orb-a" />
      <span className="terrane-v4-orb terrane-v4-orb-b" />
      <span className="terrane-v4-orb terrane-v4-orb-c" />
      <span className="terrane-v4-veil" />
      <span className="terrane-v4-vignette" />
    </div>
  );
}
