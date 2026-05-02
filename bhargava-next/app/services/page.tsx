'use client';
// @ts-nocheck
import { useRef, useState } from 'react';
import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import LivingFooter from '../../components/LivingFooter';
import MobileScrollCue from '../../components/MobileScrollCue';
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
          GROWTH<br />
          <span className="ochre-light">DIAGNOSTIC.</span>
        </h2>
        <p className="dx-card__sub">
          A written verdict on what&apos;s actually slowing your growth and what to fix first.
          Fixed fee, scoped in a single conversation.
        </p>
      </header>

      <div className="dx-card__body">
        <div className="eyebrow dx-card__eyebrow">What you get</div>
        <div className="dx-deliverables">
          <Deliverable
            label="Full-stack audit"
            body="Funnel, site, channels, stack, analytics. End-to-end look at how growth is actually being built."
          />
          <Deliverable
            label="Written verdict"
            body="A document naming what&apos;s broken, what&apos;s working, and which assumptions don&apos;t hold up against the data."
          />
          <Deliverable
            label="Prioritized roadmap"
            body="The three-to-five fixes that will move the needle, in the order they should be done. With or without me."
          />
        </div>
      </div>

      <footer className="dx-card__foot">
        <Link href="/contact" className="btn btn--ochre">Start a diagnostic →</Link>
        <div className="dx-card__meta">Fixed fee · scoped in 1 call · delivered in writing</div>
      </footer>
    </article>
  );
}

function StageCard({ index, num, title, framing, subs, active, onSelect, registerCard }) {
  return (
    <article
      ref={(node) => registerCard(index, node)}
      className={'stage-card reveal' + (active ? ' is-active' : '')}
      data-stage-index={index}
      style={{
        zIndex: 10 + index,                                         // later cards sit on top
        ['--stage-top' as string]:    `${80 + index * 90}px`,      // desktop: wider offset shows card headers
        ['--stage-top-sm' as string]: `${72 + index * 52}px`,      // mobile: 52px peek shows card header
      }}
    >
      <button
        type="button"
        className="stage-card__toggle"
        onClick={() => onSelect(index)}
        aria-expanded={active}
      >
        <div className="stage-card__head">
          <div className="stage-card__num">Stage {num}</div>
          <h3 className="stage-card__title">{title}</h3>
        </div>
      </button>

      <div className="stage-card__content">
        <div className="stage-card__content-inner">
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
          <div className="stage-card__cta-wrap">
            <Link href="/contact" className="stage-card__cta link-draw">
              Talk about {title.toLowerCase()} →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

const STAGES = [
  {
    num: '01',
    title: 'Acquisition',
    framing:
      'Getting the right people to the site, with the right intent, at the right cost. Where most budgets get wasted and most briefs get written.',
    subs: [
      { label: 'SEO', desc: 'Content, technical, AEO' },
      { label: 'Paid Media', desc: 'Search, social, programmatic' },
    ],
  },
  {
    num: '02',
    title: 'User Experience',
    framing:
      'What happens after the click. The site, the path through it, the thing that decides whether traffic turns into revenue.',
    subs: [
      { label: 'Website Development', desc: 'Build, rebuild, or fix' },
      { label: 'UI / UX', desc: 'Flow, interface, hierarchy' },
      { label: 'CRO', desc: 'Test, iterate, improve' },
      { label: 'Personalization', desc: 'Segment-driven experience' },
    ],
  },
  {
    num: '03',
    title: 'Retention',
    framing:
      'What happens after the first conversion. The part of the funnel most teams never get to, and where the economics actually decide themselves.',
    subs: [{ label: 'Marketing Automation', desc: 'Lifecycle programs' }],
  },
];

export default function ServicesPage() {
  const [activeStage, setActiveStage] = useState(0);
  const stageCardsRef = useRef([]);

  useRevealObserver();

  const registerCard = (index, node) => {
    stageCardsRef.current[index] = node;
  };

  const onSelectStage = (index) => {
    setActiveStage(index);
  };

  const scrollToSection = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SiteNav current="services" />
      <main>
        <section className="page-opener services-opener">
          <div className="shell">
            <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 24 }}>
              <span className="pulse-dot" /> Services
            </div>
            <h1 className="shout-title page-opener__title">
              HOW WE CAN<br />
              WORK <span className="ochre">TOGETHER.</span>
            </h1>
            <p className="page-opener__lead">
              Most engagements start with a diagnostic. A few go straight to execution.
              Both paths work and both start below.
            </p>
            <div className="services-opener-paths">
              <a
                href="#service-diagnostic"
                className="services-opener-path services-opener-path--link"
                onClick={(event) => scrollToSection(event, 'service-diagnostic')}
              >
                <div className="services-opener-path__kicker">Path 01</div>
                <h2 className="services-opener-path__title">Start with a diagnostic</h2>
                <p className="services-opener-path__body">
                  Best when the slowdown is real but the root cause still needs to be diagnosed.
                </p>
              </a>
              <a
                href="#service-direct-hire"
                className="services-opener-path services-opener-path--link"
                onClick={(event) => scrollToSection(event, 'service-direct-hire')}
              >
                <div className="services-opener-path__kicker">Path 02</div>
                <h2 className="services-opener-path__title">Hire me for a specific stage</h2>
                <p className="services-opener-path__body">
                  Best when you already know where the leak is and want direct execution.
                </p>
              </a>
            </div>
            <MobileScrollCue />
          </div>
        </section>

        <section id="service-diagnostic" className="section-pad surface-linen">
          <div className="shell">
            <DiagnosticCard />
          </div>
        </section>

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

        <section id="service-direct-hire" className="section-pad-sm">
          <div className="shell">
            <div className="stage-stack">
              {STAGES.map((stage, index) => (
                <StageCard
                  key={stage.num}
                  index={index}
                  active={activeStage === index}
                  onSelect={onSelectStage}
                  registerCard={registerCard}
                  {...stage}
                />
              ))}
            </div>
          </div>
        </section>

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

        <section className="surface-dim on-dark section-pad">
          <div className="shell">
            <div className="cta-block">
              <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 28 }}>
                <span className="pulse-dot" /> 1 of 2 retainer slots open for Q3 2026
              </div>
              <h2 className="shout-title">
                TELL ME WHAT&apos;S<br />
                SLOWING YOUR<br />
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
