import { contact, notice } from "@/lib/content";

export function TopBar() {
  return (
    <div className="bg-brand-blue text-[0.8125rem] leading-snug text-white">
      <div className="container-full flex flex-col items-center gap-1 py-2 text-center md:flex-row md:justify-between md:gap-6 md:text-left">
        <p>{contact.openingHours}</p>
        <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-0.5 font-semibold">
          <a href={contact.phoneHref} className="hover:underline">
            {contact.phone}
          </a>
          <span>
            Emergency (Only) 24hr phone{" "}
            <a href={contact.emergencyPhoneHref} className="whitespace-nowrap hover:underline">
              {contact.emergencyPhone}
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}

export function NoticeBar() {
  return (
    <div className="bg-brand-yellow text-[0.75rem] font-bold leading-snug text-ink">
      <p className="container-full py-2.5 text-center">
        {notice.lead} |{" "}
        <a href={notice.href} className="underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-ink">
          {notice.linkText}
        </a>
      </p>
    </div>
  );
}
