import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="home" className="hero-scene relative" aria-label="Introduction">
      <div className="hero-frame relative min-h-[100svh] overflow-hidden bg-ink text-bone">
        <div className="hero-media-shell absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=88"
            alt="Courtyard house with deep eaves and warm masonry in late light."
            className="hero-media h-full w-full origin-center object-cover"
            width={2400}
            height={1600}
            fetchPriority="high"
          />
        </div>

        <div className="hero-shade absolute inset-0" aria-hidden="true" />
        <div className="hero-vignette absolute inset-0" aria-hidden="true" />
        <div className="hero-grid absolute inset-0" aria-hidden="true" />

        <svg className="hero-plan absolute inset-0 h-full w-full" viewBox="0 0 1440 980" aria-hidden="true">
          <path className="hero-plan-line" d="M66 170H438V98H622" pathLength="1" />
          <path className="hero-plan-line" d="M1010 122H1286V320H1374" pathLength="1" />
          <path className="hero-plan-line hero-plan-line-soft" d="M1138 632V848H1328" pathLength="1" />
          <circle className="hero-plan-dot" cx="1010" cy="122" r="4" />
          <circle className="hero-plan-dot" cx="438" cy="170" r="4" />
        </svg>

        <div className="hero-copy absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1280px] px-5 pb-10 sm:px-7 md:px-10 md:pb-14 lg:px-12 lg:pb-16">
          <div className="hero-copy-grid">
            <div className="hero-primary-copy">
              <p className="hero-kicker text-[10px] font-medium tracking-[0.24em] text-sand uppercase sm:text-[11px]">
                Architecture / {site.city} / 41.31°N
              </p>
              <h1 className="hero-title mt-4 font-display font-light text-bone">
                <span className="hero-line"><span>Ground.</span></span>
                <span className="hero-line"><span>Light.</span></span>
                <span className="hero-line hero-line-accent"><span>Duration.</span></span>
              </h1>
              <p className="hero-lead mt-6 max-w-[34rem] text-[15px] leading-[1.65] text-bone/78 sm:text-base md:text-[18px]">
                Houses, interiors and landscapes resolved as one material condition — drawn from climate, proportion and the lives already on the site.
              </p>
              <div className="hero-actions mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <a href="#commission" className="hero-primary-cta group inline-flex min-h-12 items-center gap-5 rounded-full bg-bone px-6 text-[10px] font-semibold tracking-[0.18em] text-ink uppercase sm:px-7 sm:text-[11px]">
                  Begin a commission <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </a>
                <a href="#work" className="hero-secondary-cta inline-flex min-h-12 items-center gap-3 px-2 text-[10px] font-semibold tracking-[0.18em] text-bone uppercase sm:text-[11px]">
                  Selected work <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <aside className="hero-meta hidden self-end lg:block" aria-label="Studio positioning">
              <div className="hero-meta-rule" />
              <p className="text-[10px] tracking-[0.2em] text-sand uppercase">Practice</p>
              <p className="mt-3 max-w-[15rem] font-display text-[1.55rem] leading-[1.08] font-light text-bone">
                Architecture of ground, light, and duration.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 text-[10px] tracking-[0.16em] text-bone/60 uppercase">
                <span>01—05 studies</span>
                <span>Central Asia</span>
                <span>Architecture</span>
                <span>Interior / land</span>
              </div>
            </aside>
          </div>

          <div className="hero-footer-line mt-9 flex items-center justify-between gap-5 border-t border-bone/20 pt-4 text-[9px] tracking-[0.18em] text-bone/55 uppercase sm:text-[10px]">
            <span>No polished brief needed.</span>
            <span className="hidden sm:inline">Scroll to enter the work</span>
            <span>01 / 08</span>
          </div>
        </div>
      </div>
    </section>
  );
}
