/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PHONE, PHONE_HREF, routes } from "@/lib/routes";
import NavLink from "./NavLink";
import { mainNav } from "./nav";

export default function Header() {
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
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
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
