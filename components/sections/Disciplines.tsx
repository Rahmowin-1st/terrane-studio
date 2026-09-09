import { disciplines } from "@/lib/site";

export function Disciplines() {
  return (
    <section id="practice" className="border-y border-ink/10 bg-paper" aria-labelledby="disc-heading">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <div className="md:flex md:items-end md:justify-between" data-enter="left">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-umber uppercase">Service</p>
            <h2 id="disc-heading" className="mt-3 font-display text-4xl font-light md:text-5xl">
              What we design
            </h2>
          </div>
          <p className="mt-4 max-w-sm text-sm text-umber md:mt-0">
            One studio. Four kinds of work, held by proportion, climate, and the patience of making.
          </p>
        </div>
        <ol className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {disciplines.map((item) => (
            <li key={item.index} data-enter="right" className="grid gap-3 py-8 md:grid-cols-12 md:py-10">
              <span className="text-[11px] tracking-[0.16em] text-umber md:col-span-2">{item.index}</span>
              <h3 className="font-display text-2xl font-light md:col-span-3 md:text-3xl">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink/80 md:col-span-7 md:max-w-xl">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
