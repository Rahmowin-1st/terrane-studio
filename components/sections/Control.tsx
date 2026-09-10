import { control } from "@/lib/site";

export function Control() {
  return (
    <section className="control-scene relative overflow-hidden bg-paper" aria-labelledby="control-heading">
      <div className="control-orbit control-orbit-a" aria-hidden="true" />
      <div className="control-orbit control-orbit-b" aria-hidden="true" />
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-7 md:px-10 md:py-28 lg:px-12 lg:py-32">
        <div className="control-layout grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="control-kicker text-[10px] font-semibold tracking-[0.2em] text-umber uppercase">Decision architecture</p>
            <h2 id="control-heading" className="control-title mt-5 max-w-[42rem] font-display text-[2.8rem] leading-[0.98] font-light tracking-[-0.035em] sm:text-6xl md:text-[4.7rem]">
              Know what is fixed. Know what is still open.
            </h2>
            <p className="control-lead mt-6 max-w-lg text-[15px] leading-[1.75] text-ink/70">
              A good project is not only a set of drawings. It is a sequence of decisions that can still be understood when the room is full of dust and people.
            </p>
          </div>

          <div className="control-steps md:col-span-5 md:col-start-8 md:self-end">
            {control.map((step, i) => (
              <article key={step.index} className="control-step grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/14 py-6 last:border-b" data-control-index={i}>
                <b className="font-display text-[1.7rem] font-light text-clay">{step.index}</b>
                <div>
                  <h3 className="font-display text-[1.85rem] leading-none font-light">{step.title}</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-ink/65">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="control-footer mt-16 grid gap-5 border-t border-ink/15 pt-6 text-[10px] tracking-[0.15em] text-umber uppercase sm:grid-cols-3 md:mt-24">
          <span>Review in context</span>
          <span>Approve before commitment</span>
          <span className="sm:text-right">Document what survives</span>
        </div>
      </div>
    </section>
  );
}
