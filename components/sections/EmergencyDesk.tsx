import { Phone } from "lucide-react";
import { AccentTitle } from "@/components/ui";
import { contact, emergencyDesk } from "@/lib/content";

/** Emergency desk call-out: one line of reassurance and the duty number. */
export function EmergencyDesk() {
  return (
    <section
      aria-labelledby="emergency-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#023441_0%,#03293a_100%)] py-24 text-center lg:py-32"
    >
      {/* lighthouse glow and slow swells */}
      <span aria-hidden="true" className="absolute left-1/2 top-0 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-20 overflow-hidden opacity-30">
        <svg viewBox="0 0 800 80" preserveAspectRatio="none" className="absolute bottom-4 h-10 w-[200%] animate-[wave-drift_20s_linear_infinite]" fill="none">
          <path d="M0 40 Q100 10 200 40 T400 40 T600 40 T800 40" stroke="#e9c46a" strokeWidth="2" />
        </svg>
        <svg viewBox="0 0 800 80" preserveAspectRatio="none" className="absolute bottom-0 h-10 w-[200%] animate-[wave-drift_14s_linear_infinite_reverse]" fill="none">
          <path d="M0 40 Q100 70 200 40 T400 40 T600 40 T800 40" stroke="#3cc8b9" strokeWidth="2" />
        </svg>
      </div>

      <div className="container-site">
        <p data-reveal className="eyebrow justify-center">
          {emergencyDesk.eyebrow}
        </p>
        <h2 id="emergency-heading" data-split className="mx-auto mt-6 max-w-3xl text-[2.5rem] sm:text-6xl lg:text-7xl">
          <AccentTitle before={`${emergencyDesk.title.before} `} accent={emergencyDesk.title.accent} />
        </h2>
        <div data-reveal className="mt-10 flex flex-col items-center gap-4">
          <a href={contact.emergencyPhoneHref} className="btn btn-gold btn-caps">
            <Phone className="size-4" aria-hidden="true" />
            {emergencyDesk.cta}
          </a>
          <p className="text-xs text-haze">
            Emergency (Only) 24hr phone{" "}
            <a href={contact.emergencyPhoneHref} className="text-foam hover:text-gold">
              {contact.emergencyPhone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
