import type { CSSProperties } from "react";
import { credentials } from "@/lib/content";

/** Credentials running under the hero like a ship's name board. */
export function Ticker() {
  const items = [...credentials, ...credentials]; // one set wide enough to fill very wide screens
  return (
    <section aria-label="Credentials" className="marquee overflow-hidden border-y border-rule bg-deep py-4">
      <div className="marquee-track" style={{ "--marquee-duration": "42s" } as CSSProperties}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <li
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-8 px-8 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-haze"
              >
                {item}
                <span aria-hidden="true" className={`size-1 rounded-full ${i % 2 ? "bg-gold" : "bg-ocean"}`} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
