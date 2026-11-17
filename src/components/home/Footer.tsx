/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <>
    {/* ============ 08 FOOTER ============ */}
    <footer className="site-footer" data-screen-label="08 Footer">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <a href="#top" className="footer-brand__link"><img src="/assets/mark.png" alt="" width="36" height="36" /><span
              className="footer-brand__name">Spectrum IT Solutions</span></a>
          <p className="footer-brand__text">A Dhaka software company building secure digital services for government and
            business since 2012.</p>
          <div className="footer-badges">
            <span className="footer-badges__basis"><img src="/assets/basis.png" alt="BASIS member" width="110"
                height="28" /></span>
            <img src="/assets/iso9001.png" alt="ISO 9001:2015" width="34" height="36" className="footer-badges__iso" />
            <img src="/assets/iso27001.png" alt="ISO 27001:2022" width="34" height="36" className="footer-badges__iso" />
          </div>
        </div>
        <nav aria-label="Valuable projects" className="footer-col">
          <h2 className="footer-col__title">VALUABLE PROJECTS</h2>
          <a href="https://www.licence.gov.bd" className="footer-link">www.licence.gov.bd</a>
          <a href="https://www.ocd.org.bd" className="footer-link">www.ocd.org.bd</a>
          <a href="https://www.tcbsheba.com" className="footer-link">www.tcbsheba.com</a>
          <a href="https://www.ecourt.gov.bd" className="footer-link">www.ecourt.gov.bd</a>
          <a href="https://www.sobticket.com" className="footer-link">www.sobticket.com</a>
        </nav>
        <nav aria-label="Quick links" className="footer-col">
          <h2 className="footer-col__title">QUICK LINKS</h2>
          <a href="#" className="footer-link">Artificial Intelligence</a>
          <a href="#" className="footer-link">Digital Identity &amp; Security</a>
          <a href="#" className="footer-link">TCB Smart Card Technologies</a>
          <a href="#" className="footer-link">Blockchain Technology</a>
          <a href="#" className="footer-link">About Us</a>
          <a href="#" className="footer-link">Our Services</a>
          <a href="#" className="footer-link">Our Products</a>
          <a href="#" className="footer-link">Contact Us</a>
        </nav>
        <address className="footer-col footer-col--address">
          <h2 className="footer-col__title">CONTACT US</h2>
          <span className="footer-address">52/1, New Eskaton Road (Hasan Holdings Ltd., 12th Floor), Dhaka-1000,
            Bangladesh</span>
          <a href="mailto:contact@spectrum.com.bd" className="footer-link">contact@spectrum.com.bd</a>
          <a href="tel:+8801615900004" className="footer-link footer-link--mono">+880 1615-900004</a>
        </address>
      </div>
      <div className="site-footer__bottom">
        <span>Copyright © 2026 Spectrum IT Solutions Ltd. All Rights Reserved.</span>
        <span className="legal"><a href="#">Privacy Policy</a><a href="#">Terms of Use</a></span>
      </div>
    </footer>
    </>
  );
}
