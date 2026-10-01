"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToTarget } from "@/lib/lenis";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-gold text-abyss shadow-float transition-all duration-300 hover:bg-foam sm:bottom-8 sm:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="size-5" strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}
