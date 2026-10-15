import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribed(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#493512', '#C5A059', '#FFF2DC']
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <section 
      style={{
        padding: '5rem 0',
        background: 'var(--color-espresso-dark)',
        color: 'var(--color-linen)',
        borderTop: '1px solid rgba(255, 242, 220, 0.1)',
        position: 'relative'
      }}
    >
      <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', borderRadius: 'var(--radius-full)', background: 'rgba(255, 242, 220, 0.1)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: '#C5A059', marginBottom: '16px' }}>
          <Sparkles size={12} />
          Private Atelier Circle
        </div>

        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: '#FFF2DC', marginBottom: '12px' }}>
          Join The Quiet Luxury Circle
        </h2>

        <p style={{ fontSize: '0.95rem', color: 'rgba(255, 242, 220, 0.75)', lineHeight: 1.6, marginBottom: '2rem' }}>
          Be the first to receive invitation-only capsule drops, seasonal lookbooks, and receive <strong>₹500 / $10 off</strong> your inaugural order.
        </p>

        {isSubscribed ? (
          <div style={{ background: 'rgba(255, 242, 220, 0.1)', border: '1px solid rgba(255, 242, 220, 0.2)', padding: '20px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <CheckCircle2 size={24} color="#C5A059" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFF2DC' }}>Welcome to the Atelier Circle</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255, 242, 220, 0.75)' }}>Your ₹500 invitation gift code <strong>ETMEK15</strong> is now active.</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <input
              type="email"
              required
              placeholder="Enter your private email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: '1 1 280px',
                padding: '13px 18px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 242, 220, 0.2)',
                background: 'rgba(255, 242, 220, 0.08)',
                color: '#FFF2DC',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-linen"
              style={{ padding: '13px 26px', fontSize: '0.82rem' }}
            >
              <span>Join Circle</span>
              <Send size={14} />
            </button>
          </form>
        )}

        <div style={{ marginTop: '16px', fontSize: '0.7rem', color: 'rgba(255, 242, 220, 0.5)' }}>
          Respecting your privacy. No spam, only editorial correspondence.
        </div>
      </div>
    </section>
  );
}
