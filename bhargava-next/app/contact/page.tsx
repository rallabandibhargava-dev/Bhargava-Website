'use client';
// @ts-nocheck
import { useState } from 'react';
import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import LivingFooter from '../../components/LivingFooter';
import useRevealObserver from '../../components/useRevealObserver';

function FormField({ label, required, help, children }) {
  return (
    <div className="ff">
      <label className="ff__label">
        {label}{required && <span className="ff__req">*</span>}
      </label>
      {children}
      {help && <div className="ff__help">{help}</div>}
    </div>
  );
}

export default function ContactPage() {
  useRevealObserver();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', problem: '', timing: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <SiteNav current="contact" />
      <main>
        {/* Hero */}
        <section className="contact-hero">
          <div className="shell">
            <div className="eyebrow eyebrow--ochre" style={{ marginBottom: 24 }}>
              <span className="pulse-dot" /> 1 of 2 Q3 slots open · response within 48h
            </div>
            <h1 className="shout-title contact-hero__title">
              TELL ME ABOUT<br/>
              THE <span className="ochre">PROBLEM</span>.
            </h1>
            <p className="contact-hero__lead">
              The more specific you are, the faster I can tell you whether I&apos;m the
              right person. If I&apos;m not, I&apos;ll introduce you to someone who is.
            </p>
          </div>
        </section>

        <section className="section-pad-sm">
          <div className="shell">
            <div className="contact-layout">
              {/* Left: form */}
              <div className="contact-form-col">
                {!sent ? (
                  <form className="contact-form" onSubmit={onSubmit}>
                    <FormField label="Your name" required>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                        placeholder="First and last"
                      />
                    </FormField>

                    <FormField label="Email" required>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                        placeholder="you@company.com"
                      />
                    </FormField>

                    <FormField label="Company + role">
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Acme, Head of Marketing"
                      />
                    </FormField>

                    <FormField label="Engagement you're thinking about" required>
                      <div className="radio-group">
                        {['Diagnostic · 2w', 'Project · 6–12w', 'Retainer · 3–6mo', 'Build · 4–8w', 'Not sure yet'].map(v => (
                          <label key={v} className={'radio-chip' + (form.budget === v ? ' is-active' : '')}>
                            <input
                              type="radio"
                              name="budget"
                              value={v}
                              checked={form.budget === v}
                              onChange={e => setForm({ ...form, budget: e.target.value })}
                            />
                            {v}
                          </label>
                        ))}
                      </div>
                    </FormField>

                    <FormField
                      label="What's the problem, in your own words"
                      required
                      help="One paragraph is fine. More is better. I read every one."
                    >
                      <textarea
                        rows={6}
                        value={form.problem}
                        onChange={e => setForm({ ...form, problem: e.target.value })}
                        required
                        placeholder="The numbers I'm watching, what I've already tried, and what I think is broken."
                      />
                    </FormField>

                    <FormField label="Timing">
                      <div className="radio-group">
                        {['Now', 'This quarter', 'Next quarter', 'Just exploring'].map(v => (
                          <label key={v} className={'radio-chip' + (form.timing === v ? ' is-active' : '')}>
                            <input
                              type="radio"
                              name="timing"
                              value={v}
                              checked={form.timing === v}
                              onChange={e => setForm({ ...form, timing: e.target.value })}
                            />
                            {v}
                          </label>
                        ))}
                      </div>
                    </FormField>

                    <div className="contact-form__submit">
                      <button type="submit" className="btn btn--ochre">Send the brief →</button>
                      <span className="contact-form__note">I&apos;ll reply within 48 hours, even if it&apos;s a no.</span>
                    </div>
                  </form>
                ) : (
                  <div className="contact-success reveal is-in">
                    <div className="contact-success__tick">✓</div>
                    <h2>Got it, {form.name.split(' ')[0] || 'there'}.</h2>
                    <p>I&apos;ll read what you sent today and reply within 48 hours. If we&apos;re a fit, the next step is a 30-minute call. If we&apos;re not, I&apos;ll tell you who to speak to instead.</p>
                    <div className="contact-success__meta">Reply will come from hi@bhargava.work · check spam just in case</div>
                  </div>
                )}
              </div>

              {/* Right: sidebar */}
              <aside className="contact-aside">
                <div className="contact-card">
                  <div className="contact-card__label">Prefer email</div>
                  <a href="mailto:hi@bhargava.work" className="contact-card__email link-draw">hi@bhargava.work →</a>
                  <p>Skip the form. A paragraph is enough to know whether to book a call.</p>
                </div>

                <div className="contact-card contact-card--ink on-dark">
                  <div className="contact-card__label" style={{ color: 'var(--ochre-light)' }}>What happens next</div>
                  <ol className="contact-steps">
                    <li><strong>Day 0</strong>You hit send.</li>
                    <li><strong>Day 1–2</strong>I read it. Reply with either (a) a 30-min call slot, (b) a question or two first, or (c) a redirect to someone better-fit.</li>
                    <li><strong>Week 1</strong>We talk. If it&apos;s a fit, I send a one-page proposal within 48h.</li>
                    <li><strong>Week 2</strong>If the shape is right, we start. If not, you&apos;re out clean.</li>
                  </ol>
                </div>

                <div className="contact-card">
                  <div className="contact-card__label">Elsewhere</div>
                  <div className="contact-links">
                    <a href="#" className="link-draw">LinkedIn ↗</a>
                  </div>
                </div>

                <div className="contact-meta-card">
                  <div><span>Mumbai</span><strong>Open hours · 09:30–19:00 IST</strong></div>
                  <div><span>Currently</span><strong>1 of 2 Q3 slots open</strong></div>
                  <div><span>Typical reply</span><strong>Within 48 hours</strong></div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <LivingFooter />
    </>
  );
}
