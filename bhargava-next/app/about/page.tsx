'use client';
// @ts-nocheck
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
        <section className="page-opener">
          <div className="shell">
            <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 24 }}>
              About · seven years in · still curious
            </div>
            <h1 className="shout-title page-opener__title">
              I&apos;M A <span className="ochre">STRATEGIST</span>,<br />
              BUILDING FRAMEWORKS<br />
              THAT DRIVE OUTCOMES
            </h1>
            <p className="page-opener__lead">
              A framework that doesn&apos;t translate into action is just theory.
              And data without depth can&apos;t drive decisions.
            </p>
            <MobileScrollCue />
          </div>
        </section>

        <section className="section-pad">
          <div className="shell">
            <div className="eyebrow reveal" style={{ marginBottom: 24 }}>01 · How I work</div>
            <h2 className="shout-title reveal" style={{ fontSize: 'clamp(40px, 5vw, 72px)', marginBottom: 56 }}>
              FIVE <span className="ochre">PRINCIPLES</span><br />I KEEP COMING BACK TO.
            </h2>
            <div className="principles">
              {[
                ['Start at the cost line', 'Every marketing strategy ends up as a line on a P&L. I start there and work backwards. It’s the fastest way to find out which problem is worth solving.'],
                ['Write before you deck', 'If I can’t write the thesis in a paragraph, the deck won’t save it. Every engagement starts with a memo, not a slide.'],
                ['Build the measurement before the move', 'Changing spend without changing measurement is how you get worse data faster. Instrument first, act second.'],
                ['One reframe per engagement', 'Clients don’t need ten new ideas. They need one correct one, pressure-tested. I bring one reframe and defend it.'],
                ['Ship tools, not decks', 'A spreadsheet someone uses on Monday is worth more than a deck everyone loves on Friday. I ship working artefacts.'],
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

        <section className="section-pad surface-linen">
          <div className="shell shell--narrow">
            <div className="eyebrow reveal" style={{ marginBottom: 24 }}>02 · The short biography</div>
            <h2 className="shout-title reveal" style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', marginBottom: 40 }}>
              MORE THAN SEVEN YEARS,<br />FROM IDEAS TO OUTCOMES.
            </h2>
            <div className="bio-prose">
              <p className="reveal">
                I&apos;ve spent most of my career inside marketing teams and client accounts,
                working across performance, media, and strategy. The role was always close
                to execution, managing campaigns, diagnosing drops, explaining numbers,
                trying to move outcomes.
              </p>
              <p className="reveal">
                Over time, a pattern became clear. Most performance issues weren&apos;t campaign
                problems. They were decision problems, positioning, funnel structure, unclear
                signals in the data. That shifted my focus from running campaigns to
                understanding systems.
              </p>
              <p className="reveal">
                Now I spend most of my time auditing funnels, shaping positioning, and
                running diagnostics across acquisition, engagement, and conversion. The goal
                is to move beyond reporting and get to what is actually driving or blocking
                growth.
              </p>
              <p className="reveal">
                More recently, I&apos;ve started building alongside this. Small tools to make
                analysis less manual and decisions more grounded. Not to replace strategy,
                but to make it executable.
              </p>
            </div>
          </div>
        </section>

        <section className="section-pad-sm">
          <div className="shell">
            <div className="eyebrow reveal" style={{ marginBottom: 24 }}>03 · Clients · 2024 to now</div>
            <h2 className="shout-title reveal" style={{ fontSize: 'clamp(32px, 4vw, 52px)', marginBottom: 40 }}>
              WHO I&apos;VE WORKED <span className="ochre">WITH</span>.
            </h2>
            <div className="clients-wall">
              {[
                ['Real estate', ['JLL India', 'L&T Realty']],
                ['Technology & enterprise', ['Tata Communications', 'HCL Software']],
                ['Consumer & healthcare', ['Audi', 'Hansaplast', 'Pidilite Industries']],
                ['Industrial & materials', ['Saint-Gobain']],
              ].map(([group, names], i) => (
                <div key={i} className="clients-group reveal" data-delay={(i * 80).toString()}>
                  <div className="clients-group__label">{group}</div>
                  <ul>{(names as string[]).map((n) => <li key={n}>{n}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad surface-ink on-dark">
          <div className="shell">
            <div className="portrait-row">
              <div className="reveal">
                <div className="img-reveal" style={{ width: '100%', maxWidth: 380 }}>
                  <img
                    src="/assets/bhargava-about.jpg"
                    alt="Bhargava portrait"
                    style={{
                      aspectRatio: '4 / 5',
                      width: '100%',
                      display: 'block',
                      objectFit: 'cover',
                      borderRadius: 12,
                    }}
                  />
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
                  <div><span>Languages</span><strong>English, Hindi</strong></div>
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
