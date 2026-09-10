import { approach } from "@/lib/site";

export function Approach() {
  return (
    <section id="approach" className="approach-scene scroll-mt-24 bg-bone" aria-labelledby="approach-heading">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 py-20 sm:px-7 md:grid-cols-12 md:px-10 md:py-28 lg:px-12 lg:py-36">
        <div className="approach-sticky md:col-span-5 md:self-start">
          <div className="md:sticky md:top-32">
            <p className="approach-kicker text-[10px] font-semibold tracking-[0.2em] text-umber uppercase">Approach / 01—05</p>
            <h2 id="approach-heading" className="approach-title mt-5 max-w-[28rem] font-display text-[2.9rem] leading-[0.98] font-light tracking-[-0.035em] sm:text-6xl md:text-[4.6rem]">
              Know what happens next.
            </h2>
            <p className="approach-lead mt-7 max-w-sm text-[15px] leading-[1.75] text-ink/70">
              Five stages. Each one closes a different uncertainty before the next begins. The process should feel as legible as the plan.
            </p>
            <div className="approach-scale mt-10 hidden max-w-sm items-center gap-3 text-[9px] font-semibold tracking-[0.16em] text-umber uppercase md:flex">
              <span>Site</span><span className="h-px flex-1 bg-ink/15" /><span>Handover</span>
            </div>
          </div>
        </div>

        <div className="approach-track relative md:col-span-7">
          <div className="approach-rail absolute left-[1.05rem] top-0 h-full w-px bg-ink/12 md:left-[1.4rem]" aria-hidden="true">
            <div className="approach-rail-active h-full w-full origin-top bg-clay" />
          </div>
          <ol className="relative">
            {approach.map((step, i) => (
              <li key={step.index} className="approach-step relative grid grid-cols-[3rem_1fr] gap-5 pb-14 last:pb-0 md:grid-cols-[4.5rem_1fr] md:gap-7 md:pb-20" data-approach-index={i}>
                <div className="relative z-10 flex justify-start">
                  <span className="approach-dot mt-1 grid h-9 w-9 place-items-center rounded-full border border-ink/15 bg-bone font-display text-sm text-clay md:h-12 md:w-12 md:text-base">
                    {step.index}
                  </span>
                </div>
                <div className="approach-step-copy border-t border-ink/12 pt-5 md:pt-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[2rem] leading-none font-light md:text-[2.7rem]">{step.title}</h3>
                    <span className="hidden text-[9px] tracking-[0.16em] text-umber uppercase sm:block">Stage {step.index}</span>
                  </div>
                  <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-ink/68">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
