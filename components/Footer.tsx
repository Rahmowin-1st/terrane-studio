import Link from "next/link";
import { Logo } from "./Logo";
import { nav, projects, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-bone">
      <div className="footer-inner mx-auto max-w-[1280px] px-5 py-16 sm:px-7 md:px-10 md:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-12 border-b border-bone/12 pb-14 md:grid-cols-12 md:pb-18">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10 text-bone" />
              <p className="font-display text-3xl tracking-[0.04em]">{site.name}</p>
            </div>
            <p className="mt-7 max-w-xl font-display text-[2rem] leading-[1.08] font-light text-bone/88 sm:text-[2.6rem]">
              Architecture of ground, light, and duration.
            </p>
            <p className="mt-5 max-w-md text-sm leading-[1.7] text-bone/55">
              Portfolio study / architecture, interior, landscape and reuse. Visual references are not presented as completed client work.
            </p>
          </div>

          <div className="grid gap-9 sm:grid-cols-3 md:col-span-6">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.18em] text-bone/40 uppercase">Index</p>
              <ul className="mt-5 space-y-3 text-sm">
                {nav.map((item) => <li key={item.id}><a href={item.href} className="text-bone/72 transition-colors hover:text-bone">{item.label}</a></li>)}
              </ul>
            </div>
            <div>
              <p className="text-[9px] font-semibold tracking-[0.18em] text-bone/40 uppercase">Selected</p>
              <ul className="mt-5 space-y-3 text-sm">
                {projects.slice(0, 4).map((p) => <li key={p.slug}><Link href={`/work/${p.slug}`} className="text-bone/72 transition-colors hover:text-bone">{p.title}</Link></li>)}
              </ul>
            </div>
            <div>
              <p className="text-[9px] font-semibold tracking-[0.18em] text-bone/40 uppercase">Commission</p>
              <p className="mt-5 text-sm text-bone/72">{site.email}</p>
              <a href="/#commission" className="mt-4 inline-flex min-h-10 items-center text-[10px] font-semibold tracking-[0.16em] text-bone uppercase underline decoration-bone/25 underline-offset-4">Open brief ↗</a>
              <p className="mt-5 text-sm leading-relaxed text-bone/48">{site.city}<br />{site.country}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-[9px] font-semibold tracking-[0.15em] text-bone/36 uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Second portfolio / production study</span>
          <span>Ground / light / duration</span>
        </div>
      </div>
    </footer>
  );
}
