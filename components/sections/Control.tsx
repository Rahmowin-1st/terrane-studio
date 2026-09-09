import { control } from "@/lib/site";

export function Control() {
  return (
    <section className="bg-ink text-bone" aria-labelledby="control-heading">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-5" data-enter="left">
          <p className="text-[11px] tracking-[0.18em] text-sand uppercase">Client control</p>
          <h2 id="control-heading" className="mt-3 font-display text-4xl font-light md:text-5xl">
            Know what is approved — and what is still open.
          </h2>
        </div>
        <div className="grid gap-6 md:col-span-7 md:grid-cols-3">
          {control.map((step) => (
            <article key={step.index} data-enter="tilt">
              <b className="text-clay">{step.index}</b>
              <h3 className="mt-3 font-display text-2xl font-light">{step.title}</h3>
              <p className="mt-2 text-sm text-bone/70">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
