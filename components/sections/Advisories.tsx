import { ArrowRight, ArrowUpRight, Compass, FileText } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";
import { contact, guidance, labels, linkedinFollow, pressStatement } from "@/lib/content";

/** Press statement as a dark notice card with a live marker. */
export function PressStatement() {
  return (
    <section aria-label={labels.press} className="container-site">
      <a
        data-reveal
        href={pressStatement.href}
        className="group relative isolate flex flex-col gap-6 overflow-hidden rounded-3xl bg-night p-7 text-white sm:p-10 md:flex-row md:items-center md:gap-10"
      >
        {/* soft brand glows and a fine grid */}
        <span aria-hidden="true" className="absolute -left-24 -top-24 -z-10 size-72 rounded-full bg-brand-blue/40 blur-3xl" />
        <span
          aria-hidden="true"
          className="absolute -bottom-32 right-10 -z-10 size-72 rounded-full bg-brand-yellow/20 blur-3xl transition-transform duration-700 group-hover:scale-125"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:36px_36px]"
        />

        <span className="inline-flex w-fit shrink-0 items-center gap-2.5 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-brand-yellow">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-yellow/70" />
            <span className="relative size-2 rounded-full bg-brand-yellow" />
          </span>
          {labels.press}
        </span>

        <h2 className="flex-1 text-xl leading-snug text-white text-pretty sm:text-2xl">{pressStatement.title}</h2>

        <span className="flex shrink-0 items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white/80">
          {pressStatement.linkText}
          <span className="grid size-12 place-items-center rounded-full bg-brand-yellow text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45">
            <ArrowUpRight className="size-5" strokeWidth={2.25} aria-hidden="true" />
          </span>
        </span>
      </a>
    </section>
  );
}

/** Strait of Hormuz guidance beside the LinkedIn follow card. */
export function GuidanceAndLinkedIn() {
  return (
    <div data-stagger className="container-site mt-6 grid gap-6 pb-24 lg:grid-cols-12">
      <section
        aria-labelledby="hormuz-guidance"
        className="relative isolate overflow-hidden rounded-3xl bg-mist p-7 sm:p-12 lg:col-span-8"
      >
        <Compass
          aria-hidden="true"
          strokeWidth={0.75}
          className="absolute -right-16 -top-16 -z-10 size-72 animate-[spin_90s_linear_infinite] text-brand-blue/[0.07]"
        />

        <span className="eyebrow">{labels.guidance}</span>
        <h2 id="hormuz-guidance" className="mt-3 max-w-2xl text-2xl leading-tight sm:text-[2rem]">
          {guidance.heading}
        </h2>

        <ul className="mt-8 space-y-3">
          {guidance.bulletins.map((b) => (
            <li key={b.title}>
              <a
                href={b.href}
                className="group flex items-center gap-4 rounded-2xl bg-white p-3 pr-4 shadow-[0_10px_24px_-20px_rgb(26_26_26/0.5)] ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:translate-x-1 hover:shadow-card sm:p-4 sm:pr-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors duration-500 group-hover:bg-brand-blue group-hover:text-white">
                  <FileText className="size-5" strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="text-[0.9375rem] font-semibold text-ink">{b.title}</span>
                  <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-brand-blue/25 px-3.5 py-1.5 text-xs font-bold text-brand-blue transition-colors duration-300 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white">
                    {b.linkText}
                    <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a href={guidance.cta.href} className="btn btn-yellow mt-8 rounded-full [--sweep:var(--color-brand-yellow-deep)]">
          {guidance.cta.label}
          <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </a>
      </section>

      <section
        aria-labelledby="linkedin-follow"
        className="group relative isolate flex flex-col justify-between gap-12 overflow-hidden rounded-3xl bg-[#0077b5] p-7 text-white sm:p-10 lg:col-span-4"
      >
        {/* oversized mark in the corner */}
        <LinkedInIcon className="absolute -right-12 -top-12 -z-10 size-64 text-white/[0.08] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110" />

        <span className="grid size-16 place-items-center rounded-2xl bg-white text-[#0077b5] shadow-[0_14px_30px_-14px_rgb(0_0_0/0.5)]">
          <LinkedInIcon className="size-8" />
        </span>

        <div>
          <h2 id="linkedin-follow" className="text-2xl leading-snug text-white text-pretty">
            {linkedinFollow.heading}
          </h2>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-7 rounded-full bg-white tracking-[0.12em] text-[#0077b5] [--sweep:var(--color-brand-yellow)] hover:text-ink sm:tracking-[0.2em]"
          >
            {linkedinFollow.cta}
            <ArrowUpRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
