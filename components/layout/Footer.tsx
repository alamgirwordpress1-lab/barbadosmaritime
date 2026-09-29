import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";
import { contact, footer } from "@/lib/content";
import { BackToTop } from "./BackToTop";

const heading = "font-display text-sm font-bold uppercase text-brand-yellow";

export function Footer() {
  return (
    <footer className="bg-night text-[0.9375rem] text-white/65">
      <div data-stagger className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_1.1fr] lg:gap-16">
        {/* Contact */}
        <div>
          <Image
            src="/images/bmsr-logo-white.png"
            alt="Barbados Maritime Ship Registry"
            width={981}
            height={358}
            className="h-14 w-auto"
          />
          <h2 className={`mt-10 ${heading}`}>{footer.contactHeading}</h2>
          <address className="mt-5 not-italic leading-7">
            {contact.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <ul className="mt-5 space-y-2 text-white">
            <li>
              <a href={contact.phoneHref} className="inline-flex items-center gap-3 transition-colors hover:text-brand-yellow">
                <Phone className="size-4 text-brand-yellow" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 break-all transition-colors hover:text-brand-yellow">
                <Mail className="size-4 shrink-0 text-brand-yellow" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-brand-yellow"
              >
                <LinkedInIcon className="size-4 text-brand-yellow" />
                Linkedin
              </a>
            </li>
          </ul>
        </div>

        {/* Links */}
        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className={heading}>
            {footer.linksHeading}
          </h2>
          <ul className="mt-5 space-y-2">
            {footer.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-block transition-[color,translate] duration-300 hover:translate-x-1 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Office */}
        <div>
          <h2 className={heading}>{footer.officeHeading}</h2>
          <div className="mt-5 border border-white/10 bg-white/[0.04]">
            <iframe
              title="Map of the London office, 1 Great Russell Street"
              src={contact.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="allow-pointer block h-44 w-full border-0 opacity-80 grayscale transition-[filter,opacity] duration-500 hover:opacity-100 hover:grayscale-0"
            />
            <div className="flex items-start gap-3 px-5 py-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-yellow" aria-hidden="true" />
              <p className="text-sm leading-6">
                <span className="block font-bold text-white">{contact.address[2]}</span>
                {contact.address[3]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-center text-[0.8125rem] sm:pr-16 md:flex-row min-[1600px]:pr-0 md:text-left">
          <p>
            Copyright © {footer.copyrightYear}{" "}
            <Link href="/" className="transition-colors hover:text-white">
              Barbados Maritime Ship Registry
            </Link>{" "}
            All Rights Reserved
          </p>
          <a href={footer.privacy.href} className="transition-colors hover:text-white">
            {footer.privacy.label}
          </a>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
