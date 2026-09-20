"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { projects } from "@/lib/site";
import { imageSrcSet } from "@/lib/media";

function Stage({ images, title }: { images: { src: string; alt: string }[]; title: string }) {
  const slides = images.slice(0, 3);
  const [i, setI] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ id: number; x: number; y: number; t: number } | null>(null);
  const hovered = useRef(false);
  const focused = useRef(false);
  const resumeTimer = useRef<number | null>(null);

  const clearResume = () => {
    if (resumeTimer.current !== null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const resumeWhenIdle = () => {
    clearResume();
    resumeTimer.current = window.setTimeout(() => {
      resumeTimer.current = null;
      if (!hovered.current && !focused.current) setPaused(false);
    }, 650);
  };

  const go = (n: number) => setI((v) => (v + n + slides.length) % slides.length);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.45)),
      { threshold: [0, 0.2, 0.45, 0.7] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !inView || slides.length < 2) return;
    const timer = window.setInterval(() => go(1), 5000);
    return () => window.clearInterval(timer);
  }, [inView, paused, reduce, slides.length]);

  useEffect(() => () => clearResume(), []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, t: performance.now() };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setPaused(true);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const dt = Math.max(1, performance.now() - start.t);
    const velocity = dx / dt;
    const horizontal = Math.abs(dx) > Math.abs(dy) * 1.15;
    const threshold = Math.max(34, event.currentTarget.clientWidth * 0.12);

    if (horizontal && (Math.abs(dx) >= threshold || Math.abs(velocity) > 0.45)) {
      go(dx < 0 ? 1 : -1);
    }

    resumeWhenIdle();
  };

  return (
    <div
      ref={rootRef}
      className="project-stage relative overflow-hidden bg-ink"
      role="group"
      aria-roledescription="carousel"
      aria-label={title + " image gallery"}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        pointer.current = null;
        resumeWhenIdle();
      }}
      onMouseEnter={() => {
        hovered.current = true;
        clearResume();
        setPaused(true);
      }}
      onMouseLeave={() => {
        hovered.current = false;
        if (!focused.current) setPaused(false);
      }}
      onFocus={() => {
        focused.current = true;
        clearResume();
        setPaused(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          focused.current = false;
          if (!hovered.current) setPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        } else if (event.key === "Home") {
          event.preventDefault();
          setI(0);
        } else if (event.key === "End") {
          event.preventDefault();
          setI(slides.length - 1);
        }
      }}
      style={{ touchAction: "pan-y" }}
    >
      <div className="project-image-stack absolute inset-0">
        {slides.map((img, idx) => (
          <img
            key={img.src}
            src={img.src}
            srcSet={imageSrcSet(img.src)}
            sizes="(min-width: 769px) 64vw, 100vw"
            alt={img.alt}
            className={"project-image absolute inset-0 h-full w-full object-cover " + (idx === i ? "is-active" : "")}
            loading="lazy"
            fetchPriority="auto"
            decoding="async"
            aria-hidden={idx !== i}
          />
        ))}
      </div>
      <div className="project-media-shade absolute inset-0" aria-hidden="true" />
      <div className="project-stage-index absolute left-4 top-4 text-[9px] font-medium tracking-[0.18em] text-bone/65 uppercase sm:left-5 sm:top-5">
        Image {String(i + 1).padStart(2, "0")}
      </div>
      <div className="project-controls absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 sm:inset-x-5 sm:bottom-5">
        <span className="project-counter text-[10px] tracking-[0.16em] text-bone uppercase" aria-live="polite">
          {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button type="button" aria-label={"Previous " + title + " image"} className="project-arrow" onClick={() => go(-1)}>←</button>
          <button type="button" aria-label={"Next " + title + " image"} className="project-arrow" onClick={() => go(1)}>→</button>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="work-scene scroll-mt-24" aria-labelledby="work-heading">
      <div className="work-intro mx-auto max-w-[1280px] px-5 pt-20 pb-12 sm:px-7 md:px-10 md:pt-28 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="work-eyebrow text-[10px] font-semibold tracking-[0.2em] text-umber uppercase">Selected work / 01—05</p>
            <h2 id="work-heading" className="work-heading mt-4 max-w-[52rem] font-display text-[2.8rem] leading-[0.98] font-light tracking-[-0.035em] sm:text-6xl md:text-[5.2rem]">
              Five studies. Five different spatial moves.
            </h2>
          </div>
          <p className="work-note md:col-span-4 md:pb-2 text-sm leading-[1.65] text-umber">
            Architecture, interior and landscape studies told through proportion, material and use. Photography is licensed reference, not claimed client work.
          </p>
        </div>
      </div>

      <div className="project-sequence mx-auto max-w-[1280px] px-5 pb-24 sm:px-7 md:px-10 lg:px-12">
        {projects.map((project, idx) => (
          <article key={project.slug} className={`project-story ${idx % 2 ? "is-reverse" : ""}`} data-project-index={idx}>
            <div className="project-number" aria-hidden="true">{project.index}</div>
            <div className="project-layout">
              <div className="project-stage-wrap">
                <Stage images={[{ src: project.cover, alt: project.coverAlt }, ...project.images].slice(0, 3)} title={project.title} />
              </div>
              <div className="project-copy">
                <div className="project-copy-rule" />
                <p className="project-kicker text-[10px] font-semibold tracking-[0.18em] text-umber uppercase">
                  {project.index} / {project.type} / {project.location} / {project.year}
                </p>
                <h3 className="project-title mt-4 font-display text-[2.2rem] leading-[0.98] font-light tracking-[-0.025em] sm:text-5xl md:text-[3.7rem]">
                  {project.title}
                </h3>
                <p className="project-excerpt mt-5 max-w-lg text-[15px] leading-[1.7] text-ink/72">{project.excerpt}</p>
                <dl className="project-facts mt-8 grid gap-5 border-y border-ink/10 py-5 text-sm text-ink/75 sm:grid-cols-2">
                  <div><dt className="mb-1 text-[9px] font-semibold tracking-[0.16em] text-umber uppercase">Goal</dt><dd>{project.goal}</dd></div>
                  <div><dt className="mb-1 text-[9px] font-semibold tracking-[0.16em] text-umber uppercase">Core move</dt><dd>{project.design}</dd></div>
                </dl>
                <Link href={`/work/${project.slug}`} className="project-link group mt-8 inline-flex min-h-11 items-center gap-5 text-[10px] font-semibold tracking-[0.18em] uppercase">
                  Read the study <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </article>
        ))}

        <div className="work-disclosure flex flex-col gap-2 border-t border-ink/15 pt-5 text-[11px] leading-relaxed text-umber sm:flex-row sm:justify-between">
          <span>Portfolio study / visual references licensed from Unsplash.</span>
          <span>Not presented as completed client commissions.</span>
        </div>
      </div>
    </section>
  );
}
