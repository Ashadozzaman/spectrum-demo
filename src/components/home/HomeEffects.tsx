"use client";

import { useEffect } from "react";

/*
 * Client-side behaviour for the home page (port of template/assets/js/home.js).
 * The sections are server components; this attaches the interactions to their
 * DOM after hydration and tears everything down on unmount.
 */

const DUR = 6500;
const SCENE_LABELS = ["IDENTITY.VERIFY", "CARD.ISSUE", "AI.READ", "CHAIN.SEAL", "FAKE.DETECT"];
const SCENE_ALTS = [
  "Animation: a face scan line passes over a portrait while liveness and NID match checks turn green.",
  "Animation: a TCB Smart Family Card flips to its QR side and is marked verified.",
  "Animation: AI reads a Bangla land record and extracts owner, khatian, dag number and area.",
  "Animation: four record blocks link into a chain and all nodes confirm it is intact.",
  "Animation: a lens moves over a smart card checking hologram, microprint and chip data.",
];

export default function HomeEffects() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".page");
    if (!page) return;

    const ac = new AbortController();
    const on = { signal: ac.signal };
    const observers: { disconnect(): void }[] = [];
    const rafs = new Set<number>();
    const raf = (cb: FrameRequestCallback) => {
      const id = requestAnimationFrame((t) => {
        rafs.delete(id);
        cb(t);
      });
      rafs.add(id);
      return id;
    };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel);
    const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
      Array.from(root.querySelectorAll<T>(sel));

    /* ---------- Mobile menu ---------- */
    const menuBtn = $("[data-menu-open]");
    const menu = document.getElementById("mobile-menu");
    const setMenu = (open: boolean) => {
      page.classList.toggle("menu-open", open);
      menuBtn?.setAttribute("aria-expanded", String(open));
      menu?.setAttribute("aria-hidden", String(!open));
    };
    menuBtn?.addEventListener("click", () => setMenu(true), on);
    $$("[data-menu-close]").forEach((el) => el.addEventListener("click", () => setMenu(false), on));

    /* ---------- Hero: rotating solutions ---------- */
    const hero = document.getElementById("top");
    const glow = $("[data-hero-glow]");
    const panel = $("[data-hero-panel]");
    const stage = $("[data-hero-stage]");
    const slides = $$(".hero-slide");
    const scenes = $$(".scene");
    const tabs = $$(".hero-tab");
    const bars = tabs.map((t) => t.querySelector<HTMLElement>(".hero-tab__bar"));
    const sceneLabelEl = $("[data-scene-label]");
    const sceneNumEl = $("[data-scene-num]");
    const liveEl = $("[data-live]");
    const liveTextEl = $("[data-live-text]");

    let active = 0;
    let paused = false;
    let elapsed = 0;
    let heroVisible = true;

    const setActive = (i: number) => {
      active = i;
      slides.forEach((s, k) => {
        s.classList.toggle("is-active", k === i);
        s.setAttribute("aria-hidden", k === i ? "false" : "true");
      });
      scenes.forEach((s, k) => s.classList.toggle("is-active", k === i));
      tabs.forEach((t, k) => t.setAttribute("aria-selected", k === i ? "true" : "false"));
      if (sceneLabelEl) sceneLabelEl.textContent = SCENE_LABELS[i];
      if (sceneNumEl) sceneNumEl.textContent = "0" + (i + 1);
      panel?.setAttribute("aria-label", SCENE_ALTS[i]);
    };

    const setPaused = (p: boolean) => {
      paused = p;
      liveEl?.classList.toggle("is-paused", p);
      if (liveTextEl) liveTextEl.textContent = p ? "PAUSED" : "LIVE";
    };

    tabs.forEach((tab, i) =>
      tab.addEventListener("click", () => {
        elapsed = 0;
        setActive(i);
      }, on),
    );

    if (panel) {
      panel.addEventListener("mouseenter", () => setPaused(true), on);
      panel.addEventListener("mouseleave", () => setPaused(false), on);
      let touchX = 0;
      panel.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true, signal: ac.signal });
      panel.addEventListener("touchend", (e) => {
        const dx = e.changedTouches[0].clientX - (touchX || 0);
        if (Math.abs(dx) > 40) {
          elapsed = 0;
          setActive((active + (dx < 0 ? 1 : 4)) % 5);
        }
      }, on);
    }

    if (hero) {
      const io = new IntersectionObserver((entries) => { heroVisible = entries[0].isIntersecting; }, { threshold: 0.1 });
      io.observe(hero);
      observers.push(io);
    }

    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(t - last, 100);
      last = t;
      if (!paused && !reduce && heroVisible && !document.hidden) {
        elapsed += dt;
        if (elapsed >= DUR) {
          elapsed = 0;
          setActive((active + 1) % 5);
        }
      }
      bars.forEach((b, i) => {
        if (!b) return;
        const k = i === active ? (reduce ? 1 : Math.min(elapsed / DUR, 1)) : 0;
        b.style.transform = "scaleX(" + k + ")";
      });
      raf(loop);
    };
    raf(loop);

    if (hero && glow) {
      hero.addEventListener("mousemove", (e) => {
        if (!fine || reduce) return;
        const r = hero.getBoundingClientRect();
        glow.style.transform = "translate(" + (e.clientX - r.left) + "px," + (e.clientY - r.top) + "px)";
      }, on);
    }

    // Scale the fixed 720×560 stage to the panel width
    const fit = () => {
      if (panel && stage) stage.style.transform = "scale(" + panel.clientWidth / 720 + ")";
    };
    fit();
    if (panel) {
      const ro = new ResizeObserver(fit);
      ro.observe(panel);
      observers.push(ro);
    }

    /* ---------- Magnetic buttons ---------- */
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

    /* ---------- Service cards: 3D tilt + spotlight border ---------- */
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

    /* ---------- Scroll reveal + count-up numbers ---------- */
    if (!reduce) {
      const io = new IntersectionObserver((entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      observers.push(io);

      $$("[data-reveal]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) return; // already in view on load
        const d = +(el.dataset.reveal || 0) || 0;
        el.style.opacity = "0";
        el.style.transform = "translateY(28px)";
        el.style.transition =
          "opacity .8s cubic-bezier(.2,.7,.2,1) " + d + "ms, transform .9s cubic-bezier(.2,.7,.2,1) " + d + "ms";
        io.observe(el);
      });

      const cio = new IntersectionObserver((entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          cio.unobserve(el);
          const to = +(el.dataset.count || 0);
          const suf = el.dataset.suffix || "";
          const t0 = performance.now();
          const D = 1600;
          const step = (t: number) => {
            const k = Math.min((t - t0) / D, 1);
            el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf;
            if (k < 1) raf(step);
          };
          el.textContent = "0" + suf;
          raf(step);
        }), { threshold: 0.6 });
      observers.push(cio);
      $$("[data-count]").forEach((el) => cio.observe(el));
    }

    /* ---------- Scroll effects: sticky case studies + process timeline ---------- */
    const casesEl = $("[data-cases]");
    const casesBar = $("[data-cases-bar]");
    const caseBtns = $$(".case-nav__btn");
    const caseCards = $$(".case-card");
    const timeline = $("[data-timeline]");
    const steps = timeline ? $$("[data-step]", timeline) : [];
    let cs = 0;

    const setCase = (i: number) => {
      cs = i;
      caseBtns.forEach((b, k) => b.setAttribute("aria-current", k === i ? "true" : "false"));
      caseCards.forEach((c, k) => {
        c.classList.toggle("is-active", k === i);
        c.classList.toggle("is-past", k < i);
        c.setAttribute("aria-hidden", k === i ? "false" : "true");
      });
    };

    const scrollFx = () => {
      const vh = innerHeight;
      // Only when the sticky (≥1024px) layout is displayed
      if (casesEl && casesEl.offsetHeight) {
        const r = casesEl.getBoundingClientRect();
        const p = Math.min(Math.max(-r.top / (r.height - vh), 0), 1);
        const i = Math.min(4, Math.floor(p * 5));
        if (i !== cs) setCase(i);
        if (casesBar) casesBar.style.transform = "scaleY(" + (reduce ? (i + 1) / 5 : p) + ")";
      }
      if (timeline) {
        const r = timeline.getBoundingClientRect();
        const p = reduce ? 1 : Math.min(Math.max((vh * 0.62 - r.top) / r.height, 0), 1);
        timeline.style.setProperty("--progress", String(p));
        steps.forEach((s) => s.classList.toggle("is-on", p >= +(s.dataset.step || 0)));
      }
    };

    const goCase = (i: number) => {
      if (!casesEl) return;
      const top = casesEl.getBoundingClientRect().top + scrollY;
      const h = casesEl.offsetHeight - innerHeight;
      scrollTo({ top: top + h * ((i + 0.5) / 5), behavior: reduce ? "auto" : "smooth" });
    };
    caseBtns.forEach((b, i) => b.addEventListener("click", () => goCase(i), on));

    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      raf(() => {
        ticking = false;
        scrollFx();
      });
    }, { passive: true, signal: ac.signal });

    addEventListener("resize", () => {
      fit();
      scrollFx();
    }, on);

    scrollFx();

    return () => {
      ac.abort();
      observers.forEach((o) => o.disconnect());
      rafs.forEach((id) => cancelAnimationFrame(id));
      rafs.clear();
    };
  }, []);

  return null;
}
