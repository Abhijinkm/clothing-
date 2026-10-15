import React from 'react';
import { ArrowDown, Sparkles, BookOpen, Feather, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Hero({ onExploreClick, onOpenBrandBook, onOpenTryOn }) {
  return (
    <section 
      style={{ 
        position: 'relative', 
        paddingTop: '3rem', 
        paddingBottom: '4rem',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--color-linen-light) 0%, var(--color-linen) 100%)'
      }}
    >
      <div className="container">
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '3rem', 
            alignItems: 'center' 
          }}
        >
          {/* Left Column: Editorial Headline & Story */}
          <div style={{ maxWidth: '600px' }}>
            
            {/* Capsule Pill */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '6px 14px', 
                background: 'var(--color-linen-card)', 
                border: '1px solid var(--color-linen-border)', 
                borderRadius: 'var(--radius-full)',
                marginBottom: '1.25rem' 
              }}
            >
              <Sparkles size={14} color="#C5A059" />
              <span style={{ 
                fontSize: '0.74rem', 
                fontWeight: 600, 
                letterSpacing: '0.12em', 
                textTransform: 'uppercase', 
                color: 'var(--color-espresso)' 
              }}>
                Autumn/Winter '26 Capsule • Quiet Luxury
              </span>
            </div>

            {/* Editorial Title */}
            <h1 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
                lineHeight: 1.08, 
                fontWeight: 500, 
                color: 'var(--color-espresso-dark)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}
            >
              The Architecture of Breathable Luxury.
            </h1>

            {/* Editorial Subtitle */}
            <p 
              style={{ 
                lineHeight: 1.7, 
                color: 'var(--color-espresso-medium)', 
                marginBottom: '2rem',
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.35rem'
              }}
            >
              Tailored in deep Espresso Brown (<code>#493512</code>) and organic Warm Linen (<code>#FFF2DC</code>). 
              Crafted from 100% natural pure flax and artisanal cotton slub for women who celebrate quiet elegance.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2.5rem' }}>
              <button 
                onClick={onExploreClick}
                className="btn-primary"
              >
                <span>Shop Autumn Edit</span>
                <ArrowDown size={15} />
              </button>

              <button 
                onClick={onOpenTryOn}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  background: 'linear-gradient(135deg, #C5A059 0%, #A37F38 100%)',
                  color: '#FFFFFF',
                  padding: '0.95rem 1.8rem',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(197, 160, 89, 0.4)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Sparkles size={16} />
                <span>3D Virtual Try-On</span>
              </button>

              <button 
                onClick={onOpenBrandBook}
                className="btn-secondary"
              >
                <BookOpen size={15} />
                <span>Lookbook PDF</span>
              </button>
            </div>

            {/* Micro Feature Icons */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '12px',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-linen-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Feather size={18} color="#493512" />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-espresso-dark)' }}>Pure Flax & Slub</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#493512" />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-espresso-dark)' }}>French Seam Finish</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HeartHandshake size={18} color="#493512" />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-espresso-dark)' }}>Ethical Ateliers</span>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Hero Visual Composition */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{ 
                position: 'relative', 
                maxWidth: '480px', 
                margin: '0 auto',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-3d)',
                border: '1px solid var(--color-linen-border)'
              }}
            >
              <img 
                src="/assets/maroon-coord.jpeg" 
                alt="etmek Crimson Maroon Pure Cotton Co-ord Set"
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block',
                  transform: 'scale(1.01)',
                  transition: 'transform 0.8s ease'
                }}
              />

              {/* Floating Editorial Badge Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(255, 242, 220, 0.92)',
                  backdropFilter: 'blur(12px)',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(73, 53, 18, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-espresso-medium)', fontWeight: 700 }}>
                    Campaign Look 01
                  </span>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-espresso-dark)', margin: '2px 0 0' }}>
                    Crimson Maroon Slub Co-ord Set
                  </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-espresso)' }}>
                    ₹1,250
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#A64B2A', fontWeight: 700 }}>Bestseller</span>
                </div>
              </div>
            </div>

            {/* Decorative Color Swatch Tag */}
            <div 
              style={{
                position: 'absolute',
                top: '-15px',
                right: '10px',
                background: '#493512',
                color: '#FFF2DC',
                padding: '12px 18px',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-lg)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              <span>Espresso Brown</span>
              <span style={{ opacity: 0.75, fontFamily: 'monospace' }}>#493512</span>
            </div>
          </div>

        </div>
      </div>

      {/* Editorial Marquee Strip */}
      <div 
        style={{ 
          marginTop: '4rem', 
          background: 'var(--color-espresso)', 
          color: 'var(--color-linen)', 
          padding: '12px 0', 
          overflow: 'hidden',
          borderTop: '1px solid rgba(255, 242, 220, 0.15)',
          borderBottom: '1px solid rgba(255, 242, 220, 0.15)'
        }}
      >
        <div className="marquee-track" style={{ gap: '3rem', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
          <span>• 100% PURE EUROPEAN FLAX</span>
          <span>• HAND-BLOCK & HAND-EMBROIDERED CHANDERI</span>
          <span>• CONCEALED FUNCTIONAL POCKETS</span>
          <span>• NATURAL MOTHER-OF-PEARL ACCENTS</span>
          <span>• ETHICAL ATELIERS & FAIR WAGES</span>
          <span>• BREATHABLE TROPICAL WEIGHTS</span>
          <span>• ZERO POLYESTER GUARANTEE</span>
          <span>• 100% PURE EUROPEAN FLAX</span>
          <span>• HAND-BLOCK & HAND-EMBROIDERED CHANDERI</span>
          <span>• CONCEALED FUNCTIONAL POCKETS</span>
        </div>
      </div>
    </section>
  );
}
