import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? `${project.title} — ${site.name}` : site.name,
    description: project?.excerpt ?? site.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main" className="case-page bg-bone">
      <article>
        <header className="case-hero relative min-h-[82svh] overflow-hidden bg-ink text-bone">
          <div className="case-hero-media absolute inset-0">
            <img src={project.cover} alt={project.coverAlt} className="case-cover h-full w-full object-cover" fetchPriority="high" />
          </div>
          <div className="case-hero-shade absolute inset-0" />
          <div className="case-grid absolute inset-0" aria-hidden="true" />
          <div className="case-hero-copy absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1280px] px-5 pb-10 sm:px-7 md:px-10 md:pb-14 lg:px-12">
            <p className="case-kicker text-[10px] font-semibold tracking-[0.2em] text-sand uppercase">
              <Link href="/#work" className="hover:text-bone">Work</Link> / {project.index} / Design study
            </p>
            <h1 className="case-title mt-4 max-w-[70rem] font-display text-[3.2rem] leading-[0.9] font-light tracking-[-0.045em] sm:text-7xl md:text-[6.3rem]">
              {project.title}
            </h1>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-bone/20 pt-4 text-[9px] font-semibold tracking-[0.16em] text-bone/62 uppercase sm:text-[10px]">
              <span>{project.type}</span><span>{project.location}</span><span>{project.year}</span><span>{project.discipline}</span>
            </div>
          </div>
        </header>

        <section className="case-intro mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-7 md:grid-cols-12 md:px-10 md:py-28 lg:px-12 lg:py-32">
          <div className="case-brief md:col-span-5">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-umber uppercase">The brief</p>
            <p className="mt-5 font-display text-[2rem] leading-[1.18] font-light text-ink md:text-[2.65rem]">{project.brief}</p>
          </div>
          <div className="case-response md:col-span-6 md:col-start-7 md:self-end">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-umber uppercase">The response</p>
            <p className="mt-5 text-[16px] leading-[1.8] text-ink/72 md:text-[18px]">{project.response}</p>
            <div className="mt-9 grid gap-5 border-y border-ink/12 py-6 sm:grid-cols-2">
              <div><p className="text-[9px] font-semibold tracking-[0.16em] text-umber uppercase">Goal</p><p className="mt-3 text-sm leading-[1.65] text-ink/68">{project.goal}</p></div>
              <div><p className="text-[9px] font-semibold tracking-[0.16em] text-umber uppercase">Space</p><p className="mt-3 text-sm leading-[1.65] text-ink/68">{project.space}</p></div>
            </div>
          </div>
        </section>

        <section className="case-gallery mx-auto max-w-[1280px] px-5 sm:px-7 md:px-10 lg:px-12" aria-label={`${project.title} visual study`}>
          {project.images.map((image, i) => (
            <figure key={image.src} className={`case-gallery-item case-gallery-item-${i + 1} overflow-hidden bg-paper`}>
              <img src={image.src} alt={image.alt} className="case-gallery-image h-full w-full object-cover" loading="lazy" decoding="async" />
              <figcaption className="flex items-center justify-between gap-4 border-t border-ink/10 bg-bone py-3 text-[9px] tracking-[0.14em] text-umber uppercase">
                <span>{project.title}</span><span>{String(i + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </section>

        <section className="case-material mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-7 md:grid-cols-12 md:px-10 md:py-28 lg:px-12 lg:py-32">
          <div className="md:col-span-5">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-umber uppercase">Material direction</p>
            <h2 className="mt-5 font-display text-[2.8rem] leading-none font-light md:text-[4rem]">What the room is made to remember.</h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ul className="divide-y divide-ink/12 border-y border-ink/12">
              {project.materials.map((m, i) => <li key={m} className="grid grid-cols-[3rem_1fr] gap-4 py-5"><span className="text-[10px] text-clay">0{i + 1}</span><span className="text-[15px] text-ink/72">{m}</span></li>)}
            </ul>
            <p className="mt-10 text-[10px] font-semibold tracking-[0.18em] text-umber uppercase">Key decisions</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-[1.65] text-ink/72">
              {project.decisions.map((m) => <li key={m} className="flex gap-4"><span className="text-clay">—</span><span>{m}</span></li>)}
            </ul>
          </div>
        </section>

        <section className="case-disclosure border-y border-ink/10 bg-paper">
          <div className="mx-auto max-w-[1280px] px-5 py-8 text-[11px] leading-[1.7] text-umber sm:px-7 md:px-10 lg:px-12">
            This page explains a Terrane portfolio design study. Photography is licensed visual reference and is not presented as a completed client commission.
          </div>
        </section>

        <section className="case-next bg-ink text-bone">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-7 md:px-10 md:py-28 lg:px-12">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-sand uppercase">Next study / {next.index}</p>
            <Link href={`/work/${next.slug}`} className="group mt-5 flex items-end justify-between gap-8 border-t border-bone/20 pt-7">
              <span className="max-w-[58rem] font-display text-[2.8rem] leading-none font-light tracking-[-0.035em] sm:text-6xl md:text-[5rem]">{next.title}</span>
              <span className="pb-2 font-display text-4xl text-clay transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
