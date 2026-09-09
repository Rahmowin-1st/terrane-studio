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
    title: project ? project.title : site.name,
    description: project?.excerpt ?? site.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main id="main" className="bg-bone pt-24">
      <article>
        <header className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-14">
          <p className="text-[11px] tracking-[0.18em] text-umber uppercase">
            <Link href="/#work">Work</Link> / {project.index}
          </p>
          <h1 className="mt-4 font-display text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 text-sm tracking-[0.08em] text-umber">
            {project.type} · {project.location} · {project.year} · Design study
          </p>
        </header>
        <img
          src={project.cover}
          alt={project.coverAlt}
          className="aspect-[16/9] w-full object-cover md:aspect-[21/9]"
        />
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
          <div className="md:col-span-4">
            <p className="text-[11px] tracking-[0.18em] text-umber uppercase">Brief</p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/80">{project.brief}</p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-[11px] tracking-[0.18em] text-umber uppercase">Response</p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/80">{project.response}</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-[1180px] gap-8 px-5 pb-8 md:grid-cols-2 md:px-8">
          <section>
            <h2 className="text-[11px] tracking-[0.18em] text-umber uppercase">Goal</h2>
            <p className="mt-3 text-ink/80">{project.goal}</p>
          </section>
          <section>
            <h2 className="text-[11px] tracking-[0.18em] text-umber uppercase">Space</h2>
            <p className="mt-3 text-ink/80">{project.space}</p>
          </section>
          <section>
            <h2 className="text-[11px] tracking-[0.18em] text-umber uppercase">Material direction</h2>
            <ul className="mt-3 list-disc pl-5 text-ink/80">
              {project.materials.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-[11px] tracking-[0.18em] text-umber uppercase">Key decisions</h2>
            <ul className="mt-3 list-disc pl-5 text-ink/80">
              {project.decisions.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className="mx-auto grid max-w-[1180px] gap-4 px-5 pb-16 md:grid-cols-2 md:px-8">
          {project.images.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} className="aspect-[3/2] w-full object-cover" />
          ))}
        </div>
        <p className="mx-auto max-w-[1180px] px-5 pb-10 text-sm text-umber md:px-8">
          This page explains a Terrane design study. Photography is licensed visual reference. It does not claim a completed client commission.
        </p>
        <div className="border-t border-ink/10 px-5 py-12 text-center">
          <a href="/#commission" className="font-display text-3xl font-light underline decoration-ink/20 underline-offset-8">
            Begin a commission
          </a>
        </div>
      </article>
    </main>
  );
}
