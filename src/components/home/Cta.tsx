 
export default function Cta() {
  return (
    <>
      {/* ============ 07 CTA ============ */}
      <section id="contact" className="cta" data-screen-label="07 CTA" aria-labelledby="cta-h">
        <div className="cta__box" data-reveal="0">
          <div className="cta__grid" aria-hidden="true"></div>
          <div className="cta__orb" aria-hidden="true"></div>
          <div className="cta__copy">
            <div className="eyebrow eyebrow--light">LET’S TALK</div>
            <h2 id="cta-h" className="cta__title">Have a project in mind?</h2>
            <p className="cta__text">Tell us what you need. We will show you how we would build it, with an honest view of
              time and cost.</p>
          </div>
          <div className="cta__actions">
            <a href="#" className="btn-cta-lg" data-magnetic="">Book a free consultation<span aria-hidden="true"
                className="mono">→</span></a>
            <div className="cta__row">
              <a href="https://wa.me/8801615900004" className="btn-glass">WhatsApp</a>
              <a href="tel:+8801615900004" className="btn-glass">Call us</a>
            </div>
            <span className="cta__phone">+880 1615-900004</span>
          </div>
        </div>
      </section>
    </>
  );
}
