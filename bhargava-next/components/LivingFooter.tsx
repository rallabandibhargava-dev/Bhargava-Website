'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function mumbaiTime() {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'Asia/Kolkata',
    }).format(new Date());
  } catch { return '--:--:--'; }
}

export default function LivingFooter() {
  const [now, setNow] = useState('--:--:--');

  useEffect(() => {
    setNow(mumbaiTime());
    const t = setInterval(() => setNow(mumbaiTime()), 1000);
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
              LET&apos;S TALK ABOUT<br/>THE <span className="ochre">PROBLEM</span>,<br/>NOT THE BRIEF.
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
              <Link href="/work"     className="footer__link link-draw">Selected work</Link>
              <Link href="/services" className="footer__link link-draw">Services</Link>
              <Link href="/about"    className="footer__link link-draw">About</Link>
              <Link href="/notes"    className="footer__link link-draw">Notes</Link>
            </div>
          </div>
        </div>
        <hr className="rule" style={{ marginTop: 72, marginBottom: 32 }} />
        <div className="footer__meta">
          <span>Bhargava · Strategist &amp; builder · Mumbai</span>
          <span>© 2026 · Set in Archivo + Inter · No cookies, no tracking</span>
          <span>v2.0</span>
        </div>
      </div>
    </footer>
  );
}
