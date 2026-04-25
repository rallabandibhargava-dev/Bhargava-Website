// Notes index
const NOTES = [
  { date: '04.22.2026', read: '8 min', title: 'The retargeting blindspot nobody measures', tag: 'Attribution', excerpt: 'If 93% of your SALs come from one channel, you don\'t have a funnel — you have a measurement problem dressed up as performance.' },
  { date: '03.31.2026', read: '11 min', title: 'Why most B2B positioning decks describe the wrong enemy', tag: 'Positioning', excerpt: 'The enemy in your positioning should be a status quo, not a competitor. Here\'s the test I run on every draft.' },
  { date: '03.14.2026', read: '6 min', title: 'A spreadsheet is a strategy document when you let it be', tag: 'Systems', excerpt: 'The most impactful artefact I\'ve ever shipped to a client was an Excel file. The deck came later, if at all.' },
  { date: '02.28.2026', read: '9 min', title: 'Diagnostics cost less than projects. Charge for them anyway.', tag: 'Consulting', excerpt: 'Free diagnostics attract the wrong clients. Charging ₹1.2 lakh changes the conversation before it starts.' },
  { date: '02.10.2026', read: '13 min', title: 'Category creation, quietly: a playbook for grown-up companies', tag: 'Positioning', excerpt: 'You don\'t need Salesforce-scale marketing to create a category. You need a new name for an old pain.' },
  { date: '01.24.2026', read: '7 min', title: 'Four things I got wrong in my first year freelancing', tag: 'Freelance', excerpt: 'A confession and a correction, in roughly equal measure.' },
  { date: '01.08.2026', read: '10 min', title: 'The content engine that shipped 200 posts in 90 days', tag: 'Systems', excerpt: 'Writers didn\'t write more. The system around them changed. Here\'s exactly what we built.' },
  { date: '12.18.2025', read: '5 min', title: 'Notes on hiring your first marketing person', tag: 'Operating', excerpt: 'Not a JD. A thinking-aloud, for founders about to post the wrong role.' },
];

function App() {
  useRevealObserver();
  return (
    <>
      <SiteNav current="notes" />
      <main>
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
              <a href="#" className="notes-featured__inner">
                <div className="notes-featured__left">
                  <div className="notes-featured__meta">
                    <span>{NOTES[0].date}</span>
                    <span className="nf-dot">·</span>
                    <span>{NOTES[0].read}</span>
                    <span className="nf-dot">·</span>
                    <span className="tag tag--writing" style={{ marginLeft: 4 }}>{NOTES[0].tag}</span>
                  </div>
                  <h2 className="notes-featured__title">{NOTES[0].title}</h2>
                  <p className="notes-featured__excerpt">{NOTES[0].excerpt}</p>
                  <div className="notes-featured__read">Read the essay →</div>
                </div>
                <div className="notes-featured__right">
                  <PH label="essay artwork · 4×5" ratio="4 / 5" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Archive list */}
        <section className="section-pad-sm surface-linen">
          <div className="shell">
            <div className="eyebrow" style={{ marginBottom: 24 }}>Archive · {NOTES.length - 1} more</div>
            <ol className="notes-archive">
              {NOTES.slice(1).map((n, i) => (
                <li key={i} className="note-row reveal" data-delay={((i % 3) * 80).toString()}>
                  <a href="#" className="note-row__inner">
                    <span className="note-row__date">{n.date}</span>
                    <span className="note-row__title">{n.title}</span>
                    <span className="note-row__tag"><span className="tag tag--writing">{n.tag}</span></span>
                    <span className="note-row__read">{n.read}</span>
                    <span className="note-row__arrow">→</span>
                  </a>
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
              No newsletter playbook, no tripwire funnel. Just the essay, when it's
              ready. Unsubscribe ends the relationship cleanly.
            </p>
            <form className="sub-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="you@work.com" required />
              <button type="submit" className="btn btn--ochre">Subscribe →</button>
            </form>
            <div className="sub-rss">
              <a href="#" className="link-draw">Or prefer RSS ↗</a>
            </div>
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
