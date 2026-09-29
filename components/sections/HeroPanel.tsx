"use client";

import { Anchor, Bookmark, Heart, MessagesSquare, Phone, Search, User, type LucideIcon } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties, type SVGProps } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { highlights } from "@/lib/content";

const icons: Record<(typeof highlights)[number]["icon"], LucideIcon> = {
  phone: Phone,
  heart: Heart,
  search: Search,
  bookmark: Bookmark,
  messages: MessagesSquare,
  user: User,
};

// Centre of each stop along the route, as a fraction of its width.
const stops = highlights.map((_, i) => (i + 0.5) / highlights.length);

// Wording already on the site, set around the seal.
const SEAL_TEXT = "Barbados Maritime Ship Registry • ISO9001 Accredited Company • ";

/** Slowly turning registry seal with an anchor at its centre. */
function Seal({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <div className={`relative shrink-0 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="size-full animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path id={id} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <circle cx="100" cy="100" r="97" fill="none" stroke="rgb(254 199 37 / 0.55)" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
        <text fill="rgb(255 255 255 / 0.85)" fontSize="12.5" fontWeight="700" letterSpacing="1.5">
          <textPath href={`#${id}`} textLength={470} lengthAdjust="spacing">
            {SEAL_TEXT.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[27%] grid place-items-center rounded-full bg-brand-yellow text-ink shadow-[0_0_30px_rgb(254_199_37/0.35)]">
        <Anchor className="size-[46%]" strokeWidth={2.25} />
      </span>
    </div>
  );
}

/** Side-on cargo ship that sails the route. */
function Ship(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 32" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M2 20h60l-6.5 9H9.5L2 20Z" />
      <rect x="10" y="13" width="9" height="7" rx="0.5" fill="currentColor" />
      <rect x="20" y="15" width="9" height="5" rx="0.5" fill="currentColor" />
      <rect x="30" y="15" width="9" height="5" rx="0.5" fill="currentColor" />
      <path fill="currentColor" d="M42 8h10v12H42z" />
      <path fill="currentColor" d="M45 3h3v5h-3z" />
      <rect x="44" y="11" width="6" height="2" fill="#1a1a1a" opacity="0.55" />
      <path
        d="M0 31c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

/** London time and whether the office (Mon–Fri, 9am–5pm) is open right now. */
function useLondonClock() {
  const [now, setNow] = useState<{ time: string; open: boolean } | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => {
      const parts = Object.fromEntries(fmt.formatToParts(new Date()).map((p) => [p.type, p.value]));
      const hour = Number(parts.hour);
      const weekday = !["Sat", "Sun"].includes(parts.weekday);
      setNow({ time: `${parts.hour}:${parts.minute}`, open: weekday && hour >= 9 && hour < 17 });
    };
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function OfficeStatus() {
  const clock = useLondonClock();
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-3 pr-4 text-xs font-semibold text-white/80">
      <span className="relative flex size-2" aria-hidden="true">
        {clock?.open && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />}
        <span className={`relative size-2 rounded-full ${clock?.open ? "bg-emerald-400" : "bg-white/40"}`} />
      </span>
      {clock ? (clock.open ? "Office open" : "Office closed") : "London office"}
      <span className="font-display text-sm font-bold tabular-nums text-brand-yellow">{clock?.time ?? "--:--"}</span>
      <span className="sr-only">London time</span>
    </p>
  );
}

/**
 * The six service highlights at the foot of the hero: a registry seal beside a chart-style
 * route. A ship sails from stop to stop, filling the route and lighting each service up.
 * Hovering the panel holds the ship where it is.
 */
export function HeroPanel() {
  const root = useRef<HTMLDivElement>(null);
  const voyage = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const route = root.current?.querySelector<HTMLElement>("[data-route]");
      if (!route) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(route, { "--p": stops[0] });
        return;
      }
      const tl = gsap.timeline({ repeat: -1, delay: 1.4 });
      tl.set(route, { "--p": 0, "--ship-o": 0 })
        .call(() => setActive(-1))
        .to(route, { "--ship-o": 1, duration: 0.4 });
      stops.forEach((p, i) => {
        tl.to(route, { "--p": p, duration: i === 0 ? 1 : 1.4, ease: "power2.inOut" })
          .call(() => setActive(i))
          .to({}, { duration: 1.5 });
      });
      tl.to(route, { "--p": 1, duration: 1, ease: "power2.in" }).to(route, { "--ship-o": 0, duration: 0.35 }, "-=0.35");
      voyage.current = tl;

      // Rest the voyage while the hero is off screen.
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tl.resume() : tl.pause()),
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-hero-ui
      onMouseEnter={() => voyage.current?.pause()}
      onMouseLeave={() => voyage.current?.resume()}
      className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-md sm:p-6 lg:p-7"
    >
      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
        <div className="flex items-center gap-5 lg:flex-col lg:gap-4">
          <Seal className="size-24 sm:size-28 lg:size-32" />
          <OfficeStatus />
        </div>

        {/* Route (tablet and up) */}
        <div
          data-route
          className="relative hidden pt-9 md:block"
          style={{ "--p": stops[0], "--ship-o": 1 } as CSSProperties}
        >
          <div className="relative">
            {/* dashed chart route and the wake filled in behind the ship */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[7px] h-[2px] bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.35)_0_8px,transparent_8px_16px)]"
            />
            <div
              aria-hidden="true"
              className="absolute left-0 top-[7px] h-[2px] bg-brand-yellow shadow-[0_0_10px_rgb(254_199_37/0.6)]"
              style={{ width: "calc(var(--p) * 100%)" }}
            />
            <Ship
              className="pointer-events-none absolute -top-[30px] w-14 -translate-x-1/2 text-brand-yellow drop-shadow-[0_0_10px_rgb(254_199_37/0.45)]"
              style={{ left: "calc(var(--p) * 100%)", opacity: "var(--ship-o)" }}
            />
            <ol className="relative grid grid-cols-6 items-stretch">
              {highlights.map(({ icon, label }, i) => {
                const Icon = icons[icon];
                const on = i === active;
                const passed = i < active;
                return (
                  <li key={label} className="flex flex-col items-center px-1.5 text-center">
                    {/* point on the route */}
                    <span className="relative grid size-[15px] place-items-center" aria-hidden="true">
                      <span
                        className={`size-3 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
                          on
                            ? "scale-125 bg-brand-yellow shadow-[0_0_0_5px_rgb(254_199_37/0.2),0_0_16px_rgb(254_199_37/0.7)]"
                            : passed
                              ? "bg-brand-yellow"
                              : "border border-white/50 bg-night"
                        }`}
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-4 w-px transition-colors duration-500 ${on || passed ? "bg-brand-yellow/70" : "bg-white/20"}`}
                    />
                    {/* transparent, rounded box */}
                    <div
                      className={`flex w-full flex-1 flex-col items-center gap-3 rounded-2xl border px-3 py-4 transition-all duration-500 ease-[var(--ease-out-expo)] ${
                        on
                          ? "-translate-y-1 border-brand-yellow bg-white/[0.06] shadow-[0_0_26px_-8px_rgb(254_199_37/0.6)]"
                          : passed
                            ? "border-brand-yellow/35 bg-transparent"
                            : "border-white/20 bg-transparent"
                      }`}
                    >
                      <Icon
                        className={`size-6 transition-colors duration-500 ${on || passed ? "text-brand-yellow" : "text-white/70"}`}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-[0.8125rem] font-bold leading-snug transition-colors duration-500 ${
                          on ? "text-white" : "text-white/70"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Tiles (phones): the highlight follows the same voyage */}
        <ul className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 md:hidden">
          {highlights.map(({ icon, label }, i) => {
            const Icon = icons[icon];
            const on = i === active;
            return (
              <li
                key={label}
                className={`flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 transition-colors duration-500 ${
                  on ? "border-brand-yellow bg-white/[0.06]" : "border-white/20 bg-transparent"
                }`}
              >
                <Icon
                  className={`size-5 shrink-0 transition-colors duration-500 ${on ? "text-brand-yellow" : "text-white/70"}`}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className={`text-[0.8125rem] font-bold leading-snug ${on ? "text-white" : "text-white/70"}`}>
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
