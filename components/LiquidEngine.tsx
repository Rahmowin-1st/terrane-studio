"use client";

import { useEffect } from "react";

/** Chromium SVG displacement lens. Motion/GSAP never touch this filter. */
export function LiquidEngine() {
  useEffect(() => {
    const ua = navigator.userAgent;
    const isChromium = /Chrome|Chromium|Edg|CriOS/i.test(ua) && !/OPR|Opera|Firefox/i.test(ua);
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const constrained =
      Boolean(nav.connection?.saveData) ||
      (nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4) ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4);

    if (!isChromium || window.innerWidth < 900 || !fine || reduced || constrained) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    svg.innerHTML = `
      <filter id="terrane-liquid-filter" x="-12%" y="-50%" width="124%" height="200%" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="7.5" result="blur"/>
        <feColorMatrix in="blur" type="saturate" values="1.28" result="sat"/>
        <feImage result="map" preserveAspectRatio="none"/>
        <feDisplacementMap in="sat" in2="map" scale="16" xChannelSelector="R" yChannelSelector="G"/>
      </filter>`;
    document.body.appendChild(svg);
    document.documentElement.classList.add("lg-svg");

    const feImage = svg.querySelector("feImage");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const paint = (w: number, h: number) => {
      if (!ctx || !feImage) return;
      const maxW = 360;
      const scale = Math.min(1, maxW / Math.max(1, w));
      const W = Math.max(48, Math.round(w * scale));
      const H = Math.max(24, Math.round(h * scale));
      canvas.width = W;
      canvas.height = H;
      const img = ctx.createImageData(W, H);
      const rx = W * 0.46;
      const ry = H * 0.42;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const dx = (x - W / 2) / rx;
          const dy = (y - H / 2) / ry;
          const d = Math.sqrt(dx * dx + dy * dy);
          const rim = Math.max(0, 1 - Math.abs(d - 0.82) / 0.34);
          const i = (y * W + x) * 4;
          img.data[i] = 128 + rim * 86;
          img.data[i + 1] = 128 + (1 - rim) * 36;
          img.data[i + 2] = 132;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      feImage.setAttribute("href", canvas.toDataURL());
    };

    const header = document.querySelector<HTMLElement>(".liquid-glass");
    let resizeTimer = 0;
    let pendingWidth = 0;
    let pendingHeight = 0;
    const ro = header
      ? new ResizeObserver((entries) => {
          const { width, height } = entries[0].contentRect;
          pendingWidth = width;
          pendingHeight = height;
          window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(() => paint(pendingWidth, pendingHeight), 120);
        })
      : null;
    if (header && ro) {
      ro.observe(header);
      paint(header.offsetWidth, header.offsetHeight);
    }

    return () => {
      ro?.disconnect();
      window.clearTimeout(resizeTimer);
      svg.remove();
      document.documentElement.classList.remove("lg-svg");
    };
  }, []);

  return null;
}
