import Image from "next/image";
import { Anchor, ArrowRight, BadgeCheck, Quote } from "lucide-react";
import { highlights, labels, whoWeAre } from "@/lib/content";

/**
 * About Us as a bento layout: heading, introduction and credentials on the left;
 * the photo, the accreditation statement and the 24/7 service note as tiles on the right.
 */
export function WhoWeAre() {
  const [intro, accreditation, service] = whoWeAre.paragraphs;
  const premium = highlights.find((h) => h.icon === "messages")?.label;

  return (
    <section aria-labelledby="who-we-are" className="py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left: heading, intro, credentials */}
        <div className="flex flex-col justify-center lg:col-span-5">
          <span data-reveal className="eyebrow">
            {labels.about}
          </span>
          <h2 id="who-we-are" data-split className="mt-4 text-[2.5rem] leading-[1.08] sm:text-[3.25rem]">
            {whoWeAre.heading[0]}
            <br />
            <span className="text-brand-blue">{whoWeAre.heading[1]}</span>
          </h2>
          <p data-reveal className="mt-7 text-[1.0625rem] leading-8">
            {intro}
          </p>

          <ul data-stagger className="mt-9 grid gap-3 sm:grid-cols-3">
            {whoWeAre.credentials.map((c) => (
              <li
                key={c.name}
                className="rounded-2xl border border-line bg-white p-4 transition-[border-color,box-shadow] duration-500 hover:border-brand-blue/40 hover:shadow-card"
              >
                <BadgeCheck className="size-5 text-brand-yellow-deep" strokeWidth={2.25} aria-hidden="true" />
                <p className="mt-3 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-body">{c.status}</p>
                <p className="mt-1 font-display text-[0.9375rem] font-bold leading-tight text-ink">{c.name}</p>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10">
            <a href={whoWeAre.cta.href} className="btn btn-blue rounded-full">
              {whoWeAre.cta.label}
              <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right: bento tiles */}
        <div data-stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          <figure className="group relative min-h-80 overflow-hidden rounded-3xl bg-night sm:row-span-2 sm:min-h-[36rem]">
            <div data-parallax="6" className="absolute inset-x-0 -inset-y-[8%]">
              <Image
                src={whoWeAre.image}
                alt={whoWeAre.imageAlt}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-[60%_50%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
            {premium && (
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/15 p-3 pr-4 text-white backdrop-blur-md">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-yellow text-ink">
                  <Anchor className="size-5" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-bold">{premium}</span>
              </figcaption>
            )}
          </figure>

          <div className="relative overflow-hidden rounded-3xl bg-brand-blue p-7 text-white sm:p-8">
            <Quote className="size-8 text-brand-yellow" strokeWidth={2} aria-hidden="true" />
            <p className="mt-5 font-display text-lg font-bold leading-[1.5]">{accreditation}</p>
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 size-44 rounded-full border-[18px] border-white/10" />
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-brand-yellow p-7 text-ink sm:p-8">
            <p className="font-display text-6xl font-bold leading-none">24/7</p>
            <p className="mt-5 text-sm leading-7 text-ink/80">{service}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
