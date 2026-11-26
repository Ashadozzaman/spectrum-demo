/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { routes } from "@/lib/routes";

export default function About() {
  return (
    <>
      {/* ============ 02 ABOUT ============ */}
      <section id="about" className="about" data-screen-label="02 About" aria-labelledby="about-h">
        <div className="about__inner">
          <div className="about__media" data-reveal="0">
            <img src="/assets/team-collage.webp" alt="Spectrum engineers working at their desks in the Dhaka office"
              width="533" height="531" className="about__img" />
            <div className="about__badge">
              <span className="about__badge-year">2012</span><span className="about__badge-text">Building national<br />systems
                since</span>
            </div>
          </div>
          <div className="about__content">
            <div className="eyebrow" data-reveal="0">ABOUT SPECTRUM</div>
            <h2 id="about-h" className="section-title section-title--balance" data-reveal="80">Innovating technology for
              national progress</h2>
            <p className="about__text" data-reveal="160">Spectrum IT Solutions Ltd. is a software company in Dhaka. Since 2012
              we have built systems that help government offices and businesses serve people faster and more safely, from
              smart cards to online courts and licences.</p>
            <dl className="stats">
              <div className="stat" data-reveal="200">
                <dt className="stat__label">Years of experience</dt>
                <dd className="stat__value" data-count="14" data-suffix="+">14+</dd>
              </div>
              <div className="stat" data-reveal="260">
                <dt className="stat__label">Families served</dt>
                <dd className="stat__value stat__value--accent" data-count="10" data-suffix="M+">10M+</dd>
              </div>
              <div className="stat" data-reveal="320">
                <dt className="stat__label">Projects completed</dt>
                <dd className="stat__value" data-count="118">118</dd>
              </div>
              <div className="stat" data-reveal="380">
                <dt className="stat__label">Happy clients</dt>
                <dd className="stat__value" data-count="115">115</dd>
              </div>
            </dl>
            <Link href={routes.about} className="btn-outline" data-reveal="420">Read more about us<span aria-hidden="true"
                className="arrow-accent">→</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
