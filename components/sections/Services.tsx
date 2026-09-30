import { ArrowRight } from "lucide-react";
import { services, servicesHeading } from "@/lib/content";

/** The four registry services as a ruled 2×2 grid, each with a serif numeral. */
export function Services() {
  return (
    <section aria-labelledby="services-heading" className="bg-deep py-24 lg:py-32">
      <div className="container-site">
        <h2 id="services-heading" data-split className="text-[2.25rem] sm:text-5xl">
          {servicesHeading}
        </h2>

        <ul data-stagger className="mt-14 grid border-t border-rule md:grid-cols-2">
          {services.map((s, i) => (
            <li
              key={s.title}
              className={`group relative flex flex-col border-b border-rule px-1 py-10 transition-colors duration-500 hover:bg-white/[0.025] sm:px-8 lg:px-12 lg:py-14 ${
                i % 2 ? "md:border-l" : ""
              }`}
            >
              {/* teal rule that draws along the top on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-teal to-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
              <span className="font-display text-5xl leading-none text-gold/80 transition-colors duration-500 group-hover:text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 text-3xl">{s.title}</h3>
              <p className="mt-4 max-w-lg flex-1 text-[0.9375rem] leading-7">
                {s.body.map((part) =>
                  typeof part === "string" ? (
                    part
                  ) : (
                    <a
                      key={part.text}
                      href={part.href}
                      className="text-teal underline decoration-teal/30 underline-offset-4 transition-colors hover:text-foam"
                    >
                      {part.text}
                    </a>
                  ),
                )}
              </p>
              <a href={s.cta.href} className="link-arrow mt-7">
                {s.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
