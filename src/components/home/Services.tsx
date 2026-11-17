/* eslint-disable @next/next/no-img-element */
export default function Services() {
  return (
    <>
      {/* ============ 03 SERVICES ============ */}
      <section id="services" className="services" data-screen-label="03 Services" aria-labelledby="svc-h">
        <div className="services__dots" aria-hidden="true"></div>
        <div className="services__inner">
          <div className="services__head">
            <div className="services__intro">
              <div className="eyebrow" data-reveal="0">OUR CORE SERVICES</div>
              <h2 id="svc-h" className="section-title" data-reveal="80">What we do best</h2>
              <p className="lead" data-reveal="140">Each one has its own page that explains it in plain words.</p>
            </div>
          </div>
          <div className="services__grid">
            <a href="#" className="svc-card" data-reveal="0" data-tilt="">
              <div className="svc-card__glow" aria-hidden="true"></div>
              <div className="svc-card__border" aria-hidden="true"></div>
              <div className="svc-card__top">
                <img src="/assets/ic-identity.png" alt="" width="56" height="56" className="svc-card__icon" />
                <span className="svc-card__num">01</span>
              </div>
              <h3 className="svc-card__title">Digital Identity &amp; Security</h3>
              <p className="svc-card__desc">Check that people and documents are real, from NID checks and face matching to
                smart cards.</p>
              <span className="svc-card__more">Explore solutions<span aria-hidden="true" className="mono">→</span></span>
            </a>
            <a href="#" className="svc-card" data-reveal="70" data-tilt="">
              <div className="svc-card__glow" aria-hidden="true"></div>
              <div className="svc-card__border" aria-hidden="true"></div>
              <div className="svc-card__top">
                <img src="/assets/ic-card.png" alt="" width="56" height="56" className="svc-card__icon" />
                <span className="svc-card__num">02</span>
              </div>
              <h3 className="svc-card__title">Smart Card Technologies</h3>
              <p className="svc-card__desc">Design, print, encode and check secure ID, staff and service cards.</p>
              <span className="svc-card__more">Explore solutions<span aria-hidden="true" className="mono">→</span></span>
            </a>
            <a href="#" className="svc-card" data-reveal="140" data-tilt="">
              <div className="svc-card__glow" aria-hidden="true"></div>
              <div className="svc-card__border" aria-hidden="true"></div>
              <div className="svc-card__top">
                <img src="/assets/ic-ai.png" alt="" width="56" height="56" className="svc-card__icon" />
                <span className="svc-card__num">03</span>
              </div>
              <h3 className="svc-card__title">Artificial Intelligence</h3>
              <p className="svc-card__desc">Practical AI that reads Bangla and English documents, matches faces and flags
                fraud.</p>
              <span className="svc-card__more">Explore solutions<span aria-hidden="true" className="mono">→</span></span>
            </a>
            <a href="#" className="svc-card" data-reveal="210" data-tilt="">
              <div className="svc-card__glow" aria-hidden="true"></div>
              <div className="svc-card__border" aria-hidden="true"></div>
              <div className="svc-card__top">
                <img src="/assets/ic-anti.png" alt="" width="56" height="56" className="svc-card__icon" />
                <span className="svc-card__num">04</span>
              </div>
              <h3 className="svc-card__title">Anti-Counterfeit Solutions</h3>
              <p className="svc-card__desc">Stop fake documents, cards and certificates, and catch them in seconds with QR
                checks and AI.</p>
              <span className="svc-card__more">Explore solutions<span aria-hidden="true" className="mono">→</span></span>
            </a>
            <a href="#" className="svc-card" data-reveal="280" data-tilt="">
              <div className="svc-card__glow" aria-hidden="true"></div>
              <div className="svc-card__border" aria-hidden="true"></div>
              <div className="svc-card__top">
                <img src="/assets/ic-chain.png" alt="" width="56" height="56" className="svc-card__icon" />
                <span className="svc-card__num">05</span>
              </div>
              <h3 className="svc-card__title">Blockchain Technology</h3>
              <p className="svc-card__desc">Tamper-proof records for land, certificates and supply chains, with QR
                verification and private blockchain networks.</p>
              <span className="svc-card__more">Explore solutions<span aria-hidden="true" className="mono">→</span></span>
            </a>
            <a href="#" className="svc-all" data-reveal="400">
              <span className="svc-all__label">SEE EVERYTHING WE DO</span>
              <div>
                <div className="svc-all__count">19</div>
                <div className="svc-all__caption">Services and systems</div>
              </div>
              <span className="svc-all__foot">View all services<span aria-hidden="true" className="mono">→</span></span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
