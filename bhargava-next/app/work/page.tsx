'use client';
// @ts-nocheck
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import LivingFooter from '../../components/LivingFooter';
import useRevealObserver from '../../components/useRevealObserver';

const ALL_WORK = [
  { slug: 'jll-retargeting',    client: 'JLL India',          type: 'ABM strategy',        year: '2026', title: "The retargeting blindspot in JLL's enterprise funnel",                       category: 'Acquisition', tag: 'Acquisition',   surface: 'linen',  ratio: '4 / 3' },
  { slug: 'atlas-repositioning',client: 'Atlas Copco',         type: 'Positioning',         year: '2025', title: 'Repositioning a 150-year-old compressor maker for mid-market India',        category: 'Positioning', tag: 'Positioning',   surface: 'dim',    ratio: '16 / 11' },
  { slug: 'cde-tool',           client: 'Self-published',      type: 'Tool built',          year: '2025', title: 'CDE — a diagnostic engine for stuck campaigns',                             category: 'Tools',       tag: 'Tools I Built', surface: 'ochre',  ratio: '16 / 11' },
  { slug: 'godrej-abm',         client: 'Godrej Properties',   type: 'ABM rebuild',         year: '2025', title: "From broadcast to account list: rebuilding Godrej's B2B pipeline",          category: 'Acquisition', tag: 'Acquisition',   surface: 'linen',  ratio: '16 / 11' },
  { slug: 'bajaj-narrative',    client: 'Bajaj Finserv',       type: 'Category narrative',  year: '2025', title: "Writing a category when the category doesn't exist yet",                    category: 'Positioning', tag: 'Positioning',   surface: 'dim',    ratio: '16 / 11' },
  { slug: 'pharmeasy-systems',  client: 'PharmEasy',           type: 'Ops systems',         year: '2024', title: 'The content engine that shipped 200 pieces in 90 days',                    category: 'Systems',     tag: 'Systems & Ops', surface: 'linen',  ratio: '16 / 11' },
  { slug: 'attribution-sheet',  client: 'Self-published',      type: 'Spreadsheet tool',    year: '2024', title: 'The attribution spreadsheet I send every client on day one',                category: 'Tools',       tag: 'Tools I Built', surface: 'ochre',  ratio: '16 / 11' },
  { slug: 'cred-writing',       client: 'CRED',                type: 'Positioning audit',   year: '2024', title: "Auditing CRED's positioning from the outside in",                          category: 'Positioning', tag: 'Positioning',   surface: 'dim',    ratio: '16 / 11' },
  { slug: 'acko-funnel',        client: 'Acko',                type: 'Funnel diagnostic',   year: '2024', title: "Why Acko's lead-to-policy ratio was 3x the industry — and what to do about it", category: 'Acquisition', tag: 'Acquisition', surface: 'linen', ratio: '16 / 11' },
  { slug: 'tata-playbook',      client: 'Tata 1mg',            type: 'Playbook',            year: '2024', title: 'The internal playbook that replaced seven agency decks',                    category: 'Systems',     tag: 'Systems & Ops', surface: 'dim',    ratio: '16 / 11' },
];

const CATEGORIES = ['All', 'Acquisition', 'Positioning', 'Systems', 'Tools'];

function WorkGridCard({ item }) {
  return (
    <Link href={`/work/${item.slug}`} className={'wgc wgc--' + item.surface}>
      <div className="wgc__media">
        <div
          className={'ph-image img-reveal' + (item.surface === 'dim' || item.surface === 'ochre' ? ' ph-image--dark' : '')}
          style={{ aspectRatio: item.ratio, width: '100%', height: '100%' }}
        >
          <div className="ph-image__label">{item.client.toLowerCase().replace(/ /g, '-')} · {item.year}</div>
        </div>
        <div className="wgc__overlay" />
        <span className="tag tag--ochre wgc__tag">{item.tag}</span>
      </div>
      <div className="wgc__line">
        <span>{item.client}</span><span className="wgc__dot">·</span>
        <span>{item.type}</span><span className="wgc__dot">·</span>
        <span>{item.year}</span>
      </div>
      <h3 className="wgc__title">{item.title}</h3>
      <div className="wgc__read">Read case <span className="wgc__arrow">→</span></div>
    </Link>
  );
}

export default function WorkPage() {
  useRevealObserver();
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () => filter === 'All' ? ALL_WORK : ALL_WORK.filter(w => w.category === filter),
    [filter]
  );

  useEffect(() => {
    const els = document.querySelectorAll('.wgc .img-reveal');
    els.forEach(el => el.classList.add('is-in'));
  }, [filtered]);

  return (
    <>
      <SiteNav current="work" />
      <main>
        <section className="work-hero">
          <div className="shell">
            <div className="eyebrow" style={{ marginBottom: 24 }}>The archive · {ALL_WORK.length} cases · 2024–2026</div>
            <h1 className="shout-title work-hero__title">
              SELECTED <span className="ochre">WORK</span>.
            </h1>
            <p className="lead work-hero__lead">
              Few problems I&apos;ve worked on in the last two years. Most started as a marketing
              brief and turned out to be something else. Filter by the shape of the problem, or
              scroll through all of them.
            </p>
            <div className="work-controls">
              <div className="work-filter" role="tablist">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={filter === c}
                    className={'work-filter__btn' + (filter === c ? ' is-active' : '')}
                    onClick={() => setFilter(c)}
                  >
                    {c}
                    <span className="work-filter__count">
                      {c === 'All' ? ALL_WORK.length : ALL_WORK.filter(w => w.category === c).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad-sm">
          <div className="shell">
            <div className="work-grid-full">
              {filtered.map(w => <WorkGridCard key={w.slug} item={w} />)}
            </div>
            {filtered.length === 0 && (
              <div className="work-empty">Nothing in this category yet.</div>
            )}
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}
