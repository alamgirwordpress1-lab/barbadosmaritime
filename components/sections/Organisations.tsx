import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { organisations } from "@/lib/content";

/** Recognised organisations as a slow, endless logo carousel (hover pauses it). */
export function Organisations() {
  const words = organisations.heading.split(" ");
  return (
    <section aria-labelledby="recognised-organisations" className="overflow-hidden pb-24 pt-24 lg:pt-28">
      <div className="container-site flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="recognised-organisations" data-split className="text-[2.25rem] leading-[1.1] sm:text-5xl">
          {words.slice(0, -1).join(" ")}
          <br />
          <span className="text-brand-blue">{words.at(-1)}</span>
        </h2>
        <a data-reveal href={organisations.cta.href} className="btn btn-blue w-fit rounded-full">
          {organisations.cta.label}
          <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>

      <div
        data-reveal
        className="marquee mt-12 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      >
        <div className="marquee-track py-4" style={{ "--marquee-duration": "38s" } as CSSProperties}>
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-5 pr-5">
              {organisations.logos.map((logo) => (
                <li
                  key={logo.name}
                  className="group grid h-32 w-60 shrink-0 place-items-center rounded-3xl border border-line bg-white p-7 shadow-[0_10px_24px_-20px_rgb(26_26_26/0.5)] transition-[translate,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-brand-blue/30 hover:shadow-card"
                >
                  <Image
                    src={logo.src}
                    alt={copy === 1 ? "" : logo.name}
                    width={logo.w}
                    height={logo.h}
                    className="max-h-16 w-auto max-w-full object-contain opacity-70 grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0"
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
