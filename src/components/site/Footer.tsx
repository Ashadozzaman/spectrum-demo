/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { EMAIL, PHONE, PHONE_HREF, routes } from "@/lib/routes";
import SocialLinks from "./SocialLinks";

const projectSites = [
  "www.licence.gov.bd",
  "www.ocd.org.bd",
  "www.tcbsheba.com",
  "www.ecourt.gov.bd",
  "www.sobticket.com",
];

const quickLinks = [
  { label: "Artificial Intelligence", href: routes.service.ai },
  { label: "Digital Identity & Security", href: routes.service.digitalIdentity },
  { label: "TCB Smart Card Technologies", href: routes.service.smartCards },
  { label: "Blockchain Technology", href: routes.service.blockchain },
  { label: "About Us", href: routes.about },
  { label: "Our Services", href: routes.services },
  { label: "Our Products", href: routes.products },
  { label: "Our Projects", href: routes.projects },
  { label: "Contact Us", href: routes.contact },
];

export default function Footer() {
  return (
    <footer className="site-footer" data-screen-label="08 Footer">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <Link href={routes.home} className="footer-brand__link">
            <img src="/assets/mark.png" alt="" width="36" height="36" />
            <span className="footer-brand__name">Spectrum IT Solutions</span>
          </Link>
          <p className="footer-brand__text">A Dhaka software company building secure digital services for government and
            business since 2012.</p>
          <div className="footer-badges">
            <span className="footer-badges__basis"><img src="/assets/basis.png" alt="BASIS member" width="110"
                height="28" /></span>
            <img src="/assets/iso9001.png" alt="ISO 9001:2015" width="34" height="36" className="footer-badges__iso" />
            <img src="/assets/iso27001.png" alt="ISO 27001:2022" width="34" height="36" className="footer-badges__iso" />
          </div>
          <SocialLinks />
        </div>
        <nav aria-label="Valuable projects" className="footer-col">
          <h2 className="footer-col__title">VALUABLE PROJECTS</h2>
          {projectSites.map((site) => (
            <a key={site} href={`https://${site}`} className="footer-link">{site}</a>
          ))}
        </nav>
        <nav aria-label="Quick links" className="footer-col">
          <h2 className="footer-col__title">QUICK LINKS</h2>
          {quickLinks.map((l) => (
            <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
          ))}
        </nav>
        <address className="footer-col footer-col--address">
          <h2 className="footer-col__title">CONTACT US</h2>
          <span className="footer-address">52/1, New Eskaton Road (Hasan Holdings Ltd., 12th Floor), Dhaka-1000,
            Bangladesh</span>
          <a href={`mailto:${EMAIL}`} className="footer-link">{EMAIL}</a>
          <a href={PHONE_HREF} className="footer-link footer-link--mono">{PHONE}</a>
        </address>
      </div>
      <div className="site-footer__bottom">
        <span>Copyright © 2026 Spectrum IT Solutions Ltd. All Rights Reserved.</span>
        <span className="legal">
          <Link href={routes.privacy}>Privacy Policy</Link>
          <Link href={routes.terms}>Terms of Use</Link>
        </span>
      </div>
    </footer>
  );
}
