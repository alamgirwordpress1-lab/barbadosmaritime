import { Plus } from "lucide-react";
import { AccentTitle } from "@/components/ui";
import { faq } from "@/lib/content";

/** Common questions as an accordion (native <details>, so it works without JavaScript). */
export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-deep py-24 lg:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p data-reveal className="eyebrow">
            {faq.eyebrow}
          </p>
          <h2 id="faq-heading" data-split className="mt-5 text-[2.25rem] sm:text-5xl">
            <AccentTitle {...faq.title} />
          </h2>
          <p data-reveal className="mt-6 max-w-sm text-sm leading-6">
            {faq.intro}
          </p>
        </div>

        <div data-stagger className="rounded-xl border border-rule bg-abyss/40 lg:col-span-8">
          {faq.items.map((item, i) => (
            <details key={item.q} open={i === 0} className="faq group border-b border-rule last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[1rem] font-medium text-foam transition-colors hover:text-teal sm:px-8 sm:py-6 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-rule text-teal transition-[rotate,background-color,color] duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:bg-teal group-open:text-abyss">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-3xl px-6 pb-6 text-sm leading-7 sm:px-8 sm:pb-7">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
