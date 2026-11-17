 
export default function Process() {
  return (
    <>
      {/* ============ 05 PROCESS ============ */}
      <section id="process" className="process" data-screen-label="05 How we work" aria-labelledby="proc-h">
        <div className="process__inner">
          <div className="process__intro">
            <div className="eyebrow" data-reveal="0">HOW WE WORK</div>
            <h2 id="proc-h" className="section-title section-title--balance" data-reveal="80">From first talk to long-term
              support</h2>
            <p className="lead lead--pretty" data-reveal="140">From the first plan to a pilot and a nationwide rollout, with
              an honest view of time and cost at every step.</p>
          </div>
          <ol className="timeline" data-timeline="">
            <li className="step" data-step="0.02">
              <span className="step__dot" aria-hidden="true">01</span>
              <span className="step__label">STEP 01</span>
              <h3 className="step__title">Understand</h3>
              <p className="step__desc">We learn how your work is done today, and what needs to change.</p>
            </li>
            <li className="step" data-step="0.3">
              <span className="step__dot" aria-hidden="true">02</span>
              <span className="step__label">STEP 02</span>
              <h3 className="step__title">Plan</h3>
              <p className="step__desc">We agree what to build, the cost and the timeline, in plain words.</p>
            </li>
            <li className="step" data-step="0.6">
              <span className="step__dot" aria-hidden="true">03</span>
              <span className="step__label">STEP 03</span>
              <h3 className="step__title">Build and test</h3>
              <p className="step__desc">We build in stages and test with your own staff before going live.</p>
            </li>
            <li className="step" data-step="0.9">
              <span className="step__dot" aria-hidden="true">04</span>
              <span className="step__label">STEP 04</span>
              <h3 className="step__title">Support</h3>
              <p className="step__desc">We train your team, keep the system running and improve it over time.</p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
