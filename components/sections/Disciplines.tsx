import { disciplines } from "@/lib/site";

export function Disciplines() {
  return (
    <section id="practice" className="expertise-scene relative overflow-hidden bg-ink text-bone" aria-labelledby="disc-heading">
      <div className="expertise-grid absolute inset-0" aria-hidden="true" />
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-7 md:px-10 md:py-28 lg:px-12 lg:py-32">
        <div className="expertise-head grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="expertise-kicker text-[10px] font-semibold tracking-[0.2em] text-sand uppercase">Expertise / one practice</p>
            <h2 id="disc-heading" className="expertise-title mt-4 font-display text-[2.9rem] leading-none font-light tracking-[-0.035em] sm:text-6xl md:text-[5rem]">
              What we design.
            </h2>
          </div>
          <p className="expertise-note md:col-span-4 md:col-start-9 text-sm leading-[1.7] text-bone/60">
            Houses, rooms, land and existing fabric — held by the same rules: climate first, proportion second, decoration last.
          </p>
        </div>

        <ol className="expertise-list mt-14 border-t border-bone/15 md:mt-20">
          {disciplines.map((item, i) => (
            <li key={item.index} className="discipline-row group relative grid gap-4 border-b border-bone/15 py-7 md:grid-cols-12 md:items-center md:py-9" data-discipline-index={i}>
              <span className="discipline-index text-[10px] font-semibold tracking-[0.16em] text-clay md:col-span-1">{item.index}</span>
              <h3 className="discipline-title font-display text-[2.15rem] leading-none font-light md:col-span-4 md:text-[3.2rem]">{item.title}</h3>
              <p className="discipline-copy max-w-xl text-[14px] leading-[1.65] text-bone/62 md:col-span-5">{item.text}</p>
              <div className="discipline-arrow hidden justify-self-end font-display text-3xl text-clay transition-transform duration-300 group-hover:translate-x-1 md:col-span-2 md:block" aria-hidden="true">↗</div>
              <span className="discipline-sweep absolute inset-y-0 left-0 -z-0 w-0 bg-bone/[0.035] transition-[width] duration-500 group-hover:w-full" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
