import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { AccentTitle } from "@/components/ui";
import { organisations } from "@/lib/content";

/** Recognised organisations as a slow, endless logo carousel (hover pauses it). */
export function Organisations() {
  const words = organisations.heading.split(" ");
  return (
    <section aria-labelledby="recognised-organisations" className="overflow-hidden bg-deep py-24 lg:py-28">
      <div className="container-site flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="recognised-organisations" data-split className="text-[2.25rem] sm:text-5xl">
          <AccentTitle before={`${words.slice(0, -1).join(" ")} `} accent={words.at(-1) ?? ""} />
        </h2>
        <a data-reveal href={organisations.cta.href} className="btn btn-ghost w-fit">
          {organisations.cta.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>

      <div
        data-reveal
        className="marquee mt-14 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      >
        <div className="marquee-track py-3" style={{ "--marquee-duration": "40s" } as CSSProperties}>
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-4 pr-4">
              {organisations.logos.map((logo) => (
                <li
                  key={logo.name}
                  className="group grid h-28 w-56 shrink-0 place-items-center rounded-xl bg-foam p-6 opacity-90 transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:opacity-100"
                >
                  <Image
                    src={logo.src}
                    alt={copy === 1 ? "" : logo.name}
                    width={logo.w}
                    height={logo.h}
                    className="max-h-14 w-auto max-w-full object-contain mix-blend-multiply grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
