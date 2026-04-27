'use client';
// @ts-nocheck
import { useState } from 'react';
import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import LivingFooter from '../../components/LivingFooter';
import useRevealObserver from '../../components/useRevealObserver';

const NOTES = [
  { slug: 'retargeting-blindspot',    date: '04.22.2026', read: '8 min',  title: 'The retargeting blindspot nobody measures',                              tag: 'Attribution', excerpt: "If 93% of your SALs come from one channel, you don't have a funnel — you have a measurement problem dressed up as performance." },
  { slug: 'b2b-positioning-enemy',    date: '03.31.2026', read: '11 min', title: "Why most B2B positioning decks describe the wrong enemy",                tag: 'Positioning', excerpt: "The enemy in your positioning should be a status quo, not a competitor. Here's the test I run on every draft." },
  { slug: 'spreadsheet-strategy',     date: '03.14.2026', read: '6 min',  title: 'A spreadsheet is a strategy document when you let it be',                tag: 'Systems',     excerpt: "The most impactful artefact I've ever shipped to a client was an Excel file. The deck came later, if at all." },
  { slug: 'charge-for-diagnostics',   date: '02.28.2026', read: '9 min',  title: 'Diagnostics cost less than projects. Charge for them anyway.',           tag: 'Consulting',  excerpt: 'Free diagnostics attract the wrong clients. Charging ₹1.2 lakh changes the conversation before it starts.' },
  { slug: 'category-creation',        date: '02.10.2026', read: '13 min', title: 'Category creation, quietly: a playbook for grown-up companies',          tag: 'Positioning', excerpt: "You don't need Salesforce-scale marketing to create a category. You need a new name for an old pain." },
  { slug: 'first-year-freelancing',   date: '01.24.2026', read: '7 min',  title: 'Four things I got wrong in my first year freelancing',                   tag: 'Freelance',   excerpt: 'A confession and a correction, in roughly equal measure.' },
  { slug: 'content-engine-200-posts', date: '01.08.2026', read: '10 min', title: 'The content engine that shipped 200 posts in 90 days',                   tag: 'Systems',     excerpt: "Writers didn't write more. The system around them changed. Here's exactly what we built." },
  { slug: 'hiring-first-marketer',    date: '12.18.2025', read: '5 min',  title: 'Notes on hiring your first marketing person',                            tag: 'Operating',   excerpt: 'Not a JD. A thinking-aloud, for founders about to post the wrong role.' },
];

export default function NotesPage() {
  useRevealObserver();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = NOTES[0];
  const archive = NOTES.slice(1);

  return (
    <>
      <SiteNav current="notes" />
      <main>
        {/* Hero */}
        <section className="notes-hero">
          <div className="shell">
            <div className="eyebrow" style={{ marginBottom: 24 }}>Notes · essays · reading-in-progress</div>
            <h1 className="shout-title notes-hero__title">
              THINKING<br/>
              IN <span className="ochre">PUBLIC</span>.
            </h1>
            <p className="lead notes-hero__lead">
              Short essays about strategy, measurement, and the gap between the deck
              and what actually happens. Mostly for me; occasionally for you.
            </p>
          </div>
        </section>

        {/* Featured */}
        <section className="section-pad-sm">
          <div className="shell">
            <div className="notes-featured reveal">
              <div className="notes-featured__tag">Most recent</div>
              <Link href={`/notes/${featured.slug}`} className="notes-featured__inner">
                <div className="notes-featured__left">
                  <div className="notes-featured__meta">
                    <span>{featured.date}</span>
                    <span className="nf-dot">·</span>
                    <span>{featured.read}</span>
                    <span className="nf-dot">·</span>
                    <span className="tag tag--writing" style={{ marginLeft: 4 }}>{featured.tag}</span>
                  </div>
                  <h2 className="notes-featured__title">{featured.title}</h2>
                  <p className="notes-featured__excerpt">{featured.excerpt}</p>
                  <div className="notes-featured__read">Read the essay →</div>
                </div>
                <div className="notes-featured__right">
                  <div className="ph-image img-reveal" style={{ aspectRatio: '4 / 5', width: '100%' }}>
                    <div className="ph-image__label">essay artwork · 4×5</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Archive list */}
        <section className="section-pad-sm surface-linen">
          <div className="shell">
            <div className="eyebrow" style={{ marginBottom: 24 }}>Archive · {archive.length} more</div>
            <ol className="notes-archive">
              {archive.map((n, i) => (
                <li key={i} className="note-row reveal" data-delay={((i % 3) * 80).toString()}>
                  <Link href={`/notes/${n.slug}`} className="note-row__inner">
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

        {/* Subscribe */}
        <section className="section-pad-sm">
          <div className="shell shell--narrow" style={{ textAlign: 'center' }}>
            <div className="eyebrow" style={{ marginBottom: 20, justifyContent: 'center', display: 'inline-flex' }}>Subscribe</div>
            <h2 className="shout-title" style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 20 }}>
              ONE NOTE<br/>EVERY FEW <span className="ochre">WEEKS</span>.
            </h2>
            <p className="lead" style={{ margin: '0 auto 32px' }}>
              No newsletter playbook, no tripwire funnel. Just the essay, when it&apos;s
              ready. Unsubscribe ends the relationship cleanly.
            </p>
            {subscribed ? (
              <div className="contact-success reveal is-in" style={{ maxWidth: 480, margin: '0 auto' }}>
                <div className="contact-success__tick">✓</div>
                <h2>You&apos;re in.</h2>
                <p>I&apos;ll send the next essay when it&apos;s ready — no sooner.</p>
              </div>
            ) : (
              <form className="sub-form" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
                <input
                  type="email"
                  placeholder="you@work.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn--ochre">Subscribe →</button>
              </form>
            )}
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}
