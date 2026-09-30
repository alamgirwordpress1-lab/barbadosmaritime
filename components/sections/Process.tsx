import { AccentTitle } from "@/components/ui";
import { registrationProcess } from "@/lib/content";

/** Registration in four steps; the rules above each step draw in one after another. */
export function Process() {
  const p = registrationProcess;
  return (
    <section aria-labelledby="process-heading" className="bg-deep py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p data-reveal className="eyebrow">
              {p.eyebrow}
            </p>
            <h2 id="process-heading" data-split className="mt-5 max-w-2xl text-[2.25rem] sm:text-5xl">
              <AccentTitle {...p.title} />
            </h2>
          </div>
          <p data-reveal className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-fog">
            {p.note}
          </p>
        </div>

        <ol data-stagger className="mt-14 grid gap-px overflow-hidden rounded-sm bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((step, i) => (
            <li key={step.title} className="group relative bg-deep p-7 transition-colors duration-500 hover:bg-harbor lg:p-9">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-fog">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <span aria-hidden="true" className="mt-5 block h-px bg-rule">
                <span className="block h-full w-1/3 bg-gradient-to-r from-teal to-gold transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full" />
              </span>
              <h3 className="mt-7 text-2xl">{step.title}</h3>
              <p className="mt-4 text-sm leading-6">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
