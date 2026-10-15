import React from 'react';
import { BRAND_STORY } from '../data/products';
import { BookOpen, Sparkles, Compass, Shield, Heart } from 'lucide-react';

export default function BrandPhilosophy({ onOpenBrandBook }) {
  const pillarIcons = [Compass, Shield, Sparkles, Heart];

  return (
    <section 
      id="about"
      style={{
        padding: '5rem 0',
        background: 'var(--color-linen-pure)',
        borderTop: '1px solid var(--color-linen-border)',
        borderBottom: '1px solid var(--color-linen-border)'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.18em', 
            fontWeight: 700, 
            color: 'var(--color-espresso-medium)',
            display: 'block',
            marginBottom: '8px'
          }}>
            Brand Manifesto • Est. 2024
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', 
            color: 'var(--color-espresso-dark)',
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}>
            Why We Created The Clothing Solution
          </h2>
          <p style={{ 
            fontSize: '1.05rem', 
            color: 'var(--color-espresso-medium)', 
            lineHeight: 1.7 
          }}>
            Modern womenswear had surrendered to synthetics, synthetic blends, and fleeting fast trends. 
            <strong> etmek</strong> was founded to restore enduring craftsmanship, breathable textiles, and intentional silhouettes.
          </p>
        </div>

        {/* 4 Brand Pillars Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '24px',
            marginBottom: '4rem'
          }}
        >
          {BRAND_STORY.pillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            return (
              <div 
                key={idx}
                style={{
                  background: 'var(--color-linen-light)',
                  border: '1px solid var(--color-linen-border)',
                  borderRadius: '12px',
                  padding: '28px 24px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div 
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'var(--color-espresso)',
                    color: '#FFF2DC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px'
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-espresso-dark)', marginBottom: '8px' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-espresso-muted)', lineHeight: '1.6' }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature Split Banner */}
        <div 
          style={{
            background: 'var(--color-espresso-dark)',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            color: '#FFF2DC',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ padding: '3.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C5A059', fontWeight: 700, marginBottom: '10px' }}>
              The Autumn/Winter Lookbook
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFF2DC', marginBottom: '1rem', lineHeight: 1.25 }}>
              Immerse yourself in our textile architecture & full color study.
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'rgba(255, 242, 220, 0.8)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Download or browse our comprehensive brand identity document, complete with color specifications, yarn densities, styling lookbook, and artisan profiles.
            </p>
            <div>
              <button 
                onClick={onOpenBrandBook}
                className="btn-linen"
              >
                <BookOpen size={16} />
                <span>Open Brand Book & PDF</span>
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', minHeight: '320px' }}>
            <img 
              src="/assets/striped-linen.jpeg" 
              alt="etmek Handwoven Linen" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(47, 33, 10, 0.4), transparent)'
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
