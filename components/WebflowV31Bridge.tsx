"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const q = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  root.querySelector<T>(selector);
const qa = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(selector));
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/**
 * Native Next.js bridge for the final Webflow V3.1 visual state.
 * It intentionally does NOT recreate Webflow's loader/menu/form runtimes.
 * React owns navigation, carousel state, form state and API calls.
 */
export function WebflowV31Bridge() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("terrane-v2");
    document.documentElement.classList.add("terrane-v31");

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer:fine)").matches;
    const cleanups: Array<() => void> = [];

    const header = q<HTMLElement>(".site-header-inner");
    if (header) {
      header.classList.add("tv3-liquid");

      const darkSelectors = [".hero-scene", ".expertise-scene", ".commission-scene", ".case-hero", ".case-material", "footer"];
      const updateTone = () => {
        const r = header.getBoundingClientRect();
        const y = r.top + r.height * 0.56;
        let dark = false;
        for (const selector of darkSelectors) {
          for (const el of qa<HTMLElement>(selector)) {
            const b = el.getBoundingClientRect();
            if (b.top <= y && b.bottom >= y) {
              dark = true;
              break;
            }
          }
          if (dark) break;
        }
        header.dataset.tv3Tone = dark ? "dark" : "light";
        header.dataset.tv3Scrolled = scrollY > 96 ? "true" : "false";
      };
      updateTone();
      addEventListener("scroll", updateTone, { passive: true });
      addEventListener("resize", updateTone, { passive: true });
      cleanups.push(() => {
        removeEventListener("scroll", updateTone);
        removeEventListener("resize", updateTone);
      });
    }

    if (!q(".terrane-chrome")) {
      const el = document.createElement("div");
      el.className = "terrane-chrome";
      el.setAttribute("aria-hidden", "true");
      el.innerHTML =
        '<div class="terrane-chrome__progress"></div>' +
        '<div class="terrane-chrome__left"><span>TERRANE / TASHKENT</span><i class="terrane-chrome__rule"></i><span>41.31°N</span></div>' +
        '<div class="terrane-chrome__right"><span>ARCHITECTURE / INTERIOR / LAND</span><i class="terrane-chrome__rule"></i><span>69.24°E</span></div>' +
        '<div class="terrane-chrome__scene"><b>01</b><span>GROUND / LIGHT / DURATION</span></div>';
      document.body.appendChild(el);
    }

    const chromeLeft = q<HTMLElement>(".terrane-chrome__left");
    const chromeRight = q<HTMLElement>(".terrane-chrome__right");
    const sceneRead = q<HTMLElement>(".terrane-chrome__scene");
    if (chromeLeft) chromeLeft.innerHTML = '<span>TERRANE / TASHKENT</span><i class="terrane-chrome__rule"></i><span>41.31°N</span>';
    if (chromeRight) chromeRight.innerHTML = '<span>ARCHITECTURE / INTERIOR / LAND</span><i class="terrane-chrome__rule"></i><span>69.24°E</span>';
    if (sceneRead) sceneRead.innerHTML = "<b>01</b><span>GROUND / LIGHT / DURATION</span>";
    const sceneConfig = [
      [".hero-scene", "01", "GROUND / LIGHT / DURATION"],
      [".practice-scene", "02", "PRACTICE / WHAT REMAINS"],
      [".work-scene", "03", "SELECTED WORK / 01—05"],
      [".expertise-scene", "04", "EXPERTISE / ONE PRACTICE"],
      [".control-scene", "05", "DECISION ARCHITECTURE"],
      [".approach-scene", "06", "APPROACH / SITE TO HANDOVER"],
      [".studio-scene", "07", "STUDIO / TASHKENT"],
      [".commission-scene", "08", "COMMISSION / BEGIN"],
    ] as const;

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit || !sceneRead) return;
        sceneRead.innerHTML = `<b>${(hit.target as HTMLElement).dataset.tv2Index || "01"}</b><span>${(hit.target as HTMLElement).dataset.tv2Label || "TERRANE"}</span>`;
      },
      { rootMargin: "-38% 0px -42% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75] },
    );
    sceneConfig.forEach(([selector, index, label]) => {
      const el = q<HTMLElement>(selector);
      if (!el) return;
      el.dataset.tv2Index = index;
      el.dataset.tv2Label = label;
      sceneObserver.observe(el);
    });
    cleanups.push(() => sceneObserver.disconnect());

    let progressRaf = 0;
    const updateProgress = () => {
      cancelAnimationFrame(progressRaf);
      progressRaf = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        document.documentElement.style.setProperty("--tv2-progress", clamp(scrollY / max, 0, 1).toFixed(4));
      });
    };
    updateProgress();
    addEventListener("scroll", updateProgress, { passive: true });
    cleanups.push(() => {
      removeEventListener("scroll", updateProgress);
      cancelAnimationFrame(progressRaf);
    });

    const navLinks = qa<HTMLAnchorElement>('.site-header nav a[href^="#"]');
    const navMap = new Map<Element, HTMLAnchorElement>();
    navLinks.forEach((link) => {
      const id = link.getAttribute("href");
      if (!id) return;
      const section = q(id);
      if (section) navMap.set(section, link);
    });
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => (link.dataset.active = "false"));
          navMap.get(entry.target)?.setAttribute("data-active", "true");
        });
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0.01 },
    );
    navMap.forEach((_, section) => navObserver.observe(section));
    cleanups.push(() => navObserver.disconnect());

    const approachSteps = qa<HTMLElement>(".approach-step");
    if (approachSteps.length) {
      const approachObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            approachSteps.forEach((step) => step.classList.remove("is-current"));
            (entry.target as HTMLElement).classList.add("is-current");
          });
        },
        { rootMargin: "-38% 0px -48% 0px", threshold: 0.1 },
      );
      approachSteps.forEach((step) => approachObserver.observe(step));
      cleanups.push(() => approachObserver.disconnect());
    }

    const hero = q<HTMLElement>(".hero-frame");
    if (hero && !q(".tv2-hero-coordinate", hero)) {
      const coordinate = document.createElement("div");
      coordinate.className = "tv2-hero-coordinate";
      coordinate.setAttribute("aria-hidden", "true");
      coordinate.innerHTML = "<strong>Ground / light</strong><span>41.31°N / 69.24°E<br>Climate / proportion / use<br>Archive 01—05</span>";
      hero.appendChild(coordinate);
    }
    if (hero && !q(".tv3-hero-island", hero)) {
      const island = document.createElement("div");
      island.className = "tv3-hero-island";
      island.setAttribute("aria-hidden", "true");
      island.innerHTML = '<i></i><span>Explore the work</span><span class="tv3-hero-island__bar"><span></span></span><b>01—08</b>';
      hero.appendChild(island);
    }

    const projectCleanups: Array<() => void> = [];
    qa<HTMLElement>(".project-story").forEach((story, index) => {
      story.dataset.tv2Project = String(index + 1).padStart(2, "0");
      const stage = q<HTMLElement>(".project-stage", story);
      if (!stage) return;

      if (!q(".tv2-stage-frame", stage)) {
        const frame = document.createElement("div");
        frame.className = "tv2-stage-frame";
        frame.setAttribute("aria-hidden", "true");
        frame.innerHTML = "<i></i><i></i><i></i><i></i>";
        stage.appendChild(frame);
      }

      if (!q(".tv2-project-dossier", stage)) {
        const dossier = document.createElement("div");
        dossier.className = "tv2-project-dossier";
        dossier.setAttribute("aria-hidden", "true");
        dossier.innerHTML =
          '<div class="tv2-project-dossier__head"><span>Study</span><span class="tv2-project-dossier__index">' +
          String(index + 1).padStart(2, "0") +
          '</span></div><div class="tv2-project-dossier__rule"></div><div class="tv2-project-dossier__meta"><span>Layer</span><b>Spatial</b><span>Read</span><b>Material</b><span>Mode</span><b>Live</b></div>';
        stage.appendChild(dossier);
      }

      let cross = q<HTMLElement>(".tv2-crosshair", stage);
      if (!cross) {
        cross = document.createElement("div");
        cross.className = "tv2-crosshair";
        cross.setAttribute("aria-hidden", "true");
        cross.innerHTML = "<span>50 / 50</span>";
        stage.appendChild(cross);
      }

      if (fine && !reduce) {
        let touchedImage: HTMLElement | null = null;
        let raf = 0;
        let clientX = 0;
        let clientY = 0;

        const paint = () => {
          raf = 0;
          const r = stage.getBoundingClientRect();
          const x = clamp((clientX - r.left) / Math.max(1, r.width), 0, 1) - 0.5;
          const y = clamp((clientY - r.top) / Math.max(1, r.height), 0, 1) - 0.5;
          stage.style.setProperty("--tv2-rx", (-y * 2.4).toFixed(2) + "deg");
          stage.style.setProperty("--tv2-ry", (x * 3.2).toFixed(2) + "deg");

          const active = q<HTMLElement>(".project-image.is-active", stage);
          if (touchedImage && touchedImage !== active) touchedImage.style.transform = "";
          touchedImage = active;
          if (active) active.style.transform = `scale(1.055) translate(${(-x * 14).toFixed(1)}px,${(-y * 10).toFixed(1)}px)`;

          const px = clamp((clientX - r.left) / Math.max(1, r.width) * 100, 0, 100);
          const py = clamp((clientY - r.top) / Math.max(1, r.height) * 100, 0, 100);
          cross!.style.setProperty("--x", px.toFixed(1) + "%");
          cross!.style.setProperty("--y", py.toFixed(1) + "%");
          const read = q<HTMLElement>("span", cross!);
          if (read) read.textContent = Math.round(px) + " / " + Math.round(py);
        };

        const onMove = (event: PointerEvent) => {
          clientX = event.clientX;
          clientY = event.clientY;
          if (!raf) raf = requestAnimationFrame(paint);
        };
        const onLeave = () => {
          if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
          stage.style.setProperty("--tv2-rx", "0deg");
          stage.style.setProperty("--tv2-ry", "0deg");
          if (touchedImage) touchedImage.style.transform = "";
          touchedImage = null;
        };
        stage.addEventListener("pointermove", onMove, { passive: true });
        stage.addEventListener("pointerleave", onLeave, { passive: true });
        projectCleanups.push(() => {
          if (raf) cancelAnimationFrame(raf);
          stage.removeEventListener("pointermove", onMove);
          stage.removeEventListener("pointerleave", onLeave);
        });
      }
    });
    cleanups.push(() => projectCleanups.forEach((fn) => fn()));

    const studio = q<HTMLElement>(".studio-scene .mx-auto");
    if (studio && !q(".tv2-material-strip", studio)) {
      const strip = document.createElement("div");
      strip.className = "tv2-material-strip";
      strip.setAttribute("aria-label", "Material language");
      strip.innerHTML = ["Earth", "Lime", "Timber", "Brick"]
        .map((name, index) => `<div class="tv2-material-strip__item"><span class="tv2-material-strip__index">0${index + 1}</span><span class="tv2-material-strip__name">${name}</span></div>`)
        .join("");
      studio.appendChild(strip);
    }

    const caseRoot = q<HTMLElement>("#main");
    const caseHero = q<HTMLElement>(".case-hero", caseRoot || document);
    if (caseHero && !q(".tv2-case-index", caseHero)) {
      const index = document.createElement("div");
      index.className = "tv2-case-index";
      index.setAttribute("aria-hidden", "true");
      index.textContent = "TERRANE / CASE STUDY";
      caseHero.appendChild(index);
      const scene = q<HTMLElement>(".terrane-chrome__scene");
      if (scene) scene.innerHTML = "<b>CS</b><span>CASE / STUDY</span>";
      const left = q<HTMLElement>(".terrane-chrome__left");
      if (left) left.innerHTML = '<span>TERRANE / CASE STUDY</span><i class="terrane-chrome__rule"></i><span>ARCHIVE</span>';
    }

    const pressSelector =
      ".hero-primary-cta,.hero-secondary-cta,.project-arrow,.project-link,.consultation-submit,.site-header-inner button,.case-back,.case-next a";
    qa<HTMLElement>(pressSelector).forEach((el) => el.classList.add("tv3-pressable"));

    const form = q<HTMLElement>(".consultation-plane");
    if (form && fine && !reduce) {
      let formRaf = 0;
      let formX = 80;
      let formY = 0;
      const paintForm = () => {
        formRaf = 0;
        form.style.setProperty("--form-x", formX.toFixed(1) + "%");
        form.style.setProperty("--form-y", formY.toFixed(1) + "%");
      };
      const onFormMove = (event: PointerEvent) => {
        const r = form.getBoundingClientRect();
        formX = clamp((event.clientX - r.left) / Math.max(1, r.width) * 100, 0, 100);
        formY = clamp((event.clientY - r.top) / Math.max(1, r.height) * 100, 0, 100);
        if (!formRaf) formRaf = requestAnimationFrame(paintForm);
      };
      form.addEventListener("pointermove", onFormMove, { passive: true });
      cleanups.push(() => {
        if (formRaf) cancelAnimationFrame(formRaf);
        form.removeEventListener("pointermove", onFormMove);
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
