import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  onProceedToCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  // Calculate pricing
  const subtotalINR = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeShippingThresholdINR = 4000;
  const isFreeShipping = subtotalINR >= freeShippingThresholdINR;
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdINR - subtotalINR);
  const freeShippingProgress = Math.min(100, (subtotalINR / freeShippingThresholdINR) * 100);

  const discountAmountINR = Math.round(subtotalINR * (discountPercent / 100));
  const shippingCostINR = isFreeShipping || subtotalINR === 0 ? 0 : 250;
  const totalINR = subtotalINR - discountAmountINR + shippingCostINR;

  const convertedSubtotal = Math.round(subtotalINR * currency.rate);
  const convertedDiscount = Math.round(discountAmountINR * currency.rate);
  const convertedShipping = Math.round(shippingCostINR * currency.rate);
  const convertedTotal = Math.round(totalINR * currency.rate);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const code = couponCode.trim().toUpperCase();
    if (code === 'ETMEK15' || code === 'LINEN15') {
      setDiscountPercent(15);
      setCouponSuccess('15% Editorial VIP Privileges applied!');
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#493512', '#C5A059', '#FFF2DC']
        });
      } catch (err) {
        // ignore
      }
    } else if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponSuccess('10% First Order Welcome privilege applied!');
    } else {
      setCouponError('Invalid promotion code. Try code "ETMEK15".');
    }
  };

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
          maxWidth: '460px',
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
        {/* Drawer Header */}
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
            <ShoppingBag size={20} color="#493512" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-espresso)' }}>
              Your Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
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
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ padding: '14px 24px', background: '#FFF9EE', borderBottom: '1px solid var(--color-linen-border)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-espresso-dark)', marginBottom: '6px' }}>
            {isFreeShipping ? (
              <span style={{ color: '#2E6930', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="#C5A059" /> You qualify for Complimentary White-Glove Delivery!
              </span>
            ) : (
              <span>
                Add {currency.symbol}{Math.round(remainingForFreeShipping * currency.rate).toLocaleString()} more for Complimentary Express Shipping
              </span>
            )}
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--color-linen-border)', borderRadius: '3px', overflow: 'hidden' }}>
            <div 
              style={{
                width: `${freeShippingProgress}%`,
                height: '100%',
                background: isFreeShipping ? '#3B5323' : 'var(--color-espresso)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(73, 53, 18, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <ShoppingBag size={28} color="#493512" />
              </div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-espresso)', marginBottom: '8px' }}>Your shopping bag is empty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-espresso-muted)', marginBottom: '1.5rem' }}>
                Discover our pure linen co-ords and artisanal tunics from the autumn capsule.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ padding: '0.8rem 1.6rem' }}>
                Explore Collection
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item, idx) => {
                const itemTotal = Math.round(item.price * item.quantity * currency.rate);
                return (
                  <div 
                    key={`${item.id}-${item.selectedSize}-${idx}`}
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
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '74px', height: '94px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-espresso-dark)', lineHeight: 1.3, maxWidth: '190px' }}>
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          style={{ background: 'none', border: 'none', color: 'var(--color-espresso-light)', cursor: 'pointer', padding: '2px' }}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.74rem', color: 'var(--color-espresso-medium)', margin: '4px 0 8px' }}>
                        Size: <strong>{item.selectedSize}</strong> • {item.fabric.split(' ')[0]}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                        {/* Quantity Counter */}
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-linen-border)', borderRadius: '4px', background: '#FFFFFF' }}>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            style={{ width: '26px', height: '26px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--color-espresso)' }}
                          >
                            -
                          </button>
                          <span style={{ width: '24px', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700 }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            style={{ width: '26px', height: '26px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--color-espresso)' }}
                          >
                            +
                          </button>
                        </div>

                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-espresso)' }}>
                          {currency.symbol}{itemTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer with Pricing & Checkout */}
        {cartItems.length > 0 && (
          <div 
            style={{
              padding: '20px 24px',
              borderTop: '1px solid var(--color-linen-border)',
              background: 'var(--color-linen-light)'
            }}
          >
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Tag size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--color-espresso-light)' }} />
                <input
                  type="text"
                  placeholder="Promo Code (ETMEK15)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px 8px 32px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-linen-border)',
                    fontSize: '0.78rem',
                    background: '#FFFFFF',
                    textTransform: 'uppercase'
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  background: 'var(--color-espresso)',
                  color: '#FFF2DC',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Apply
              </button>
            </form>

            {couponError && (
              <div style={{ fontSize: '0.72rem', color: '#A64B2A', marginBottom: '10px', fontWeight: 600 }}>
                {couponError}
              </div>
            )}
            {couponSuccess && (
              <div style={{ fontSize: '0.72rem', color: '#2E6930', marginBottom: '10px', fontWeight: 600 }}>
                {couponSuccess}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-espresso-medium)' }}>
                <span>Subtotal</span>
                <span>{currency.symbol}{convertedSubtotal.toLocaleString()}</span>
              </div>
              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2E6930', fontWeight: 600 }}>
                  <span>VIP Privileges ({discountPercent}%)</span>
                  <span>-{currency.symbol}{convertedDiscount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-espresso-medium)' }}>
                <span>Delivery</span>
                <span>{isFreeShipping ? 'COMPLIMENTARY' : `${currency.symbol}${convertedShipping.toLocaleString()}`}</span>
              </div>
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--color-linen-border)',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--color-espresso-dark)'
                }}
              >
                <span>Estimated Total</span>
                <span>{currency.symbol}{convertedTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout({
                  subtotal: convertedSubtotal,
                  discount: convertedDiscount,
                  shipping: convertedShipping,
                  total: convertedTotal,
                  currency
                });
              }}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '8px',
                background: 'var(--color-espresso)',
                color: '#FFF2DC',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Proceed to Bespoke Checkout</span>
              <ArrowRight size={17} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '0.7rem', color: 'var(--color-espresso-light)' }}>
              <ShieldCheck size={14} />
              <span>Complimentary Returns within 14 Days • Encrypted 256-bit Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
