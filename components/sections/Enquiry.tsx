"use client";

import { ArrowRight, ChevronDown, CircleCheck, Mail, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contact, enquiry } from "@/lib/content";

/**
 * Registration enquiry form. The submit handler is a front-end stub: connect it to the
 * registry's inbox or CRM before launch.
 */
export function Enquiry() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST new FormData(e.currentTarget) to the registry's enquiry endpoint.
    setSent(true);
  }

  const label = "mb-2 block text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-fog";

  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="bg-abyss py-24 lg:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow">
            {enquiry.eyebrow}
          </p>
          <h2 id="enquiry-heading" data-split className="mt-5 text-[2.25rem] sm:text-5xl">
            {enquiry.heading}
          </h2>
          <p data-reveal className="mt-6 max-w-md text-sm leading-6">
            {enquiry.intro}
          </p>
          <ul data-stagger className="mt-10 space-y-3 text-sm">
            <li>
              <a href={contact.phoneHref} className="inline-flex items-center gap-3 text-haze transition-colors hover:text-foam">
                <Phone className="size-4 text-ocean" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 text-haze transition-colors hover:text-foam">
                <Mail className="size-4 text-ocean" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div data-reveal className="rounded-xl border border-rule bg-harbor/60 p-6 sm:p-8 lg:col-span-7">
          {sent ? (
            <p role="status" className="flex min-h-64 flex-col items-center justify-center gap-4 text-center font-display text-3xl text-foam">
              <CircleCheck className="size-10 text-ocean" aria-hidden="true" />
              {enquiry.thanks}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className={label}>{enquiry.labels.name}</span>
                <input name="name" required autoComplete="name" placeholder={enquiry.placeholders.name} className="field" />
              </label>
              <label>
                <span className={label}>{enquiry.labels.email}</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={enquiry.placeholders.email}
                  className="field"
                />
              </label>
              <label>
                <span className={label}>{enquiry.labels.vessel}</span>
                <input name="vessel" placeholder={enquiry.placeholders.vessel} className="field" />
              </label>
              <label>
                <span className={label}>{enquiry.labels.type}</span>
                <span className="relative block">
                  <select name="vesselType" defaultValue={enquiry.vesselTypes[0]} className="field appearance-none pr-10">
                    {enquiry.vesselTypes.map((t) => (
                      <option key={t} value={t} className="bg-deep">
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-fog" aria-hidden="true" />
                </span>
              </label>
              <label className="sm:col-span-2">
                <span className={label}>{enquiry.labels.details}</span>
                <textarea name="details" rows={4} placeholder={enquiry.placeholders.details} className="field resize-y" />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-gold">
                  {enquiry.submit}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
