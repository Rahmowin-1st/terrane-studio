import { site, trust } from "@/lib/site";

export function Trust() {
  return (
    <section id="trust" className="practice-scene scroll-mt-24" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-7 md:px-10 md:py-28 lg:px-12 lg:py-32">
        <div className="practice-intro grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="practice-kicker text-[10px] font-semibold tracking-[0.2em] text-umber uppercase">Practice / clarity before commitment</p>
            <h2 id="trust-heading" className="practice-title mt-5 font-display text-[2.8rem] leading-[0.98] font-light tracking-[-0.035em] sm:text-6xl md:text-[4.9rem]">
              Architecture begins with what must remain.
            </h2>
          </div>
          <div className="practice-copy md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-[16px] leading-[1.75] text-ink/78">
              {site.name} treats climate, proportion, approval and material as one practice. The work is not decorated after the plan; the character grows out of the decisions that survive it.
            </p>
          </div>
        </div>

        <div className="practice-rule mt-14 h-px origin-left bg-ink/15 md:mt-20" />

        <div className="practice-grid grid md:grid-cols-4">
          {trust.map((item) => (
            <article key={item.index} className="practice-proof relative border-b border-ink/12 py-8 md:min-h-[19rem] md:border-r md:px-6 md:py-10 first:md:pl-0 last:md:border-r-0 last:md:pr-0">
              <span className="practice-proof-index text-[10px] font-semibold tracking-[0.16em] text-clay">{item.index}</span>
              <div className="mt-16 md:mt-24">
                <h3 className="practice-proof-title font-display text-[1.8rem] leading-none font-light">{item.title}</h3>
                <p className="practice-proof-copy mt-4 max-w-[16rem] text-sm leading-[1.65] text-ink/68">{item.text}</p>
              </div>
              <span className="practice-proof-mark absolute right-0 top-8 hidden h-2 w-2 rounded-full bg-clay md:block" aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="practice-caption mt-8 flex flex-col gap-2 text-[10px] tracking-[0.14em] text-umber uppercase sm:flex-row sm:justify-between">
          <span>Ground / shade / proportion / use</span>
          <span>Decisions before decoration</span>
        </div>
      </div>
    </section>
  );
}
