'use client';
// @ts-nocheck
import Link from 'next/link';
import SiteNav from '../../../components/SiteNav';
import LivingFooter from '../../../components/LivingFooter';
import useRevealObserver from '../../../components/useRevealObserver';

const CASES = {
  'jll-retargeting': {
    client: 'JLL India', type: 'ABM strategy', year: '2026', tag: 'Acquisition',
    title: 'THE RETARGETING\nBLINDSPOT IN JLL\'S\nENTERPRISE FUNNEL.',
    standfirst: "JLL India's enterprise sales cycle is long and multi-touch. The retargeting strategy was built for e-commerce. The work was to redesign the mid-funnel for an account-based reality.",
  },
  'atlas-repositioning': {
    client: 'Atlas Copco', type: 'Positioning', year: '2025', tag: 'Positioning',
    title: 'REPOSITIONING A 150-YEAR-OLD\nCOMPRESSOR MAKER FOR\nMID-MARKET INDIA.',
    standfirst: 'Atlas Copco had brand recognition but was priced out of the fastest-growing segment of the Indian market. The work was to find a positioning that let them compete without abandoning their premium story.',
  },
  'cde-tool': {
    client: 'Self-published', type: 'Tool built', year: '2025', tag: 'Tools',
    title: 'CDE — A DIAGNOSTIC ENGINE\nFOR STUCK\nCAMPAIGNS.',
    standfirst: 'A structured framework for diagnosing why a marketing campaign stopped performing — built as a tool anyone can use in under 20 minutes.',
  },
  'godrej-abm': {
    client: 'Godrej Properties', type: 'ABM rebuild', year: '2025', tag: 'Acquisition',
    title: 'FROM BROADCAST TO\nACCOUNT LIST: REBUILDING\nGODREJ\'S B2B PIPELINE.',
    standfirst: "Godrej Properties was running broadcast campaigns into a commercial real estate audience that needed account-level targeting. The work was to rebuild their pipeline motion from scratch.",
  },
  'bajaj-narrative': {
    client: 'Bajaj Finserv', type: 'Category narrative', year: '2025', tag: 'Positioning',
    title: 'WRITING A CATEGORY\nWHEN THE CATEGORY\nDOESN\'T EXIST YET.',
    standfirst: "Bajaj Finserv was entering a financial product space with no established category language. The brief: create the narrative that makes the category and owns it at the same time.",
  },
  'pharmeasy-systems': {
    client: 'PharmEasy', type: 'Ops systems', year: '2024', tag: 'Systems',
    title: 'THE CONTENT ENGINE\nTHAT SHIPPED 200\nPIECES IN 90 DAYS.',
    standfirst: "PharmEasy needed to scale health content rapidly across channels without proportionally scaling headcount. The work was to build the system, not just hire the writers.",
  },
  'attribution-sheet': {
    client: 'Self-published', type: 'Spreadsheet tool', year: '2024', tag: 'Tools',
    title: 'THE ATTRIBUTION\nSPREADSHEET I SEND\nEVERY CLIENT ON DAY ONE.',
    standfirst: 'A practical multi-touch attribution model built in Sheets — designed to replace vanity metrics dashboards with a clear view of which channels are actually closing revenue.',
  },
  'cred-writing': {
    client: 'CRED', type: 'Positioning audit', year: '2024', tag: 'Positioning',
    title: "AUDITING CRED'S\nPOSITIONING FROM\nTHE OUTSIDE IN.",
    standfirst: "An independent audit of how CRED communicates its value proposition across touchpoints — where it lands, where it doesn't, and what a tighter positioning frame would look like.",
  },
  'acko-funnel': {
    client: 'Acko', type: 'Funnel diagnostic', year: '2024', tag: 'Acquisition',
    title: "WHY ACKO'S LEAD-TO-POLICY\nRATIO WAS 3X THE INDUSTRY\n— AND WHAT TO DO ABOUT IT.",
    standfirst: "Acko was generating leads at scale but converting at a fraction of category benchmarks. The diagnostic found the problem wasn't the product — it was the intent gap between who was clicking and who was ready to buy.",
  },
  'tata-playbook': {
    client: 'Tata 1mg', type: 'Playbook', year: '2024', tag: 'Systems',
    title: 'THE INTERNAL PLAYBOOK\nTHAT REPLACED SEVEN\nAGENCY DECKS.',
    standfirst: 'Tata 1mg had accumulated years of agency recommendations with no connective tissue. The work was to consolidate, prioritise, and write the single playbook the marketing team could actually run off.',
  },
};

export default function CasePage({ params }: { params: { slug: string } }) {
  useRevealObserver();
  const data = CASES[params.slug] || {};
  const titleLines = (data.title || 'CASE STUDY\nCOMING SOON.').split('\n');

  return (
    <>
      <SiteNav current="work" dark />
      <main>
        <section className="case-opener surface-ink on-dark">
          <div className="shell">
            <div className="case-opener__meta">
              {data.client && <><span>{data.client}</span><span className="case-opener__dot">·</span></>}
              {data.type && <><span>{data.type}</span><span className="case-opener__dot">·</span></>}
              {data.year && <span>{data.year}</span>}
            </div>
            <h1 className="case-opener__title shout-title">
              {titleLines.map((line, i) => (
                <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
              ))}
            </h1>
            <p className="case-opener__standfirst">
              {data.standfirst || 'Full case study coming soon.'}
            </p>
            <div className="case-placeholder__status reveal" data-delay="200">
              <span className="case-placeholder__badge">Full write-up in progress</span>
              <p>The detailed case study including methodology, data, and outcomes is being prepared.</p>
            </div>
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

