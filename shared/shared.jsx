// Shared components: SiteNav, LivingFooter, Marquee, useReveal, etc.
const { useState, useEffect, useRef, useCallback } = React;

/* ------- useReveal (IntersectionObserver for .reveal and .img-reveal) ------- */
function useRevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .img-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ------- SiteNav ------- */
function SiteNav({ current, dark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: 'index.html', label: 'Home', key: 'home' },
    { href: 'work.html', label: 'Work', key: 'work' },
    { href: 'services.html', label: 'Services', key: 'services' },
    { href: 'about.html', label: 'About', key: 'about' },
    { href: 'notes.html', label: 'Notes', key: 'notes' },
    { href: 'contact.html', label: 'Contact', key: 'contact' },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={'site-nav' + (dark ? ' site-nav--dark' : '')}>
        <div className="site-nav__inner">
          <a href="index.html" className="site-nav__mark">
            Bhargava <span>/</span> Strategist
          </a>
          <div className="site-nav__links">
            {links.map(l => (
              <a key={l.key} href={l.href} className={current === l.key ? 'is-active' : ''}>
                {l.label}
              </a>
            ))}
          </div>
          <button
            className={'site-nav__burger' + (menuOpen ? ' is-open' : '') + (dark ? ' site-nav__burger--dark' : '')}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={'mobile-nav' + (menuOpen ? ' is-open' : '') + (dark ? ' mobile-nav--dark' : '')} aria-hidden={!menuOpen}>
        <div className="mobile-nav__inner">
          {links.map(l => (
            <a key={l.key} href={l.href} className={'mobile-nav__link' + (current === l.key ? ' is-active' : '')} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

/* ------- Living Footer (C05) ------- */
function LivingFooter() {
  const [now, setNow] = useState(() => mumbaiTime());
  const [buildIdx, setBuildIdx] = useState(0);
  const [readIdx, setReadIdx] = useState(0);

  const buildStrings = [
    'CDE v0.3 — Campaign Diagnostic Engine',
    'ABM framework tool for JLL',
    'Portfolio v2 (this site)',
    'A note on churn economics',
  ];
  const readStrings = [
    '"Obviously Awesome" — April Dunford',
    '"The Mom Test" — Rob Fitzpatrick',
    'Stratechery (the back catalogue)',
    'Benedict Evans weekly',
  ];

  useEffect(() => {
    const clock = setInterval(() => setNow(mumbaiTime()), 1000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setBuildIdx(i => (i + 1) % buildStrings.length);
      setReadIdx(i => (i + 1) % readStrings.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="footer surface-ink on-dark">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__shout">
            <div className="eyebrow eyebrow--ochre eyebrow--no-rule" style={{ marginBottom: 20 }}>
              <span className="pulse-dot" /> AVAILABLE · Q3 2026
            </div>
            <h2 className="shout-title" style={{ fontSize: 'clamp(40px, 6vw, 84px)' }}>
              LET'S TALK ABOUT<br/>THE <span className="ochre">PROBLEM</span>,<br/>NOT THE BRIEF.
            </h2>
            <a href="mailto:hi@bhargava.work" className="footer__email link-draw">
              hi@bhargava.work →
            </a>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <div className="footer__col-label">Live</div>
              <div className="footer__clock">
                <span className="pulse-dot" />
                <span>Mumbai · {now} IST</span>
              </div>
            </div>
            <div className="footer__col">
              <div className="footer__col-label">Elsewhere</div>
              <a href="#" className="footer__link link-draw">LinkedIn ↗</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-label">Index</div>
              <a href="work.html" className="footer__link link-draw">Selected work</a>
              <a href="services.html" className="footer__link link-draw">Services</a>
              <a href="about.html" className="footer__link link-draw">About</a>
              <a href="notes.html" className="footer__link link-draw">Notes</a>
            </div>
          </div>
        </div>
        <hr className="rule" style={{ marginTop: 72, marginBottom: 32 }} />
        <div className="footer__meta">
          <span>Bhargava · Strategist & builder · Mumbai</span>
          <span>© 2026 · Set in Archivo + Inter · No cookies, no tracking</span>
          <span>v2.0 · last deploy 04.24</span>
        </div>
      </div>
    </footer>
  );
}

function RotatingLine({ value }) {
  const [displayed, setDisplayed] = useState(value);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    if (value === displayed) return;
    setFading(true);
    const t = setTimeout(() => {
      setDisplayed(value);
      setFading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [value, displayed]);
  return (
    <div className="footer__rotator-val" style={{ opacity: fading ? 0 : 1 }}>
      {displayed}
    </div>
  );
}

function mumbaiTime() {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'Asia/Kolkata'
    }).format(new Date());
  } catch (e) {
    return '--:--:--';
  }
}

/* ------- Marquee (C06) ------- */
function Marquee({ items, speed = 40 }) {
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(40);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.scrollWidth / 2;
    setDuration(w / speed);
  }, [items, speed]);
  return (
    <div className="marquee">
      <div
        ref={trackRef}
        className="marquee__track"
        style={{ animationDuration: `${duration}s` }}
      >
        {[...items, ...items].map((it, i) => (
          <div className="marquee__item" key={i}>
            <span className="marquee__name">{it}</span>
            <span className="marquee__dot" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------- Placeholder image ------- */
function PH({ label, ratio = '16 / 10', dark = false, style, children }) {
  return (
    <div
      className={'ph-image' + (dark ? ' ph-image--dark' : '')}
      style={{ aspectRatio: ratio, ...style }}
    >
      {children}
      {label && <div className="ph-image__label">{label}</div>}
    </div>
  );
}

// Export to window for cross-file sharing
Object.assign(window, {
  SiteNav, LivingFooter, Marquee, PH, useRevealObserver, mumbaiTime, RotatingLine
});
