import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AccentTitle } from "@/components/ui";
import { whoWeAre } from "@/lib/content";

/** About: duotone photo with the ISO badge, the mockup headline, the existing copy and four figures. */
export function WhoWeAre() {
  return (
    <section aria-labelledby="who-we-are" className="bg-abyss py-24 lg:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <div data-parallax="7" className="absolute inset-x-0 -inset-y-[9%]">
              <div data-clip-img className="absolute inset-0">
                <Image
                  src={whoWeAre.image}
                  alt={whoWeAre.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-[60%_50%] contrast-110 grayscale"
                />
              </div>
            </div>
            {/* navy duotone */}
            <div aria-hidden="true" className="absolute inset-0 bg-[#2a6f93] mix-blend-multiply" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent" />
          </div>
          <div
            data-reveal
            className="absolute -bottom-6 right-4 w-44 bg-gold p-5 text-abyss shadow-float sm:right-8 lg:-right-6"
          >
            <p className="font-display text-3xl leading-none">{whoWeAre.badge.title}</p>
            <p className="mt-3 text-[0.625rem] font-bold uppercase leading-snug tracking-[0.22em]">{whoWeAre.badge.text}</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p data-reveal className="eyebrow">
            {whoWeAre.heading.join(" ")}
          </p>
          <h2 id="who-we-are" data-split className="mt-6 text-[2.5rem] sm:text-5xl lg:text-[3.5rem]">
            <AccentTitle {...whoWeAre.title} />
          </h2>
          <div data-stagger className="mt-8 max-w-2xl space-y-5 text-[0.9375rem] leading-7">
            {whoWeAre.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <dl data-stagger className="mt-12 grid grid-cols-2 border-t border-rule sm:grid-cols-4">
            {whoWeAre.facts.map((f, i) => (
              <div
                key={f.label}
                className={`flex flex-col-reverse pb-2 pt-6 ${i > 0 ? "sm:border-l sm:border-rule sm:pl-6" : ""} ${i % 2 ? "border-l border-rule pl-6" : ""}`}
              >
                <dt className="mt-3 text-xs leading-snug text-fog">{f.label}</dt>
                <dd className="font-display text-4xl leading-none text-ocean">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="mt-10">
            <a href={whoWeAre.cta.href} className="link-arrow">
              {whoWeAre.cta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
