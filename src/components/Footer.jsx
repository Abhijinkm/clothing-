import React from 'react';
import { BookOpen, Heart, Sparkles, Shield, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenBrandBook, onSelectCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        background: 'var(--color-espresso-deep)',
        color: 'var(--color-linen)',
        padding: '5rem 0 2.5rem',
        borderTop: '1px solid rgba(255, 242, 220, 0.15)',
        position: 'relative'
      }}
      className="site-footer"
    >
      <div className="container">
        
        {/* Main Footer Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '3rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(255, 242, 220, 0.12)'
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img 
                src="/assets/logo.jpeg" 
                alt="etmek" 
                style={{ width: '48px', height: '48px', borderRadius: '8px', border: '1px solid rgba(255, 242, 220, 0.2)' }} 
              />
              <div>
                <span style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.6rem', fontWeight: 700, color: '#FFF2DC', lineHeight: 1 }}>
                  etmek
                </span>
                <span style={{ display: 'block', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C5A059', fontWeight: 600 }}>
                  The Clothing Solution
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'rgba(255, 242, 220, 0.75)', lineHeight: 1.6, marginBottom: '20px' }}>
              Women’s quiet luxury fashion handcrafted in pure European flax, breathable cotton slub, and artisanal handlooms.
            </p>

            {/* Color Identity Reference Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 242, 220, 0.1)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#493512', border: '1px solid #FFF2DC' }} />
                <span>Espresso #493512</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 242, 220, 0.1)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFF2DC', border: '1px solid #493512' }} />
                <span>Warm Linen #FFF2DC</span>
              </div>
            </div>
          </div>

          {/* Collections Column */}
          <div>
            <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C5A059', fontWeight: 700, marginBottom: '18px' }}>
              Curated Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              {[
                { id: 'all', label: 'All Capsule Silhouettes' },
                { id: 'coords', label: 'Relaxed Co-ord Sets' },
                { id: 'tunics', label: 'Artisanal Tunics' },
                { id: 'linen', label: 'Pure Flax Linen Edit' },
                { id: 'festive', label: 'Hand-Embroidered Chanderi' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(item.id);
                      const el = document.getElementById('collection-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ background: 'none', border: 'none', color: 'rgba(255, 242, 220, 0.8)', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#FFF2DC'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 242, 220, 0.8)'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Documentation & PDF */}
          <div>
            <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C5A059', fontWeight: 700, marginBottom: '18px' }}>
              Brand Archive
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li>
                <button
                  onClick={onOpenBrandBook}
                  style={{ background: 'none', border: 'none', color: '#FFF2DC', cursor: 'pointer', padding: 0, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <BookOpen size={14} color="#C5A059" /> Brand Identity Book & Lookbook (PDF)
                </button>
              </li>
              <li><span style={{ color: 'rgba(255, 242, 220, 0.8)' }}>Textile Purity Certifications</span></li>
              <li><span style={{ color: 'rgba(255, 242, 220, 0.8)' }}>Artisan Weaver Directory</span></li>
              <li><span style={{ color: 'rgba(255, 242, 220, 0.8)' }}>Sustainability Standards</span></li>
              <li><span style={{ color: 'rgba(255, 242, 220, 0.8)' }}>Editorial Lookbook Archive</span></li>
            </ul>
          </div>

          {/* Concierge & Boutiques */}
          <div>
            <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C5A059', fontWeight: 700, marginBottom: '18px' }}>
              Client Concierge
            </h4>
            <div style={{ fontSize: '0.84rem', color: 'rgba(255, 242, 220, 0.75)', lineHeight: 1.7 }}>
              <p>Email: concierge@etmekclothing.com</p>
              <p>WhatsApp Concierge: +91 98471 23456</p>
              <p>Boutique Ateliers: Kochi • Bangalore • Mumbai</p>
              <p style={{ marginTop: '8px', color: '#C5A059', fontSize: '0.78rem' }}>Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.76rem', color: 'rgba(255, 242, 220, 0.6)' }}>
          <div>
            © 2026 <strong>etmek® — The Clothing Solution</strong>. All rights reserved. Registered Trademark.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
            <button
              onClick={scrollToTop}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 242, 220, 0.1)',
                border: 'none',
                color: '#FFF2DC',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                fontSize: '0.74rem'
              }}
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
