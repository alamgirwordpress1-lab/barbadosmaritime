import Image from "next/image";
import { Map as MapIcon, Sun, TreePalm, Users, type LucideIcon } from "lucide-react";
import { BackgroundVideo } from "@/components/motion/BackgroundVideo";
import { islandStats, statsBackdrop } from "@/lib/content";

// Matches the order of islandStats: people, beaches, sunshine, size.
const icons: LucideIcon[] = [Users, TreePalm, Sun, MapIcon];

/**
 * Barbados facts as glass tiles on a full-width band over a ship-at-sea video
 * (or the sea photo until a video is set). Each figure counts up on scroll.
 */
export function IslandStats() {
  return (
    <section aria-label="Barbados at a glance" className="relative isolate overflow-hidden py-24 lg:py-32">
      <div data-parallax="6" className="absolute inset-x-0 -inset-y-[8%] -z-20">
        {statsBackdrop.video ? (
          <BackgroundVideo src={statsBackdrop.video} poster={statsBackdrop.poster} className="size-full object-cover" />
        ) : (
          <Image src={statsBackdrop.poster} alt="" fill sizes="100vw" className="object-cover" />
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgb(26_26_26/0.85)_0%,rgb(26_26_26/0.6)_55%,rgb(61_124_200/0.5)_100%)]"
      />

      <div className="container-site">
        <ul data-stagger className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {islandStats.map((stat, i) => {
            const Icon = icons[i];
            return (
              <li
                key={stat.label.join(" ")}
                className="group rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-[background-color,translate] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-white/15 sm:p-7"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-brand-yellow text-ink transition-transform duration-500 group-hover:-rotate-6">
                  <Icon className="size-5" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <span className="mt-6 block font-display text-4xl font-bold leading-none tabular-nums text-white sm:text-5xl">
                  <span data-count={stat.value}>{stat.value}</span>
                  {stat.suffix === "Km2" ? (
                    <>
                      Km<sup className="text-[0.5em]">2</sup>
                    </>
                  ) : (
                    <span className="text-brand-yellow">{stat.suffix}</span>
                  )}
                </span>
                <span className="mt-3 block text-sm font-semibold text-white/75">{stat.label.join(" ")}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
