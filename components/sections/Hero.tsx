import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="home" className="relative" aria-label="Introduction">
      <figure className="relative h-[100svh] min-h-[32rem] overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Courtyard house with deep eaves and warm masonry in late light."
          className="hero-media h-full w-full origin-center object-cover"
          width={2000}
          height={1333}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bone to-transparent" />
        <div className="hero-copy absolute inset-x-0 bottom-0 mx-auto max-w-[1180px] px-5 pb-16 md:px-8 md:pb-20">
          <p className="hero-kicker text-[11px] font-medium tracking-[0.22em] text-sand uppercase">
            Architecture studio · {site.city}
          </p>
          <h1 className="hero-title mt-4 max-w-4xl font-display text-[2.2rem] leading-[1.06] font-light text-bone sm:text-5xl md:text-[4.1rem]">
            {site.promise}
          </h1>
          <p className="hero-lead mt-5 max-w-xl text-[15px] leading-relaxed text-bone/80">
            Layout, materials and landscape resolved as one condition — drawn from the climate of Central Asia.
          </p>
          <div className="hero-actions mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href="#commission"
              className="inline-flex min-h-12 items-center bg-bone px-7 text-[11px] font-medium tracking-[0.18em] text-ink uppercase"
            >
              Begin a commission
            </a>
            <a
              href="#work"
              className="inline-flex min-h-12 items-center text-[11px] font-medium tracking-[0.18em] text-bone uppercase underline decoration-bone/40 underline-offset-[6px]"
            >
              Selected work
            </a>
          </div>
          <p className="hero-note mt-5 flex items-center gap-2 text-sm text-bone/75">
            <b className="text-clay">✓</b> No polished brief needed.
          </p>
        </div>
      </figure>
    </section>
  );
}
