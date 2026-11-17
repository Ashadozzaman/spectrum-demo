/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { routes } from "@/lib/routes";
export default function CaseStudies() {
  return (
    <>
      {/* ============ 04 CASE STUDIES ============ */}
      <section id="case-studies" className="cases" data-screen-label="04 Case studies" aria-labelledby="cs-h">
    
        {/* Desktop (≥1024px): sticky scroll-driven showcase */}
        <div className="cases-sticky only-wide" data-cases="">
          <div className="cases-sticky__viewport">
            <div className="cases-sticky__grid">
              <div className="cases-side">
                <div className="eyebrow">FEATURED CASE STUDIES</div>
                <h2 id="cs-h" className="cases-title">Systems we built that people use every day</h2>
                <div className="case-nav">
                  <div className="case-nav__track" aria-hidden="true">
                    <div className="case-nav__bar" data-cases-bar=""></div>
                  </div>
                  <button className="case-nav__btn" aria-current="true">
                    <span className="case-nav__tag">01 · Digital Identity · Social Safety Net</span>
                    <span className="case-nav__title">TCB Smart Card</span>
                  </button>
                  <button className="case-nav__btn" aria-current="false">
                    <span className="case-nav__tag">02 · Courts and Justice</span>
                    <span className="case-nav__title">Industrial e-Court</span>
                  </button>
                  <button className="case-nav__btn" aria-current="false">
                    <span className="case-nav__tag">03 · AI · Public Service</span>
                    <span className="case-nav__title">TCB AI Contact Center</span>
                  </button>
                  <button className="case-nav__btn" aria-current="false">
                    <span className="case-nav__tag">04 · Secure Cards</span>
                    <span className="case-nav__title">Smart Card Issuance</span>
                  </button>
                  <button className="case-nav__btn" aria-current="false">
                    <span className="case-nav__tag">05 · Government Licensing</span>
                    <span className="case-nav__title">National e-Licensing</span>
                  </button>
                </div>
                <Link href={routes.projects} className="btn-outline-sm">Explore all projects<span aria-hidden="true"
                    className="arrow-accent">→</span></Link>
              </div>
    
              <div className="case-stack">
                <article className="case-card is-active" aria-hidden="false">
                  <div className="case-card__media">
                    <img src="/assets/cs-tcb1.png" alt="TCB Smart Card web portal dashboard" className="case-card__img pos-top" />
                    <div className="case-card__shade"></div>
                    <div className="case-card__caption">
                      <span className="case-card__client">Client: Trading Corporation of Bangladesh (Ministry of Commerce)</span>
                      <h3 className="case-card__title">TCB Smart Card</h3>
                    </div>
                  </div>
                  <div className="case-card__cols">
                    <div className="case-card__col">
                      <span className="case-card__label case-card__label--challenge">01 · CHALLENGE</span>
                      <p className="case-card__text">TCB sells low-price goods to more than 10 million families in all 64
                        districts. Paper coupons were easy to copy, some families were listed twice, and there was no live
                        view of what was handed out.</p>
                    </div>
                    <div className="case-card__col">
                      <span className="case-card__label case-card__label--built">02 · WHAT WE BUILT</span>
                      <p className="case-card__text">Family registration checked against the NID, a smart card with a secure
                        QR code for every family, and the TCB Card Sheba app that more than 10,000 dealers use to check the
                        card before each sale, online or offline.</p>
                    </div>
                    <div className="case-card__col case-card__col--impact">
                      <span className="case-card__label case-card__label--impact">03 · IMPACT</span>
                      <div className="impact"><span className="impact__value">10M+</span><span className="impact__label">families
                          registered once, no duplicates</span></div>
                      <div className="impact"><span className="impact__value">99.8%</span><span className="impact__label">fewer
                          duplicate claims</span></div>
                      <Link href={routes.caseStudy.tcb} className="case-card__link">Read the case study<span aria-hidden="true"
                          className="mono">→</span></Link>
                    </div>
                  </div>
                </article>
    
                <article className="case-card" aria-hidden="true">
                  <div className="case-card__media">
                    <img src="/assets/cs-ecourt.webp" alt="Industrial e-Court login screen over a courtroom gavel background"
                      className="case-card__img" />
                    <div className="case-card__shade"></div>
                    <div className="case-card__caption">
                      <span className="case-card__client">Client: Ministry of Labour &amp; Employment / Labour Courts</span>
                      <h3 className="case-card__title">Industrial e-Court</h3>
                    </div>
                  </div>
                  <div className="case-card__cols">
                    <div className="case-card__col">
                      <span className="case-card__label case-card__label--challenge">01 · CHALLENGE</span>
                      <p className="case-card__text">The labour courts ran on paper files. Hearings were scheduled by hand,
                        summons were delivered in person, and workers could not check hearing dates without going to
                        court.</p>
                    </div>
                    <div className="case-card__col">
                      <span className="case-card__label case-card__label--built">02 · WHAT WE BUILT</span>
                      <p className="case-card__text">One online system for the whole case: online filing, the daily cause list
                        published automatically, digital files for judges, a log of every change, and SMS alerts for
                        hearing dates.</p>
                    </div>
                    <div className="case-card__col case-card__col--impact">
                      <span className="case-card__label case-card__label--impact">03 · IMPACT</span>
                      <div className="impact"><span className="impact__value">85%</span><span className="impact__label">cut in
                          scheduling delays</span></div>
                      <div className="impact"><span className="impact__value">All benches</span><span
                          className="impact__label">paperless case tracking</span></div>
                      <Link href={routes.caseStudy.eCourt} className="case-card__link">Read the case study<span aria-hidden="true"
                          className="mono">→</span></Link>
                    </div>
                  </div>
                </article>
    
                <article className="case-card" aria-hidden="true">
                  <div className="case-card__media">
                    <img src="/assets/cs-aicc.webp" alt="Contact centre agent wearing a headset, smiling"
                      className="case-card__img pos-center-30" />
                    <div className="case-card__shade"></div>
                    <div className="case-card__caption">
                      <span className="case-card__client">Client: Trading Corporation of Bangladesh (Ministry of Commerce)</span>
                      <h3 className="case-card__title">TCB AI Contact Center</h3>
                    </div>
                  </div>
                  <div className="case-card__cols">
                    <div className="case-card__col">
                      <span className="case-card__label case-card__label--challenge">01 · CHALLENGE</span>
                      <p className="case-card__text">Complaints from dealers and beneficiaries came in by phone during office
                        hours and were noted by hand. Reports to officers were late, and follow-up depended on individual
                        staff.</p>
                    </div>
                    <div className="case-card__col">
                      <span className="case-card__label case-card__label--built">02 · WHAT WE BUILT</span>
                      <p className="case-card__text">An AI voice agent, chat and WhatsApp that answer 24/7, routing by caller
                        type, and complaints that get a ticket, a PDF report to the authority, and follow-ups until
                        resolved.</p>
                    </div>
                    <div className="case-card__col case-card__col--impact">
                      <span className="case-card__label case-card__label--impact">03 · IMPACT</span>
                      <div className="impact"><span className="impact__value">24/7</span><span className="impact__label">answers, with
                          no queue</span></div>
                      <div className="impact"><span className="impact__value">100%</span><span className="impact__label">of complaints
                          ticketed and followed up</span></div>
                      <Link href={routes.caseStudy.tcbContactCenter} className="case-card__link">Read the case study<span aria-hidden="true"
                          className="mono">→</span></Link>
                    </div>
                  </div>
                </article>
    
                <article className="case-card" aria-hidden="true">
                  <div className="case-card__media">
                    <img src="/assets/cs-smartcard.webp" alt="Hand holding a Bangladesh smart card with QR code"
                      className="case-card__img" />
                    <div className="case-card__shade"></div>
                    <div className="case-card__caption">
                      <span className="case-card__client">Client: National Transport &amp; Licensing Authorities</span>
                      <h3 className="case-card__title">Smart Card Issuance</h3>
                    </div>
                  </div>
                  <div className="case-card__cols">
                    <div className="case-card__col">
                      <span className="case-card__label case-card__label--challenge">01 · CHALLENGE</span>
                      <p className="case-card__text">Driving licences and transport cards had to be produced in large
                        numbers, quickly, and be very hard to copy.</p>
                    </div>
                    <div className="case-card__col">
                      <span className="case-card__label case-card__label--built">02 · WHAT WE BUILT</span>
                      <p className="case-card__text">Laser engraving and chip encoding in one flow, chip keys locked in secure
                        hardware, the fingerprint stored on the card, and handheld scanners so officers can check cards
                        offline.</p>
                    </div>
                    <div className="case-card__col case-card__col--impact">
                      <span className="case-card__label case-card__label--impact">03 · IMPACT</span>
                      <div className="impact"><span className="impact__value">15,000+</span><span className="impact__label">cards
                          personalised every day</span></div>
                      <div className="impact"><span className="impact__value">0</span><span className="impact__label">counterfeit
                          incidents reported</span></div>
                      <Link href={routes.caseStudy.smartCard} className="case-card__link">Read the case study<span aria-hidden="true"
                          className="mono">→</span></Link>
                    </div>
                  </div>
                </article>
    
                <article className="case-card" aria-hidden="true">
                  <div className="case-card__media">
                    <img src="/assets/cs-elicensing.webp" alt="National e-Licensing portal home page"
                      className="case-card__img pos-top" />
                    <div className="case-card__shade"></div>
                    <div className="case-card__caption">
                      <span className="case-card__client">Client: State Regulatory Authorities &amp; Ministries</span>
                      <h3 className="case-card__title">National e-Licensing</h3>
                    </div>
                  </div>
                  <div className="case-card__cols">
                    <div className="case-card__col">
                      <span className="case-card__label case-card__label--challenge">01 · CHALLENGE</span>
                      <p className="case-card__text">Licences and permits needed paper forms, office visits and weeks of
                        waiting, and applicants could not see where their application was.</p>
                    </div>
                    <div className="case-card__col">
                      <span className="case-card__label case-card__label--built">02 · WHAT WE BUILT</span>
                      <p className="case-card__text">One portal: apply and upload documents, routing to the right officer,
                        approval by e-signature, online payment through e-challan, and a signed licence with a QR code.</p>
                    </div>
                    <div className="case-card__col case-card__col--impact">
                      <span className="case-card__label case-card__label--impact">03 · IMPACT</span>
                      <div className="impact"><span className="impact__value">21d → 48h</span><span className="impact__label">time to
                          get a licence</span></div>
                      <div className="impact"><span className="impact__value">100,000+</span><span className="impact__label">licences
                          issued, QR-checkable</span></div>
                      <Link href={routes.caseStudy.eLicensing} className="case-card__link">Read the case study<span aria-hidden="true"
                          className="mono">→</span></Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
    
        {/* Tablet / mobile (<1024px): horizontal swipe cards */}
        <div className="cases-swipe only-narrow">
          <div className="cases-swipe__head">
            <div className="eyebrow" data-reveal="0">FEATURED CASE STUDIES</div>
            <h2 className="cases-title cases-title--fluid" data-reveal="80">Systems we built that people use every day</h2>
            <p className="cases-swipe__hint" data-reveal="120">Swipe →</p>
          </div>
          <div className="cases-swipe__track">
            <article className="case-tile">
              <div className="case-tile__media"><img src="/assets/cs-tcb.webp" alt="TCB Smart Card web portal dashboard"
                  loading="lazy" className="case-card__img pos-top" /></div>
              <div className="case-tile__body">
                <span className="case-tile__tag">Digital Identity · Social Safety Net</span>
                <h3 className="case-tile__title">TCB Smart Card</h3>
                <p className="case-tile__text"><b className="case-tile__b">Challenge.</b> TCB sells low-price goods to more than
                  10 million families in all 64 districts. Paper coupons were easy to copy, some families were listed
                  twice, and there was no live view of what was handed out.</p>
                <div className="case-tile__stats">
                  <div className="impact"><span className="case-tile__value">10M+</span><span className="case-tile__label">families
                      registered once, no duplicates</span></div>
                  <div className="impact"><span className="case-tile__value">99.8%</span><span className="case-tile__label">fewer
                      duplicate claims</span></div>
                </div>
                <Link href={routes.caseStudy.tcb} className="case-tile__link">Read the case study →</Link>
              </div>
            </article>
            <article className="case-tile">
              <div className="case-tile__media"><img src="/assets/cs-ecourt.webp"
                  alt="Industrial e-Court login screen over a courtroom gavel background" loading="lazy"
                  className="case-card__img" /></div>
              <div className="case-tile__body">
                <span className="case-tile__tag">Courts and Justice</span>
                <h3 className="case-tile__title">Industrial e-Court</h3>
                <p className="case-tile__text"><b className="case-tile__b">Challenge.</b> The labour courts ran on paper files.
                  Hearings were scheduled by hand, summons were delivered in person, and workers could not check hearing
                  dates without going to court.</p>
                <div className="case-tile__stats">
                  <div className="impact"><span className="case-tile__value">85%</span><span className="case-tile__label">cut in
                      scheduling delays</span></div>
                  <div className="impact"><span className="case-tile__value">All benches</span><span
                      className="case-tile__label">paperless case tracking</span></div>
                </div>
                <Link href={routes.caseStudy.eCourt} className="case-tile__link">Read the case study →</Link>
              </div>
            </article>
            <article className="case-tile">
              <div className="case-tile__media"><img src="/assets/cs-aicc.webp"
                  alt="Contact centre agent wearing a headset, smiling" loading="lazy"
                  className="case-card__img pos-center-30" /></div>
              <div className="case-tile__body">
                <span className="case-tile__tag">AI · Public Service</span>
                <h3 className="case-tile__title">TCB AI Contact Center</h3>
                <p className="case-tile__text"><b className="case-tile__b">Challenge.</b> Complaints from dealers and
                  beneficiaries came in by phone during office hours and were noted by hand. Reports to officers were
                  late, and follow-up depended on individual staff.</p>
                <div className="case-tile__stats">
                  <div className="impact"><span className="case-tile__value">24/7</span><span className="case-tile__label">answers,
                      with no queue</span></div>
                  <div className="impact"><span className="case-tile__value">100%</span><span className="case-tile__label">of
                      complaints ticketed and followed up</span></div>
                </div>
                <Link href={routes.caseStudy.tcbContactCenter} className="case-tile__link">Read the case study →</Link>
              </div>
            </article>
            <article className="case-tile">
              <div className="case-tile__media"><img src="/assets/cs-smartcard.webp"
                  alt="Hand holding a Bangladesh smart card with QR code" loading="lazy" className="case-card__img" /></div>
              <div className="case-tile__body">
                <span className="case-tile__tag">Secure Cards</span>
                <h3 className="case-tile__title">Smart Card Issuance</h3>
                <p className="case-tile__text"><b className="case-tile__b">Challenge.</b> Driving licences and transport cards
                  had to be produced in large numbers, quickly, and be very hard to copy.</p>
                <div className="case-tile__stats">
                  <div className="impact"><span className="case-tile__value">15,000+</span><span className="case-tile__label">cards
                      personalised every day</span></div>
                  <div className="impact"><span className="case-tile__value">0</span><span className="case-tile__label">counterfeit
                      incidents reported</span></div>
                </div>
                <Link href={routes.caseStudy.smartCard} className="case-tile__link">Read the case study →</Link>
              </div>
            </article>
            <article className="case-tile">
              <div className="case-tile__media"><img src="/assets/cs-elicensing.webp"
                  alt="National e-Licensing portal home page" loading="lazy" className="case-card__img pos-top" /></div>
              <div className="case-tile__body">
                <span className="case-tile__tag">Government Licensing</span>
                <h3 className="case-tile__title">National e-Licensing</h3>
                <p className="case-tile__text"><b className="case-tile__b">Challenge.</b> Licences and permits needed paper
                  forms, office visits and weeks of waiting, and applicants could not see where their application was.</p>
                <div className="case-tile__stats">
                  <div className="impact"><span className="case-tile__value">21d → 48h</span><span className="case-tile__label">time
                      to get a licence</span></div>
                  <div className="impact"><span className="case-tile__value">100,000+</span><span
                      className="case-tile__label">licences issued, QR-checkable</span></div>
                </div>
                <Link href={routes.caseStudy.eLicensing} className="case-tile__link">Read the case study →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
