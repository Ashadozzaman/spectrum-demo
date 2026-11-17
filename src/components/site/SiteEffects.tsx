"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
 * Site-wide client behaviour, mounted once in the (site) layout:
 *   - mobile menu open/close   ([data-menu-open] / [data-menu-close], toggles `.page.menu-open`)
 *   - magnetic buttons         ([data-magnetic])
 *   - card tilt + spotlight    ([data-tilt], used with .svc-card)
 *   - scroll reveal            ([data-reveal="<delay ms>"], progressive: no JS = visible)
 *
 * Page-specific effects (hero carousel, tilt cards, ...) stay in their own
 * component, e.g. components/home/HomeEffects.tsx.
 */
export default function SiteEffects() {
  const pathname = usePathname();

  /* ---------- Mobile menu (event delegation, survives client navigation) ---------- */
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".page");
    if (!page) return;
    const setMenu = (open: boolean) => {
      page.classList.toggle("menu-open", open);
      document.querySelector("[data-menu-open]")?.setAttribute("aria-expanded", String(open));
      document.getElementById("mobile-menu")?.setAttribute("aria-hidden", String(!open));
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest("[data-menu-open]")) setMenu(true);
      else if (t?.closest("[data-menu-close]")) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      setMenu(false);
    };
  }, []);

  /* ---------- Per-page wiring: re-run whenever the route changes ---------- */
  useEffect(() => {
    document.querySelector(".page")?.classList.remove("menu-open");

    const ac = new AbortController();
    const on = { signal: ac.signal };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const $$ = <T extends HTMLElement = HTMLElement>(sel: string) =>
      Array.from(document.querySelectorAll<T>(sel));

    // Magnetic buttons
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        if (!fine || reduce) return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      }, on);
      el.addEventListener("mouseleave", () => { el.style.transform = ""; }, on);
    });

    // Cards: 3D tilt + spotlight border (.svc-card)
    $$("[data-tilt]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        if (!fine || reduce) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.transform =
          "perspective(900px) rotateX(" + (0.5 - y) * 6 + "deg) rotateY(" + (x - 0.5) * 8 + "deg) translateY(-6px)";
        el.style.setProperty("--mx", x * 100 + "%");
        el.style.setProperty("--my", y * 100 + "%");
        el.classList.add("is-tilting");
      }, on);
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
        el.classList.remove("is-tilting");
      }, on);
    });

    // Scroll reveal
    let io: IntersectionObserver | undefined;
    if (!reduce) {
      io = new IntersectionObserver((entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          io?.unobserve(el);
        }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

      $$("[data-reveal]").forEach((el) => {
        if (el.dataset.revealed) return;
        el.dataset.revealed = "1";
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) return; // already in view on load
        const d = +(el.dataset.reveal || 0) || 0;
        el.style.opacity = "0";
        el.style.transform = "translateY(28px)";
        el.style.transition =
          "opacity .8s cubic-bezier(.2,.7,.2,1) " + d + "ms, transform .9s cubic-bezier(.2,.7,.2,1) " + d + "ms";
        io?.observe(el);
      });
    }

    return () => {
      ac.abort();
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
