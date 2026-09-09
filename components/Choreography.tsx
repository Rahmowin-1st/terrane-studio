"use client";

import { useEffect } from "react";

/** GSAP owns hero + section entrance vectors. Never applied to .liquid-glass. */
export function Choreography() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let killed = false;
    const run = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (killed) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const hero = document.querySelector(".hero-copy");
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
        tl.from(".hero-kicker", { x: -24, opacity: 0 }, 0.15)
          .from(".hero-title", { x: -30, opacity: 0 }, 0.22)
          .from(".hero-lead", { y: 18, opacity: 0 }, 0.38)
          .from(".hero-actions > *", { y: 16, opacity: 0, stagger: 0.08 }, 0.48)
          .from(".hero-note", { x: 16, opacity: 0 }, 0.62);
      }

      const media = document.querySelector(".hero-media");
      if (media) {
        gsap.to(media, {
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
        });
      }

      document.querySelectorAll("[data-enter]").forEach((el, i) => {
        const kind = el.getAttribute("data-enter");
        const from =
          kind === "left"
            ? { x: -28, opacity: 0, rotate: -1.2 }
            : kind === "right"
              ? { x: 28, opacity: 0, rotate: 1.2 }
              : kind === "tilt"
                ? { y: 28, opacity: 0, rotate: 1.4 }
                : { y: 22, opacity: 0 };
        gsap.from(el, {
          ...from,
          duration: 0.85,
          delay: (i % 4) * 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });
    };

    run();
    return () => {
      killed = true;
      import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger.getAll().forEach((t) => t.kill()));
    };
  }, []);

  return null;
}
