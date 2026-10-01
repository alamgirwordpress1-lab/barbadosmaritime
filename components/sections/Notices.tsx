import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";
import { contact, guidance, labels, linkedinFollow, notices, pressStatement } from "@/lib/content";

type Row = { tag: string; title: string; link: { label: string; href: string; external?: boolean } };

/** Press statement, Strait of Hormuz guidance, the two bulletins and LinkedIn as a registrar's notice list. */
export function Notices() {
  const rows: Row[] = [
    { tag: labels.press, title: pressStatement.title, link: { label: pressStatement.linkText, href: pressStatement.href } },
    { tag: labels.guidance, title: guidance.heading, link: guidance.cta },
    ...guidance.bulletins.map((b) => ({
      tag: b.title.match(/Bulletin \d+/)?.[0] ?? "Bulletin",
      title: b.title,
      link: { label: b.linkText, href: b.href },
    })),
  ];

  return (
    <section id="notices" aria-labelledby="notices-heading" className="bg-abyss py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p data-reveal className="eyebrow">
              {notices.eyebrow}
            </p>
            <h2 id="notices-heading" data-split className="mt-5 text-[2.25rem] sm:text-5xl">
              {notices.heading}
            </h2>
          </div>
          <a data-reveal href={notices.viewAll.href} className="link-arrow">
            {notices.viewAll.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <ul data-stagger className="mt-12 border-t border-rule">
          {rows.map((row) => (
            <li key={row.title} className="border-b border-rule">
              <a
                href={row.link.href}
                className="group grid gap-2 px-1 py-6 transition-colors duration-500 hover:bg-white/[0.025] sm:px-4 md:grid-cols-[11rem_1fr_auto] md:items-center md:gap-8"
              >
                <span className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-fog">{row.tag}</span>
                <span className="text-[1.0625rem] font-medium leading-snug text-foam transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5">
                  {row.title}
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold text-haze transition-colors group-hover:text-ocean">
                  {row.link.label}
                  <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
          {/* LinkedIn, set apart as the channel for updates */}
          <li className="border-b border-rule">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-2 px-1 py-6 transition-colors duration-500 hover:bg-[#0a66c2]/10 sm:px-4 md:grid-cols-[11rem_1fr_auto] md:items-center md:gap-8"
            >
              <span className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-fog">
                <LinkedInIcon className="size-3.5 text-[#4ea1f3]" />
                Linkedin
              </span>
              <span className="text-[1.0625rem] font-medium leading-snug text-foam transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5">
                {linkedinFollow.heading}
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-haze transition-colors group-hover:text-[#4ea1f3]">
                {linkedinFollow.cta}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
