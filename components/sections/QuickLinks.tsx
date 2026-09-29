import Image from "next/image";
import { ArrowUpRight, Link2, Phone, Receipt, type LucideIcon } from "lucide-react";
import { barbadosBanner, quickLinks } from "@/lib/content";

const icons: Record<(typeof quickLinks)[number]["icon"], LucideIcon> = {
  phone: Phone,
  receipt: Receipt,
  link: Link2,
};

/** Contact Us / Registration Fees / Useful Links as three cards, matching the bulletin cards. */
export function QuickLinks() {
  return (
    <nav aria-label="Quick links" className="container-site py-24">
      <ul data-stagger className="grid gap-6 md:grid-cols-3">
        {quickLinks.map((tile) => {
          const Icon = icons[tile.icon];
          return (
            <li key={tile.title}>
              <a
                href={tile.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_34px_-24px_rgb(26_26_26/0.5)] ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-float"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={tile.image}
                    alt={tile.alt}
                    fill
                    sizes="(min-width: 768px) 460px, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/30 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 grid size-12 place-items-center rounded-xl bg-white/95 text-brand-blue shadow-card backdrop-blur transition-colors duration-500 group-hover:bg-brand-yellow group-hover:text-ink">
                    <Icon className="size-5" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  {/* yellow rule that draws along the photo's lower edge on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand-yellow transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-2xl transition-colors duration-300 group-hover:text-brand-blue">{tile.title}</h3>
                  <p className="mb-6 mt-3 text-[0.9375rem] leading-6">{tile.description}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-line pt-5">
                    <span aria-hidden="true" className="flex items-center gap-2">
                      <span className="h-[2px] w-8 bg-brand-blue transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover:w-12" />
                      <span className="h-[2px] w-2 bg-brand-blue" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid size-10 place-items-center rounded-full border border-line text-brand-blue transition-[rotate,background-color,border-color,color] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white"
                    >
                      <ArrowUpRight className="size-4" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Full-width island photo: opens out from a rounded frame to edge to edge as it scrolls into view. */
export function BarbadosBanner() {
  return (
    <div data-frame-reveal className="relative h-56 overflow-hidden sm:aspect-[11/3] sm:h-auto">
      <div data-frame-img className="absolute inset-0 will-change-transform">
        <Image
          src={barbadosBanner.image}
          alt={barbadosBanner.alt}
          fill
          sizes="100vw"
          className="object-cover object-[32%_50%] sm:object-center"
        />
      </div>
      {/* Light sweep that passes across once the frame is open */}
      <div
        data-frame-shine
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0"
      />
    </div>
  );
}
