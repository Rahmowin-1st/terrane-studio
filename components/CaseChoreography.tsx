"use client";

import { useEffect } from "react";

export function CaseChoreography() {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(".case-hero-media", { clipPath: "inset(4% 7% 8% 34%)" }, { clipPath: "inset(0 0 0 0)", duration: 1.25 }, 0)
          .fromTo(".case-cover", { scale: 1.13 }, { scale: 1.02, duration: 1.45, ease: "power3.out" }, 0)
          .fromTo(".case-kicker", { x: -28, opacity: 0 }, { x: 0, opacity: 1, duration: .5 }, .25)
          .fromTo(".case-title", { y: 58, opacity: 0 }, { y: 0, opacity: 1, duration: .78 }, .35)
          .fromTo(".case-hero-copy > div", { opacity: 0 }, { opacity: 1, duration: .45 }, .68);

        const mm = gsap.matchMedia();
        mm.add("(min-width: 769px)", () => {
          gsap.to(".case-cover", { yPercent: 7, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".case-hero", start: "top top", end: "bottom top", scrub: .9 } });
          gsap.from(".case-brief", { x: -48, opacity: 0, duration: .8, scrollTrigger: { trigger: ".case-intro", start: "top 78%", once: true } });
          gsap.from(".case-response", { x: 52, y: 18, opacity: 0, duration: .82, scrollTrigger: { trigger: ".case-intro", start: "top 78%", once: true } });
          document.querySelectorAll<HTMLElement>(".case-gallery-item").forEach((item, i) => {
            const image = item.querySelector<HTMLElement>(".case-gallery-image");
            gsap.fromTo(item, { clipPath: i % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)", duration: .95, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 83%", once: true } });
            if (image) gsap.fromTo(image, { scale: 1.09 }, { scale: 1.01, duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 84%", once: true } });
            if (image) gsap.to(image, { yPercent: i % 2 ? 4 : -4, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 1 } });
          });
          gsap.from(".case-material > *", { y: 34, opacity: 0, duration: .7, stagger: .08, scrollTrigger: { trigger: ".case-material", start: "top 80%", once: true } });
          gsap.from(".case-next a", { y: 34, opacity: 0, duration: .7, scrollTrigger: { trigger: ".case-next", start: "top 82%", once: true } });
        });
        mm.add("(max-width: 768px)", () => {
          [".case-brief", ".case-response", ".case-gallery-item", ".case-material > *"].forEach((selector) => {
            document.querySelectorAll<HTMLElement>(selector).forEach((el) => gsap.from(el, { y: 24, opacity: 0, duration: .58, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } }));
          });
        });
        cleanup = () => mm.revert();
      });
      ScrollTrigger.refresh();
      const prev = cleanup;
      cleanup = () => { prev?.(); ctx.revert(); };
    };
    run();
    return () => { disposed = true; cleanup?.(); };
  }, []);
  return null;
}
