"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

declare global {
  interface Window {
    __bmsrMotion?: boolean;
  }
}

/**
 * Declarative scroll animations. Sections opt in with data attributes:
 *
 *   data-reveal          fade + rise when scrolled into view
 *   data-stagger         children fade + rise one after another
 *   data-split           heading revealed line by line behind a mask
 *   data-clip            image wipes up into view (inner [data-clip-img] settles from a zoom)
 *   data-parallax="12"   element drifts vertically by ±n% while its parent crosses the screen
 *   data-count="293"     number counts up from zero
 *   data-frame-reveal    photo opens from a rounded inset frame to full bleed as you scroll, while the
 *                        inner [data-frame-img] zooms out; [data-frame-shine] sweeps across once
 *
 * Initial hidden states live in globals.css under `html.motion`, which the inline
 * script in layout.tsx only sets when the visitor has not asked for reduced motion.
 */
export function ScrollEffects() {
  useGSAP(() => {
    window.__bmsrMotion = true;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Positions are measured with the start offset applied, so trigger a little low in the viewport.
      const once = (trigger: Element, start = "top 96%") => ({ trigger, start, once: true });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 48 },
          { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out", scrollTrigger: once(el) },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.12, scrollTrigger: once(el, "top 94%") },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.25,
              ease: "expo.out",
              stagger: 0.1,
              scrollTrigger: once(el, "top 88%"),
            });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: once(el, "top 85%") });
        tl.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
        );
        const img = el.querySelector("[data-clip-img]");
        if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.2);
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 10;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const counter = { value: 0 };
        el.textContent = "0";
        gsap.to(counter, {
          value: target,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: once(el, "top 90%"),
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-frame-reveal]").forEach((frame) => {
        const img = frame.querySelector("[data-frame-img]");
        const shine = frame.querySelector("[data-frame-shine]");
        gsap
          .timeline({
            scrollTrigger: { trigger: frame, start: "top bottom", end: "center 58%", scrub: 1 },
          })
          .fromTo(
            frame,
            { clipPath: "inset(10% 8% 10% 8% round 28px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.out" },
            0,
          )
          .fromTo(img, { scale: 1.4 }, { scale: 1.06, ease: "power2.out" }, 0);
        // Keep drifting gently once open.
        gsap.to(img, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "center 58%", end: "bottom top", scrub: true },
        });
        if (shine) {
          gsap.fromTo(
            shine,
            { xPercent: 0, autoAlpha: 1 },
            {
              xPercent: 520,
              duration: 1.6,
              ease: "power2.inOut",
              scrollTrigger: { trigger: frame, start: "center 58%", toggleActions: "play none none reset" },
            },
          );
        }
      });

      // Images and fonts change layout after first paint.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh, { once: true });
    });

    return () => mm.revert();
  });

  return null;
}
