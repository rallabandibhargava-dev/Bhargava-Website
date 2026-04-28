import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '../../../components/SiteNav';
import LivingFooter from '../../../components/LivingFooter';
import RevealInit from '../../../components/RevealInit';
import { getNoteBySlug, getAllNoteSlugs } from '../../../lib/notes';

export async function generateStaticParams() {
  return getAllNoteSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.excerpt,
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <>
      <SiteNav current="notes" />
      <RevealInit />
      <main>
        {/* Note header */}
        <section className="page-opener" style={{ paddingBottom: 48 }}>
          <div className="shell shell--narrow">
            <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 20 }}>
              <span className="tag tag--writing">{note.tag}</span>
              <span style={{ marginLeft: 16 }}>{note.dateFormatted} · {note.read}</span>
            </div>
            <h1 className="shout-title page-opener__title" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
              {note.title}
            </h1>
            <p className="page-opener__lead" style={{ marginTop: 24 }}>
              {note.excerpt}
            </p>
          </div>
        </section>

        {/* Article body */}
        <section className="section-pad-sm">
          <div className="shell shell--narrow">
            <div
              className="bio-prose"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
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
