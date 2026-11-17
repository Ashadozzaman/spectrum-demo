import Link from "next/link";
import { PHONE, PHONE_HREF, WHATSAPP_HREF, routes } from "@/lib/routes";

/**
 * The home page's green "Have a project in mind?" box (.cta*), with
 * per-page copy. Same markup as components/home/Cta.tsx.
 */
export default function CtaBanner({
  eyebrow = "LET’S TALK",
  title,
  text,
  action = "Book a free consultation",
  href = routes.contact,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  action?: string;
  href?: string;
}) {
  return (
    <section className="cta" aria-labelledby="cta-h">
      <div className="cta__box" data-reveal="0">
        <div className="cta__grid" aria-hidden="true"></div>
        <div className="cta__orb" aria-hidden="true"></div>
        <div className="cta__copy">
          <div className="eyebrow eyebrow--light">{eyebrow.toUpperCase()}</div>
          <h2 id="cta-h" className="cta__title">{title}</h2>
          <p className="cta__text">{text}</p>
        </div>
        <div className="cta__actions">
          <Link href={href} className="btn-cta-lg" data-magnetic="">
            {action}
            <span aria-hidden="true" className="mono">→</span>
          </Link>
          <div className="cta__row">
            <a href={WHATSAPP_HREF} className="btn-glass">WhatsApp</a>
            <a href={PHONE_HREF} className="btn-glass">Call us</a>
          </div>
          <span className="cta__phone">{PHONE}</span>
        </div>
      </div>
    </section>
  );
}
