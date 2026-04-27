import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '../../../components/SiteNav';
import LivingFooter from '../../../components/LivingFooter';
import RevealInit from '../../../components/RevealInit';
import { getWorkBySlug, getAllWorkSlugs } from '../../../lib/work';

export async function generateStaticParams() {
  return getAllWorkSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const work = await getWorkBySlug(params.slug);
  if (!work) return {};
  return {
    title: `${work.client} — ${work.type}`,
    description: work.standfirst,
  };
}

export default async function CasePage({ params }: { params: { slug: string } }) {
  const work = await getWorkBySlug(params.slug);
  if (!work) notFound();

  return (
    <>
      <SiteNav current="work" dark />
      <RevealInit />
      <main>
        {/* Case opener */}
        <section className="case-opener surface-ink on-dark">
          <div className="shell">
            <div className="case-opener__meta">
              <span>{work.client}</span>
              <span className="case-opener__dot">·</span>
              <span>{work.type}</span>
              <span className="case-opener__dot">·</span>
              <span>{work.year}</span>
            </div>
            <h1 className="case-opener__title shout-title">
              {work.title}
            </h1>
            <p className="case-opener__standfirst">{work.standfirst}</p>

            {/* Case body — renders full markdown if written, or placeholder */}
            {work.content && work.content.trim() !== '<p>Full case study coming soon. The detailed write-up including methodology, data, and outcomes is being prepared.</p>' ? (
              <div
                className="bio-prose reveal"
                style={{ marginTop: 48, color: 'var(--paper)' }}
                dangerouslySetInnerHTML={{ __html: work.content }}
              />
            ) : (
              <>
                <div className="case-placeholder__status reveal" data-delay="200">
                  <span className="case-placeholder__badge">Full write-up in progress</span>
                  <p>The detailed case study including methodology, data, and outcomes is being prepared.</p>
                </div>
              </>
            )}

            <div className="case-placeholder__actions reveal" data-delay="340">
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
