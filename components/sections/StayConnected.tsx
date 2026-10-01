"use client";

import { CircleCheck, Mail, Send, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AccentTitle } from "@/components/ui";
import { stayConnected } from "@/lib/content";

/**
 * Newsletter sign-up, shown as a glass card at the top of the footer. The submit
 * handler is a front-end stub: connect it to the registry's mailing-list provider.
 */
export function StayConnected() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST new FormData(e.currentTarget) to the mailing-list provider.
    setDone(true);
  }

  const [first, ...rest] = stayConnected.heading.split(" ");
  const field = "flex flex-1 items-center gap-3 rounded-full px-4 transition-colors focus-within:bg-white/[0.06]";
  const input = "h-12 w-full bg-transparent text-sm text-foam outline-none placeholder:text-fog";

  return (
    <section
      aria-labelledby="stay-connected"
      data-reveal
      className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(120deg,#072a3d_0%,#041f33_55%,#031d2f_100%)] p-6 sm:p-10 lg:px-12"
    >
      {/* soft signal lights and a faint chart grid */}
      <span aria-hidden="true" className="absolute -left-20 -top-24 -z-10 size-72 rounded-full bg-ocean/20 blur-3xl" />
      <span aria-hidden="true" className="absolute -bottom-28 right-10 -z-10 size-72 rounded-full bg-gold/10 blur-3xl" />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_30%_40%,#000,transparent_70%)]"
      />

      <div className="grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] xl:gap-14">
        <div>
          <h2 id="stay-connected" className="text-4xl sm:text-5xl">
            <AccentTitle before={`${first} `} accent={rest.join(" ")} />
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6">{stayConnected.intro}</p>
        </div>

        {done ? (
          <p role="status" className="flex items-center gap-3 text-foam xl:justify-self-end">
            <CircleCheck className="size-5 text-ocean" aria-hidden="true" />
            Thank you for signing up.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex w-full flex-col gap-2 rounded-3xl border border-white/10 bg-abyss/60 p-2 backdrop-blur-md transition-colors focus-within:border-ocean/40 sm:flex-row sm:items-center sm:rounded-full"
          >
            <label className={field}>
              <User className="size-4 shrink-0 text-fog" aria-hidden="true" />
              <span className="sr-only">{stayConnected.nameLabel}</span>
              <input name="name" required autoComplete="name" placeholder={stayConnected.nameLabel} className={input} />
            </label>
            <span aria-hidden="true" className="hidden h-6 w-px shrink-0 bg-white/10 sm:block" />
            <label className={field}>
              <Mail className="size-4 shrink-0 text-fog" aria-hidden="true" />
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
            <button type="submit" className="btn btn-gold shrink-0">
              {stayConnected.submit}
              <Send className="size-4" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
