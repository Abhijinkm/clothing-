import React, { useState } from 'react';
import { X, Download, Printer, BookOpen, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { BRAND_STORY, PRODUCTS } from '../data/products';

export default function BrandBookModal({ isOpen, onClose }) {
  const [activePage, setActivePage] = useState(0);

  if (!isOpen) return null;

  const pages = [
    // Page 1: Brand Manifesto & Cover
    {
      title: "Brand Manifesto & Essence",
      tagline: "The Art of Mindful Dressing",
      render: () => (
        <div style={{ textAlign: 'center', padding: '20px 10px' }}>
          <div style={{ display: 'inline-block', padding: '8px 18px', background: 'rgba(73, 53, 18, 0.06)', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Official Brand Book & Lookbook PDF Edition
          </div>
          <div style={{ width: '130px', margin: '0 auto 20px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-linen-border)' }}>
            <img src="/assets/logo.jpeg" alt="etmek" style={{ width: '100%', display: 'block' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--color-espresso-dark)', marginBottom: '8px' }}>
            etmek
          </h2>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-espresso-medium)', marginBottom: '24px' }}>
            The Clothing Solution • Autumn/Winter 2026
          </p>
          <div style={{ maxWidth: '580px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.8', color: 'var(--color-espresso-dark)', fontStyle: 'italic', background: 'rgba(255, 255, 255, 0.6)', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-linen-border)' }}>
            "{BRAND_STORY.manifesto}"
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '600px', margin: '24px auto 0', textAlign: 'left' }}>
            {BRAND_STORY.pillars.slice(0, 2).map((p, idx) => (
              <div key={idx} style={{ background: '#FFF9EE', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-linen-border)' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '4px' }}>{p.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-espresso-muted)', lineHeight: '1.4' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },

    // Page 2: Color Identity & Chromatic Philosophy
    {
      title: "Color Palette & Identity Specs",
      tagline: "Espresso Brown & Warm Linen DNA",
      render: () => (
        <div style={{ padding: '10px' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-espresso-medium)', marginBottom: '24px', lineHeight: '1.6' }}>
            The chromatic core of <strong>etmek</strong> is anchored in two foundational tones inspired by raw organic flax fibers and artisanal espresso roasting.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            {/* Color 1: Espresso Brown */}
            <div style={{ background: '#FFF9EE', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-linen-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ height: '110px', background: '#493512', display: 'flex', alignItems: 'flex-end', padding: '14px', color: '#FFF2DC' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.08em' }}>#493512</span>
              </div>
              <div style={{ padding: '18px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: '#493512' }}>Espresso Brown</h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--color-espresso-muted)', marginBottom: '12px' }}>Primary Anchor / Editorial Depth</p>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-espresso-dark)', lineHeight: '1.6', fontFamily: 'monospace' }}>
                  HEX: #493512<br />
                  RGB: 73, 53, 18<br />
                  CMYK: 0, 27, 75, 71<br />
                  Use: Typography, structural badges, premium accents
                </div>
              </div>
            </div>

            {/* Color 2: Warm Linen */}
            <div style={{ background: '#FFF9EE', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-linen-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ height: '110px', background: '#FFF2DC', borderBottom: '1px solid var(--color-linen-border)', display: 'flex', alignItems: 'flex-end', padding: '14px', color: '#493512' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.08em' }}>#FFF2DC</span>
              </div>
              <div style={{ padding: '18px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: '#493512' }}>Warm Linen</h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--color-espresso-muted)', marginBottom: '12px' }}>Secondary Ground / Organic Canvas</p>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-espresso-dark)', lineHeight: '1.6', fontFamily: 'monospace' }}>
                  HEX: #FFF2DC<br />
                  RGB: 255, 242, 220<br />
                  CMYK: 0, 5, 14, 0<br />
                  Use: Backdrops, card backgrounds, packaging tissue
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--color-linen-border)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Sparkles size={24} color="#C5A059" />
            <div style={{ fontSize: '0.85rem', color: 'var(--color-espresso-dark)' }}>
              <strong>Accents:</strong> Champagne Gold (<code>#C5A059</code>) and Crimson Terracotta (<code>#A64B2A</code>) serve as artisanal highlights for limited editions.
            </div>
          </div>
        </div>
      )
    },

    // Page 3: Autumn Capsule Catalog
    {
      title: "Autumn Lookbook Collection",
      tagline: "5 Curated Masterpieces",
      render: () => (
        <div style={{ padding: '10px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-espresso-medium)', marginBottom: '16px' }}>
            Handcrafted silhouettes developed exclusively for the 2026 capsule edit:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
            {PRODUCTS.slice(0, 5).map((item) => (
              <div key={item.id} style={{ background: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-linen-border)', display: 'flex', flexDirection: 'column' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-espresso-light)', fontWeight: 600 }}>{item.categoryName}</span>
                  <h4 style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-espresso-dark)', margin: '4px 0 6px', lineHeight: '1.2', flex: 1 }}>{item.name}</h4>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-espresso)' }}>₹{item.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },

    // Page 4: Sustainable Textile Guarantee
    {
      title: "Textile Standards & Artisan Ethics",
      tagline: "Zero Polyester • 100% Breathable Purity",
      render: () => (
        <div style={{ padding: '10px' }}>
          <div style={{ background: '#FFF9EE', borderRadius: '12px', padding: '24px', border: '1px solid var(--color-linen-border)', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '14px' }}>Our Environmental & Artisan Covenant</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: "OEKO-TEX Certified Flax", desc: "Our European linen requires 80% less water than industrial cotton and softens gracefully with age." },
                { label: "Living Wage Artisan Commitment", desc: "We partner directly with family ateliers, guaranteeing over 40% above standard artisan wage benchmarks." },
                { label: "Plastic-Free Luxury Packaging", desc: "Delivered in biodegradable cornstarch mailers and reusable linen storage totes." },
                { label: "Heirloom Durability Guarantee", desc: "Constructed with french seams and high-durability natural corozo & mother-of-pearl buttons." }
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#493512" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--color-espresso-dark)' }}>{item.label}: </strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-espresso-muted)' }}>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ textAlign: 'center', padding: '14px', background: 'rgba(73, 53, 18, 0.05)', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-espresso-dark)' }}>
              Certified by the International Natural Fiber Consortium • Registration #ETM-2026-KL
            </p>
          </div>
        </div>
      )
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(30, 21, 8, 0.78)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'var(--color-linen)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--color-linen-border)',
          boxShadow: 'var(--shadow-3d)',
          overflow: 'hidden',
          animation: 'fadeIn 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div 
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--color-linen-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-linen-light)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--color-linen-border)' }}>
              <img src="/assets/logo.jpeg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-espresso)' }}>
                etmek Brand Book & Lookbook PDF
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--color-espresso-muted)' }}>
                Page {activePage + 1} of {pages.length} • {pages[activePage].title}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                background: 'var(--color-espresso)',
                color: '#FFF2DC',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Print or Save Lookbook as PDF"
            >
              <Printer size={15} /> Save / Print PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-espresso)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%'
              }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Modal Body / Active Page */}
        <div 
          className="brandbook-page"
          style={{
            padding: '24px 30px',
            overflowY: 'auto',
            flex: 1,
            background: 'var(--color-linen-pure)'
          }}
        >
          {pages[activePage].render()}
        </div>

        {/* Footer Navigation Bar */}
        <div 
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--color-linen-border)',
            background: 'var(--color-linen-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <button
            onClick={() => setActivePage(p => Math.max(0, p - 1))}
            disabled={activePage === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '6px',
              background: 'transparent',
              border: '1px solid var(--color-linen-border)',
              color: 'var(--color-espresso)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: activePage === 0 ? 'not-allowed' : 'pointer',
              opacity: activePage === 0 ? 0.4 : 1
            }}
          >
            <ChevronLeft size={16} /> Previous Page
          </button>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePage(idx)}
                style={{
                  width: activePage === idx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activePage === idx ? 'var(--color-espresso)' : 'var(--color-linen-border)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setActivePage(p => Math.min(pages.length - 1, p + 1))}
            disabled={activePage === pages.length - 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '6px',
              background: 'var(--color-espresso)',
              border: 'none',
              color: 'var(--color-linen)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: activePage === pages.length - 1 ? 'not-allowed' : 'pointer',
              opacity: activePage === pages.length - 1 ? 0.4 : 1
            }}
          >
            Next Page <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
