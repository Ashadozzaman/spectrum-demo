/* eslint-disable @next/next/no-img-element */
export default function Clients() {
  return (
    <>
      {/* ============ 06 CERTIFIED & CLIENTS ============ */}
      <section id="clients" className="clients" data-screen-label="06 Certified &amp; clients">
        <div className="clients__inner">
          <div className="clients__head">
            <div className="clients__intro">
              <div className="eyebrow eyebrow--dark" data-reveal="0">QUALITY &amp; STANDARDS</div>
              <h2 className="section-title section-title--dark" data-reveal="80">Certified software engineering</h2>
            </div>
            <p className="clients__lead" data-reveal="140">We follow international standards for quality and information
              security, checked by outside auditors.</p>
          </div>
          <div className="certs">
            <div className="cert" data-reveal="0">
              <img src="/assets/iso9001.png" alt="ISO 9001:2015 certification mark" width="56" height="60"
                className="cert__img" />
              <h3 className="cert__title">ISO 9001:2015 Certified</h3>
              <p className="cert__text">A proven way of working, so every project meets the same standard.</p>
            </div>
            <div className="cert" data-reveal="80">
              <img src="/assets/iso27001.png" alt="ISO 27001:2022 certification mark" width="56" height="60"
                className="cert__img" />
              <h3 className="cert__title">ISO 27001:2022 Certified</h3>
              <p className="cert__text">An outside-audited system for keeping your data safe.</p>
            </div>
            <div className="cert" data-reveal="160">
              <div className="cert__logo-wrap"><img src="/assets/basis.png" alt="BASIS member logo" width="160" height="40"
                  className="cert__basis" /></div>
              <h3 className="cert__title">BASIS Registered Member</h3>
              <p className="cert__text">Active member of Bangladesh Association of Software and Information Services.
                Company ID: <span className="cert__id">21-04-024</span></p>
            </div>
            <div className="cert" data-reveal="240">
              <div className="cert__mono" aria-hidden="true">BCS</div>
              <h3 className="cert__title">BCS Member</h3>
              <p className="cert__text">Member of Bangladesh Computer Samity, the national ICT trade body.</p>
            </div>
          </div>
        </div>
    
        <div className="partners">
          <div className="partners__head">
            <div className="partners__intro">
              <div className="eyebrow eyebrow--dark" data-reveal="0">CLIENTS &amp; PARTNERS</div>
              <h2 className="partners__title" data-reveal="80">Government bodies and institutions that rely on our systems</h2>
            </div>
          </div>
          <div className="marquee">
            <div className="marquee__track">
              <ul aria-label="Clients" className="marquee__list marquee__list--main">
                <li className="client"><span className="client__mono" aria-hidden="true">TCB</span><span className="client__name">Trading Corporation of Bangladesh</span></li>
                <li className="client"><img src="/assets/cl-govbd.webp" alt="Government of Bangladesh seal" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Ministry of Labour &amp; Employment</span></li>
                <li className="client"><img src="/assets/cl-explosives.webp" alt="Department of Explosives logo" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Department of Explosives</span></li>
                <li className="client"><span className="client__mono" aria-hidden="true">GCC</span><span className="client__name">Gazipur City Corporation</span></li>
                <li className="client"><img src="/assets/cl-islamic.webp" alt="Islamic Foundation Bangladesh logo" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Islamic Foundation Bangladesh</span></li>
                <li className="client"><img src="/assets/cl-novo.webp" alt="Novotheatre logo" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Bangabandhu Novotheatre</span></li>
                <li className="client"><img src="/assets/cl-ocd.webp" alt="Officers’ Club Dhaka logo" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Officers’ Club Dhaka</span></li>
                <li className="client"><img src="/assets/cl-govbd.webp" alt="Government of Bangladesh seal" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Ministry of Land</span></li>
                <li className="client"><span className="client__mono" aria-hidden="true">NSC</span><span className="client__name">National Sports Council</span></li>
              </ul>
              {/* Duplicate list for seamless marquee loop */}
              <ul aria-hidden="true" className="marquee__list">
                <li className="client"><span className="client__mono">TCB</span><span className="client__name">Trading Corporation of Bangladesh</span></li>
                <li className="client"><img src="/assets/cl-govbd.webp" alt="" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Ministry of Labour &amp; Employment</span></li>
                <li className="client"><img src="/assets/cl-explosives.webp" alt="" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Department of Explosives</span></li>
                <li className="client"><span className="client__mono">GCC</span><span className="client__name">Gazipur City Corporation</span></li>
                <li className="client"><img src="/assets/cl-islamic.webp" alt="" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Islamic Foundation Bangladesh</span></li>
                <li className="client"><img src="/assets/cl-novo.webp" alt="" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Bangabandhu Novotheatre</span></li>
                <li className="client"><img src="/assets/cl-ocd.webp" alt="" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Officers’ Club Dhaka</span></li>
                <li className="client"><img src="/assets/cl-govbd.webp" alt="" width="60" height="60" loading="lazy" className="client__logo" /><span className="client__name">Ministry of Land</span></li>
                <li className="client"><span className="client__mono">NSC</span><span className="client__name">National Sports Council</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
