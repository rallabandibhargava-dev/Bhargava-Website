import SiteNav from '../../components/SiteNav';
import LivingFooter from '../../components/LivingFooter';
import WorkGrid from '../../components/WorkGrid';
import { getAllWork } from '../../lib/work';

export const metadata = {
  title: 'Work',
  description: 'Selected cases from the last two years — acquisition, positioning, systems, and tools.',
};

export default function WorkPage() {
  const work = getAllWork();

  return (
    <>
      <SiteNav current="work" />
      <main>
        <section className="work-hero">
          <div className="shell">
            <div className="eyebrow" style={{ marginBottom: 24 }}>The archive · {work.length} cases · 2024–2026</div>
            <h1 className="shout-title work-hero__title">
              SELECTED <span className="ochre">WORK</span>.
            </h1>
            <p className="lead work-hero__lead">
              Few problems I&apos;ve worked on in the last two years. Most started as a marketing
              brief and turned out to be something else. Filter by the shape of the problem, or
              scroll through all of them.
            </p>
            <WorkGrid items={work} />
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}
