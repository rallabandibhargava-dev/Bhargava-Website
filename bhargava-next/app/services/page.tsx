'use client';
// @ts-nocheck
import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import LivingFooter from '../../components/LivingFooter';
import useRevealObserver from '../../components/useRevealObserver';

function Deliverable({ label, body }) {
  return (
    <div className="dx-deliv">
      <div className="dx-deliv__label">{label}</div>
      <p className="dx-deliv__body">{body}</p>
    </div>
  );
}

function DiagnosticCard() {
  return (
    <article className="dx-card reveal">
      <header className="dx-card__head">
        <div className="dx-card__pill">
          <span className="dx-card__dot" /> START HERE
        </div>
        <h2 className="dx-card__shout">
          GROWTH<br/>
          <span className="ochre-light">DIAGNOSTIC.</span>
        </h2>
        <p className="dx-card__sub">
          A written verdict on what&apos;s actually slowing your growth — and what to fix first.
          Fixed fee, scoped in a single conversation.
        </p>
      </header>

      <div className="dx-card__body">
        <div className="eyebrow dx-card__eyebrow">What you get</div>
        <div className="dx-deliverables">
          <Deliverable
            label="→ FULL-STACK AUDIT"
            body="Funnel, site, channels, stack, analytics. End-to-end look at how growth is actually being built."
          />
          <Deliverable
            label="→ WRITTEN VERDICT"
            body="A document naming what's broken, what's working, and which assumptions don't hold up against the data."
          />
          <Deliverable
            label="→ PRIORITIZED ROADMAP"
            body="The three-to-five fixes that will move the needle, in the order they should be done. With or without me."
          />
        </div>
      </div>

      <footer className="dx-card__foot">
        <Link href="/contact" className="btn btn--ochre">Start a diagnostic →</Link>
        <div className="dx-card__meta">FIXED FEE · SCOPED IN 1 CALL · DELIVERED IN WRITING</div>
      </footer>
    </article>
  );
}

function StageCard({ num, title, framing, subs }) {
  return (
    <article className="stage-card reveal">
      <div className="stage-card__head">
        <div className="stage-card__num">STAGE {num}</div>
        <h3 className="stage-card__title">{title}</h3>
      </div>
      <p className="stage-card__framing">{framing}</p>
      <ul className="stage-card__subs">
        {subs.map((s, i) => (
          <li key={i}>
            <span className="stage-card__sub-label">{s.label}</span>
            <span className="stage-card__sub-dash">—</span>
            <span className="stage-card__sub-desc">{s.desc}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ServicesPage() {
  useRevealObserver();
  return (
    <>
      <SiteNav current="services" />
      <main>
        {/* Page opener */}
        <section className="page-opener">
          <div className="shell">
            <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 24 }}>
              <span className="pulse-dot" /> Services
            </div>
            <h1 className="shout-title page-opener__title">
              HOW WE CAN<br/>
              WORK <span className="ochre">TOGETHER.</span>
            </h1>
            <p className="page-opener__lead">
              Most engagements start with a diagnostic. A few go straight to execution.
              Both paths work — and both start below.
            </p>
          </div>
        </section>

        {/* Diagnostic featured card */}
        <section className="section-pad surface-linen">
          <div className="shell">
            <DiagnosticCard />
          </div>
        </section>

        {/* Divider */}
        <section className="svc-divider-section">
          <div className="shell">
            <div className="svc-divider reveal">
              <div className="eyebrow">— Or, hire me directly for:</div>
              <p className="svc-divider__line">
                If you already know where the leak is, here&apos;s the work across the funnel.
              </p>
            </div>
          </div>
        </section>

        {/* Stage cards */}
        <section className="section-pad-sm">
          <div className="shell">
            <div className="stage-stack">
              <StageCard
                num="01"
                title="Acquisition"
                framing="Getting the right people to the site, with the right intent, at the right cost. Where most budgets get wasted and most briefs get written."
                subs={[
                  { label: 'SEO', desc: 'Content, technical, AEO' },
                  { label: 'Paid Media', desc: 'Search, social, programmatic' },
                ]}
              />
              <StageCard
                num="02"
                title="User Experience"
                framing="What happens after the click. The site, the path through it, the thing that decides whether traffic turns into revenue."
                subs={[
                  { label: 'Website Development', desc: 'Build, rebuild, or fix' },
                  { label: 'UI / UX', desc: 'Flow, interface, hierarchy' },
                  { label: 'CRO', desc: 'Test, iterate, improve' },
                  { label: 'Personalization', desc: 'Segment-driven experience' },
                ]}
              />
              <StageCard
                num="03"
                title="Retention"
                framing="What happens after the first conversion. The part of the funnel most teams never get to, and where the economics actually decide themselves."
                subs={[
                  { label: 'Marketing Automation', desc: 'Lifecycle programs' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Fit qualifier */}
        <section className="section-pad surface-paper">
          <div className="shell shell--narrow">
            <div className="fit-header">
              <div className="eyebrow reveal">— Fit</div>
              <h2 className="fit-title reveal">
                Who this works for. Who it doesn&apos;t.
              </h2>
            </div>
            <div className="fit-grid">
              <div className="fit-col fit-col--yes reveal">
                <div className="fit-col__label">I&apos;m a good fit if…</div>
                <ul>
                  <li>You&apos;re a growth-stage company (Seed to Series B) whose marketing has stalled</li>
                  <li>You want someone who takes ownership of the outcome, not just the task</li>
                  <li>You&apos;re open to being told the fix isn&apos;t where you expected</li>
                  <li>You treat the marketing function as a business function</li>
                </ul>
              </div>
              <div className="fit-col fit-col--no reveal" data-delay="120">
                <div className="fit-col__label">I&apos;m probably not right for…</div>
                <ul>
                  <li>Pre-seed companies without product-market fit</li>
                  <li>Engagements where marketing has to report through three layers of approval</li>
                  <li>Pure creative production work (video, design, copywriting at volume)</li>
                  <li>Companies measuring performance by activity rather than outcomes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="surface-dim on-dark section-pad">
          <div className="shell">
            <div className="cta-block">
              <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 28 }}>
                <span className="pulse-dot" /> 1 of 2 retainer slots open for Q3 2026
              </div>
              <h2 className="shout-title">
                TELL ME WHAT&apos;S<br/>
                SLOWING YOUR<br/>
                <span className="ochre-light">GROWTH</span> DOWN.
              </h2>
              <p className="cta-block__lede">
                One call. One verdict. One plan. You&apos;ll know what&apos;s broken by the end of month one.
              </p>
              <div className="cta-block__actions">
                <Link href="/contact" className="btn btn--ochre">Start the conversation →</Link>
              </div>
              <div className="cta-block__sub">
                OR EMAIL — HI@BHARGAVA.WORK
              </div>
            </div>
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}
