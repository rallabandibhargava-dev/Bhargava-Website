'use client';
// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteNav from '../components/SiteNav';
import LivingFooter from '../components/LivingFooter';
import useRevealObserver from '../components/useRevealObserver';
import PositioningQuoteReveal from '../components/PositioningQuoteReveal';
import MagneticButton from '../components/MagneticButton';
import ScrollAnimations from '../components/ScrollAnimations';

/* ---------- Hero ---------- */
function Hero() {
  const [mounted, setMounted] = useState(false);
  const bgInnerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  // Line-clip entrance for the hero h1 — fires once on mount
  useEffect(() => {
    if (!mounted || !headlineRef.current) return;
    const h1 = headlineRef.current;
    if (h1.querySelector('.sr-line-wrap')) return; // guard against double-run
    const parts = h1.innerHTML.split(/<br\s*\/?>/gi);
    h1.innerHTML = parts
      .map(
        (part, i) =>
          `<span class="sr-line-wrap">` +
          `<span class="sr-line" style="transition-delay:${180 + i * 115}ms">` +
          `${part}</span></span>`
      )
      .join('');
    // Trigger on next frame so the starting transform is painted first
    requestAnimationFrame(() => {
      h1.querySelectorAll('.sr-line').forEach(l => l.classList.add('is-in'));
    });
  }, [mounted]);

  // Portrait parallax — bg-inner drifts up as hero scrolls out of view
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = bgInnerRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      y: -55,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('.hero-c1'),
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
    return () => { tween.scrollTrigger?.kill(); gsap.set(el, { y: 0 }); };
  }, []);

  return (
    <section className="hero-c1 on-dark" data-screen-label="01 Hero">
      <div className="hero-c1__bg">
        <div className="hero-c1__bg-inner" ref={bgInnerRef}>
          <img src="/assets/bhargava-portrait.png" alt="Bhargava, independent marketing strategist" className="hero-c1__portrait" />
        </div>
        <div className="hero-c1__overlay" />
      </div>
      <div className="hero-c1__type">
        <div className={'hero-c1__eyebrow fade-up' + (mounted ? ' is-in' : '')}>
          <span className="pulse-dot" />MARKETING STRATEGIST · MUMBAI
        </div>
        <h1 ref={headlineRef} className="hero-c1__shout">
          I FIGURE OUT<br/>WHY <span className="hero-c1__shout-accent">GROWTH</span><br/>STALLED.
        </h1>
        <p className={'hero-c1__sub fade-up' + (mounted ? ' is-in' : '')} style={{ transitionDelay: '400ms' }}>
          Then I fix it. Sometimes that&apos;s a diagnostic. Sometimes it&apos;s running your paid, SEO, UX, or retention directly. Mumbai-based strategist, working with growth-stage companies.
        </p>
        <div className={'hero-c1__ctas fade-up' + (mounted ? ' is-in' : '')} style={{ transitionDelay: '550ms' }}>
          <MagneticButton>
            <Link href="/work" className="btn btn--ochre">See the work →</Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/contact" className="btn">Book a call</Link>
          </MagneticButton>
        </div>
      </div>
      <div className="hero-c1__scroll" aria-hidden="true">
        <span>Scroll</span><span className="hero-c1__scroll-arrow">↓</span>
      </div>
    </section>
  );
}

/* ---------- Method strip ---------- */
function MethodStrip() {
  const steps = [
    { num: '01', title: 'DIAGNOSE', body: "Every engagement starts with a written diagnosis of what's actually slowing the system. Usually the first useful document the team has seen in months." },
    { num: '02', title: 'PRIORITIZE', body: "Five problems, one lever. I work out which fix moves the needle first — and which can wait. Most plans fail because they try to do everything at once." },
    { num: '03', title: 'EXECUTE', body: "I run the work directly or orchestrate the team. No handoffs to specialists who don't have context. The person who made the diagnosis stays on the fix." },
  ];
  return (
    <section className="section-pad method-strip" data-screen-label="02 Method strip">
      <div className="shell">
        <header className="method-strip__head">
          <div className="eyebrow">02 · The method</div>
          <h2 className="shout-title method-strip__title reveal">
            I DON&apos;T<br/>SHIP <span className="ochre">GUESSES.</span><br/>I SHIP FIXES.
          </h2>
          <p className="method-strip__intro reveal" data-delay="120">
            The work begins with a diagnosis. Not a plan. Not a pitch. A written verdict on what&apos;s actually broken.
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


/* ---------- Featured work ---------- */
const FEATURED_WORK = [
  {
    slug: 'ux-conversion-engine',
    client: 'Enterprise Technology Brand',
    type: 'User Experience Optimization',
    year: '2026',
    title: 'Turning User Experience Into a Conversion Engine',
    tag: 'User Experience',
    surface: 'linen',
    image: '/assets/Case%20study/Featured.png',
    mobileImage: '/assets/Case%20study/Featured%20mobile.png',
  },
  {
    slug: 'lead-acquisition-engine',
    client: 'Enterprise Services Brand',
    type: 'Performance Marketing',
    year: '2026',
    title: 'Building a Scalable Lead Acquisition Engine',
    tag: 'Acquisition',
    surface: 'dim',
    image: '/assets/Case%20study/Acqusition.png',
    mobileImage: '/assets/Case%20study/Acqusition%20mobile.png',
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

function WorkCard({ item, index }) {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const proxy = { rx: 0, ry: 0 };
    const applyTransform = () => {
      el.style.transform = `rotateX(${proxy.rx}deg) rotateY(${proxy.ry}deg)`;
    };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top)  / rect.height - 0.5;
      gsap.to(proxy, { ry: nx * 14, rx: -ny * 9, duration: 0.45, ease: 'power2.out', overwrite: 'auto', onUpdate: applyTransform });
    };
    const onLeave = () => {
      gsap.to(proxy, { rx: 0, ry: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto', onUpdate: applyTransform, onComplete: () => { el.style.transform = ''; } });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(proxy);
      el.style.transform = '';
    };
  }, []);

  return (
    <div ref={tiltRef} className="work-card-tilt">
      <Link
        href={`/work/${item.slug}`}
        className="work-card-full reveal"
        data-delay={(index * 120).toString()}
      >
        {/* Full-bleed image — mobile gets its own crop via <picture> */}
        {item.image ? (
          <picture>
            {item.mobileImage && (
              <source media="(max-width: 960px)" srcSet={item.mobileImage} />
            )}
            <img src={item.image} alt={item.title} className="work-card-full__img" />
          </picture>
        ) : (
          <div className="work-card-full__ph" />
        )}
        {/* Gradient overlay */}
        <div className="work-card-full__gradient" />
        {/* CASE STUDY badge */}
        <span className="work-card-full__badge">Case Study</span>
        {/* Bottom body */}
        <div className="work-card-full__body">
          <p className="work-card-full__meta">{item.client} · {item.year}</p>
          <h3 className="work-card-full__title">{item.title}</h3>
          <span className="work-card-full__cta">
            Read the case <span className="work-card-full__arrow">↗</span>
          </span>
        </div>
      </Link>
    </div>
  );
}

function FeaturedWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const slotW = t.scrollWidth / FEATURED_WORK.length;
    const idx = Math.min(Math.round(t.scrollLeft / slotW), FEATURED_WORK.length - 1);
    setActiveIdx(idx);
  }, []);

  const goTo = useCallback((idx: number) => {
    const t = trackRef.current;
    if (!t) return;
    setActiveIdx(idx);
    const slotW = t.scrollWidth / FEATURED_WORK.length;
    t.scrollTo({ left: idx * slotW, behavior: 'smooth' });
  }, []);

  return (
    <section className="section-pad" data-screen-label="03 Featured work">
      <div className="shell">
        <header className="section-head">
          <div className="section-head__left">
            <div className="eyebrow">03 · Selected work</div>
            <h2 className="shout-title">THREE PROBLEMS.<br/>THREE <span className="ochre">REFRAMES</span>.</h2>
          </div>
          <Link href="/work" className="section-head__right link-draw">EXPLORE MORE →</Link>
        </header>

        {/* Desktop: 3-column grid */}
        <div className="work-grid--desktop">
          {FEATURED_WORK.map((w, i) => <WorkCard key={w.slug} item={w} index={i} />)}
        </div>
      </div>

      {/* Mobile: swipeable carousel */}
      <div className="work-carousel">
        <div className="work-carousel__track" ref={trackRef} onScroll={handleScroll}>
          {FEATURED_WORK.map((w, i) => (
            <div className="work-carousel__item" key={w.slug}>
              <WorkCard item={w} index={i} />
            </div>
          ))}
        </div>
        <div className="work-carousel__dots" aria-hidden="true">
          {FEATURED_WORK.map((_, i) => (
            <button
              key={i}
              className={'work-carousel__dot' + (i === activeIdx ? ' is-active' : '')}
              onClick={() => goTo(i)}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Three-stage services ---------- */
const STAGES = [
  {
    num: '01', name: 'Acquisition', shortName: 'ACQUISITION',
    description: 'Getting the right people to the site, with the right intent, at the right cost. Where most budgets get wasted and most briefs get written.',
    services: [
      { name: 'SEO', desc: 'Content architecture, technical SEO, answer-engine optimization (AEO), and the work of turning intent into rankings.' },
      { name: 'Paid Media', desc: 'Search, social, programmatic. Strategy, structure, and the operational discipline most campaigns are missing.' },
    ],
  },
  {
    num: '02', name: 'UX', shortName: 'UX',
    description: 'What happens after the click. The site, the path through it, the thing that decides whether traffic turns into revenue.',
    services: [
      { name: 'Website Development', desc: 'Build, rebuild, or fix.' },
      { name: 'UI / UX', desc: 'Flow, interface, hierarchy.' },
      { name: 'CRO', desc: 'Test, iterate, improve.' },
    ],
  },
  {
    num: '03', name: 'Retention', shortName: 'RETENTION',
    description: 'What happens after the first conversion. The part of the funnel most teams never get to, and where the economics actually decide themselves.',
    services: [
      { name: 'Marketing Automation', desc: 'Lifecycle programs that keep revenue.' },
      { name: 'Loyalty & CRM', desc: 'The system that turns customers into advocates.' },
    ],
  },
];

function ThreeStageServices({ sectionRef, inView }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const trackRef = useRef(null);

  const handleDesktopTabClick = (idx) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setFadingOut(true);
    setTimeout(() => { setDisplayIdx(idx); setFadingOut(false); }, 200);
  };

  const handleMobileScroll = useCallback(() => {
    if (!trackRef.current) return;
    const t = trackRef.current;
    const idx = Math.round(t.scrollLeft / t.clientWidth);
    if (idx !== activeIdx) { setActiveIdx(idx); setDisplayIdx(idx); }
  }, [activeIdx]);

  const goToSlide = useCallback((idx) => {
    setActiveIdx(idx); setDisplayIdx(idx);
    if (trackRef.current) trackRef.current.scrollTo({ left: idx * trackRef.current.clientWidth, behavior: 'smooth' });
  }, []);

  const stage = STAGES[displayIdx];
  const count = stage.services.length;

  return (
    <section className="surface-linen tss" ref={sectionRef} data-screen-label="04 Three-stage services">
      {/* Desktop */}
      <div className="tss__desktop section-pad">
        <div className="shell">
          <header className="tss__head">
            <div className="tss__eyebrow reveal"><span className="tss__eyebrow-rule" aria-hidden="true" />— WHAT I DO</div>
            <h2 className="tss__title reveal" data-delay="100">THREE STAGES.<br/>ONE <span className="ochre">FUNNEL</span>.</h2>
            <p className="tss__intro reveal" data-delay="180">Growth breaks somewhere between acquisition, user experience, and retention. I work across all three — or the one that&apos;s actually slowing you down.</p>
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
              <span>{count} {count === 1 ? 'SERVICE' : 'SERVICES'} · FUNNEL STAGE {stage.num}</span>
              <span>{stage.num} / 03</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="tss__mobile">
        <div className="shell tss__mobile-header">
          <div className="tss__eyebrow"><span className="tss__eyebrow-rule" />— WHAT I DO</div>
          <h2 className="tss__title" style={{ marginTop: 16 }}>THREE STAGES.<br/>ONE <span className="ochre">FUNNEL</span>.</h2>
          <p className="tss__intro" style={{ marginTop: 16 }}>Growth breaks somewhere between acquisition, user experience, and retention.</p>
        </div>
        <div className="tss__track" ref={trackRef} onScroll={handleMobileScroll}>
          {STAGES.map((s, i) => (
            <div className="tss__slide" key={s.num}>
              <div className="shell">
                <div className="tss__slide-meta"><span className="tss__meta-dot" />Stage · {i + 1} OF {STAGES.length}</div>
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
                  <Link href="/contact" className="btn btn--ochre">Book a call →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="tss__mobile-dots" aria-hidden="true">
          {STAGES.map((_, i) => (
            <button key={i} className={'tss__mobile-dot' + (i === activeIdx ? ' is-active' : '')}
              onClick={() => goToSlide(i)} aria-label={`Go to ${STAGES[i].shortName}`} />
          ))}
        </div>
      </div>

      <div className={'tss__fixed-tabs' + (inView ? ' is-visible' : '')} aria-hidden="true">
        <div className="tss__fixed-tabs-inner">
          <div className="tss__fixed-tab-indicator" style={{ transform: `translateX(${activeIdx * 100}%)` }} />
          {STAGES.map((s, i) => (
            <button key={s.num} className={'tss__fixed-tab' + (i === activeIdx ? ' is-active' : '')} onClick={() => goToSlide(i)}>{s.shortName}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Notes teaser ---------- */
const NOTES_PREVIEW = [
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
            <h2 className="shout-title">WHAT I&apos;M<br/><span className="ochre">THINKING</span> ABOUT.</h2>
          </div>
          <Link href="/notes" className="section-head__right link-draw">EXPLORE MORE →</Link>
        </header>
        <ol className="notes-list">
          {NOTES_PREVIEW.map((n, i) => (
            <li key={i} className="note-row reveal" data-delay={(i * 100).toString()}>
              <Link href="/notes" className="note-row__inner">
                <span className="note-row__date">{n.date}</span>
                <span className="note-row__title">{n.title}</span>
                <span className="note-row__tag"><span className="tag tag--writing">{n.tag}</span></span>
                <span className="note-row__read">{n.read}</span>
                <span className="note-row__arrow">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- About teaser ---------- */
function AboutTeaser() {
  const sectionRef  = useRef<HTMLElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const frameRef    = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Shared config: image frame as trigger, completes exactly when
      // the image center hits the viewport center
      const mainConfig = {
        trigger: frameRef.current,
        start: 'top 85%',      // image starts entering viewport
        end: 'center center',  // fully done when image is centred on screen
        scrub: 1,
      };

      // Image scale — transform only, no layout change
      gsap.fromTo(frameRef.current,
        { scale: 0.9 },
        { scale: 1.15, ease: 'none', scrollTrigger: mainConfig }
      );

      // Overlay — opacity only, bg goes black as image reaches centre
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none', scrollTrigger: mainConfig }
      );

      // Text — reveals as it scrolls into view (after image is centred)
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 90%',   // text just entering viewport
            end: 'top 45%',     // fully revealed by the time it's near centre
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-ed" data-screen-label="06 About">

      {/* Overlay — black, animates opacity 0 → 1 */}
      <div ref={overlayRef} className="about-ed__overlay" />

      <div className="shell">
        <div className="about-ed__col">

          {/* Portrait — layout unchanged; frame ref receives scale animation */}
          <div className="about-ed__portrait-wrap">
            <div ref={frameRef} className="about-ed__portrait-frame">
              <img
                src="/assets/bhargava-about.jpg"
                alt="Bhargava, marketing strategist based in Mumbai"
                className="about-ed__img"
              />
              <div className="about-ed__fade" />
            </div>
          </div>

          {/* Text — opacity + y animated after main scroll */}
          <div ref={textRef} className="about-ed__text">
            <div className="eyebrow eyebrow--ochre eyebrow--no-rule" style={{ marginBottom: 28 }}>
              06 · About
            </div>
            <p className="about-ed__lede">
              I&apos;m a marketing strategist based in Mumbai, working at the intersection of{' '}
              <span className="ochre-light">marketing, data, and product</span>.
            </p>
            <p className="about-ed__body">
              Most weeks I focus on shaping positioning, auditing funnels, and running diagnostics.
            </p>
            <MagneticButton strength={0.22} radius={70}>
              <Link href="/about" className="link-draw about-ed__cta" data-delay="240">
                Read the full story →
              </Link>
            </MagneticButton>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------- Brands marquee ---------- */
const BRAND_LOGOS = [
  { name: 'Audi', file: 'Audi-Logo_2016.svg' },
  { name: 'Hansaplast', file: 'Hansaplast.svg' },
  { name: 'JLL', file: 'JLL_(company)-Logo.wine.svg' },
  { name: 'L&T Realty', file: 'LnT realty.svg' },
  { name: 'Tata Communications', file: 'Tata Communications Logo White.svg', wide: true, invert: true },
  { name: 'HCL Software', file: 'hcl-software-logo.svg' },
];

function BrandsMarquee() {
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  useEffect(() => {
    const track = trackRef.current; const group = groupRef.current;
    if (!track || !group) return;
    const DURATION = 30000; let start = null; let rafId = null; let paused = false;
    const step = (ts) => {
      if (!start) start = ts;
      if (!paused) { const gW = group.offsetWidth; if (gW > 0) { track.style.transform = `translateX(${-((ts - start) % DURATION) / DURATION * gW}px)`; } }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    const pause = () => { paused = true; }; const resume = () => { paused = false; };
    track.parentElement.addEventListener('mouseenter', pause);
    track.parentElement.addEventListener('mouseleave', resume);
    return () => { cancelAnimationFrame(rafId); if (track.parentElement) { track.parentElement.removeEventListener('mouseenter', pause); track.parentElement.removeEventListener('mouseleave', resume); } };
  }, []);
  return (
    <div className="brands-band">
      <div className="shell"><p className="brands-band__label eyebrow reveal">Brands I worked with</p></div>
      <div className="brands-band__viewport">
        <div className="brands-band__track" ref={trackRef}>
          {[0, 1].map(copy => (
            <div className="brands-band__group" ref={copy === 0 ? groupRef : null} aria-hidden={copy === 1 ? 'true' : 'false'} key={copy}>
              {BRAND_LOGOS.map((b, i) => (
                <div className="brands-band__item" key={i}>
                  <img src={`/assets/Brands/${b.file}`} alt={copy === 0 ? b.name : ''}
                    className={'brands-band__logo' + (b.wide ? ' brands-band__logo--wide' : '') + (b.invert ? ' brands-band__logo--invert' : '')}
                    onError={e => { (e.target as HTMLElement).parentElement.style.display = 'none'; }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Tools marquee ---------- */
const TOOL_ITEMS = ['HubSpot','Google Analytics','Mixpanel','WebEngage','Adobe Analytics','VWO','6Sense','Factors.ai','Meta Business Manager','Google Ads','Zoho CRM','Shopify'];

function ToolsMarquee() {
  const trackRef = useRef(null); const groupRef = useRef(null);
  useEffect(() => {
    const track = trackRef.current; const group = groupRef.current;
    if (!track || !group) return;
    const DURATION = 28000; let start = null; let rafId = null; let paused = false;
    const step = (ts) => {
      if (!start) start = ts;
      if (!paused) { const gW = group.offsetWidth; if (gW > 0) { track.style.transform = `translateX(${-((ts - start) % DURATION) / DURATION * gW}px)`; } }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    const pause = () => { paused = true; }; const resume = () => { paused = false; };
    track.parentElement.addEventListener('mouseenter', pause);
    track.parentElement.addEventListener('mouseleave', resume);
    return () => { cancelAnimationFrame(rafId); if (track.parentElement) { track.parentElement.removeEventListener('mouseenter', pause); track.parentElement.removeEventListener('mouseleave', resume); } };
  }, []);
  return (
    <div className="tools-band">
      <div className="shell"><p className="tools-band__label eyebrow reveal">Tools I work in</p></div>
      <div className="tools-band__viewport">
        <div className="tools-band__track" ref={trackRef}>
          {[0, 1].map(copy => (
            <div className="tools-band__group" ref={copy === 0 ? groupRef : null} aria-hidden={copy === 1 ? 'true' : 'false'} key={copy}>
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

/* ---------- Contact CTA ---------- */
function ContactCTA() {
  return (
    <section className="surface-dim on-dark section-pad" data-screen-label="07 Contact CTA">
      <div className="shell">
        <div className="cta-block">
          <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 28 }}>
            <span className="pulse-dot" /> 1 of 2 retainer slots open for Q3 2026
          </div>
          <h2 className="shout-title">TELL ME WHAT&apos;S<br/>SLOWING YOUR<br/><span className="ochre-light">GROWTH</span> DOWN.</h2>
          <p className="cta-block__lede reveal" data-delay="120">One call. One verdict. One plan. You&apos;ll know what&apos;s broken by the end of month one.</p>
          <div className="cta-block__actions reveal" data-delay="240">
            <MagneticButton>
              <Link href="/contact" className="btn btn--ochre">Start the conversation →</Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/work" className="btn">See the work →</Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sticky mobile CTA ---------- */
function StickyMobileCTA({ visible, instant }) {
  return (
    <div className={'sticky-mobile-cta' + (visible ? ' is-visible' : '') + (instant ? ' no-transition' : '')}>
      <Link href="/work" className="sticky-mobile-cta__ghost">View work</Link>
      <span className="sticky-mobile-cta__sep" aria-hidden="true" />
      <Link href="/contact" className="sticky-mobile-cta__solid">Book a call →</Link>
    </div>
  );
}

/* ---------- App ---------- */
export default function HomePage() {
  useRevealObserver();
  const [pastMethod, setPastMethod] = useState(false);
  const [inServices, setInServices] = useState(false);
  const methodSentinelRef = useRef(null);
  const servicesSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (methodSentinelRef.current) setPastMethod((methodSentinelRef.current as HTMLElement).getBoundingClientRect().top < 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    const obs = new IntersectionObserver(([e]) => setInServices(e.isIntersecting), { threshold: 0 });
    if (servicesSectionRef.current) obs.observe(servicesSectionRef.current);
    return () => { window.removeEventListener('scroll', handleScroll); obs.disconnect(); };
  }, []);

  return (
    <>
      <ScrollAnimations />
      <SiteNav current="home" dark />
      <main>
        <Hero />
        <MethodStrip />
        <div ref={methodSentinelRef} aria-hidden="true" style={{ height: 0, overflow: 'hidden' }} />
        <PositioningQuoteReveal />
        <FeaturedWork />
        <ThreeStageServices sectionRef={servicesSectionRef} inView={inServices} />
        <NotesTeaser />
        <AboutTeaser />
        <BrandsMarquee />
        <ContactCTA />
        <ToolsMarquee />
      </main>
      <LivingFooter />
      <StickyMobileCTA visible={pastMethod && !inServices} instant={inServices} />
    </>
  );
}
