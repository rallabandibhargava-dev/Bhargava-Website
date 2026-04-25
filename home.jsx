// Homepage app
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH, useCallback: useCallbackH } = React;

/* ------- Hero (C01) ------- */
function Hero({ headlineLine1, headlineLine2, headlineLine3Before, accentWord, headlineLine3After, eyebrow, subhead }) {
  const [mounted, setMounted] = useStateH(false);
  useEffectH(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  // Supporting tagline assembled from the tweakable lines
  const taglineParts = [
    { text: headlineLine1, kind: 'plain' },
    { text: headlineLine2, kind: 'plain' },
    { text: headlineLine3Before, kind: 'plain' },
    { text: accentWord, kind: 'accent' },
    { text: headlineLine3After, kind: 'plain' },
  ].filter(p => p.text && p.text.trim());

  return (
    <section className="hero-c1 on-dark" data-screen-label="01 Hero">
      <div className="hero-c1__bg">
        <div className="hero-c1__bg-inner">
          <img src="assets/bhargava-portrait.png" alt="Bhargava, independent marketing strategist" className="hero-c1__portrait" />
        </div>
        <div className="hero-c1__overlay" />
      </div>

      <div className="hero-c1__type">
        <div className={'hero-c1__eyebrow fade-up' + (mounted ? ' is-in' : '')}>
          <span className="pulse-dot" />
          {eyebrow}
        </div>

        <h1 className={'hero-c1__shout' + (mounted ? ' is-in' : '')}>
          I FIGURE OUT<br/>
          WHY <span className="hero-c1__shout-accent">GROWTH</span><br/>
          STALLED.
        </h1>

        <p className={'hero-c1__sub fade-up' + (mounted ? ' is-in' : '')} style={{ transitionDelay: '400ms' }}>
          {subhead}
        </p>

        <div className={'hero-c1__ctas fade-up' + (mounted ? ' is-in' : '')} style={{ transitionDelay: '550ms' }}>
          <a href="work.html" className="btn btn--ochre">See the work →</a>
          <a href="contact.html" className="btn">Book a call</a>
        </div>
      </div>

      <div className="hero-c1__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero-c1__scroll-arrow">↓</span>
      </div>
    </section>
  );
}

/* ------- Problem framing ------- */
/* ------- CP01 Method strip ------- */
function MethodStrip() {
  const steps = [
    {
      num: '01',
      title: 'DIAGNOSE',
      body: "Every engagement starts with a written diagnosis of what's actually slowing the system. Usually the first useful document the team has seen in months.",
    },
    {
      num: '02',
      title: 'PRIORITIZE',
      body: "Five problems, one lever. I work out which fix moves the needle first — and which can wait. Most plans fail because they try to do everything at once.",
    },
    {
      num: '03',
      title: 'EXECUTE',
      body: "I run the work directly or orchestrate the team. No handoffs to specialists who don't have context. The person who made the diagnosis stays on the fix.",
    },
  ];
  return (
    <section className="section-pad method-strip" data-screen-label="02 Method strip">
      <div className="shell">
        <header className="method-strip__head">
          <div className="eyebrow">02 · The method</div>
          <h2 className="shout-title method-strip__title reveal">
            I DON'T<br/>
            SHIP <span className="ochre">GUESSES.</span><br/>
            I SHIP FIXES.
          </h2>
          <p className="method-strip__intro reveal" data-delay="120">
            The work begins with a diagnosis. Not a plan. Not a pitch. A written verdict on what's actually broken.
          </p>
        </header>
        <ol className="method-strip__cols">
          {steps.map((s, i) => (
            <li key={s.num} className="method-col reveal" data-delay={((i + 1) * 120).toString()}>
              <div className="method-col__num">{s.num}</div>
              <div className="method-col__connector" aria-hidden="true" />
              <h3 className="method-col__title">{s.title}</h3>
              <p className="method-col__body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------- CP02 Positioning quote ------- */
function PositioningQuote() {
  return (
    <section className="surface-linen section-pad-sm positioning-quote" data-screen-label="03 Positioning quote">
      <div className="shell">
        <div className="pq-block">
          <div className="pq-eyebrow reveal">
            <span className="pq-rule" aria-hidden="true" />
            — THE POSITIONING
          </div>
          <p className="pq-body reveal" data-delay="120">
            Growth doesn't break because <span className="pq-strike">SEO stopped working</span> or <span className="pq-strike">ads got expensive</span>. It breaks because things are working in isolation — the intent is off, the message doesn't land, the value doesn't stick. I work at the seam where <span className="pq-accent">marketing decisions become business decisions</span>. <span className="pq-underline">That's the work.</span>
          </p>
          <div className="pq-sign reveal" data-delay="240">
            <span className="pq-rule pq-rule--short" aria-hidden="true" />
            — BHARGAVA · HOW I LOOK AT GROWTH
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------- Featured work (C02, 3 cards) ------- */
const FEATURED_WORK = [
  {
    slug: 'jll-retargeting',
    client: 'JLL India',
    type: 'ABM strategy',
    year: '2026',
    title: 'The retargeting blindspot in JLL\'s enterprise funnel',
    tag: 'Acquisition',
    surface: 'linen',
  },
  {
    slug: 'atlas-repositioning',
    client: 'Atlas Copco',
    type: 'Positioning',
    year: '2025',
    title: 'Repositioning a 150-year-old compressor maker for mid-market India',
    tag: 'Positioning',
    surface: 'dim',
  },
  {
    slug: 'cde-tool',
    client: 'Self-published',
    type: 'Tool built',
    year: '2025',
    title: 'CDE — a diagnostic engine for stuck campaigns',
    tag: 'Tools',
    surface: 'ochre',
  },
];

function FeaturedWork() {
  return (
    <section className="section-pad" data-screen-label="03 Featured work">
      <div className="shell">
        <header className="section-head">
          <div className="section-head__left">
            <div className="eyebrow">03 · Selected work</div>
            <h2 className="shout-title">
              THREE PROBLEMS.<br/>
              THREE <span className="ochre">REFRAMES</span>.
            </h2>
          </div>
          <a href="work.html" className="section-head__right link-draw">
            EXPLORE MORE →
          </a>
        </header>
        <div className="work-grid">
          {FEATURED_WORK.map((w, i) => (
            <WorkCard key={w.slug} item={w} index={i} hideTag />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ item, index, hideTag }) {
  return (
    <a href={`case-${item.slug}.html`} className={`work-card work-card--${item.surface} reveal`} data-delay={(index * 100).toString()}>
      <div className="work-card__media">
        <div className={'ph-image img-reveal' + (item.surface === 'dim' ? ' ph-image--dark' : '')} style={{ aspectRatio: '16 / 11', width: '100%', height: '100%' }}>
          <div className="ph-image__label">case image · {item.client.toLowerCase().replace(/ /g, '-')}</div>
        </div>
        <div className="work-card__media-overlay" />
        {!hideTag && <span className="tag tag--ochre work-card__tag">{item.tag}</span>}
      </div>
      <div className="work-card__meta">
        <div className="work-card__line">
          <span>{item.client}</span>
          <span className="work-card__dot">·</span>
          <span>{item.type}</span>
          <span className="work-card__dot">·</span>
          <span>{item.year}</span>
        </div>
      </div>
      <h3 className="work-card__title">{item.title}</h3>
      <div className="work-card__read">
        Read case <span className="work-card__arrow">→</span>
      </div>
    </a>
  );
}

/* ------- Three-Stage Services (CS-HP) ------- */
const STAGES = [
  {
    num: '01',
    name: 'ACQUISITION',
    shortName: 'Acquisition',
    description: 'Getting the right people to the site, with the right intent, at the right cost. Where most budgets get wasted and most briefs get written.',
    services: [
      { name: 'SEO', desc: 'Content architecture, technical SEO, answer-engine optimization (AEO), and the work of turning intent into rankings.' },
      { name: 'Paid Media', desc: 'Search, social, programmatic. Strategy, structure, and the operational discipline most campaigns are missing.' },
    ],
  },
  {
    num: '02',
    name: 'USER EXPERIENCE',
    shortName: 'UX',
    description: 'What happens after the click. The site, the path through it, the thing that decides whether traffic turns into revenue.',
    services: [
      { name: 'Website Development', desc: 'Build, rebuild, or fix. From Webflow and Shopify to custom stacks — whatever the business needs.' },
      { name: 'UI / UX', desc: 'Flow, interface, hierarchy. Making the site work for the user and the business at the same time.' },
      { name: 'CRO', desc: "Test, iterate, improve. Conversion isn't a number you inherit — it's a discipline you build." },
      { name: 'Personalization', desc: 'Segment-driven experience. The same site telling different stories to different visitors, based on what they need.' },
    ],
  },
  {
    num: '03',
    name: 'RETENTION',
    shortName: 'Retention',
    description: 'What happens after the first conversion. The part of the funnel most teams never get to, and where the economics actually decide themselves.',
    services: [
      { name: 'Marketing Automation', desc: 'Lifecycle programs. Email, SMS, in-app, and the logic that turns one-time buyers into repeat customers.' },
    ],
  },
];

function ThreeStageServices({ sectionRef, inView }) {
  const [activeIdx, setActiveIdx] = useStateH(0);
  const [displayIdx, setDisplayIdx] = useStateH(0);
  const [fadingOut, setFadingOut] = useStateH(false);
  const trackRef = useRefH(null);
  const prefersReducedMotion = useRefH(
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Desktop tab click
  const handleDesktopTabClick = (idx) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    if (prefersReducedMotion.current) { setDisplayIdx(idx); return; }
    setFadingOut(true);
    setTimeout(() => { setDisplayIdx(idx); setFadingOut(false); }, 200);
  };

  // Mobile: sync tab on horizontal scroll
  const handleMobileScroll = useCallbackH(() => {
    if (!trackRef.current) return;
    const t = trackRef.current;
    const idx = Math.round(t.scrollLeft / t.clientWidth);
    if (idx !== activeIdx) { setActiveIdx(idx); setDisplayIdx(idx); }
  }, [activeIdx]);

  // Mobile: jump to slide on tab click
  const goToSlide = useCallbackH((idx) => {
    setActiveIdx(idx);
    setDisplayIdx(idx);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: idx * trackRef.current.clientWidth, behavior: 'smooth' });
    }
  }, []);

  const stage = STAGES[displayIdx];
  const count = stage.services.length;
  const serviceWord = count === 1 ? 'SERVICE' : 'SERVICES';

  return (
    <section className="surface-linen tss" ref={sectionRef} data-screen-label="04 Three-stage services">

      {/* ── DESKTOP LAYOUT ── */}
      <div className="tss__desktop section-pad">
        <div className="shell">
          <header className="tss__head">
            <div className="tss__eyebrow reveal">
              <span className="tss__eyebrow-rule" aria-hidden="true" />
              — WHAT I DO
            </div>
            <h2 className="tss__title reveal" data-delay="100">
              THREE STAGES.<br/>
              ONE <span className="ochre">FUNNEL</span>.
            </h2>
            <p className="tss__intro reveal" data-delay="180">
              Growth breaks somewhere between acquisition, user experience, and retention.
              I work across all three — or the one that's actually slowing you down.
            </p>
          </header>
          <div className="tss__tabs-wrap reveal" data-delay="260">
            <div className="tss__tabs" role="tablist">
              {STAGES.map((s, i) => (
                <button key={s.num} role="tab" aria-selected={i === activeIdx}
                  className={'tss__tab' + (i === activeIdx ? ' is-active' : '')}
                  onClick={() => handleDesktopTabClick(i)}>
                  <span className="tss__tab-num">{s.num}</span>
                  <span className="tss__tab-name">{s.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="tss__panel reveal" data-delay="340">
            <div className={'tss__panel-inner' + (fadingOut ? ' is-fading' : '')}>
              <div className="tss__left">
                <div className="tss__numblock">
                  <div className="tss__bignum">{stage.num}</div>
                  <h3 className="tss__stage-name">{stage.name}</h3>
                </div>
              </div>
              <div className="tss__right">
                <div className="tss__meta"><span className="tss__meta-dot" />STAGE {stage.num} · {stage.name}</div>
                <p className="tss__desc">{stage.description}</p>
                <div className="tss__services">
                  {stage.services.map((srv, i) => (
                    <div className="tss__svc" key={i}>
                      <div className="tss__svc-body">
                        <div className="tss__svc-name">{srv.name}</div>
                        <p className="tss__svc-desc">{srv.desc}</p>
                      </div>
                      <span className="tss__svc-idx">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="tss__foot">
              <span>{count} {serviceWord} · FUNNEL STAGE {stage.num}</span>
              <span>{stage.num} / 03</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="tss__mobile">
        <div className="shell tss__mobile-header">
          <div className="tss__eyebrow">
            <span className="tss__eyebrow-rule" aria-hidden="true" />
            — WHAT I DO
          </div>
          <h2 className="tss__title" style={{ marginTop: 16 }}>
            THREE STAGES.<br/>ONE <span className="ochre">FUNNEL</span>.
          </h2>
          <p className="tss__intro" style={{ marginTop: 16 }}>
            Growth breaks somewhere between acquisition, user experience, and retention.
          </p>
        </div>

        {/* Swipeable slides */}
        <div className="tss__track" ref={trackRef} onScroll={handleMobileScroll}>
          {STAGES.map((s, i) => (
            <div className="tss__slide" key={s.num}>
              <div className="shell">
                <div className="tss__slide-meta">
                  <span className="tss__meta-dot" />
                  Stage · {i + 1} OF {STAGES.length}
                </div>
                <h3 className="tss__slide-title">{s.name}</h3>
                <p className="tss__slide-desc">{s.description}</p>
                <div className="tss__services">
                  {s.services.map((srv, j) => (
                    <div className="tss__svc" key={j}>
                      <div className="tss__svc-body">
                        <div className="tss__svc-name">{srv.name}</div>
                        <p className="tss__svc-desc">{srv.desc}</p>
                      </div>
                      <span className="tss__svc-idx">{String(j + 1).padStart(2, '0')}</span>
                    </div>
                  ))}
                </div>
                <div className="tss__slide-cta">
                  <a href="contact.html" className="btn btn--ochre">Book a call →</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe progress dots */}
        <div className="tss__mobile-dots" aria-hidden="true">
          {STAGES.map((_, i) => (
            <button key={i} className={'tss__mobile-dot' + (i === activeIdx ? ' is-active' : '')}
              onClick={() => goToSlide(i)} aria-label={`Go to ${STAGES[i].shortName}`} />
          ))}
        </div>
      </div>

      {/* ── MOBILE FIXED TAB BAR (visible only when section is on screen) ── */}
      <div className={'tss__fixed-tabs' + (inView ? ' is-visible' : '')} aria-hidden="true">
        <div className="tss__fixed-tabs-inner">
          <div className="tss__fixed-tab-indicator"
            style={{ transform: `translateX(${activeIdx * 100}%)` }} />
          {STAGES.map((s, i) => (
            <button key={s.num} aria-hidden="false"
              className={'tss__fixed-tab' + (i === activeIdx ? ' is-active' : '')}
              onClick={() => goToSlide(i)}>
              {s.shortName}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------- Notes teaser ------- */
const NOTES = [
  { date: '04.22.2026', read: '8 min', title: 'The retargeting blindspot nobody measures', tag: 'Attribution' },
  { date: '03.31.2026', read: '11 min', title: 'Why most B2B positioning decks describe the wrong enemy', tag: 'Positioning' },
  { date: '03.14.2026', read: '6 min', title: 'A spreadsheet is a strategy document when you let it be', tag: 'Systems' },
];

function NotesTeaser() {
  return (
    <section className="section-pad" data-screen-label="05 Notes">
      <div className="shell">
        <header className="section-head">
          <div className="section-head__left">
            <div className="eyebrow">05 · BLOGS</div>
            <h2 className="shout-title">
              WHAT I'M<br/>
              <span className="ochre">THINKING</span> ABOUT.
            </h2>
          </div>
          <a href="notes.html" className="section-head__right link-draw">
            EXPLORE MORE →
          </a>
        </header>
        <ol className="notes-list">
          {NOTES.map((n, i) => (
            <li key={i} className="note-row reveal" data-delay={(i * 100).toString()}>
              <a href="#" className="note-row__inner">
                <span className="note-row__date">{n.date}</span>
                <span className="note-row__title">{n.title}</span>
                <span className="note-row__tag">
                  <span className="tag tag--writing">{n.tag}</span>
                </span>
                <span className="note-row__read">{n.read}</span>
                <span className="note-row__arrow">→</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------- About teaser ------- */
function AboutTeaser() {
  return (
    <section className="about-ed surface-ink on-dark" data-screen-label="06 About">
      <div className="shell">
        <div className="about-ed__col">

          {/* Centered contained portrait — blends into dark bg via radial fade */}
          <div className="about-ed__portrait-wrap reveal">
            <div className="about-ed__portrait-frame">
              <img
                src="assets/bhargava-about.jpg"
                alt="Bhargava, marketing strategist based in Mumbai"
                className="about-ed__img"
              />
              <div className="about-ed__fade" />
            </div>
          </div>

          {/* Narrative text block */}
          <div className="about-ed__text">
            <div className="eyebrow eyebrow--ochre eyebrow--no-rule" style={{ marginBottom: 28 }}>
              06 · About
            </div>
            <p className="about-ed__lede reveal">
              I'm a marketing strategist based in Mumbai, working at the intersection of 
              <span className="ochre">marketing, data, and product</span>. Over the years, I've worked across enterprise brands and B2B platforms,
              focusing on solving the right problems, from positioning and funnel audits to identifying
              what actually drives growth.
            </p>
            <p className="about-ed__body reveal" data-delay="120">
              Most weeks I focus on shaping positioning, auditing funnels, and running diagnostics,
              while also exploring frameworks, dashboards, and systems that make strategy more
              actionable. The thinking and execution constantly inform each other. A strategy that
              can't be implemented isn't useful.
            </p>
            <a href="about.html" className="link-draw about-ed__cta reveal" data-delay="240">
              Read the full story →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ------- Contact CTA ------- */
function ContactCTA() {
  return (
    <section className="surface-dim on-dark section-pad" data-screen-label="07 Contact CTA">
      <div className="shell">
        <div className="cta-block">
          <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 28 }}>
            <span className="pulse-dot" /> 1 of 2 retainer slots open for Q1 2026
          </div>
          <h2 className="shout-title">
            TELL ME WHAT'S<br/>
            SLOWING YOUR<br/>
            <span className="ochre-light">GROWTH</span> DOWN.
          </h2>
          <p className="cta-block__lede">
            One call. One verdict. One plan. You'll know what's broken.
          </p>
          <div className="cta-block__actions">
            <a href="contact.html" className="btn btn--ochre">Start the conversation →</a>
          </div>
          <div className="cta-block__sub">
            OR EMAIL — HELLO@DOMAIN.COM
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------- Tools marquee (infinite scroll, same mechanism as BrandsMarquee) ------- */
const TOOL_ITEMS = [
  'HubSpot', 'Google Analytics', 'Mixpanel', 'WebEngage',
  'Adobe Analytics', 'VWO', '6Sense', 'Factors.ai',
  'Meta Business Manager', 'Google Ads', 'Zoho CRM', 'Shopify',
];

function ToolsMarquee() {
  const trackRef = React.useRef(null);
  const groupRef = React.useRef(null);

  React.useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    const DURATION = 28000;
    let start = null;
    let rafId = null;
    let paused = false;

    const step = (ts) => {
      if (!start) start = ts;
      if (!paused) {
        const groupW = group.offsetWidth;
        if (groupW > 0) {
          const offset = -((ts - start) % DURATION) / DURATION * groupW;
          track.style.transform = `translateX(${offset}px)`;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    const pause  = () => { paused = true; };
    const resume = () => { paused = false; };
    track.parentElement.addEventListener('mouseenter', pause);
    track.parentElement.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(rafId);
      if (track.parentElement) {
        track.parentElement.removeEventListener('mouseenter', pause);
        track.parentElement.removeEventListener('mouseleave', resume);
      }
    };
  }, []);

  return (
    <div className="tools-band" data-screen-label="08 Tools marquee">
      <div className="shell">
        <p className="tools-band__label eyebrow">Tools I work in</p>
      </div>
      <div className="tools-band__viewport">
        <div className="tools-band__track" ref={trackRef}>
          {[0, 1].map(copy => (
            <div
              className="tools-band__group"
              ref={copy === 0 ? groupRef : null}
              aria-hidden={copy === 1 ? 'true' : 'false'}
              key={copy}
            >
              {TOOL_ITEMS.map((name, i) => (
                <div className="tools-band__item" key={i}>
                  <span className="tools-band__name">{name}</span>
                  <span className="tools-band__dot" aria-hidden="true" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------- Brands marquee (logo strip after About) ------- */
const BRAND_LOGOS = [
  { name: 'Audi',                file: 'Audi-Logo_2016.svg' },
  { name: 'Hansaplast',          file: 'Hansaplast.svg' },
  { name: 'JLL',                 file: 'JLL_(company)-Logo.wine.svg' },
  { name: 'L&T Realty',         file: 'LnT realty.svg' },
  { name: 'Tata Communications', file: 'Tata Communications Logo White.svg', wide: true, invert: true },
  { name: 'HCL Software',        file: 'hcl-software-logo.svg' },
];

function BrandsMarquee() {
  const trackRef = React.useRef(null);
  const groupRef = React.useRef(null);

  React.useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    const DURATION = 30000; // ms for one full loop
    let start = null;
    let rafId = null;
    let paused = false;

    const step = (ts) => {
      if (!start) start = ts;
      if (!paused) {
        const groupW = group.offsetWidth;
        if (groupW > 0) {
          const offset = -((ts - start) % DURATION) / DURATION * groupW;
          track.style.transform = `translateX(${offset}px)`;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    const pause  = () => { paused = true; };
    const resume = () => { paused = false; };
    track.parentElement.addEventListener('mouseenter', pause);
    track.parentElement.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(rafId);
      if (track.parentElement) {
        track.parentElement.removeEventListener('mouseenter', pause);
        track.parentElement.removeEventListener('mouseleave', resume);
      }
    };
  }, []);

  return (
    <div className="brands-band">
      <div className="shell">
        <p className="brands-band__label eyebrow">Brands I worked with</p>
      </div>
      <div className="brands-band__viewport">
        <div className="brands-band__track" ref={trackRef}>
          {[0, 1].map(copy => (
            <div
              className="brands-band__group"
              ref={copy === 0 ? groupRef : null}
              aria-hidden={copy === 1 ? 'true' : 'false'}
              key={copy}
            >
              {BRAND_LOGOS.map((b, i) => (
                <div className="brands-band__item" key={i}>
                  <img
                    src={`assets/Brands/${b.file}`}
                    alt={copy === 0 ? b.name : ''}
                    className={'brands-band__logo' + (b.wide ? ' brands-band__logo--wide' : '') + (b.invert ? ' brands-band__logo--invert' : '')}
                    onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------- Sticky Mobile CTA (appears after hero + method, hides in services) ------- */
function StickyMobileCTA({ visible, instant }) {
  return (
    <div className={'sticky-mobile-cta' + (visible ? ' is-visible' : '') + (instant ? ' no-transition' : '')}>
      <a href="work.html" className="sticky-mobile-cta__ghost">View work</a>
      <span className="sticky-mobile-cta__sep" aria-hidden="true" />
      <a href="contact.html" className="sticky-mobile-cta__solid">Book a call →</a>
    </div>
  );
}

/* ------- App root ------- */
function App() {
  useRevealObserver();

  const [pastMethod, setPastMethod] = useStateH(false);
  const [inServices, setInServices] = useStateH(false);
  const methodSentinelRef = useRefH(null);
  const servicesSectionRef = useRefH(null);

  useEffectH(() => {
    // Show sticky CTA once user scrolls past the method section sentinel
    const handleScroll = () => {
      if (methodSentinelRef.current) {
        setPastMethod(methodSentinelRef.current.getBoundingClientRect().top < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Track whether the services section is on screen
    const obs = new IntersectionObserver(([e]) => setInServices(e.isIntersecting), { threshold: 0 });
    if (servicesSectionRef.current) obs.observe(servicesSectionRef.current);

    return () => { window.removeEventListener('scroll', handleScroll); obs.disconnect(); };
  }, []);

  const TWEAKS = /*EDITMODE-BEGIN*/{
    "heroLine1": "I SOLVE BUSINESS",
    "heroLine2": "PROBLEMS THAT LOOK",
    "heroLine3Before": "LIKE",
    "heroAccent": "MARKETING",
    "heroLine3After": "PROBLEMS.",
    "heroEyebrow": "MARKETING STRATEGIST · MUMBAI",
    "heroSubhead": "Then I fix it. Sometimes that's a diagnostic. Sometimes it's running your paid, SEO, UX, or retention directly. Mumbai-based strategist, working with growth-stage companies.",
    "showMarquee": true
  }/*EDITMODE-END*/;

  const [tweaks, setTweaks] = useTweaks(TWEAKS);

  return (
    <>
      <SiteNav current="home" dark />
      <main>
        <Hero
          headlineLine1={tweaks.heroLine1}
          headlineLine2={tweaks.heroLine2}
          headlineLine3Before={tweaks.heroLine3Before}
          accentWord={tweaks.heroAccent}
          headlineLine3After={tweaks.heroLine3After}
          eyebrow={tweaks.heroEyebrow}
          subhead={tweaks.heroSubhead}
        />
        <MethodStrip />
        {/* Sentinel: when this scrolls above the viewport, sticky CTA appears */}
        <div ref={methodSentinelRef} aria-hidden="true" style={{ height: 0, overflow: 'hidden' }} />
        <PositioningQuote />
        <FeaturedWork />
        <ThreeStageServices sectionRef={servicesSectionRef} inView={inServices} />
        <NotesTeaser />
        <AboutTeaser />
        <BrandsMarquee />
        <ContactCTA />
        {tweaks.showMarquee && <ToolsMarquee />}
      </main>
      <LivingFooter />

      {/* Mobile sticky CTA — hidden during services section to avoid overlap with services tabs */}
      <StickyMobileCTA visible={pastMethod && !inServices} instant={inServices} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero">
          <TweakText label="Eyebrow" value={tweaks.heroEyebrow} onChange={v => setTweaks({ heroEyebrow: v })} />
          <TweakText label="Line 1" value={tweaks.heroLine1} onChange={v => setTweaks({ heroLine1: v })} />
          <TweakText label="Line 2" value={tweaks.heroLine2} onChange={v => setTweaks({ heroLine2: v })} />
          <TweakText label="Line 3 — before accent" value={tweaks.heroLine3Before} onChange={v => setTweaks({ heroLine3Before: v })} />
          <TweakText label="Accent word (ochre)" value={tweaks.heroAccent} onChange={v => setTweaks({ heroAccent: v })} />
          <TweakText label="Line 3 — after accent" value={tweaks.heroLine3After} onChange={v => setTweaks({ heroLine3After: v })} />
          <TweakText label="Subhead" value={tweaks.heroSubhead} onChange={v => setTweaks({ heroSubhead: v })} />
        </TweakSection>
        <TweakSection title="Sections">
          <TweakToggle label="Show clients marquee" value={tweaks.showMarquee} onChange={v => setTweaks({ showMarquee: v })} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
