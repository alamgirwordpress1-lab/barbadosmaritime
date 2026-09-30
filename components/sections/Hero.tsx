"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, useRef, useState, type PointerEvent } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { heroSlides } from "@/lib/content";
import { WaveField } from "@/components/motion/WaveField";
import { HeroPanel } from "./HeroPanel";

const SLIDE_SECONDS = 6.5;

const TEAL = [0x3c, 0xc8, 0xb9];
const GOLD = [0xe9, 0xc4, 0x6a];
const mix = (t: number) => `rgb(${TEAL.map((c, i) => Math.round(c + (GOLD[i] - c) * t)).join(" ")})`;

/**
 * Headline split into masked words so each word can rise into view. The accent line is
 * italic and shaded word by word from teal to gold (a gradient per line would not survive
 * the per-word masks).
 */
function MaskedWords({ lines, accent }: { lines: string[]; accent?: number }) {
  return lines.map((line, li) => {
    const words = line.split(" ");
    const isAccent = li === accent;
    return (
      <span key={li} className={`block ${isAccent ? "italic" : ""}`}>
        {words.map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 && " "}
            <span className={`-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-top ${isAccent ? "pr-[0.08em]" : ""}`}>
              <span
                data-word
                className="inline-block will-change-transform"
                style={isAccent ? { color: mix(words.length > 1 ? wi / (words.length - 1) : 0) } : undefined}
              >
                {word}
              </span>
            </span>
          </Fragment>
        ))}
      </span>
    );
  });
}

function SlideArrows({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const cls =
    "grid size-11 place-items-center rounded-full border border-white/25 text-foam transition-colors hover:border-teal hover:bg-teal hover:text-abyss";
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={onPrev} aria-label="Previous slide" className={cls}>
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button type="button" onClick={onNext} aria-label="Next slide" className={cls}>
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}

type SliderApi = {
  go: (to: number, dir: 1 | -1) => void;
  pause: () => void;
  resume: () => void;
  index: () => number;
};

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const api = useRef<SliderApi | null>(null);
  const pointerX = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const count = heroSlides.length;

  // The slider engine lives inside the GSAP context so every tween is cleaned up on unmount.
  useGSAP(
    (_context, contextSafe) => {
      const safe = contextSafe!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = gsap.utils.selector(root);
      const layers = q("[data-slide-layer]");
      const imgs = q("[data-slide-img]");
      const videos = layers.map((layer) => layer.querySelector("video"));
      videos.forEach((v) => v && (v.muted = true)); // autoplay needs muted; React doesn't reliably set it
      const play = (i: number, restart = false) => {
        const v = videos[i];
        if (!v || reduce) return;
        if (restart) v.currentTime = 0;
        v.play().catch(() => {});
      };
      const texts = q("[data-slide-text]");
      const allFills = q("[data-tab-fill]");
      const fills = (i: number) => q(`[data-tab-fill="${i}"]`);

      let index = 0;
      let tl: gsap.core.Timeline | null = null;
      let progress: gsap.core.Tween | null = null;
      let kenBurns: gsap.core.Tween | null = null;

      gsap.set(layers, { autoAlpha: 0, zIndex: 0 });
      gsap.set(layers[0], { autoAlpha: 1, zIndex: 2, clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(texts, { autoAlpha: 0 });
      gsap.set(texts[0], { autoAlpha: 1 });

      // Slow zoom on the photo plus the autoplay clock drawn in the active tab.
      function startSlide(i: number) {
        kenBurns?.kill();
        progress?.kill();
        if (reduce) return;
        kenBurns = gsap.to(imgs[i], { scale: 1, duration: SLIDE_SECONDS + 1.5, ease: "none" });
        progress = gsap.fromTo(
          fills(i),
          { scaleX: 0 },
          { scaleX: 1, duration: SLIDE_SECONDS, ease: "none", onComplete: () => api.current?.go((i + 1) % count, 1) },
        );
      }

      function go(to: number, dir: 1 | -1) {
        if (to === index) return;
        tl?.progress(1); // finish any running transition instantly
        const from = index;
        index = to;
        setActive(to);
        progress?.kill();
        kenBurns?.kill();
        const d = reduce ? 0 : 1;

        gsap.set(allFills, { scaleX: 0 });
        if (reduce) gsap.set(fills(to), { scaleX: 1 });
        gsap.set(layers[from], { zIndex: 1 });
        play(to, true);

        tl = gsap
          .timeline({
            onComplete: () => {
              gsap.set(layers[from], { autoAlpha: 0, zIndex: 0 });
              gsap.set(imgs[from], { xPercent: 0 });
              videos[from]?.pause();
              startSlide(to);
            },
          })
          // New photo wipes across while zooming out; the old one is pushed away.
          .fromTo(
            layers[to],
            { autoAlpha: 1, zIndex: 2, clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 * d, ease: "expo.inOut" },
            0,
          )
          .fromTo(imgs[to], { scale: 1.4, xPercent: 12 * dir }, { scale: 1.12, xPercent: 0, duration: 1.8 * d, ease: "expo.inOut" }, 0)
          .to(imgs[from], { xPercent: -14 * dir, duration: 1.5 * d, ease: "expo.inOut" }, 0)
          // Old headline exits upwards, new one rises word by word.
          .to(texts[from].querySelectorAll("[data-word]"), { y: 0, yPercent: -115, duration: 0.6 * d, stagger: 0.025, ease: "power3.in" }, 0)
          .to(texts[from].querySelectorAll("[data-fade]"), { autoAlpha: 0, y: -24, duration: 0.45 * d, ease: "power2.in" }, 0)
          .set(texts[from], { autoAlpha: 0 }, 0.7 * d)
          .set(texts[to], { autoAlpha: 1 }, 0.7 * d)
          .fromTo(
            texts[to].querySelectorAll("[data-word]"),
            { y: 0, yPercent: 115 },
            { yPercent: 0, duration: 1.3 * d, stagger: 0.055, ease: "expo.out" },
            0.72 * d,
          )
          .fromTo(
            texts[to].querySelectorAll("[data-fade]"),
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 1.1 * d, stagger: 0.1, ease: "expo.out" },
            0.95 * d,
          );
      }

      const pause = () => {
        progress?.pause();
        kenBurns?.pause();
      };
      const resume = () => {
        progress?.resume();
        kenBurns?.resume();
      };

      api.current = { go: safe(go), pause, resume, index: () => index };
      play(0);

      if (reduce) {
        gsap.set(fills(0), { scaleX: 1 });
        return;
      }

      // Opening sequence.
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(imgs[0], { scale: 1.32 }, { scale: 1.12, duration: 2.4, ease: "power3.out" }, 0)
        .fromTo(texts[0].querySelectorAll("[data-word]"), { y: 0, yPercent: 115 }, { yPercent: 0, duration: 1.4, stagger: 0.07 }, 0.3)
        .fromTo(texts[0].querySelectorAll("[data-fade]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.12 }, 0.55)
        .fromTo(q("[data-hero-ui]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.85)
        .add(() => startSlide(0), 0.9);

      // Only run the autoplay clock while the hero is on screen.
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        onLeave: () => {
          pause();
          videos[index]?.pause();
        },
        onEnterBack: () => {
          resume();
          play(index);
        },
      });
    },
    { scope: root },
  );

  const go = (to: number, dir: 1 | -1) => api.current?.go(to, dir);
  const current = () => api.current?.index() ?? 0;
  const next = () => go((current() + 1) % count, 1);
  const prev = () => go((current() - 1 + count) % count, -1);

  const onPointerDown = (e: PointerEvent) => {
    pointerX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    const start = pointerX.current;
    pointerX.current = null;
    if (start === null) return;
    const dx = e.clientX - start;
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
  };

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="Featured Barbados Maritime information"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      className="relative isolate touch-pan-y select-none overflow-hidden bg-abyss text-foam"
    >
      {/* Photo layers */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.image}
          data-slide-layer
          aria-hidden="true"
          className={`absolute inset-0 overflow-hidden ${i === 0 ? "" : "invisible"}`}
        >
          <div data-slide-img className="absolute inset-0 will-change-transform">
            {slide.video ? (
              <video
                src={slide.video}
                poster={slide.image}
                muted
                loop
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
                className="absolute inset-0 size-full object-cover"
                style={{ objectPosition: slide.focus }}
              />
            ) : (
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="100vw"
                preload={i === 0}
                className="object-cover"
                style={{ objectPosition: slide.focus }}
              />
            )}
          </div>
        </div>
      ))}

      {/* Night-watch grade: a teal-navy tint over every slide, then washes for legibility */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] bg-[#0a3a52] opacity-60 mix-blend-color" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(90deg,rgb(0_15_35/0.9)_0%,rgb(0_15_35/0.62)_45%,rgb(0_15_35/0.2)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-1/2 bg-gradient-to-t from-abyss to-transparent"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-40 bg-gradient-to-b from-abyss/80 to-transparent" />

      {/* Three.js sea of light along the foot of the hero, under the ship-route panel */}
      <WaveField className="absolute inset-x-0 bottom-0 z-[4] h-[62%] [mask-image:linear-gradient(to_top,#000_60%,transparent)]" />

      <div className="container-site relative z-10 flex min-h-[48rem] flex-col pb-10 pt-28 lg:min-h-[max(54rem,calc(100svh-4.5rem))] lg:pb-12">
        <div className="flex flex-1 flex-col justify-center py-10">
          {/* Slide copy, stacked in one grid cell so the block keeps a steady height */}
          <div className="grid w-full">
            {heroSlides.map((slide, i) => {
              const long = slide.title.join(" ").length > 40;
              const Heading = i === 0 ? "h1" : "h2";
              return (
                <div
                  key={slide.image}
                  data-slide-text
                  aria-hidden={active !== i}
                  inert={active !== i}
                  className={`max-w-4xl self-center [grid-area:1/1] ${i === 0 ? "" : "invisible"}`}
                >
                  <span data-fade className="eyebrow eyebrow-rule mb-7 text-haze">
                    {slide.eyebrow}
                  </span>
                  <Heading
                    className={
                      long
                        ? "text-[2.4rem] leading-[1.04] sm:text-6xl lg:text-[4.5rem]"
                        : "text-[3.1rem] leading-[0.98] sm:text-7xl lg:text-[6.5rem]"
                    }
                  >
                    <MaskedWords lines={slide.title} accent={slide.accent} />
                  </Heading>
                  {slide.lead && (
                    <p data-fade className="mt-7 max-w-md text-[0.9375rem] leading-7 text-haze">
                      {slide.lead}
                    </p>
                  )}
                  <div data-fade className="mt-9 flex flex-wrap items-center gap-3">
                    <a href={slide.cta.href} className="btn btn-light">
                      {slide.cta.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                    {slide.secondary && (
                      <a href={slide.secondary.href} className="btn btn-ghost">
                        {slide.secondary.label}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slide indicators (the active one fills while the slide plays) and previous / next */}
          <div data-hero-ui className="mt-10 flex items-center justify-between gap-6">
            <div
              role="tablist"
              aria-label="Choose slide"
              onMouseEnter={() => api.current?.pause()}
              onMouseLeave={() => api.current?.resume()}
              className="flex items-center gap-2"
            >
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Show slide ${i + 1}: ${slide.title.join(" ")}`}
                  onClick={() => go(i, i > current() ? 1 : -1)}
                  className="grid h-6 place-items-center"
                >
                  <span
                    className={`block h-0.5 overflow-hidden rounded-full bg-white/25 transition-[width] duration-500 ease-[var(--ease-out-expo)] ${
                      active === i ? "w-14" : "w-7 hover:bg-white/60"
                    }`}
                  >
                    <span data-tab-fill={i} style={{ transform: "scaleX(0)" }} className="block h-full origin-left bg-gradient-to-r from-teal to-gold" />
                  </span>
                </button>
              ))}
            </div>
            <SlideArrows onPrev={prev} onNext={next} />
          </div>
        </div>

        <HeroPanel />
      </div>
    </section>
  );
}
