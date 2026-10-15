import React from 'react';
import { EDITORIAL_QUOTES } from '../data/products';
import { Quote, Star, Sparkles, BookOpen } from 'lucide-react';

export default function PressSection({ onOpenBrandBook }) {
  return (
    <section 
      style={{ 
        padding: '5rem 0', 
        background: 'var(--color-linen)',
        borderTop: '1px solid var(--color-linen-border)'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
          <span style={{ fontSize: '0.74rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-espresso-medium)', display: 'block', marginBottom: '8px' }}>
            Critical Acclaim & Patrons
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: 'var(--color-espresso-dark)' }}>
            Celebrated by Fashion Discerning Voices
          </h2>
        </div>

        {/* 3 Editorial Press Cards */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px',
            marginBottom: '4.5rem'
          }}
        >
          {EDITORIAL_QUOTES.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: 'var(--color-linen-light)',
                borderRadius: '12px',
                border: '1px solid var(--color-linen-border)',
                padding: '30px 26px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-espresso-dark)' }}>
                  {item.outlet}
                </span>
                <Quote size={20} color="#C5A059" style={{ opacity: 0.6 }} />
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--color-espresso-medium)', lineHeight: '1.7', fontStyle: 'italic', flex: 1, marginBottom: '20px' }}>
                "{item.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid var(--color-linen-border)', paddingTop: '14px', fontSize: '0.76rem', color: 'var(--color-espresso-light)' }}>
                <Sparkles size={13} color="#C5A059" />
                <span>{item.author}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lookbook Gallery Showcase Banner */}
        <div 
          style={{
            background: 'var(--color-espresso)',
            borderRadius: '16px',
            padding: '3rem 2.5rem',
            color: '#FFF2DC',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 242, 220, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <BookOpen size={24} color="#C5A059" />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: '#FFF2DC', marginBottom: '10px' }}>
            The Official Autumn/Winter Brand Identity Book
          </h3>
          <p style={{ maxWidth: '620px', fontSize: '0.95rem', color: 'rgba(255, 242, 220, 0.8)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Explore the complete typographic layout, hex specifications for Espresso Brown (#493512) & Warm Linen (#FFF2DC), fabric composition notes, and high-fashion styling guide.
          </p>
          <button 
            onClick={onOpenBrandBook}
            className="btn-linen"
            style={{ padding: '0.95rem 2.2rem' }}
          >
            <BookOpen size={16} />
            <span>Open Interactive Brand Book & PDF</span>
          </button>
        </div>

      </div>
    </section>
  );
}
