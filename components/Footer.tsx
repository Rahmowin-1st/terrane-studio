import Link from "next/link";
import { Logo } from "./Logo";
import { nav, projects, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9 text-bone" />
            <p className="font-display text-3xl tracking-[0.04em]">{site.name}</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/70">{site.tagline}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] tracking-[0.18em] text-bone/50 uppercase">Studio</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="text-bone/85 hover:text-bone">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] tracking-[0.18em] text-bone/50 uppercase">Selected</p>
          <ul className="mt-4 space-y-2 text-sm">
            {projects.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="text-bone/85 hover:text-bone">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] tracking-[0.18em] text-bone/50 uppercase">Write</p>
          <p className="mt-4 text-sm text-bone/85">{site.email}</p>
          <a href="/#commission" className="mt-3 inline-block text-sm underline decoration-bone/30 underline-offset-4">
            Commission form
          </a>
          <p className="mt-3 text-sm text-bone/70">
            {site.district}
            <br />
            {site.city}
            <br />
            {site.country}
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1180px] flex-col gap-2 border-t border-bone/10 px-5 py-6 text-[11px] tracking-[0.12em] text-bone/45 uppercase sm:flex-row sm:justify-between md:px-8">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Est. {site.founded} · By appointment</span>
      </div>
    </footer>
  );
}
