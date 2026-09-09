import { principals, site } from "@/lib/site";

export function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 border-t border-ink/10 bg-paper" aria-labelledby="studio-heading">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-6" data-enter="left">
          <img
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1400&q=80"
            alt="Studio table with drawings and material samples."
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div className="md:col-span-6 md:flex md:flex-col md:justify-end" data-enter="right">
          <p className="text-[11px] tracking-[0.18em] text-umber uppercase">Studio</p>
          <h2 id="studio-heading" className="mt-3 font-display text-4xl font-light md:text-5xl">
            A small practice, closely held
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/80">
            Founded in {site.founded} in {site.city}. Architects, an interior lead, and a landscape designer working from
            Yunusabad. We do not publish awards. We do not take work we cannot attend.
          </p>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {principals.map((person) => (
              <li key={person.name}>
                <p className="font-display text-xl font-light">{person.name}</p>
                <p className="mt-1 text-[11px] tracking-[0.14em] text-umber uppercase">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{person.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
