import { Clock, Phone, Siren } from "lucide-react";
import { contact, notice } from "@/lib/content";

/** One slim bar above the header: the live notice on the left, hours and phone lines on the right. */
export function UtilityBar() {
  return (
    <div className="relative border-b border-rule bg-abyss text-xs text-fog">
      <div className="flex min-h-10 items-center justify-between gap-6 px-5 py-2 sm:px-8 2xl:px-14">
        <p className="flex min-w-0 items-center gap-2.5">
          <span className="relative flex size-1.5 shrink-0" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />
            <span className="relative size-1.5 rounded-full bg-gold" />
          </span>
          <span className="text-haze">
            {notice.lead} |{" "}
            <a
              href={notice.href}
              className="text-teal underline decoration-teal/30 underline-offset-4 transition-colors hover:text-foam"
            >
              {notice.linkText}
            </a>
          </span>
        </p>

        <ul className="hidden shrink-0 items-center gap-5 lg:flex">
          <li className="flex items-center gap-2">
            <Clock className="size-3.5 text-teal" aria-hidden="true" />
            {contact.openingHours}
          </li>
          <li aria-hidden="true" className="h-3 w-px bg-rule" />
          <li>
            <a href={contact.phoneHref} className="flex items-center gap-2 transition-colors hover:text-foam">
              <Phone className="size-3.5 text-teal" aria-hidden="true" />
              {contact.phone}
            </a>
          </li>
          <li aria-hidden="true" className="h-3 w-px bg-rule" />
          <li className="flex items-center gap-2">
            <Siren className="size-3.5 text-gold" aria-hidden="true" />
            Emergency (Only) 24hr phone
            <a href={contact.emergencyPhoneHref} className="whitespace-nowrap font-semibold text-foam transition-colors hover:text-gold">
              {contact.emergencyPhone}
            </a>
          </li>
        </ul>

        {/* Small screens: one tap to the emergency line (hours and office number are in the menu) */}
        <a
          href={contact.emergencyPhoneHref}
          aria-label={`Emergency (Only) 24hr phone ${contact.emergencyPhone}`}
          className="grid size-7 shrink-0 place-items-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-abyss lg:hidden"
        >
          <Siren className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
