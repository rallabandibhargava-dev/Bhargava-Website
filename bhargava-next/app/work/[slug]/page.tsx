import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '../../../components/SiteNav';
import LivingFooter from '../../../components/LivingFooter';
import RevealInit from '../../../components/RevealInit';
import CaseShortStory from '../../../components/CaseShortStory';
import { getWorkBySlug, getAllWorkSlugs } from '../../../lib/work';

export async function generateStaticParams() {
  return getAllWorkSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) return {};
  return {
    title: `${work.client} — ${work.type}`,
    description: work.standfirst,
  };
}

const hasFullContent = (content: string) =>
  content &&
  content.trim() !== '' &&
  content.trim() !== '<p>Full case study coming soon. The detailed write-up including methodology, data, and outcomes is being prepared.</p>';

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  const hasContent = hasFullContent(work.content);

  return (
    <>
      <SiteNav current="work" dark />
      <RevealInit />
      <main>
        {/* ── Dark opener: meta + title + standfirst only ── */}
        <section className="case-opener surface-ink on-dark">
          <div className="shell">
            <div className="case-opener__meta reveal">
              <span>{work.client}</span>
              <span className="case-opener__dot">·</span>
              <span>{work.type}</span>
              <span className="case-opener__dot">·</span>
              <span>{work.year}</span>
            </div>
            <h1 className="case-opener__title shout-title reveal" data-delay="100">
              {work.title}
            </h1>
            <p className="case-opener__standfirst reveal" data-delay="200">
              {work.standfirst}
            </p>
          </div>
        </section>

        {/* ── Body: full content or placeholder ── */}
        {hasContent ? (
          <section className="case-body section-pad">
            <div className="shell shell--narrow">
              {work.shortStory ? <CaseShortStory summary={work.shortStory} /> : null}
              <div
                className="case-md reveal"
                dangerouslySetInnerHTML={{ __html: work.content }}
              />
            </div>
          </section>
        ) : (
          <section className="case-body section-pad-sm surface-ink on-dark">
            <div className="shell">
              <div className="case-placeholder__status reveal" data-delay="200">
                <span className="case-placeholder__badge">Full write-up in progress</span>
                <p>The detailed case study including methodology, data, and outcomes is being prepared.</p>
              </div>
            </div>
          </section>
        )}

        {/* ── Footer actions ── */}
        <section className="case-actions">
          <div className="shell">
            <div className="case-placeholder__actions reveal">
              <Link href="/work" className="btn">← Back to all work</Link>
              <Link href="/contact" className="btn btn--ochre">Discuss a similar problem →</Link>
            </div>
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}
