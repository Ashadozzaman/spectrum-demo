/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getCaseStudies } from "@/lib/data";
import { PHONE, PHONE_HREF, projectHref, routes } from "@/lib/routes";
import NavLink from "./NavLink";
import { mainNav } from "./nav";

export default async function Header() {
  const caseStudies = await getCaseStudies();
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href={routes.home} className="brand">
          <img src="/assets/mark.png" alt="" width="38" height="38" className="brand__mark" />
          <span className="brand__text">
            <span className="brand__name">Spectrum</span>
            <span className="brand__tag">IT SOLUTIONS LTD.</span>
          </span>
          <span className="sr-only">Spectrum IT Solutions home</span>
        </Link>

        <nav aria-label="Main" className="main-nav only-desktop">
          {mainNav.map((item) =>
            item.href === routes.caseStudies ? (
              /* Hover (or keyboard focus) opens the list of every case study. */
              <div key={item.href} className="group relative">
                <NavLink href={item.href} aria-haspopup="true" className="inline-flex items-center gap-1">
                  {item.label}
                  <ChevronDown size={14} aria-hidden="true"
                    className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                </NavLink>
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2 pt-7 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="w-[340px] rounded-2xl border border-line-strong bg-surface p-2 shadow-[0_24px_60px_rgba(0,0,0,.45)]">
                    <p className="m-0 px-3 pb-2 pt-2 font-mono text-[11px] tracking-[.16em] text-fg-subtle">CASE STUDIES</p>
                    <ul className="m-0 list-none p-0">
                      {caseStudies.map((p) => (
                        <li key={p.slug}>
                          <NavLink href={projectHref(p.slug)}
                            className="flex flex-col gap-0.5 rounded-xl px-3 py-2 hover:bg-white/5">
                            <span className="text-[14px] text-fg">{p.title}</span>
                            <span className="text-[12px] text-fg-subtle">{p.badge}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    <Link href={routes.caseStudyIndex}
                      className="mt-1 block border-t border-line px-3 pb-2 pt-3 font-mono text-[12px] tracking-[.08em] !text-brand">
                      ALL PROJECTS →
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="header-actions">
          {/* EN/BN switch hidden until a Bangla version exists (styles: .lang-switch in home.css).
          <div role="group" aria-label="Language" className="lang-switch">
            <button aria-pressed="true" className="lang-switch__btn">EN</button>
            <button aria-pressed="false" lang="bn" className="lang-switch__btn lang-switch__btn--bn">বাং</button>
          </div>
          */}
          <a href={PHONE_HREF} className="header-phone only-desktop">{PHONE}</a>
          <Link href={routes.contact} className="btn-cta-sm only-desktop" data-magnetic="">Free Consultation</Link>
          <button className="menu-btn only-compact" aria-label="Open menu" aria-expanded="false"
            aria-controls="mobile-menu" data-menu-open="">
            <span className="menu-btn__bar"></span>
            <span className="menu-btn__bar"></span>
            <span className="menu-btn__bar menu-btn__bar--short"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
