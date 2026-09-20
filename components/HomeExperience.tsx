import Link from "next/link";
import { Commission } from "@/components/sections/Commission";
import { ResilientImage } from "@/components/ResilientImage";
import { imageSrcSet } from "@/lib/media";
import { approach, disciplines, projects, site, trust } from "@/lib/site";

export function HomeExperience() {
  return (
    <main id="main" className="terrane-home">
      <section className="tf-hero" aria-labelledby="tf-hero-title">
        <div className="tf-field tf-field-hero" aria-hidden="true" />
        <div className="tf-hero-media">
          <ResilientImage
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=88"
            srcSet={imageSrcSet("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=88")}
            sizes="(min-width: 900px) 58vw, 100vw"
            alt="Courtyard house with deep eaves and warm masonry."
            className="tf-photo h-full w-full object-cover"
            fallbackClassName="tf-hero-fallback"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="tf-hero-veil" aria-hidden="true" />
        <div className="tf-hero-copy">
          <p className="tf-eyebrow">TERRANE / ARCHITECTURE / TASHKENT</p>
          <h1 id="tf-hero-title">Ground.<br />Light.<br /><span>Material.</span></h1>
          <p className="tf-lead">Homes, interiors and landscapes shaped by climate, proportion and material.</p>
          <div className="tf-actions">
            <a className="tf-btn tf-btn-primary" href="#commission">Start a project<span /></a>
            <a className="tf-btn tf-btn-ghost" href="#work">View work<span /></a>
          </div>
        </div>
        <div className="tf-hero-facts" aria-label="Practice focus">
          <div><small>Base</small><strong>{site.city}</strong></div>
          <div><small>Work</small><strong>Homes / Interiors / Land</strong></div>
          <div><small>Method</small><strong>Climate first</strong></div>
        </div>
      </section>

      <section id="practice" className="tf-section tf-principles" aria-labelledby="tf-principles-title">
        <div className="tf-section-head">
          <div>
            <p className="tf-eyebrow">PRACTICE</p>
            <h2 id="tf-principles-title">Clear before decorative.</h2>
          </div>
          <p>Define the site, decisions and limits first. Style comes after.</p>
        </div>
        <div className="tf-principles-grid">
          {trust.map((item, index) => (
            <article key={item.index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="tf-section tf-work" aria-labelledby="tf-work-title">
        <div className="tf-field tf-field-work" aria-hidden="true" />
        <div className="tf-section-head">
          <div>
            <p className="tf-eyebrow">SELECTED WORK / 01—05</p>
            <h2 id="tf-work-title">Selected projects.</h2>
          </div>
          <p>Five studies across houses, interiors, landscape and reuse.</p>
        </div>
        <div className="tf-projects">
          {projects.map((project, index) => (
            <article className={`tf-project ${index % 2 ? "is-reverse" : ""}`} key={project.slug}>
              <Link href={`/work/${project.slug}`} className="tf-project-media" aria-label={`Open ${project.title}`}>
                <ResilientImage
                  src={project.cover}
                  srcSet={imageSrcSet(project.cover)}
                  sizes="(min-width: 900px) 62vw, 100vw"
                  alt={project.coverAlt}
                  className="tf-photo h-full w-full object-cover"
                  fallbackClassName="tf-project-fallback"
                />
                <div className="tf-project-media-meta"><span>{project.index}</span><span>{project.type}</span></div>
              </Link>
              <div className="tf-project-copy">
                <p className="tf-project-meta">{project.location} / {project.year}</p>
                <h3>{project.title}</h3>
                <p className="tf-project-excerpt">{project.excerpt}</p>
                <dl>
                  <div><dt>Goal</dt><dd>{project.goal}</dd></div>
                  <div><dt>Core move</dt><dd>{project.design}</dd></div>
                </dl>
                <Link className="tf-text-link" href={`/work/${project.slug}`}>Open project<span /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="tf-section tf-expertise" aria-labelledby="tf-expertise-title">
        <div className="tf-section-head">
          <div>
            <p className="tf-eyebrow">EXPERTISE</p>
            <h2 id="tf-expertise-title">Four scales. One logic.</h2>
          </div>
          <p>From a room to a landscape, the same decisions carry through.</p>
        </div>
        <div className="tf-expertise-list">
          {disciplines.map((item) => (
            <article key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section id="approach" className="tf-section tf-process" aria-labelledby="tf-process-title">
        <div className="tf-process-grid">
          <div className="tf-process-intro">
            <p className="tf-eyebrow">PROCESS / 01—05</p>
            <h2 id="tf-process-title">Five clear stages.</h2>
            <p>Each stage closes one set of decisions before the next begins.</p>
          </div>
          <ol className="tf-process-list">
            {approach.map((step) => (
              <li key={step.index}>
                <b>{step.index}</b>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="studio" className="tf-section tf-studio" aria-labelledby="tf-studio-title">
        <div className="tf-field tf-field-studio" aria-hidden="true" />
        <div className="tf-studio-grid">
          <div className="tf-studio-media">
            <ResilientImage
              src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1800&q=86"
              srcSet={imageSrcSet("https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1800&q=86")}
              sizes="(min-width: 900px) 58vw, 100vw"
              alt="Architecture studio table with drawings and material samples."
              className="tf-photo h-full w-full object-cover"
              fallbackClassName="tf-studio-fallback"
            />
          </div>
          <div className="tf-studio-copy">
            <p className="tf-eyebrow">STUDIO / {site.city}</p>
            <h2 id="tf-studio-title">Close attention.<br />Clear decisions.</h2>
            <p>A focused architecture practice for houses, interiors, landscapes and reuse.</p>
            <div className="tf-studio-stats">
              <div><strong>4</strong><span>Scales</span></div>
              <div><strong>1</strong><span>Design logic</span></div>
              <div><strong>5</strong><span>Process stages</span></div>
            </div>
          </div>
        </div>
      </section>

      <Commission />
    </main>
  );
}
