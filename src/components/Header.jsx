import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, BookOpen, Menu, X, Globe, Sparkles } from 'lucide-react';
import { CURRENCIES } from '../data/products';

export default function Header({
  cartCount,
  wishlistCount,
  currentCurrency,
  onCurrencyChange,
  onOpenCart,
  onOpenWishlist,
  onOpenBrandBook,
  onOpenTryOn,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Ribbon */}
      <aside 
        style={{
          background: 'var(--color-espresso-dark)',
          color: 'var(--color-linen)',
          fontSize: '0.74rem',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '8px 16px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 242, 220, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}
        aria-label="Store Announcement"
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={12} color="#C5A059" /> 
          Autumn/Winter '26 Capsule • Complimentary Express Shipping on Orders Above ₹4,000 / $60
        </span>
        <button
          onClick={onOpenBrandBook}
          style={{
            background: 'rgba(255, 242, 220, 0.15)',
            border: 'none',
            color: '#FFF2DC',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.68rem',
            cursor: 'pointer',
            fontWeight: 600,
            textDecoration: 'underline'
          }}
        >
          View Brand Book PDF
        </button>
      </aside>

      {/* Main Sticky Navigation */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: isScrolled ? 'rgba(255, 249, 238, 0.94)' : 'var(--color-linen-light)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid var(--color-linen-border)' : '1px solid transparent',
          transition: 'all 0.3s ease',
          boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 1.5rem' }}>
          
          {/* Left: Mobile Menu Toggle & Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-espresso)',
                cursor: 'pointer',
                padding: '4px'
              }}
              className="mobile-toggle-btn"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation Links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="desktop-nav">
              {[
                { id: 'all', label: 'All Pieces' },
                { id: 'coords', label: 'Co-ord Sets' },
                { id: 'tunics', label: 'Designer Tunics' },
                { id: 'linen', label: 'Pure Linen Edit' },
                { id: 'festive', label: 'Chanderi' }
              ].map(link => {
                const isActive = activeCategory === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      onSelectCategory(link.id);
                      const el = document.getElementById('collection-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isActive ? 'var(--color-espresso-dark)' : 'var(--color-espresso-medium)',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.85rem',
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      position: 'relative',
                      padding: '4px 0',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span 
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'var(--color-espresso)',
                          borderRadius: '2px'
                        }} 
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <a 
            href="#" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              textDecoration: 'none',
              transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          >
            <img 
              src="/assets/logo.jpeg" 
              alt="etmek — The Clothing Solution" 
              style={{ 
                height: isScrolled ? '46px' : '52px', 
                width: 'auto',
                borderRadius: '8px',
                border: '1px solid var(--color-linen-border)',
                boxShadow: 'var(--shadow-sm)'
              }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ 
                fontFamily: 'var(--font-editorial)', 
                fontSize: '1.45rem', 
                fontWeight: 700, 
                color: 'var(--color-espresso)', 
                lineHeight: 1, 
                letterSpacing: '0.02em' 
              }}>
                etmek
              </span>
              <span style={{ 
                fontSize: '0.62rem', 
                letterSpacing: '0.14em', 
                textTransform: 'uppercase', 
                color: 'var(--color-espresso-light)', 
                fontWeight: 600 
              }}>
                The Clothing Solution
              </span>
            </div>
          </a>

          {/* Right: Search, Currency, Brand Book, Wishlist, Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            
            {/* Live Search Input */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="desktop-search">
              <Search 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  color: 'var(--color-espresso-light)', 
                  pointerEvents: 'none' 
                }} 
              />
              <input
                type="text"
                placeholder="Search linen, co-ords..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                style={{
                  width: searchFocused ? '210px' : '150px',
                  padding: '7px 12px 7px 34px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-linen-border)',
                  background: 'var(--color-linen-card)',
                  color: 'var(--color-espresso)',
                  fontSize: '0.82rem',
                  outline: 'none',
                  transition: 'width 0.25s ease, border-color 0.25s ease',
                  boxShadow: searchFocused ? '0 0 0 2px rgba(73, 53, 18, 0.15)' : 'none'
                }}
              />
            </div>

            {/* Currency Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={14} color="#493512" />
              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-espresso)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none'
                }}
                aria-label="Select currency"
              >
                {Object.keys(CURRENCIES).map(key => (
                  <option key={key} value={key}>
                    {CURRENCIES[key].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Book & Lookbook PDF Button */}
            <button
              onClick={onOpenBrandBook}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-linen-card)',
                border: '1px solid var(--color-linen-border)',
                color: 'var(--color-espresso)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Open Branding Lookbook & PDF"
            >
              <BookOpen size={14} /> Lookbook PDF
            </button>

            {/* 3D Virtual Try-On Trigger Button */}
            <button
              onClick={onOpenTryOn}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #C5A059 0%, #A37F38 100%)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 10px rgba(197, 160, 89, 0.35)'
              }}
              title="Open 3D Virtual Try-On Studio"
            >
              <Sparkles size={13} /> 3D Try-On Studio
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              style={{
                position: 'relative',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-espresso)',
                cursor: 'pointer',
                padding: '6px'
              }}
              aria-label="View Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#A64B2A',
                    color: '#FFF2DC',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-espresso)',
                color: '#FFF2DC',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={16} />
              <span className="desktop-cart-label">Bag</span>
              <span
                style={{
                  background: '#FFF2DC',
                  color: '#493512',
                  padding: '1px 7px',
                  borderRadius: '10px',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}
              >
                {cartCount}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div 
            style={{
              padding: '16px 24px 20px',
              background: 'var(--color-linen)',
              borderTop: '1px solid var(--color-linen-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--color-espresso-light)' }} />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-linen-border)',
                  background: '#FFFFFF',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            {[
              { id: 'all', label: 'All Pieces' },
              { id: 'coords', label: 'Co-ord Sets' },
              { id: 'tunics', label: 'Designer Tunics' },
              { id: 'linen', label: 'Pure Linen Edit' },
              { id: 'festive', label: 'Festive & Chanderi' }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectCategory(link.id);
                  setMobileMenuOpen(false);
                  const el = document.getElementById('collection-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '8px 0',
                  fontSize: '0.95rem',
                  fontWeight: activeCategory === link.id ? 700 : 500,
                  color: 'var(--color-espresso-dark)'
                }}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                onOpenBrandBook();
                setMobileMenuOpen(false);
              }}
              style={{
                marginTop: '10px',
                padding: '10px',
                borderRadius: '8px',
                background: 'var(--color-espresso)',
                color: '#FFF2DC',
                border: 'none',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <BookOpen size={16} /> Open Brand Book & PDF
            </button>

            <button
              onClick={() => {
                onOpenTryOn();
                setMobileMenuOpen(false);
              }}
              style={{
                padding: '10px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #C5A059 0%, #A37F38 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={16} /> Open 3D Virtual Try-On Studio
            </button>
          </div>
        )}
      </header>

      {/* Responsive CSS helper */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-search { display: none !important; }
          .mobile-toggle-btn { display: flex !important; }
          .desktop-cart-label { display: none !important; }
        }
      `}</style>
    </>
  );
}
