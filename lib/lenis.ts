import type Lenis from "lenis";

// Single Lenis instance shared by the header, back-to-top button and menus.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

/** Scroll to a position or element, smoothly when Lenis is running. */
export function scrollToTarget(target: number | string | HTMLElement) {
  if (instance) {
    instance.scrollTo(target, { offset: typeof target === "number" ? 0 : -96 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target });
  else (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView();
}
