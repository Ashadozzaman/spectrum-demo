 
export default function MobileMenu() {
  return (
    <>
    {/* ============ MOBILE MENU ============ */}
    <div className="menu-scrim only-compact" data-menu-close=""></div>
    <aside id="mobile-menu" className="mobile-menu only-compact" aria-label="Mobile menu" aria-hidden="true">
      <div className="mobile-menu__head">
        <span className="mobile-menu__label">MENU</span>
        <button className="mobile-menu__close" aria-label="Close menu" data-menu-close="">×</button>
      </div>
      <nav aria-label="Mobile" className="mobile-nav">
        <a href="#about" className="mobile-nav__link" data-menu-close=""><span>About Us</span><span className="mobile-nav__num">01</span></a>
        <a href="#services" className="mobile-nav__link" data-menu-close=""><span>Services</span><span className="mobile-nav__num">02</span></a>
        <a href="#" className="mobile-nav__link" data-menu-close=""><span>Products</span><span className="mobile-nav__num">03</span></a>
        <a href="#" className="mobile-nav__link" data-menu-close=""><span>Projects</span><span className="mobile-nav__num">04</span></a>
        <a href="#case-studies" className="mobile-nav__link" data-menu-close=""><span>Case Studies</span><span className="mobile-nav__num">05</span></a>
        <a href="#contact" className="mobile-nav__link" data-menu-close=""><span>Contact</span><span className="mobile-nav__num">06</span></a>
      </nav>
      <div className="mobile-menu__foot">
        <a href="#contact" className="mobile-menu__cta" data-menu-close="">Free Consultation</a>
        <div className="mobile-menu__row">
          <a href="tel:+8801615900004" className="mobile-menu__call">Call</a>
          <a href="https://wa.me/8801615900004" className="mobile-menu__wa">WhatsApp</a>
        </div>
      </div>
    </aside>
    </>
  );
}
