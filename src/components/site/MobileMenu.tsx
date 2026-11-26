import Link from "next/link";
import { PHONE_HREF, WHATSAPP_HREF, routes } from "@/lib/routes";
import NavLink from "./NavLink";
import { mainNav } from "./nav";

/* Open/close is handled by SiteEffects via the data-menu-open / data-menu-close attributes. */
export default function MobileMenu() {
  return (
    <>
      <div className="menu-scrim only-compact" data-menu-close=""></div>
      <aside id="mobile-menu" className="mobile-menu only-compact" aria-label="Mobile menu" aria-hidden="true">
        <div className="mobile-menu__head">
          <span className="mobile-menu__label">MENU</span>
          <button className="mobile-menu__close" aria-label="Close menu" data-menu-close="">×</button>
        </div>
        <nav aria-label="Mobile" className="mobile-nav">
          {mainNav.map((item, i) => (
            <NavLink key={item.href} href={item.href} className="mobile-nav__link" data-menu-close="">
              <span>{item.label}</span>
              <span className="mobile-nav__num">{String(i + 1).padStart(2, "0")}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <Link href={routes.contact} className="mobile-menu__cta" data-menu-close="">Free Consultation</Link>
          <div className="mobile-menu__row">
            <a href={PHONE_HREF} className="mobile-menu__call">Call</a>
            <a href={WHATSAPP_HREF} className="mobile-menu__wa">WhatsApp</a>
          </div>
        </div>
      </aside>
    </>
  );
}
