import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  products,
  currency,
  onRemoveWishlist,
  onAddToCart
}) {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(30, 21, 8, 0.72)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: 'var(--color-linen)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-3d)',
          borderLeft: '1px solid var(--color-linen-border)',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-linen-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-linen-light)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={20} color="#A64B2A" fill="#A64B2A" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-espresso)' }}>
              Saved Creations ({wishlistedProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-espresso)',
              padding: '4px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {wishlistedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(166, 75, 42, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Heart size={28} color="#A64B2A" />
              </div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-espresso)', marginBottom: '8px' }}>No saved items yet</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-espresso-muted)', marginBottom: '1.5rem' }}>
                Click the heart icon on any silhouette to curate your personal autumn lookbook.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ padding: '0.8rem 1.6rem' }}>
                Browse Collection
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {wishlistedProducts.map(product => {
                const convertedPrice = Math.round(product.price * currency.rate);
                return (
                  <div
                    key={product.id}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      padding: '14px',
                      background: 'var(--color-linen-light)',
                      borderRadius: '10px',
                      border: '1px solid var(--color-linen-border)'
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '74px', height: '94px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-espresso-dark)', lineHeight: 1.3, maxWidth: '180px' }}>
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(product.id)}
                          style={{ background: 'none', border: 'none', color: '#A64B2A', cursor: 'pointer', padding: '2px' }}
                          title="Remove from saved"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.74rem', color: 'var(--color-espresso-light)', margin: '4px 0 8px' }}>
                        {product.fabric}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-espresso)' }}>
                          {currency.symbol}{convertedPrice.toLocaleString()}
                        </span>

                        <button
                          onClick={() => {
                            onAddToCart(product, product.sizes[0]);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: 'var(--color-espresso)',
                            color: '#FFF2DC',
                            border: 'none',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          <ShoppingBag size={13} /> Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
