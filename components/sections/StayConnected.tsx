"use client";

import { CircleCheck, Mail, Send, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { stayConnected } from "@/lib/content";

/** Two drifting swells, echoing the yellow and blue waves in the BMSR logo. */
function Swells() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-14 overflow-hidden">
      <svg
        viewBox="0 0 800 80"
        preserveAspectRatio="none"
        className="absolute bottom-3 h-8 w-[200%] animate-[wave-drift_18s_linear_infinite] opacity-40"
        fill="none"
      >
        <path d="M0 40 Q100 10 200 40 T400 40 T600 40 T800 40" stroke="#fec725" strokeWidth="5" />
      </svg>
      <svg
        viewBox="0 0 800 80"
        preserveAspectRatio="none"
        className="absolute -bottom-1 h-8 w-[200%] animate-[wave-drift_12s_linear_infinite_reverse] opacity-25"
        fill="none"
      >
        <path d="M0 40 Q100 70 200 40 T400 40 T600 40 T800 40" stroke="#fff" strokeWidth="5" />
      </svg>
    </div>
  );
}

/**
 * Newsletter sign-up as a floating card that bridges the bulletins and the footer.
 * The submit handler is a front-end stub: connect it to the registry's mailing-list
 * provider (the same one the current site posts to).
 */
export function StayConnected() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST new FormData(e.currentTarget) to the mailing-list provider.
    setDone(true);
  }

  const field =
    "flex flex-1 items-center gap-3 rounded-full px-5 transition-colors focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-white/60";
  const input = "h-12 w-full bg-transparent text-[0.9375rem] font-semibold text-white outline-none placeholder:font-normal placeholder:text-white/70";

  return (
    <section
      aria-labelledby="stay-connected"
      className="bg-[linear-gradient(to_bottom,var(--color-mist)_50%,var(--color-night)_50%)]"
    >
      <div className="container-site">
        <div
          data-reveal
          className="group relative isolate overflow-hidden rounded-[2rem] bg-brand-blue px-6 py-10 shadow-[0_30px_60px_-30px_rgb(26_26_26/0.7)] sm:px-10 sm:py-12 lg:px-14"
        >
          {/* depth: glows, fine grid, oversized envelope and the drifting swells */}
          <span aria-hidden="true" className="absolute -left-24 -top-32 -z-10 size-80 rounded-full bg-white/15 blur-3xl" />
          <span aria-hidden="true" className="absolute -bottom-40 right-1/4 -z-10 size-80 rounded-full bg-brand-yellow/25 blur-3xl" />
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]"
          />
          <Mail
            aria-hidden="true"
            strokeWidth={0.75}
            className="absolute -right-10 -top-14 -z-10 size-72 rotate-12 text-white/10 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-6 group-hover:scale-105"
          />
          <Swells />

          <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
            <div className="flex items-center gap-5">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand-yellow text-ink shadow-[0_14px_30px_-12px_rgb(26_26_26/0.5)]">
                <Send className="size-7 -rotate-12" strokeWidth={2} aria-hidden="true" />
              </span>
              <h2 id="stay-connected" className="text-[2rem] leading-none text-white sm:text-[2.5rem]">
                {stayConnected.heading}
              </h2>
            </div>

            {done ? (
              <p
                role="status"
                className="flex items-center gap-3 justify-self-start rounded-full bg-white/15 px-6 py-4 font-display text-lg font-bold text-white backdrop-blur-md lg:justify-self-end"
              >
                <CircleCheck className="size-6 text-brand-yellow" aria-hidden="true" />
                Thank you for signing up.
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex w-full flex-col gap-2 rounded-3xl border border-white/25 bg-white/10 p-2 backdrop-blur-md sm:flex-row sm:items-center sm:rounded-full lg:ml-auto lg:max-w-[42rem]"
              >
                <label className={field}>
                  <User className="size-4 shrink-0 text-white/70" aria-hidden="true" />
                  <span className="sr-only">{stayConnected.nameLabel}</span>
                  <input name="name" required autoComplete="name" placeholder={stayConnected.nameLabel} className={input} />
                </label>
                <span aria-hidden="true" className="hidden h-8 w-px shrink-0 bg-white/25 sm:block" />
                <label className={field}>
                  <Mail className="size-4 shrink-0 text-white/70" aria-hidden="true" />
                  <span className="sr-only">{stayConnected.emailLabel}</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={stayConnected.emailLabel}
                    className={input}
                  />
                </label>
                <button type="submit" className="btn btn-yellow shrink-0 rounded-full">
                  {stayConnected.submit}
                  <Send className="size-4" strokeWidth={2.25} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
