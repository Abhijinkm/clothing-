import React, { useState, useMemo } from 'react';
import ProductCard3D from './ProductCard3D';
import { CATEGORIES } from '../data/products';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

export default function ProductGrid({
  products,
  currency,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  searchQuery,
  onClearSearch,
  activeCategory,
  onSelectCategory,
  onTryOn
}) {
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section 
      id="collection-grid" 
      style={{ 
        padding: '5rem 0 6rem',
        background: 'var(--color-linen-light)'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.18em', 
            fontWeight: 700, 
            color: 'var(--color-espresso-medium)', 
            marginBottom: '8px' 
          }}>
            Curated Autumn '26 Capsule
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', 
            color: 'var(--color-espresso-dark)',
            lineHeight: 1.15,
            marginBottom: '1rem'
          }}>
            Handcrafted Modern Silhouettes
          </h2>
          <p style={{ maxWidth: '600px', fontSize: '1rem', color: 'var(--color-espresso-medium)', lineHeight: 1.6 }}>
            Experience 3D perspective depth on each artisanal piece. Hover over garments to inspect fabric weaves and craftsmanship highlights.
          </p>
        </div>

        {/* Filter & Controls Bar */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: '1rem',
            paddingBottom: '2rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid var(--color-linen-border)'
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {CATEGORIES.map(cat => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    border: isSelected ? '1px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                    background: isSelected ? 'var(--color-espresso)' : 'var(--color-linen-card)',
                    color: isSelected ? 'var(--color-linen)' : 'var(--color-espresso)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Sort Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowUpDown size={15} color="#493512" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-espresso-medium)' }}>
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid var(--color-linen-border)',
                background: 'var(--color-linen-card)',
                color: 'var(--color-espresso)',
                fontSize: '0.82rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Editorial Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Active Search Notification */}
        {searchQuery.trim() && (
          <div 
            style={{ 
              marginBottom: '2rem', 
              padding: '12px 18px', 
              borderRadius: '8px', 
              background: 'rgba(73, 53, 18, 0.06)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}
          >
            <span style={{ fontSize: '0.88rem', color: 'var(--color-espresso-dark)' }}>
              Showing results for: <strong>"{searchQuery}"</strong> ({filteredProducts.length} items found)
            </span>
            <button
              onClick={onClearSearch}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-espresso)',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              <X size={14} /> Clear Search
            </button>
          </div>
        )}

        {/* Product Cards 3D Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--color-linen-card)', borderRadius: '16px', border: '1px solid var(--color-linen-border)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '8px' }}>
              No garments found matching your filter
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-espresso-muted)', marginBottom: '1.5rem' }}>
              Try searching for "linen", "co-ord", or reset your category selection.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onClearSearch();
              }}
              className="btn-primary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '2.5rem 2rem' 
            }}
          >
            {filteredProducts.map(product => (
              <ProductCard3D
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onTryOn={onTryOn}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
