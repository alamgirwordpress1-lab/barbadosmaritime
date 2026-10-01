import { Clock, Phone, Siren } from "lucide-react";
import { contact, notice } from "@/lib/content";

/** One slim bar above the header: the live notice on the left, hours and phone lines on the right. */
export function UtilityBar() {
  return (
    <div className="relative border-b border-rule bg-abyss text-xs text-white">
      <div className="flex min-h-10 items-center justify-between gap-6 px-5 py-2 sm:px-8 2xl:px-14">
        <p className="flex min-w-0 items-center gap-2.5">
          <span className="relative flex size-1.5 shrink-0" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />
            <span className="relative size-1.5 rounded-full bg-gold" />
          </span>
          <span>
            {notice.lead} |{" "}
            <a
              href={notice.href}
              className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
            >
              {notice.linkText}
            </a>
          </span>
        </p>

        <ul className="hidden shrink-0 items-center gap-5 lg:flex">
          <li className="flex items-center gap-2">
            <Clock className="size-3.5" aria-hidden="true" />
            {contact.openingHours}
          </li>
          <li aria-hidden="true" className="h-3 w-px bg-rule" />
          <li>
            <a href={contact.phoneHref} className="flex items-center gap-2 underline-offset-4 hover:underline">
              <Phone className="size-3.5" aria-hidden="true" />
              {contact.phone}
            </a>
          </li>
          <li aria-hidden="true" className="h-3 w-px bg-rule" />
          <li className="flex items-center gap-2">
            <Siren className="size-3.5" aria-hidden="true" />
            Emergency (Only) 24hr phone
            <a href={contact.emergencyPhoneHref} className="whitespace-nowrap font-semibold text-white underline-offset-4 hover:underline">
              {contact.emergencyPhone}
            </a>
          </li>
        </ul>

        {/* Small screens: one tap to the emergency line (hours and office number are in the menu) */}
        <a
          href={contact.emergencyPhoneHref}
          aria-label={`Emergency (Only) 24hr phone ${contact.emergencyPhone}`}
          className="grid size-7 shrink-0 place-items-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-abyss lg:hidden"
        >
          <Siren className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
