import { site, trust } from "@/lib/site";

export function Trust() {
  return (
    <section id="trust" className="scroll-mt-24 border-b border-ink/10 bg-bone" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <div className="md:grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4" data-enter="left">
            <p className="text-[11px] tracking-[0.18em] text-umber uppercase">Clarity before commitment</p>
            <h2 id="trust-heading" className="mt-3 font-display text-4xl font-light tracking-tight md:text-5xl">
              We design rooms that keep time.
            </h2>
          </div>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-ink/80 md:col-span-7 md:col-start-6 md:mt-10" data-enter="right">
            Architecture is the ground it sits on and the shade it casts at noon. {site.name} holds houses, interiors and
            landscapes as one practice. Scope, approvals and changes stay visible.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((item) => (
            <article key={item.index} data-enter="tilt" className="border border-ink/10 bg-paper px-5 py-6">
              <span className="text-[11px] tracking-[0.16em] text-umber">{item.index}</span>
              <h3 className="mt-3 font-display text-2xl font-light">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
