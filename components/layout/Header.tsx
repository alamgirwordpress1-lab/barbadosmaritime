"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Clock, Menu, Phone, Search, Siren, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BarbadosFlag } from "@/components/icons";
import { getLenis } from "@/lib/lenis";
import { contact, headerCta, mainNav } from "@/lib/content";

const ACTIVE = 0; // Home

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const navList = useRef<HTMLUListElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);

  // Floating glass bar once the page moves; slides away on the way down, back on the way up.
  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 640);
        lastY = y;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Sliding highlight: sits on the current page, follows the pointer or keyboard focus.
  useLayoutEffect(() => {
    const list = navList.current;
    const pill = indicator.current;
    if (!list || !pill) return;
    const place = () => {
      const item = list.children[(hover ?? ACTIVE) + 1] as HTMLElement | undefined; // +1 skips the indicator itself
      if (!item) return;
      pill.style.width = `${item.offsetWidth}px`;
      pill.style.transform = `translateX(${item.offsetLeft}px)`;
    };
    place();
    const ro = new ResizeObserver(place); // fonts loading change the widths
    ro.observe(list);
    return () => ro.disconnect();
  }, [hover]);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  const floating = scrolled || searchOpen;
  const tucked = hidden && !searchOpen && !menuOpen;

  return (
    <>
      <header
        className={`pointer-events-none sticky top-0 z-50 -mb-20 flex h-20 items-start transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          tucked ? "-translate-y-[120%]" : "translate-y-0"
        }`}
      >
        <div
          className={`pointer-events-auto relative mx-auto flex items-center justify-between gap-4 border 2xl:gap-6 transition-[width,max-width,height,margin,padding,border-radius,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] ${
            floating
              ? "mt-3 h-16 w-[calc(100%-1.5rem)] max-w-[88rem] rounded-2xl border-white/10 bg-abyss/75 px-4 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.85)] backdrop-blur-xl sm:px-5"
              : "mt-0 h-20 w-full max-w-[200rem] rounded-none border-transparent bg-gradient-to-b from-abyss/70 to-transparent px-5 sm:px-8 2xl:px-14"
          }`}
        >
          <Link href="/" className="shrink-0" aria-label="Barbados Maritime Ship Registry – home">
            <Image
              src="/images/bmsr-logo-white.png"
              alt="Barbados Maritime Ship Registry"
              width={981}
              height={358}
              preload
              className={`w-auto transition-[height] duration-500 ${floating ? "h-9" : "h-11"}`}
            />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul
              ref={navList}
              onMouseLeave={() => setHover(null)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setHover(null);
              }}
              className={`relative flex items-center rounded-full border p-1 transition-colors duration-500 ${
                floating ? "border-transparent bg-transparent" : "border-white/10 bg-white/[0.04] backdrop-blur-md"
              }`}
            >
              <span
                ref={indicator}
                aria-hidden="true"
                className="absolute inset-y-1 left-0 rounded-full bg-white/10 ring-1 ring-inset ring-white/10 transition-[transform,width] duration-500 ease-[var(--ease-out-expo)]"
              />
              {mainNav.map((item, i) => (
                <li key={item.label} className="group relative" onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}>
                  <a
                    href={item.href}
                    aria-current={i === ACTIVE ? "page" : undefined}
                    className={`relative flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300 2xl:px-3.5 ${
                      i === ACTIVE || hover === i ? "text-foam" : "text-haze"
                    }`}
                  >
                    {i === ACTIVE && <span aria-hidden="true" className="mr-1 size-1.5 rounded-full bg-ocean shadow-[0_0_8px_rgb(61_124_200/0.9)]" />}
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className="size-3 opacity-60 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden="true"
                      />
                    )}
                  </a>

                  {item.children && (
                    <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {/* caret */}
                      <span aria-hidden="true" className="absolute left-1/2 top-[0.6rem] size-3 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-harbor" />
                      <div className="relative min-w-64 overflow-hidden rounded-2xl border border-white/10 bg-harbor/95 p-2 shadow-float backdrop-blur-xl">
                        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ocean/70 to-transparent" />
                        <p className="px-3 pb-1.5 pt-2 text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-fog">{item.label}</p>
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="group/item flex items-center justify-between gap-6 rounded-xl px-3 py-2.5 text-[0.8125rem] text-haze transition-colors duration-300 hover:bg-white/[0.06] hover:text-foam"
                              >
                                <span className="flex items-center gap-2.5">
                                  <span aria-hidden="true" className="size-1 rounded-full bg-fog transition-colors group-hover/item:bg-ocean" />
                                  {child.label}
                                </span>
                                <ArrowUpRight
                                  className="size-3.5 -translate-x-1 text-ocean opacity-0 transition-[opacity,translate] duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                  aria-hidden="true"
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-expanded={searchOpen}
              aria-controls="site-search"
              aria-label={searchOpen ? "Close search" : "Search the site"}
              className="grid size-10 place-items-center rounded-full border border-white/10 text-haze transition-colors hover:border-white/25 hover:bg-white/10 hover:text-foam"
            >
              {searchOpen ? <X className="size-4" aria-hidden="true" /> : <Search className="size-4" aria-hidden="true" />}
            </button>
            <span className="hidden size-10 place-items-center rounded-full border border-white/10 2xl:grid">
              <BarbadosFlag className="h-3.5 w-auto rounded-[2px]" />
            </span>
            <a href={headerCta.href} className="btn btn-gold btn-caps btn-shine ml-1 hidden min-h-10 whitespace-nowrap px-5 sm:inline-flex">
              {headerCta.label}
              <ArrowRight className="size-3.5 xl:max-2xl:hidden" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full border border-white/10 text-foam transition-colors hover:bg-white/10 xl:hidden"
            >
              <Menu className="size-[1.125rem]" aria-hidden="true" />
            </button>
          </div>

          {/* Search: a glass panel dropping from the bar */}
          <div
            id="site-search"
            hidden={!searchOpen}
            className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-abyss/90 shadow-float backdrop-blur-xl"
          >
            <form action="/" method="get" role="search" className="flex items-center gap-4 px-5 py-4 sm:px-6">
              <label htmlFor="site-search-input" className="sr-only">
                Search
              </label>
              <Search className="size-5 shrink-0 text-ocean" aria-hidden="true" />
              <input
                ref={searchInput}
                id="site-search-input"
                name="s"
                type="search"
                placeholder="Search the registry…"
                className="h-12 w-full bg-transparent font-display text-2xl text-foam outline-none placeholder:text-fog sm:text-3xl"
              />
              <kbd className="hidden rounded-md border border-white/15 px-2 py-1 text-[0.625rem] font-semibold text-fog sm:block">ESC</kbd>
              <button type="submit" className="btn btn-gold shrink-0">
                Search
              </button>
            </form>
          </div>

          {/* Reading progress along the bar's lower edge */}
          <span
            aria-hidden="true"
            className={`absolute bottom-0 h-px overflow-hidden transition-[left,right,opacity] duration-500 ${
              floating ? "left-6 right-6 opacity-100" : "left-0 right-0 opacity-0"
            }`}
          >
            <span ref={progress} style={{ transform: "scaleX(0)" }} className="block h-full origin-left bg-gradient-to-r from-ocean to-gold" />
          </span>
        </div>
      </header>

      {/* Mobile menu: kept outside <header> so it always covers the viewport. */}
      <div className={`fixed inset-0 z-[60] xl:hidden ${menuOpen ? "" : "pointer-events-none"}`} aria-hidden={!menuOpen}>
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-abyss/70 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          inert={!menuOpen}
          data-lenis-prevent
          className={`absolute inset-y-0 right-0 flex w-[min(24rem,88vw)] flex-col border-l border-rule bg-deep shadow-float transition-transform duration-500 ease-[var(--ease-out-expo)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-rule px-5 py-4">
            <Image src="/images/bmsr-logo-white.png" alt="" width={981} height={358} className="h-10 w-auto" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-rule text-foam hover:bg-white/10"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto py-2">
            <ul>
              {mainNav.map((item, i) => (
                <li
                  key={item.label}
                  style={{ transitionDelay: menuOpen ? `${100 + i * 40}ms` : "0ms" }}
                  className={`border-b border-rule transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)] ${
                    menuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  }`}
                >
                  {item.children ? (
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 font-display text-xl text-foam [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <ChevronDown className="size-4 text-fog transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <ul className="bg-abyss/60 py-1">
                        {[{ label: item.label, href: item.href }, ...item.children].map((child) => (
                          <li key={child.label}>
                            <a href={child.href} className="block px-7 py-2.5 text-sm text-haze hover:text-foam">
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <a
                      href={item.href}
                      aria-current={i === ACTIVE ? "page" : undefined}
                      className={`block px-5 py-3.5 font-display text-xl ${i === ACTIVE ? "text-ocean" : "text-foam hover:text-ocean"}`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-4 border-t border-rule p-5">
            <a href={headerCta.href} onClick={() => setMenuOpen(false)} className="btn btn-gold w-full">
              {headerCta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <ul className="space-y-2 text-xs text-haze">
              <li className="flex items-center gap-2.5">
                <Clock className="size-3.5 text-ocean" aria-hidden="true" />
                {contact.openingHours}
              </li>
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-2.5 hover:text-foam">
                  <Phone className="size-3.5 text-ocean" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emergencyPhoneHref} className="flex items-start gap-2.5 hover:text-foam">
                  <Siren className="mt-px size-3.5 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    Emergency (Only) 24hr phone <span className="whitespace-nowrap text-foam">{contact.emergencyPhone}</span>
                  </span>
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3 border-t border-rule pt-4">
              <BarbadosFlag className="h-5 w-auto rounded-[2px]" />
              <span className="text-xs text-fog">Barbados Maritime Ship Registry</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
