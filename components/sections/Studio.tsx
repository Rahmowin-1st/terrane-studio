import { site } from "@/lib/site";

export function Studio() {
  return (
    <section id="studio" className="studio-scene scroll-mt-24 overflow-hidden bg-paper" aria-labelledby="studio-heading">
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-7 md:px-10 md:py-28 lg:px-12 lg:py-36">
        <div className="studio-grid grid gap-12 md:grid-cols-12 md:items-end">
          <div className="studio-media relative md:col-span-7">
            <div className="studio-main-image overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1800&q=86"
                alt="Studio table with drawings and material samples."
                className="studio-image aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="studio-material-card absolute -bottom-8 right-3 hidden w-[42%] overflow-hidden border border-bone/45 bg-ink p-3 shadow-2xl sm:block md:-right-8 md:-bottom-12">
              <div className="aspect-[4/3] overflow-hidden bg-clay">
                <img
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=82"
                  alt="Warm natural material detail used as an architectural reference."
                  className="studio-detail-image h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex items-center justify-between gap-3 pt-3 text-[9px] tracking-[0.14em] text-bone/65 uppercase">
                <span>Material study</span><span>01 / 01</span>
              </div>
            </div>
          </div>

          <div className="studio-copy md:col-span-4 md:col-start-9 md:pb-8">
            <p className="studio-kicker text-[10px] font-semibold tracking-[0.2em] text-umber uppercase">Studio / {site.city}</p>
            <h2 id="studio-heading" className="studio-title mt-5 font-display text-[2.8rem] leading-[0.98] font-light tracking-[-0.035em] sm:text-6xl md:text-[4.4rem]">
              Small practice. Close attention.
            </h2>
            <p className="studio-lead mt-7 text-[15px] leading-[1.78] text-ink/72">
              Terrane is presented here as a portfolio architecture concept: a complete visual, interaction and production study rather than a claim of built commissions. The credibility comes from the system, the work and the clarity of the process.
            </p>
            <div className="studio-facts mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-ink/12 py-6 text-[10px] tracking-[0.14em] text-umber uppercase">
              <span>Architecture</span><span>Interiors</span><span>Landscape</span><span>Reuse</span>
            </div>
            <p className="mt-7 text-sm leading-[1.7] text-ink/62">
              Ground, shade and material do the visual work. Interface effects stay subordinate to the architecture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
