import { approach } from "@/lib/site";

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-24 bg-bone" aria-labelledby="approach-heading">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-5" data-enter="left">
          <p className="text-[11px] tracking-[0.18em] text-umber uppercase">Process</p>
          <h2 id="approach-heading" className="mt-3 font-display text-4xl font-light md:text-5xl">
            Know what happens next.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/80">
            Five stages. Each one closes a different uncertainty before the next begins.
          </p>
        </div>
        <ol className="md:col-span-7">
          {approach.map((step, i) => (
            <li key={step.index} data-enter={i % 2 ? "right" : "left"} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ink/10 py-7 last:border-b">
              <span className="font-display text-2xl font-light text-clay">{step.index}</span>
              <div>
                <h3 className="font-display text-2xl font-light">{step.title}</h3>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink/75">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
