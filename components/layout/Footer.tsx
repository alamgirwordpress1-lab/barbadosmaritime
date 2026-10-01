import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock, Mail, MapPin, Phone, Siren } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { BarbadosFlag, LinkedInIcon } from "@/components/icons";
import { StayConnected } from "@/components/sections/StayConnected";
import { contact, credentials, footer } from "@/lib/content";
import { BackToTop } from "./BackToTop";

const heading = "font-sans text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-fog";

type RowIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;

/** Contact line with its icon in a small ring. */
function ContactRow({ icon: Icon, gold = false, children }: { icon: RowIcon; gold?: boolean; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3.5">
      <span
        className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border ${
          gold ? "border-gold/30 bg-gold/10 text-gold" : "border-white/10 bg-white/[0.03] text-ocean"
        }`}
      >
        <Icon className="size-3.5" aria-hidden="true" />
      </span>
      <span className="min-w-0 pt-1 leading-6 text-balance">{children}</span>
    </li>
  );
}

// Credentials shown as badges in the footer (from the homepage copy).
const badges = credentials.filter((c) => /ISO|Paris|QUALSHIP/.test(c));

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-deep text-sm text-haze">
      {/* horizon line and a low glow under the sign-up card */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ocean/40 to-transparent" />
      <span aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-80 w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean/10 blur-3xl" />

      <div className="container-site pt-16 lg:pt-20">
        <StayConnected />
      </div>

      <div
        data-stagger
        className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:py-20 xl:grid-cols-[1.15fr_0.75fr_1.35fr_1.25fr]"
      >
        {/* Brand */}
        <div>
          <Image
            src="/images/bmsr-logo-white.png"
            alt="Barbados Maritime Ship Registry"
            width={981}
            height={358}
            className="h-12 w-auto"
          />
          <p className="mt-6 max-w-xs leading-6">{footer.blurb}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {badges.map((b) => (
              <li
                key={b}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-haze"
              >
                <BadgeCheck className="size-3.5 text-gold" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex items-center gap-3">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Barbados Maritime Ship Registry on LinkedIn"
              className="grid size-10 place-items-center rounded-full border border-white/10 text-foam transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2]"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <span className="grid size-10 place-items-center rounded-full border border-white/10">
              <BarbadosFlag className="h-3.5 w-auto rounded-[2px]" />
            </span>
          </div>
        </div>

        {/* Links */}
        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className={heading}>
            {footer.linksHeading}
          </h2>
          <ul className="mt-6 space-y-3">
            {footer.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="group inline-flex items-center transition-colors duration-300 hover:text-foam">
                  <span
                    aria-hidden="true"
                    className="mr-0 h-px w-0 bg-gradient-to-r from-ocean to-gold transition-[width,margin] duration-500 ease-[var(--ease-out-expo)] group-hover:mr-2 group-hover:w-4"
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className={heading}>{footer.contactHeading}</h2>
          <ul className="mt-6 space-y-4">
            <ContactRow icon={MapPin}>
              <address className="not-italic">
                {contact.address.map((line, i) => (
                  <span key={line} className={`block ${i === 0 ? "text-foam" : ""}`}>
                    {line}
                  </span>
                ))}
              </address>
            </ContactRow>
            <ContactRow icon={Clock}>{contact.openingHours}</ContactRow>
            <ContactRow icon={Phone}>
              <a href={contact.phoneHref} className="text-foam transition-colors hover:text-ocean">
                {contact.phone}
              </a>
            </ContactRow>
            <ContactRow icon={Siren} gold>
              Emergency (Only) 24hr phone{" "}
              <a href={contact.emergencyPhoneHref} className="whitespace-nowrap text-foam transition-colors hover:text-gold">
                {contact.emergencyPhone}
              </a>
            </ContactRow>
            <ContactRow icon={Mail}>
              <a href={`mailto:${contact.email}`} className="break-all text-foam transition-colors hover:text-ocean">
                {contact.email}
              </a>
            </ContactRow>
            <ContactRow icon={LinkedInIcon}>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-foam transition-colors hover:text-ocean">
                Linkedin
              </a>
            </ContactRow>
          </ul>
        </div>

        {/* Office */}
        <div>
          <h2 className={heading}>{footer.officeHeading}</h2>
          <div className="group mt-6 overflow-hidden rounded-2xl border border-white/10 bg-abyss/50 transition-colors duration-500 hover:border-ocean/30">
            <div className="relative">
              <iframe
                title="Map of the London office, 1 Great Russell Street"
                src={contact.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="allow-pointer block h-52 w-full border-0 opacity-75 grayscale invert-[0.9] hue-rotate-180 transition-opacity duration-500 group-hover:opacity-100"
              />
              {/* the office, marked with a ocean signal */}
              <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-ocean/50" />
                <span className="relative size-2.5 rounded-full bg-ocean ring-4 ring-ocean/25" />
              </span>
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-abyss/80 to-transparent" />
            </div>
            <a
              href={footer.mapLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-4 transition-colors hover:bg-white/[0.03]"
            >
              <span className="leading-6">
                <span className="block text-foam">{contact.address[2]}</span>
                <span className="text-xs text-fog">{contact.address[3]}</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-ocean">
                {footer.mapLink.label}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="container-site">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-rule py-7 text-center text-xs sm:pr-16 md:flex-row md:text-left min-[1600px]:pr-0">
          <p>
            Copyright © {footer.copyrightYear}{" "}
            <Link href="/" className="transition-colors hover:text-foam">
              Barbados Maritime Ship Registry
            </Link>{" "}
            All Rights Reserved ·{" "}
            <a href={footer.privacy.href} className="transition-colors hover:text-foam">
              {footer.privacy.label}
            </a>
          </p>
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-fog">{footer.tagline}</p>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
