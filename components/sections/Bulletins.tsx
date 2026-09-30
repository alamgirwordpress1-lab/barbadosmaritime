"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { bulletins, labels } from "@/lib/content";

type Post = (typeof bulletins.posts)[number];

/** Width of one card plus the gap, i.e. how far one step scrolls. */
function stepSize(el: HTMLElement) {
  const card = el.firstElementChild as HTMLElement | null;
  if (!card) return 0;
  return card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
}

/** "15th June 2026" as a gold date tile: day large, month and year small. */
function DateTile({ date, dateTime }: { date: string; dateTime: string }) {
  const m = date.match(/^(\d+)(\D*?)\s+(\S+)\s+(\d{4})$/);
  return (
    <time
      dateTime={dateTime}
      className="absolute -top-10 right-4 z-10 flex min-w-[4.5rem] flex-col items-center rounded-lg bg-gold px-3 py-2.5 text-center text-abyss shadow-[0_14px_26px_-14px_rgb(0_0_0/0.7)] ring-4 ring-harbor"
    >
      {m ? (
        <>
          <span className="font-display text-3xl leading-none">{m[1]}</span>
          <span className="mt-1 text-[0.5625rem] font-bold uppercase tracking-[0.18em]">
            {m[3].slice(0, 3)} {m[4]}
          </span>
        </>
      ) : (
        <span className="text-xs font-bold">{date}</span>
      )}
    </time>
  );
}

function BulletinCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-rule bg-harbor p-3 transition-[translate,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:border-teal/40 hover:shadow-float">
      <div className="relative aspect-[16/11] overflow-hidden rounded-lg bg-deep">
        <Image
          src={post.image}
          alt=""
          fill
          draggable={false}
          sizes="(min-width: 1024px) 460px, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-abyss/70 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-teal backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col px-4 pb-4 pt-7">
        <DateTile date={post.date} dateTime={post.dateTime} />
        <p className="flex items-center gap-2 text-xs font-semibold text-fog">
          <span className="grid size-6 place-items-center rounded-full border border-rule text-teal">
            <User className="size-3.5" aria-hidden="true" />
          </span>
          {post.author}
        </p>
        <h3 className="mt-3 line-clamp-3 text-2xl leading-tight text-pretty">
          <a
            href={post.href}
            draggable={false}
            className="transition-colors after:absolute after:inset-0 after:rounded-xl group-hover:text-teal"
          >
            {post.title}
          </a>
        </h3>
        <p className="mb-6 mt-3 line-clamp-2 text-sm leading-6">{post.excerpt}</p>
        <span
          aria-hidden="true"
          className="mt-auto inline-flex w-fit items-center gap-2.5 text-xs font-semibold text-haze transition-colors duration-500 group-hover:text-teal"
        >
          Read More
          <span className="grid size-8 place-items-center rounded-full border border-rule transition-[rotate,background-color,border-color,color] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-teal group-hover:bg-teal group-hover:text-abyss">
            <ArrowUpRight className="size-3.5" />
          </span>
        </span>
      </div>
    </article>
  );
}

/**
 * Bulletins as a three-up carousel. Arrows, swipe, trackpad or mouse drag move it;
 * on desktop a "Drag" bubble follows the pointer over the cards.
 */
export function Bulletins() {
  const track = useRef<HTMLUListElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const follow = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 });
  const [edges, setEdges] = useState({ start: true, end: false });
  const [dragging, setDragging] = useState(false);
  const [bubbleOn, setBubbleOn] = useState(false);

  const [first, ...rest] = bulletins.heading.split(" ");
  const headingA = [first, rest[0]].join(" "); // "Bulletins From"
  const headingB = rest.slice(1).join(" "); // "Barbados Maritime"

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
    if (thumb.current) {
      const size = el.clientWidth / el.scrollWidth;
      thumb.current.style.width = `${size * 100}%`;
      thumb.current.style.transform = `translateX(${max > 0 ? (el.scrollLeft / max) * ((1 - size) / size) * 100 : 0}%)`;
    }
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [measure]);

  // Pointer-following "Drag" bubble (mouse only, and not for reduced motion).
  useGSAP(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !bubble.current) return;
    follow.current = {
      x: gsap.quickTo(bubble.current, "x", { duration: 0.45, ease: "power3" }),
      y: gsap.quickTo(bubble.current, "y", { duration: 0.45, ease: "power3" }),
    };
  });

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * stepSize(el), behavior: reduceMotion() ? "auto" : "smooth" });
  };

  const moveBubble = (e: PointerEvent) => {
    const box = wrap.current?.getBoundingClientRect();
    if (!follow.current || !box) return;
    follow.current.x(e.clientX - box.left);
    follow.current.y(e.clientY - box.top);
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !track.current) return;
    drag.current = { down: true, moved: false, x: e.clientX, left: track.current.scrollLeft };
  };

  const onPointerMove = (e: PointerEvent) => {
    moveBubble(e);
    const d = drag.current;
    if (!d.down || !track.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };

  const endDrag = () => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    const el = track.current;
    if (!d.moved || !el) return;
    const s = stepSize(el);
    el.scrollTo({ left: s ? Math.round(el.scrollLeft / s) * s : 0, behavior: reduceMotion() ? "auto" : "smooth" });
    window.setTimeout(() => setDragging(false), 450);
  };

  const arrow =
    "grid size-11 place-items-center rounded-full border border-white/25 text-foam transition-colors duration-300 hover:border-teal hover:bg-teal hover:text-abyss disabled:pointer-events-none disabled:opacity-30";

  return (
    <section aria-labelledby="bulletins-heading" className="relative isolate overflow-hidden bg-abyss py-24 lg:py-32">
      <span aria-hidden="true" className="absolute -right-40 -top-40 -z-10 size-[36rem] rounded-full bg-teal/10 blur-3xl" />
      <span aria-hidden="true" className="absolute -left-48 top-1/4 -z-10 size-[26rem] rounded-full bg-gold/10 blur-3xl" />

      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p data-reveal className="eyebrow">
              {labels.news}
            </p>
            <h2 id="bulletins-heading" data-split className="mt-5 text-[2.25rem] sm:text-5xl">
              {headingA} <span className="accent">{headingB}</span>
            </h2>
          </div>
          <div data-reveal className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous bulletins" className={arrow}>
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label="Next bulletins" className={arrow}>
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <a href={bulletins.viewAll.href} className="link-arrow ml-3">
              {bulletins.viewAll.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div
          ref={wrap}
          className="relative mt-8"
          onPointerEnter={() => follow.current && setBubbleOn(true)}
          onPointerLeave={() => {
            setBubbleOn(false);
            endDrag();
          }}
        >
          <ul
            ref={track}
            data-stagger
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onClickCapture={(e) => {
              if (!drag.current.moved) return;
              e.preventDefault();
              e.stopPropagation();
              drag.current.moved = false;
            }}
            className={`-mx-3 -my-10 flex scroll-px-3 gap-6 overflow-x-auto overscroll-x-contain px-3 pb-10 pt-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              dragging ? "cursor-grabbing select-none snap-none" : "snap-x snap-mandatory"
            } ${bubbleOn ? "cursor-none" : ""}`}
          >
            {bulletins.posts.map((post) => (
              <li
                key={post.title + post.date}
                className="shrink-0 basis-[85%] snap-start sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
              >
                <BulletinCard post={post} />
              </li>
            ))}
          </ul>

          {/* "Drag" bubble: the outer span follows the pointer (GSAP), the inner one scales in and out (CSS) */}
          <span ref={bubble} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-20 -ml-10 -mt-10 size-20">
            <span
              className={`grid size-full place-items-center rounded-full bg-teal text-[0.625rem] font-bold uppercase tracking-[0.2em] text-abyss shadow-[0_14px_30px_-12px_rgb(0_0_0/0.7)] transition-[scale,opacity] duration-300 ${
                bubbleOn ? (dragging ? "scale-75 opacity-100" : "scale-100 opacity-100") : "scale-0 opacity-0"
              }`}
            >
              Drag
            </span>
          </span>
        </div>

        {/* Scroll position */}
        <div aria-hidden="true" className="mt-12 h-px overflow-hidden bg-rule">
          <span ref={thumb} className="block h-full bg-gradient-to-r from-teal to-gold transition-transform duration-200" />
        </div>
      </div>
    </section>
  );
}
