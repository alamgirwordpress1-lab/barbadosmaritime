import { AlignCenter, Anchor, ArrowRight, ArrowUpRight, Compass, Contact, type LucideIcon } from "lucide-react";
import type { SVGProps } from "react";
import { services } from "@/lib/content";

const icons: Record<(typeof services)[number]["icon"], LucideIcon> = {
  compass: Compass,
  contact: Contact,
  bulletins: AlignCenter,
  anchor: Anchor,
};

/** Nautical-chart compass rose, drawn as fine lines for the band's background. */
function ChartRose(props: SVGProps<SVGSVGElement>) {
  const spokes = Array.from({ length: 32 }, (_, i) => {
    const a = (i * Math.PI) / 16;
    const inner = i % 4 === 0 ? 40 : 150;
    return {
      x1: (200 + inner * Math.cos(a)).toFixed(2),
      y1: (200 + inner * Math.sin(a)).toFixed(2),
      x2: (200 + 195 * Math.cos(a)).toFixed(2),
      y2: (200 + 195 * Math.sin(a)).toFixed(2),
    };
  });
  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      {[195, 170, 150, 100, 40].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} strokeWidth="1.2" />
      ))}
      {spokes.map((l, i) => (
        <line key={i} {...l} strokeWidth="1" />
      ))}
      <path d="M200 30 L216 200 L200 370 L184 200 Z M30 200 L200 184 L370 200 L200 216 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Four registry services as cards on the yellow band. On hover (or keyboard focus) a
 * brand-blue fill opens out from the icon and the card inverts to white text.
 */
export function Services() {
  return (
    <section aria-label="Registry services" className="relative isolate overflow-hidden bg-brand-yellow py-20 lg:py-28">
      <ChartRose className="pointer-events-none absolute -right-48 -top-48 -z-10 size-[42rem] animate-[spin_160s_linear_infinite] text-ink/[0.07]" />
      <ChartRose className="pointer-events-none absolute -bottom-56 -left-56 -z-10 hidden size-[34rem] animate-[spin_200s_linear_infinite_reverse] text-ink/[0.05] md:block" />

      <ul data-stagger className="container-site grid gap-6 md:grid-cols-2">
        {services.map((s) => {
          const Icon = icons[s.icon];
          return (
            <li
              key={s.title}
              className="group relative isolate flex flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-[0_24px_50px_-32px_rgb(26_26_26/0.6)] transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-float sm:p-10"
            >
              {/* blue fill that opens out from the icon */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-brand-blue transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] [clip-path:circle(0%_at_4.5rem_4.5rem)] group-focus-within:[clip-path:circle(150%_at_4.5rem_4.5rem)] group-hover:[clip-path:circle(150%_at_4.5rem_4.5rem)]"
              />
              {/* oversized outline icon in the corner */}
              <Icon
                aria-hidden="true"
                strokeWidth={1}
                className="absolute -bottom-12 -right-12 -z-10 size-60 text-brand-blue/[0.07] transition-[rotate,color] duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-12 group-hover:text-white/10"
              />

              <div className="flex items-start justify-between gap-4">
                <span className="grid size-16 place-items-center rounded-2xl bg-brand-yellow text-brand-blue transition-colors duration-500 group-hover:bg-white/15 group-hover:text-brand-yellow">
                  <Icon className="size-7" strokeWidth={2} aria-hidden="true" />
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-full border border-line text-brand-blue transition-[rotate,border-color,background-color,color] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-ink"
                >
                  <ArrowUpRight className="size-5" strokeWidth={2.25} />
                </span>
              </div>

              <h3 className="mt-10 text-2xl transition-colors duration-500 group-hover:text-white sm:text-[1.75rem]">{s.title}</h3>
              <p className="mt-4 flex-1 text-[0.9375rem] leading-7 transition-colors duration-500 group-hover:text-white/80">
                {s.body.map((part) =>
                  typeof part === "string" ? (
                    part
                  ) : (
                    <a
                      key={part.text}
                      href={part.href}
                      className="font-semibold text-brand-blue underline decoration-brand-blue/30 underline-offset-2 transition-colors hover:decoration-brand-blue group-hover:text-brand-yellow group-hover:decoration-brand-yellow/50"
                    >
                      {part.text}
                    </a>
                  ),
                )}
              </p>

              <div className="mt-8 border-t border-line pt-6 transition-colors duration-500 group-hover:border-white/20">
                <a href={s.cta.href} className="link-arrow group-hover:text-brand-yellow">
                  {s.cta.label}
                  <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
