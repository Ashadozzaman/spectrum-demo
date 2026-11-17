 
/* Deterministic QR-like pattern for the back of the demo card (21×21). */
const QR_CELLS: boolean[] = (() => {
  const N = 21;
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const finder = (r: number, c: number) => {
    for (const [R, C] of [[0, 0], [0, 14], [14, 0]]) {
      if (r >= R && r < R + 7 && c >= C && c < C + 7) {
        const y = r - R, x = c - C;
        return y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4) ? 1 : 0;
      }
    }
    return -1;
  };
  const cells: boolean[] = [];
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      const f = finder(r, c);
      cells.push(f === -1 ? rnd() > 0.52 : f === 1);
    }
  return cells;
})();

export default function Hero() {
  return (
    <>
      {/* ============ 01 HERO ============ */}
      <section id="top" className="hero" data-screen-label="01 Hero">
        <div className="hero__grid-bg" aria-hidden="true"></div>
        <div className="hero__orb" aria-hidden="true"></div>
        <div className="hero__glow" aria-hidden="true" data-hero-glow=""></div>
    
        <div className="hero__inner">
          <div className="hero__layout">
            <div className="hero__copy">
              <h1 className="hero__kicker">
                <span className="hero__kicker-dot" aria-hidden="true"></span>Spectrum IT Solutions · Digital identity, smart
                card &amp; AI systems for Bangladesh
              </h1>
    
              <div className="hero__slides" aria-live="polite">
                <div className="hero-slide is-active" aria-hidden="false">
                  <h2 className="hero-slide__title">Secure and seamless future with <span className="hl">digital identity</span></h2>
                  <p className="hero-slide__text">Check that people and documents are real, quickly and safely, for banks,
                    offices and public services.</p>
                </div>
                <div className="hero-slide" aria-hidden="true">
                  <h2 className="hero-slide__title">Secure personal identification with <span className="hl">smart cards</span></h2>
                  <p className="hero-slide__text">Secure cards for ID, staff and services: designed, printed, encoded and
                    checked by one team.</p>
                </div>
                <div className="hero-slide" aria-hidden="true">
                  <h2 className="hero-slide__title">Get more done with <span className="hl">artificial intelligence</span></h2>
                  <p className="hero-slide__text">AI that reads documents, matches faces and spots fraud, so your team can
                    focus on the work that matters.</p>
                </div>
                <div className="hero-slide" aria-hidden="true">
                  <h2 className="hero-slide__title">The future of digital trust lies in <span className="hl">blockchain</span></h2>
                  <p className="hero-slide__text">Records and certificates that cannot be secretly changed, and that anyone
                    allowed can check in seconds.</p>
                </div>
                <div className="hero-slide" aria-hidden="true">
                  <h2 className="hero-slide__title">Catch fakes in seconds with <span className="hl">anti-counterfeit</span> checks</h2>
                  <p className="hero-slide__text">Stop fake documents, cards and certificates, and catch them in seconds with
                    QR checks and AI.</p>
                </div>
              </div>
    
              <div className="hero__actions">
                <a href="#services" className="btn-primary" data-magnetic="">Explore solution<span aria-hidden="true"
                    className="mono">→</span></a>
                <button className="btn-video"><span aria-hidden="true" className="btn-video__icon">▶</span>Watch video</button>
              </div>
    
              <ul aria-label="Credentials" className="hero__creds">
                <li>ISO 9001:2015</li>
                <li>ISO 27001:2022</li>
                <li>BASIS member</li>
                <li>Since 2012</li>
              </ul>
            </div>
    
            {/* Animated solution panel */}
            <div className="hero-panel" role="img" data-hero-panel=""
              aria-label="Animation: a face scan line passes over a portrait while liveness and NID match checks turn green.">
              <div className="hero-stage" aria-hidden="true" data-hero-stage="">
                <div className="stage-bar">
                  <span>SPECTRUM · <span data-scene-label="">IDENTITY.VERIFY</span></span>
                  <span className="stage-live" data-live=""><span className="stage-live__dot"></span><span data-live-text="">LIVE</span></span>
                </div>
    
                {/* Scene 1: Digital identity */}
                <div className="scene scene--identity is-active">
                  <div className="face">
                    <div className="face__img">
                      <div className="face__scan"></div>
                      <div className="face__dot face__dot--1"></div>
                      <div className="face__dot face__dot--2"></div>
                      <div className="face__dot face__dot--3"></div>
                      <div className="face__dot face__dot--4"></div>
                      <div className="face__dot face__dot--5"></div>
                      <div className="face__dot face__dot--6"></div>
                    </div>
                    <div className="face__ring"></div>
                  </div>
                  <div className="checks">
                    <div className="check-card">
                      <div className="check-card__label">FACE DETECTED</div>
                      <div className="check-card__value">✓ 1 face · frontal</div>
                    </div>
                    <div className="check-card">
                      <div className="check-card__label">LIVENESS</div>
                      <div className="check-card__value">✓ Live person</div>
                    </div>
                    <div className="check-card">
                      <div className="check-card__label check-card__label--row"><span>NID MATCH</span><span
                          className="check-card__pct">99.8%</span></div>
                      <div className="meter">
                        <div className="meter__fill"></div>
                      </div>
                    </div>
                    <div className="checks__note">Response 0.8 s · on-premise</div>
                  </div>
                </div>
    
                {/* Scene 2: TCB smart card */}
                <div className="scene scene--card">
                  <div className="rings">
                    <div className="rings__ring"></div>
                    <div className="rings__ring"></div>
                    <div className="rings__ring"></div>
                  </div>
                  <div className="flip-card">
                    <div className="flip-card__front">
                      <div className="idcard__head">
                        <div className="idcard__seal">
                          <div className="idcard__seal-dot"></div>
                        </div>
                        <div className="idcard__titles">
                          <span className="idcard__gov">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</span>
                          <span className="idcard__type">TCB SMART CARD · টিসিবি স্মার্ট কার্ড</span>
                        </div>
                      </div>
                      <div className="idcard__body">
                        <div className="idcard__photo">
                          <div className="idcard__head-shape"></div>
                        </div>
                        <div className="idcard__fields">
                          <span>নাম: রহিম উদ্দিন আহমেদ</span>
                          <span className="idcard__en">Name: RAHIM UDDIN AHMED</span>
                          <span>পরিবারের সদস্য: ৫ জন</span>
                          <span className="idcard__no">2071 4410 0938</span>
                        </div>
                      </div>
                      <div className="idcard__chip">
                        <div className="idcard__chip-line idcard__chip-line--h1"></div>
                        <div className="idcard__chip-line idcard__chip-line--h2"></div>
                        <div className="idcard__chip-line idcard__chip-line--v"></div>
                      </div>
                      <div className="idcard__specimen">SPECIMEN · DEMO CARD</div>
                    </div>
                    <div className="flip-card__back">
                      <div className="idcard__stripe"></div>
                      <div className="qr">
                        {QR_CELLS.map((on, i) => (
                          <div key={i} className={on ? "qr__cell is-on" : "qr__cell"}></div>
                        ))}
                      </div>
                      <div className="idcard__verify">
                        <span className="idcard__verify-title">SCAN TO VERIFY</span>
                        <span>Chip + QR signed record</span>
                        <span className="bn">ডিলার যাচাই করবেন বিক্রির আগে</span>
                      </div>
                    </div>
                  </div>
                  <div className="pill-ok pill-ok--pop"><span className="pill-ok__icon">✓</span>Verified · chip + QR · 0.1 s</div>
                </div>
    
                {/* Scene 3: Artificial intelligence */}
                <div className="scene scene--ai">
                  <div className="doc">
                    <div className="doc__title">জমির খতিয়ান · যাচাই ফরম</div>
                    <div className="doc__fields">
                      <div className="doc__field">
                        <div className="doc__hl"></div><span className="doc__text">মালিকের নাম: রহিম উদ্দিন আহমেদ</span>
                      </div>
                      <div className="doc__field">
                        <div className="doc__hl"></div><span className="doc__text">খতিয়ান নং: ১২৪৭</span>
                      </div>
                      <div className="doc__field">
                        <div className="doc__hl"></div><span className="doc__text">দাগ নং: ৩৩০৮ · মৌজা: গাজীপুর</span>
                      </div>
                      <div className="doc__field">
                        <div className="doc__hl"></div><span className="doc__text">জমির পরিমাণ: ০.৪২ একর</span>
                      </div>
                      <div className="doc__line"></div>
                      <div className="doc__line"></div>
                      <div className="doc__line"></div>
                    </div>
                    <div className="doc__scan"></div>
                  </div>
                  <div className="ocr">
                    <div className="ocr__label">EXTRACTED · BANGLA OCR</div>
                    <div className="ocr__item ocr__item--accent">
                      <div className="ocr__key">owner</div>
                      <div className="ocr__val">Rahim Uddin Ahmed</div>
                    </div>
                    <div className="ocr__item">
                      <div className="ocr__key">khatian_no</div>
                      <div className="ocr__val">1247</div>
                    </div>
                    <div className="ocr__item">
                      <div className="ocr__key">dag_no · mouza</div>
                      <div className="ocr__val">3308 · Gazipur</div>
                    </div>
                    <div className="ocr__item">
                      <div className="ocr__key">area</div>
                      <div className="ocr__val">0.42 acre</div>
                    </div>
                    <div className="ocr__result">✓ Matches land record</div>
                  </div>
                </div>
    
                {/* Scene 4: Blockchain */}
                <div className="scene scene--chain">
                  <div className="chain">
                    <div className="chain-block"><span className="chain-block__id">BLOCK 1042</span><span className="chain-block__name">Land
                        deed</span><span className="chain-block__hash">#9f3a…c1</span></div>
                    <div className="link"></div>
                    <div className="chain-block"><span className="chain-block__id">BLOCK 1043</span><span
                        className="chain-block__name">Certificate</span><span className="chain-block__hash">#47be…08</span></div>
                    <div className="link"></div>
                    <div className="chain-block"><span className="chain-block__id">BLOCK 1044</span><span
                        className="chain-block__name">Shipment</span><span className="chain-block__hash">#d21f…7e</span></div>
                    <div className="link link--new"></div>
                    <div className="chain-block chain-block--new"><span className="chain-block__id">BLOCK 1045</span><span className="chain-block__name">New
                        record</span><span className="chain-block__hash">#08c4…b9</span></div>
                  </div>
                  <div className="seal-row">
                    <div className="pill-ok"><span className="pill-ok__icon">✓</span>Chain intact · 4 of 4 nodes agree</div>
                    <div className="pill-ghost">Check by QR</div>
                  </div>
                </div>
    
                {/* Scene 5: Anti-counterfeit */}
                <div className="scene scene--anti">
                  <div className="anti__bg"></div>
                  <div className="anti__shade"></div>
                  <div className="anti__shimmer"></div>
                  <div className="anti__lens"></div>
                  <div className="anti__checks">
                    <div className="anti__label">AUTHENTICITY CHECK</div>
                    <div className="anti__check"><span className="ok">✓</span>Hologram</div>
                    <div className="anti__check"><span className="ok">✓</span>Microprint</div>
                    <div className="anti__check"><span className="ok">✓</span>Chip data match</div>
                    <div className="anti__check anti__check--result">Genuine · 3/3</div>
                  </div>
                </div>
    
                <div className="stage-foot">
                  <span>AES-256 · ON-PREMISE · AUDIT LOGGED</span><span><span data-scene-num="">01</span> / 05</span>
                </div>
                <div className="corner corner--tl"></div>
                <div className="corner corner--tr"></div>
                <div className="corner corner--bl"></div>
                <div className="corner corner--br"></div>
              </div>
            </div>
          </div>
    
          <div role="tablist" aria-label="Solutions" className="hero-tabs">
            <button role="tab" aria-selected="true" className="hero-tab">
              <div className="hero-tab__track"><div className="hero-tab__bar"></div></div>
              <div className="hero-tab__meta"><span className="hero-tab__num">01</span><span className="hero-tab__label">Digital Identity</span></div>
            </button>
            <button role="tab" aria-selected="false" className="hero-tab">
              <div className="hero-tab__track"><div className="hero-tab__bar"></div></div>
              <div className="hero-tab__meta"><span className="hero-tab__num">02</span><span className="hero-tab__label">TCB Smart Card</span></div>
            </button>
            <button role="tab" aria-selected="false" className="hero-tab">
              <div className="hero-tab__track"><div className="hero-tab__bar"></div></div>
              <div className="hero-tab__meta"><span className="hero-tab__num">03</span><span className="hero-tab__label">Artificial Intelligence</span></div>
            </button>
            <button role="tab" aria-selected="false" className="hero-tab">
              <div className="hero-tab__track"><div className="hero-tab__bar"></div></div>
              <div className="hero-tab__meta"><span className="hero-tab__num">04</span><span className="hero-tab__label">Blockchain</span></div>
            </button>
            <button role="tab" aria-selected="false" className="hero-tab">
              <div className="hero-tab__track"><div className="hero-tab__bar"></div></div>
              <div className="hero-tab__meta"><span className="hero-tab__num">05</span><span className="hero-tab__label">Anti-Counterfeit</span></div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
