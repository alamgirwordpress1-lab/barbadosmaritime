"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BarbadosFlag } from "@/components/icons";
import { getLenis } from "@/lib/lenis";
import { mainNav } from "@/lib/content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  // Shadow once the page moves, plus a thin reading-progress line.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
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

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-white transition-shadow duration-300 ${
          scrolled ? "border-transparent shadow-[0_10px_30px_-18px_rgb(26_26_26/0.4)]" : "border-line"
        }`}
      >
        <div className="container-full flex h-20 items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label="Barbados Maritime Ship Registry – home">
            <Image
              src="/images/bmsr-logo.png"
              alt="Barbados Maritime Ship Registry"
              width={981}
              height={358}
              preload
              className="h-12 w-auto"
            />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item, i) => (
                <li key={item.label} className="group relative">
                  <a
                    href={item.href}
                    aria-current={i === 0 ? "page" : undefined}
                    className={`relative flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[0.875rem] font-semibold transition-colors duration-300 ${
                      i === 0 ? "text-brand-blue" : "text-ink/75 hover:text-brand-blue"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className="size-3 opacity-60 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-[1.4rem] h-[2px] origin-left bg-brand-blue transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${
                        i === 0 ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                  {item.children && (
                    <div className="invisible absolute left-0 top-full z-10 translate-y-2 pt-5 opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <ul className="min-w-56 border border-line border-t-2 border-t-brand-blue bg-white py-2 shadow-card">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              className="block px-5 py-2.5 text-[0.875rem] font-semibold text-ink/80 transition-[color,background-color,padding] duration-300 hover:bg-mist hover:pl-6 hover:text-brand-blue"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-expanded={searchOpen}
              aria-controls="site-search"
              aria-label={searchOpen ? "Close search" : "Search the site"}
              className="grid size-11 place-items-center text-ink transition-colors hover:text-brand-blue"
            >
              {searchOpen ? <X className="size-5" aria-hidden="true" /> : <Search className="size-5" aria-hidden="true" />}
            </button>
            <BarbadosFlag className="hidden h-8 w-auto rounded-[2px] sm:block" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-[2px] bg-brand-blue text-white transition-colors hover:bg-brand-blue-deep xl:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Search drawer */}
        <div id="site-search" hidden={!searchOpen} className="border-t border-line bg-white">
          <form action="/" method="get" role="search" className="container-full flex items-center gap-3 py-4">
            <label htmlFor="site-search-input" className="sr-only">
              Search
            </label>
            <Search className="size-5 shrink-0 text-body" aria-hidden="true" />
            <input
              ref={searchInput}
              id="site-search-input"
              name="s"
              type="search"
              placeholder="Search"
              className="h-12 w-full bg-transparent font-display text-lg font-semibold text-ink outline-none placeholder:text-body/60"
            />
            <button type="submit" className="btn btn-blue shrink-0">
              Search
            </button>
          </form>
        </div>

        {/* Reading progress */}
        <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[2px] overflow-hidden">
          <span ref={progress} style={{ transform: "scaleX(0)" }} className="block h-full origin-left bg-brand-yellow" />
        </span>
      </header>

      {/* Mobile menu: kept outside <header> so it always covers the viewport. */}
      <div className={`fixed inset-0 z-[60] xl:hidden ${menuOpen ? "" : "pointer-events-none"}`} aria-hidden={!menuOpen}>
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-night/60 transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          inert={!menuOpen}
          data-lenis-prevent
          className={`absolute inset-y-0 right-0 flex w-[min(24rem,88vw)] flex-col bg-white shadow-float transition-transform duration-500 ease-[var(--ease-out-expo)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Image src="/images/bmsr-logo.png" alt="" width={981} height={358} className="h-10 w-auto" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid size-11 place-items-center bg-mist text-ink hover:text-brand-blue"
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
                  className={`border-b border-line transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)] ${
                    menuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  }`}
                >
                  {item.children ? (
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 font-display text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <ul className="bg-mist py-1">
                        {[{ label: item.label, href: item.href }, ...item.children].map((child) => (
                          <li key={child.label}>
                            <a href={child.href} className="block px-7 py-2.5 font-semibold text-ink/80 hover:text-brand-blue">
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <a
                      href={item.href}
                      aria-current={i === 0 ? "page" : undefined}
                      className={`block px-5 py-3.5 font-display text-base font-bold ${i === 0 ? "text-brand-blue" : "text-ink hover:text-brand-blue"}`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3 border-t border-line px-5 py-4">
            <BarbadosFlag className="h-7 w-auto rounded-[2px]" />
            <span className="font-display text-sm font-bold text-ink">Barbados Maritime Ship Registry</span>
          </div>
        </div>
      </div>
    </>
  );
}
