import Image from "next/image";
import { ArrowUpRight, Link2, Phone, Receipt, type LucideIcon } from "lucide-react";
import { barbadosBanner, quickLinks } from "@/lib/content";

const icons: Record<(typeof quickLinks)[number]["icon"], LucideIcon> = {
  phone: Phone,
  receipt: Receipt,
  link: Link2,
};

/** Contact Us / Registration Fees / Useful Links as three photo cards. */
export function QuickLinks() {
  return (
    <nav aria-label="Quick links" className="bg-abyss py-24 lg:py-28">
      <ul data-stagger className="container-site grid gap-5 md:grid-cols-3">
        {quickLinks.map((tile) => {
          const Icon = icons[tile.icon];
          return (
            <li key={tile.title}>
              <a
                href={tile.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-harbor/60 transition-[translate,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-ocean/40 hover:shadow-float"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={tile.image}
                    alt={tile.alt}
                    fill
                    sizes="(min-width: 768px) 460px, 100vw"
                    className="object-cover saturate-[0.85] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-harbor via-harbor/10 to-transparent" />
                  <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-full border border-white/20 bg-abyss/60 text-ocean backdrop-blur-md transition-colors duration-500 group-hover:bg-ocean group-hover:text-abyss">
                    <Icon className="size-[1.125rem]" aria-hidden="true" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-2 sm:px-7 sm:pb-7">
                  <h3 className="text-3xl">{tile.title}</h3>
                  <p className="mb-6 mt-3 text-sm leading-6">{tile.description}</p>
                  <span className="mt-auto flex items-center justify-between border-t border-rule pt-5 text-xs font-semibold text-haze transition-colors group-hover:text-ocean">
                    <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-ocean to-gold transition-[width] duration-500 group-hover:w-16" />
                    <span
                      aria-hidden="true"
                      className="grid size-9 place-items-center rounded-full border border-rule transition-[rotate,background-color,border-color,color] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-abyss"
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </span>
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
    <div className="bg-abyss">
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
        {/* night grade so the photo sits in the navy page */}
        <div aria-hidden="true" className="absolute inset-0 bg-[#0a3a52] opacity-55 mix-blend-color" />
        <div aria-hidden="true" className="absolute inset-0 bg-abyss/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-abyss/60 via-transparent to-deep/80" />
        {/* Light sweep that passes across once the frame is open */}
        <div
          data-frame-shine
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0"
        />
      </div>
    </div>
  );
}
