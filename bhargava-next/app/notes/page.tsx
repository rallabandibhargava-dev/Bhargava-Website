import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import LivingFooter from '../../components/LivingFooter';
import RevealInit from '../../components/RevealInit';
import SubscribeForm from '../../components/SubscribeForm';
import { getAllNotes } from '../../lib/notes';

export const metadata = {
  title: 'Notes',
  description: 'Short essays about strategy, measurement, and the gap between the deck and what actually happens.',
};

export default function NotesPage() {
  const notes = getAllNotes();
  const featured = notes[0];
  const archive = notes.slice(1);

  return (
    <>
      <SiteNav current="notes" />
      <RevealInit />
      <main>
        {/* Hero */}
        <section className="notes-hero">
          <div className="shell">
            <div className="eyebrow" style={{ marginBottom: 24 }}>Notes · essays · {notes.length} published</div>
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
        {featured && (
          <section className="section-pad-sm">
            <div className="shell">
              <div className="notes-featured reveal">
                <div className="notes-featured__tag">Most recent</div>
                <Link href={`/notes/${featured.slug}`} className="notes-featured__inner">
                  <div className="notes-featured__left">
                    <div className="notes-featured__meta">
                      <span>{featured.dateFormatted}</span>
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
        )}

        {/* Archive list */}
        {archive.length > 0 && (
          <section className="section-pad-sm surface-linen">
            <div className="shell">
              <div className="eyebrow" style={{ marginBottom: 24 }}>Archive · {archive.length} more</div>
              <ol className="notes-archive">
                {archive.map((n, i) => (
                  <li key={n.slug} className="note-row reveal" data-delay={((i % 3) * 80).toString()}>
                    <Link href={`/notes/${n.slug}`} className="note-row__inner">
                      <span className="note-row__date">{n.dateFormatted}</span>
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
        )}

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
            <SubscribeForm />
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}
