'use client';
import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (subscribed) {
    return (
      <div className="contact-success reveal is-in" style={{ maxWidth: 480, margin: '0 auto' }}>
        <div className="contact-success__tick">✓</div>
        <h2>You&apos;re in.</h2>
        <p>I&apos;ll send the next essay when it&apos;s ready — no sooner.</p>
      </div>
    );
  }

  return (
    <form className="sub-form" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
      <input
        type="email"
        placeholder="you@work.com"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit" className="btn btn--ochre">Subscribe →</button>
    </form>
  );
}
