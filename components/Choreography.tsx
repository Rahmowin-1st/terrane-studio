"use client";

import { useEffect } from "react";

/**
 * TERRANE V2 motion authority.
 * CSS owns trivial states, Motion owns component/UI state,
 * GSAP owns cinematic page/scroll choreography.
 */
export function Choreography() {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        document.documentElement.dataset.motion = "reduced";
        return;
      }
      document.documentElement.dataset.motion = "terrane-v2";

      const context = gsap.context(() => {
        // Signature opening: mask -> architecture -> copy -> detail.
        const load = gsap.timeline({ defaults: { ease: "power4.out" } });
        load
          .fromTo(
            ".hero-media-shell",
            { clipPath: "inset(5% 7% 5% 43% round 2px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.35 },
            0,
          )
          .fromTo(
            ".hero-media",
            { scale: 1.14, xPercent: 3 },
            { scale: 1.02, xPercent: 0, duration: 1.55, ease: "power3.out" },
            0,
          )
          .fromTo(".hero-shade", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.12)
          .fromTo(".hero-kicker", { x: -28, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55 }, 0.26)
          .fromTo(
            ".hero-line > span",
            { yPercent: 118, rotateX: -10, opacity: 0 },
            { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.82, stagger: 0.095 },
            0.3,
          )
          .fromTo(".hero-lead", { x: 32, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65 }, 0.58)
          .fromTo(".hero-actions > *", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.7)
          .fromTo(".hero-meta", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65 }, 0.72)
          .fromTo(".hero-footer-line", { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0.85)
          .fromTo(
            ".hero-plan-line",
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.95, stagger: 0.08, ease: "power2.inOut" },
            0.64,
          )
          .fromTo(".hero-plan-dot", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, stagger: 0.08 }, 1.05);

        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
          // Hero release: copy and camera move at different rates.
          gsap.to(".hero-media", {
            yPercent: 8,
            scale: 1.09,
            ease: "none",
            scrollTrigger: { trigger: ".hero-scene", start: "top top", end: "bottom top", scrub: 0.8 },
          });
          gsap.to(".hero-copy", {
            yPercent: -12,
            ease: "none",
            scrollTrigger: { trigger: ".hero-scene", start: "top top", end: "bottom top", scrub: 0.8 },
          });
          gsap.to(".hero-grid", {
            opacity: 0.15,
            ease: "none",
            scrollTrigger: { trigger: ".hero-scene", start: "35% top", end: "bottom top", scrub: true },
          });

          // Practice: opposing axes and rule drawing.
          gsap.from(".practice-title", {
            x: -58,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".practice-intro", start: "top 78%", once: true },
          });
          gsap.from(".practice-copy", {
            x: 52,
            y: 12,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: ".practice-intro", start: "top 78%", once: true },
          });
          gsap.fromTo(
            ".practice-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1, ease: "power3.inOut", scrollTrigger: { trigger: ".practice-rule", start: "top 84%", once: true } },
          );
          gsap.from(".practice-proof", {
            y: 48,
            opacity: 0,
            rotationZ: (i) => (i % 2 ? 0.7 : -0.7),
            duration: 0.72,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: ".practice-grid", start: "top 82%", once: true },
          });

          // Selected work: each project has a distinct entrance vector and a slow camera drift.
          document.querySelectorAll<HTMLElement>(".project-story").forEach((story, index) => {
            const stage = story.querySelector<HTMLElement>(".project-stage-wrap");
            const activeImage = () => story.querySelector<HTMLElement>(".project-image.is-active");
            const copy = story.querySelector<HTMLElement>(".project-copy");
            const number = story.querySelector<HTMLElement>(".project-number");
            const reversed = story.classList.contains("is-reverse");
            const tl = gsap.timeline({
              scrollTrigger: { trigger: story, start: "top 80%", once: true },
              defaults: { ease: "power3.out" },
            });
            if (stage) {
              tl.fromTo(
                stage,
                { clipPath: reversed ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0%)", duration: 0.95 },
                0,
              );
            }
            const img = activeImage();
            if (img) tl.fromTo(img, { scale: 1.11 }, { scale: 1.02, duration: 1.15, ease: "power2.out" }, 0);
            if (copy) tl.from(copy, { x: reversed ? -54 : 54, y: 18, opacity: 0, duration: 0.8 }, 0.18);
            if (number) tl.from(number, { y: 80, opacity: 0, duration: 0.95, ease: "power4.out" }, 0.06);

            story.querySelectorAll<HTMLElement>(".project-image").forEach((image, imageIndex) => {
              gsap.to(image, {
                yPercent: ((index + imageIndex) % 2 ? 5 : -5),
                ease: "none",
                scrollTrigger: { trigger: story, start: "top bottom", end: "bottom top", scrub: 1 },
              });
            });
          });

          // Expertise field: perspective resolves into flat plan-like rows.
          gsap.from(".expertise-title", {
            y: 36,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: { trigger: ".expertise-head", start: "top 78%", once: true },
          });
          document.querySelectorAll<HTMLElement>(".discipline-row").forEach((row, i) => {
            gsap.from(row, {
              x: i % 2 ? 55 : -55,
              opacity: 0,
              rotationY: i % 2 ? -4 : 4,
              transformPerspective: 1100,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 88%", once: true },
            });
          });

          // Decision architecture.
          gsap.from(".control-title", {
            x: -48,
            opacity: 0,
            duration: 0.9,
            scrollTrigger: { trigger: ".control-scene", start: "top 74%", once: true },
          });
          gsap.from(".control-step", {
            x: 42,
            y: 18,
            opacity: 0,
            duration: 0.68,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: ".control-steps", start: "top 80%", once: true },
          });
          gsap.to(".control-orbit-a", {
            rotation: 18,
            xPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: ".control-scene", start: "top bottom", end: "bottom top", scrub: 1.2 },
          });

          // Approach rail is the temporal spine of the process.
          gsap.fromTo(
            ".approach-rail-active",
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".approach-track", start: "top 68%", end: "bottom 45%", scrub: true } },
          );
          document.querySelectorAll<HTMLElement>(".approach-step").forEach((step, i) => {
            gsap.from(step.querySelector(".approach-step-copy"), {
              x: i % 2 ? 34 : 52,
              y: 24,
              opacity: 0.25,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 78%", once: true },
            });
            const dot = step.querySelector(".approach-dot");
            if (dot) {
              gsap.fromTo(
                dot,
                { scale: 0.78, backgroundColor: "#f2ece2" },
                { scale: 1, backgroundColor: "#e6dccb", duration: 0.45, scrollTrigger: { trigger: step, start: "top 62%", toggleActions: "play none none reverse" } },
              );
            }
          });

          // Studio: image and statement cross axes; detail crop drifts separately.
          gsap.fromTo(
            ".studio-main-image",
            { clipPath: "inset(8% 14% 8% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".studio-media", start: "top 78%", once: true } },
          );
          gsap.from(".studio-copy", {
            x: 58,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: ".studio-scene", start: "top 70%", once: true },
          });
          gsap.to(".studio-detail-image", {
            yPercent: -8,
            scale: 1.06,
            ease: "none",
            scrollTrigger: { trigger: ".studio-scene", start: "top bottom", end: "bottom top", scrub: 1 },
          });

          // Consultation is a signature scene, not a static footer form.
          const commissionTl = gsap.timeline({
            scrollTrigger: { trigger: ".commission-layout", start: "top 78%", once: true },
            defaults: { ease: "power3.out" },
          });
          commissionTl
            .from(".commission-copy", { x: -64, opacity: 0, duration: 0.9 }, 0)
            .from(".commission-form-wrap", { x: 72, y: 22, opacity: 0, scale: 0.985, duration: 0.95 }, 0.06)
            .from(".form-field", { y: 18, opacity: 0, duration: 0.45, stagger: 0.055 }, 0.36)
            .from(".commission-responsibility", { y: 20, opacity: 0, duration: 0.55 }, 0.5);
          gsap.to(".commission-orbit-a", {
            rotation: 22,
            scale: 1.08,
            ease: "none",
            scrollTrigger: { trigger: ".commission-scene", start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
          gsap.to(".commission-orbit-b", {
            rotation: -16,
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: ".commission-scene", start: "top bottom", end: "bottom top", scrub: 1.2 },
          });

          gsap.from(".footer-inner", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: "footer", start: "top 88%", once: true },
          });
        });

        mm.add("(max-width: 768px)", () => {
          // Mobile choreography: purpose-built, fast, no long pinning or heavy scrub.
          gsap.set(".hero-media-shell", { clipPath: "inset(0 0 0 0)" });
          const targets = [
            ".practice-title",
            ".practice-copy",
            ".project-story",
            ".expertise-head",
            ".discipline-row",
            ".control-title",
            ".control-step",
            ".approach-step",
            ".studio-media",
            ".studio-copy",
            ".commission-copy",
            ".commission-form-wrap",
          ];
          targets.forEach((selector) => {
            document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
              gsap.from(el, {
                y: 26,
                opacity: 0,
                duration: 0.62,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 91%", once: true },
              });
            });
          });
          gsap.fromTo(
            ".approach-rail-active",
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".approach-track", start: "top 82%", end: "bottom 65%", scrub: true } },
          );
        });

        cleanup = () => mm.revert();
      });

      ScrollTrigger.refresh();
      const previousCleanup = cleanup;
      cleanup = () => {
        previousCleanup?.();
        context.revert();
        document.documentElement.removeAttribute("data-motion");
      };
    };

    run();
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
