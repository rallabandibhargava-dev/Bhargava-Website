'use client';
// @ts-nocheck
import Link from 'next/link';
import SiteNav from '../../../components/SiteNav';
import LivingFooter from '../../../components/LivingFooter';
import useRevealObserver from '../../../components/useRevealObserver';

const NOTES_META = {
  'retargeting-blindspot':    { date: '04.22.2026', read: '8 min',  title: 'The retargeting blindspot nobody measures',                  tag: 'Attribution', excerpt: "If 93% of your SALs come from one channel, you don't have a funnel — you have a measurement problem dressed up as performance." },
  'b2b-positioning-enemy':    { date: '03.31.2026', read: '11 min', title: 'Why most B2B positioning decks describe the wrong enemy',    tag: 'Positioning', excerpt: "The enemy in your positioning should be a status quo, not a competitor. Here's the test I run on every draft." },
  'spreadsheet-strategy':     { date: '03.14.2026', read: '6 min',  title: 'A spreadsheet is a strategy document when you let it be',   tag: 'Systems',     excerpt: "The most impactful artefact I've ever shipped to a client was an Excel file. The deck came later, if at all." },
  'charge-for-diagnostics':   { date: '02.28.2026', read: '9 min',  title: 'Diagnostics cost less than projects. Charge for them anyway.', tag: 'Consulting', excerpt: 'Free diagnostics attract the wrong clients. Charging ₹1.2 lakh changes the conversation before it starts.' },
  'category-creation':        { date: '02.10.2026', read: '13 min', title: 'Category creation, quietly: a playbook for grown-up companies', tag: 'Positioning', excerpt: "You don't need Salesforce-scale marketing to create a category. You need a new name for an old pain." },
  'first-year-freelancing':   { date: '01.24.2026', read: '7 min',  title: 'Four things I got wrong in my first year freelancing',      tag: 'Freelance',   excerpt: 'A confession and a correction, in roughly equal measure.' },
  'content-engine-200-posts': { date: '01.08.2026', read: '10 min', title: 'The content engine that shipped 200 posts in 90 days',      tag: 'Systems',     excerpt: "Writers didn't write more. The system around them changed. Here's exactly what we built." },
  'hiring-first-marketer':    { date: '12.18.2025', read: '5 min',  title: 'Notes on hiring your first marketing person',               tag: 'Operating',   excerpt: 'Not a JD. A thinking-aloud, for founders about to post the wrong role.' },
};

export default function NotePage({ params }: { params: { slug: string } }) {
  useRevealObserver();
  const note = NOTES_META[params.slug];

  if (!note) {
    return (
      <>
        <SiteNav current="notes" />
        <main>
          <section className="section-pad">
            <div className="shell shell--narrow">
              <h1 className="shout-title" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>Note not found.</h1>
              <Link href="/notes" className="btn" style={{ marginTop: 32, display: 'inline-block' }}>← Back to notes</Link>
            </div>
          </section>
        </main>
        <LivingFooter />
      </>
    );
  }

  return (
    <>
      <SiteNav current="notes" />
      <main>
        {/* Note header */}
        <section className="page-opener" style={{ paddingBottom: 48 }}>
          <div className="shell shell--narrow">
            <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 20 }}>
              <span className="tag tag--writing">{note.tag}</span>
              <span style={{ marginLeft: 16 }}>{note.date} · {note.read}</span>
            </div>
            <h1 className="shout-title page-opener__title" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
              {note.title}
            </h1>
            <p className="page-opener__lead" style={{ marginTop: 24 }}>
              {note.excerpt}
            </p>
          </div>
        </section>

        {/* Article body — placeholder */}
        <section className="section-pad-sm">
          <div className="shell shell--narrow">
            <div className="bio-prose">
              <div className="case-placeholder__status reveal" style={{ marginBottom: 48 }}>
                <span className="case-placeholder__badge">Full essay in progress</span>
                <p>The complete essay is being written. Check back soon or subscribe to get it when it&apos;s ready.</p>
              </div>

              <p className="reveal">
                {note.excerpt}
              </p>
              <p className="reveal">
                More of this essay is being written. The full piece will cover the methodology,
                the data behind the argument, and what you can do with it this week.
              </p>
            </div>

            <div className="case-placeholder__actions reveal" style={{ marginTop: 64 }}>
              <Link href="/notes" className="btn">← Back to notes</Link>
              <Link href="/contact" className="btn btn--ochre">Discuss this →</Link>
            </div>
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}

