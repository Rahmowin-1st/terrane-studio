"use client";

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/lib/site";

function Stage({ images, title }: { images: { src: string; alt: string }[]; title: string }) {
  const slides = images.slice(0, 3);
  const [i, setI] = useState(0);
  const go = (n: number) => setI((v) => (v + n + slides.length) % slides.length);

  return (
    <div className="relative aspect-square overflow-hidden bg-paper">
      {slides.map((img, idx) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute right-3 bottom-3 flex items-center gap-2">
        <span className="rounded-full bg-ink/70 px-2.5 py-1 text-[11px] tracking-[0.12em] text-bone">
          {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <button type="button" aria-label={`Previous ${title} image`} className="min-h-10 min-w-10 rounded-full bg-bone/90 text-ink" onClick={() => go(-1)}>
          ←
        </button>
        <button type="button" aria-label={`Next ${title} image`} className="min-h-10 min-w-10 rounded-full bg-bone/90 text-ink" onClick={() => go(1)}>
          →
        </button>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 bg-bone" aria-labelledby="work-heading">
      <div className="mx-auto max-w-[1180px] px-5 pt-16 pb-8 md:px-8 md:pt-24">
        <div className="flex items-end justify-between gap-6" data-enter="left">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-umber uppercase">01 — 05</p>
            <h2 id="work-heading" className="mt-3 font-display text-4xl font-light md:text-5xl">
              Selected studies
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-umber md:block">
            Each project is a coherent three-image series. Photography is licensed reference — not completed client work.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] space-y-10 px-5 pb-16 md:px-8 md:pb-24">
        {projects.map((project, idx) => (
          <article
            key={project.slug}
            data-enter={idx % 2 === 0 ? "left" : "right"}
            className={`grid items-stretch gap-6 border-b border-ink/10 pb-10 md:grid-cols-2 md:gap-10 ${
              idx % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <Stage
              images={[{ src: project.cover, alt: project.coverAlt }, ...project.images].slice(0, 3)}
              title={project.title}
            />
            <div className="flex flex-col justify-end py-2">
              <p className="text-[11px] tracking-[0.16em] text-umber uppercase">
                {project.index} · {project.type} · {project.location}
              </p>
              <h3 className="mt-3 font-display text-3xl font-light md:text-4xl">{project.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75">{project.excerpt}</p>
              <dl className="mt-5 space-y-2 text-sm text-ink/80">
                <div><dt className="inline font-medium">Goal. </dt><dd className="inline">{project.goal}</dd></div>
                <div><dt className="inline font-medium">Move. </dt><dd className="inline">{project.design}</dd></div>
              </dl>
              <Link
                href={`/work/${project.slug}`}
                className="mt-6 inline-flex min-h-11 w-fit items-center text-[11px] tracking-[0.18em] uppercase underline decoration-ink/30 underline-offset-[6px]"
              >
                Read the study ↗
              </Link>
            </div>
          </article>
        ))}
        <p className="text-sm text-umber">
          Photography is used as licensed visual reference for Terrane design studies. It is not presented as completed client work.
        </p>
      </div>
    </section>
  );
}
