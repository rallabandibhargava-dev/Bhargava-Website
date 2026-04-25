// Case study template — JLL retargeting
const { useEffect } = React;

function App() {
  useRevealObserver();
  return (
    <>
      <SiteNav current="work" dark />
      <main>
        {/* Opener on Ink */}
        <section className="case-opener surface-ink on-dark">
          <div className="shell">
            <div className="case-opener__meta">
              <span>JLL India</span>
              <span className="case-opener__dot">·</span>
              <span>ABM strategy</span>
              <span className="case-opener__dot">·</span>
              <span>2026</span>
              <span className="case-opener__dot">·</span>
              <span>12-week engagement</span>
            </div>
            <h1 className="case-opener__title shout-title">
              THE RETARGETING<br/>
              BLINDSPOT IN JLL'S<br/>
              ENTERPRISE <span className="ochre">FUNNEL</span>.
            </h1>
            <p className="case-opener__standfirst">
              JLL's India team was spending ₹8 crore annually on demand generation and
              attributing 93% of SALs to a single channel. The work was to figure out whether
              the attribution was wrong, the channel mix was wrong, or both.
            </p>
            <div className="case-opener__scroll">↓ Full case below</div>
          </div>
        </section>

        {/* TL;DR */}
        <section className="section-pad-sm">
          <div className="shell shell--narrow">
            <div className="tldr reveal">
              <div className="tldr__label eyebrow">The short version</div>
              <div className="tldr__grid">
                <div>
                  <div className="tldr__heading">What I found</div>
                  <p>Last-click attribution was hiding a three-channel assist pattern. SEM was the closer, not the opener.</p>
                </div>
                <div>
                  <div className="tldr__heading">What we did</div>
                  <p>Rebuilt attribution on a 28-day linear model. Reallocated 40% of SEM spend into LinkedIn ABM and account-triggered retargeting.</p>
                </div>
                <div>
                  <div className="tldr__heading">Outcome (6 mo)</div>
                  <p>SAL volume up 41%. Cost-per-SAL down 22%. Pipeline attributed to three+ channels, not one.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Context */}
        <section className="section-pad-sm surface-linen">
          <div className="shell shell--narrow">
            <div className="eyebrow reveal" style={{ marginBottom: 24 }}>01 · Context</div>
            <h2 className="case-h2 reveal">
              A mature brand, a stable funnel, and a <span style={{ color: 'var(--ochre)' }}>number that stopped making sense</span>.
            </h2>
            <div className="case-prose">
              <p className="reveal">
                JLL is a 240-office global real estate services firm. The India team runs
                a mid-market and enterprise acquisition motion that's been humming for
                eight years. The marketing team asked me in because the demand gen numbers
                were <em>too good</em>. 93% of sales-accepted leads traced back to paid
                search. That's not how a B2B funnel works. Not at this scale.
              </p>
              <p className="reveal">
                The brief said "optimise SEM spend." The real problem was upstream of SEM
                entirely — in how attribution was being counted. If you only measure the
                last step, every journey ends at the last step. You see a funnel; it's
                actually a lens.
              </p>
            </div>

            <div className="case-pullstat reveal">
              <div className="case-pullstat__num"><CountUp to={93} />%</div>
              <div className="case-pullstat__label">
                of SALs attributed to a single channel.<br/>
                <span style={{ color: 'var(--ochre)' }}>That's a measurement artifact, not a funnel.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnosis — parallax section */}
        <section className="case-parallax" data-screen-label="Diagnosis">
          <div className="case-parallax__bg">
            <PH label="diagnosis — screenshot of attribution model rebuild" ratio="21 / 9" dark />
          </div>
          <div className="case-parallax__overlay" />
          <div className="case-parallax__content">
            <div className="shell shell--narrow">
              <div className="eyebrow eyebrow--ochre">02 · Diagnosis</div>
              <h2 className="case-parallax__title">
                The model was punishing assist channels<br/>
                and rewarding closers.
              </h2>
              <p>
                Rebuilt the attribution on a 28-day linear touch model using the existing
                Salesforce data. Within a week, LinkedIn surfaced as the top opener in 61%
                of journeys. SEM was still the closer — just not the whole story.
              </p>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="section-pad-sm">
          <div className="shell shell--narrow">
            <div className="eyebrow reveal" style={{ marginBottom: 24 }}>03 · Approach</div>
            <h2 className="case-h2 reveal">Three moves, in this order.</h2>
            <ol className="case-steps">
              <li className="case-step reveal">
                <div className="case-step__num">01</div>
                <div>
                  <h3>Rebuild the measurement stack first</h3>
                  <p>Before any spend moved, we changed how spend was being counted. A wrong reallocation on a wrong model would've burned six weeks.</p>
                </div>
              </li>
              <li className="case-step reveal" data-delay="100">
                <div className="case-step__num">02</div>
                <div>
                  <h3>Reallocate in tranches, not all at once</h3>
                  <p>Pulled 15% of SEM spend into LinkedIn ABM for two months. Measured. Pulled another 25%. Never moved more than a quarter of the budget in one step.</p>
                </div>
              </li>
              <li className="case-step reveal" data-delay="200">
                <div className="case-step__num">03</div>
                <div>
                  <h3>Build account-triggered retargeting</h3>
                  <p>When a target account lands on a page, the next 21 days of ads across all channels go warmer, softer, and more expensive. This is the bit that actually moved the needle.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Outcomes */}
        <section className="section-pad-sm surface-dim on-dark">
          <div className="shell shell--narrow">
            <div className="eyebrow eyebrow--ochre reveal" style={{ marginBottom: 24 }}>04 · Outcomes · six months later</div>
            <h2 className="case-h2 reveal" style={{ color: 'var(--paper)' }}>
              Three numbers that matter.
            </h2>
            <div className="case-outcomes">
              <div className="case-outcome reveal">
                <div className="case-outcome__num"><CountUp to={41} />%</div>
                <div className="case-outcome__label">SAL volume increase, flat spend</div>
              </div>
              <div className="case-outcome reveal" data-delay="100">
                <div className="case-outcome__num">−<CountUp to={22} />%</div>
                <div className="case-outcome__label">Cost-per-SAL, within one quarter</div>
              </div>
              <div className="case-outcome reveal" data-delay="200">
                <div className="case-outcome__num">3.4×</div>
                <div className="case-outcome__label">Channels in the average winning journey</div>
              </div>
            </div>
          </div>
        </section>

        {/* What I'd do differently */}
        <section className="section-pad-sm">
          <div className="shell shell--narrow">
            <div className="eyebrow reveal" style={{ marginBottom: 24 }}>05 · Honest note</div>
            <h2 className="case-h2 reveal">What I'd do differently.</h2>
            <div className="case-prose">
              <p className="reveal">
                I spent three weeks on the measurement rebuild when I could have done it
                in ten days. I was being careful because the numbers were load-bearing for
                two quarterly reviews. In hindsight, the caution cost more than a small
                wrong answer would have. Next time I'd ship the v0.1 model in a week and
                iterate against real decisions.
              </p>
              <p className="reveal">
                Also: I under-invested in stakeholder comms during the SEM reallocation.
                The performance marketing lead was nervous for six weeks and I should have
                been sending a Monday-morning note, not a monthly review.
              </p>
            </div>
          </div>
        </section>

        {/* Next case */}
        <section className="case-next surface-ink on-dark">
          <div className="shell">
            <div className="case-next__row">
              <div>
                <div className="eyebrow eyebrow--ochre">Next case</div>
                <h3 className="case-next__title">Repositioning a 150-year-old compressor maker for mid-market India.</h3>
                <div className="case-next__meta">Atlas Copco · Positioning · 2025</div>
              </div>
              <a href="case-atlas-repositioning.html" className="btn">Read next →</a>
            </div>
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}

function CountUp({ to, duration = 1200 }) {
  const [v, setV] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setV(Math.round(eased * to));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{v}</span>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
