/* eslint-disable @next/next/no-img-element */
export default function Header() {
  return (
    <>
    {/* ============ HEADER ============ */}
    <header className="site-header">
      <div className="site-header__inner">
        <a href="#top" className="brand">
          <img src="/assets/mark.png" alt="" width="38" height="38" className="brand__mark" />
          <span className="brand__text">
            <span className="brand__name">Spectrum</span>
            <span className="brand__tag">IT SOLUTIONS LTD.</span>
          </span>
          <span className="sr-only">Spectrum IT Solutions home</span>
        </a>
    
        <nav aria-label="Main" className="main-nav only-desktop">
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#">Products</a>
          <a href="#">Projects</a>
          <a href="#case-studies">Case Studies</a>
          <a href="#contact">Contact</a>
        </nav>
    
        <div className="header-actions">
          <div role="group" aria-label="Language" className="lang-switch">
            <button aria-pressed="true" className="lang-switch__btn">EN</button>
            <button aria-pressed="false" lang="bn" className="lang-switch__btn lang-switch__btn--bn">বাং</button>
          </div>
          <a href="tel:+8801615900004" className="header-phone only-desktop">+880 1615-900004</a>
          <a href="#contact" className="btn-cta-sm only-desktop" data-magnetic="">Free Consultation</a>
          <button className="menu-btn only-compact" aria-label="Open menu" aria-expanded="false"
            aria-controls="mobile-menu" data-menu-open="">
            <span className="menu-btn__bar"></span>
            <span className="menu-btn__bar"></span>
            <span className="menu-btn__bar menu-btn__bar--short"></span>
          </button>
        </div>
      </div>
    </header>
    </>
  );
}
