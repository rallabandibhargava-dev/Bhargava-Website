'use client';
// @ts-nocheck
import { Metadata } from 'next';
import SiteNav from '../../components/SiteNav';
import LivingFooter from '../../components/LivingFooter';
import MobileScrollCue from '../../components/MobileScrollCue';
import useRevealObserver from '../../components/useRevealObserver';

export default function AboutPage() {
  useRevealObserver();
  return (
    <>
      <SiteNav current="about" />
      <main>
        {/* Page opener */}
        <section className="page-opener">
          <div className="shell">
            <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 24 }}>
              About · seven years in · still curious
            </div>
            <h1 className="shout-title page-opener__title">
              I&apos;M HALF STRATEGIST,<br/>
              HALF <span className="ochre">BUILDER</span>,<br/>
              BASED IN MUMBAI.
            </h1>
            <p className="page-opener__lead">
              The two halves feed each other. A strategy you can&apos;t instrument is a
              belief, not a plan. A tool without a thesis is a script.
            </p>
            <MobileScrollCue />
          </div>
        </section>

        {/* Principles */}
        <section className="section-pad">
          <div className="shell">
            <div className="eyebrow reveal" style={{ marginBottom: 24 }}>01 · How I work</div>
            <h2 className="shout-title reveal" style={{ fontSize: 'clamp(40px, 5vw, 72px)', marginBottom: 56 }}>
              FIVE <span className="ochre">PRINCIPLES</span><br/>I KEEP COMING BACK TO.
            </h2>
            <div className="principles">
              {[
                ['Start at the cost line', "Every marketing strategy ends up as a line on a P&L. I start there and work backwards. It’s the fastest way to find out which problem is worth solving."],
                ['Write before you deck', "If I can’t write the thesis in a paragraph, the deck won’t save it. Every engagement starts with a memo, not a slide."],
                ['Build the measurement before the move', "Changing spend without changing measurement is how you get worse data faster. Instrument first, act second."],
                ['One reframe per engagement', "Clients don’t need ten new ideas. They need one correct one, pressure-tested. I bring one reframe and defend it."],
                ['Ship tools, not decks', "A spreadsheet someone uses on Monday is worth more than a deck everyone loves on Friday. I ship working artefacts."],
              ].map(([t, b], i) => (
                <div key={i} className="principle reveal" data-delay={((i % 3) * 80).toString()}>
                  <div className="principle__num">0{i + 1}</div>
                  <h3 className="principle__title">{t}</h3>
                  <p className="principle__body">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career narrative */}
        <section className="section-pad surface-linen">
          <div className="shell shell--narrow">
            <div className="eyebrow reveal" style={{ marginBottom: 24 }}>02 · The short biography</div>
            <h2 className="shout-title reveal" style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', marginBottom: 40 }}>
              SEVEN YEARS,<br/>FOUR CHAPTERS.
            </h2>
            <div className="bio-prose">
              <p className="reveal">
                I started out in 2019 inside a consumer brand doing performance marketing.
                I was good at it — and after two years, good enough to see that performance
                marketing was the <em>consequence</em> of better decisions elsewhere. So I
                moved into brand strategy, then into a B2B platform running the whole
                commercial function.
              </p>
              <p className="reveal">
                In 2023 I started building tools on the side because the consultants around me
                kept delivering strategy without the means to run it. A positioning doc without
                an attribution model is a guess. I taught myself enough React and SQL to stop
                waiting for the tech team.
              </p>
              <p className="reveal">
                Went freelance in 2024. Now I work with two or three companies at a time —
                usually as the strategist, often as the strategist-<em>and</em>-the-small-team-of-engineers.
                The work sits at the intersection and I like it there. Mumbai since birth;
                curious about everything else.
              </p>
            </div>

            {/* Timeline */}
            <div className="timeline">
              {[
                ['2019 – 2021', 'Performance marketer', 'A consumer DTC brand. Learned the numbers.'],
                ['2021 – 2022', 'Brand strategist', 'Agency side. Learned the writing.'],
                ['2022 – 2024', 'Head of marketing', 'A B2B SaaS platform. Learned the system.'],
                ['2024 – now', 'Freelance — strategist & builder', 'Two or three clients at a time. This is the job.'],
              ].map(([when, what, note], i) => (
                <div key={i} className="timeline__row reveal" data-delay={(i * 60).toString()}>
                  <div className="timeline__when">{when}</div>
                  <div>
                    <div className="timeline__what">{what}</div>
                    <div className="timeline__note">{note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="section-pad-sm">
          <div className="shell">
            <div className="eyebrow reveal" style={{ marginBottom: 24 }}>03 · Clients · 2024 to now</div>
            <h2 className="shout-title reveal" style={{ fontSize: 'clamp(32px, 4vw, 52px)', marginBottom: 40 }}>
              WHO I&apos;VE WORKED <span className="ochre">WITH</span>.
            </h2>
            <div className="clients-wall">
              {[
                ['Real estate', ['JLL India', 'Godrej Properties', 'Lodha']],
                ['Fintech', ['Bajaj Finserv', 'Acko', 'Pine Labs', 'Razorpay']],
                ['Consumer', ['Urban Company', 'Tata 1mg', 'PharmEasy']],
                ['B2B & industrial', ['Atlas Copco', 'CRED (B2B)', 'Zomato B2B']],
              ].map(([group, names], i) => (
                <div key={i} className="clients-group reveal" data-delay={(i * 80).toString()}>
                  <div className="clients-group__label">{group}</div>
                  <ul>{(names as string[]).map(n => <li key={n}>{n}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portrait / For the record */}
        <section className="section-pad surface-ink on-dark">
          <div className="shell">
            <div className="portrait-row">
              <div className="reveal">
                <div className="ph-image ph-image--dark img-reveal" style={{ aspectRatio: '4 / 5', width: '100%', maxWidth: 380 }}>
                  <div className="ph-image__label">portrait · 4×5</div>
                </div>
              </div>
              <div className="portrait-text">
                <div className="eyebrow eyebrow--ochre reveal" style={{ marginBottom: 24 }}>04 · For the record</div>
                <p className="reveal" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(24px, 2.8vw, 36px)', lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--paper)', marginBottom: 32 }}>
                  I read a lot, mostly non-fiction and a few long-running Substacks.
                  I write slowly, revise often, and think out loud in notes. The
                  portrait is a formality. The work is the thing.
                </p>
                <div className="portrait-meta reveal">
                  <div><span>Based in</span><strong>Bombay / Mumbai, India</strong></div>
                  <div><span>Languages</span><strong>English, Hindi, broken Marathi</strong></div>
                  <div><span>Available</span><strong>Q3 2026 · 1 of 2 slots open</strong></div>
                  <div><span>Writes at</span><strong>bhargava.work/notes</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}
