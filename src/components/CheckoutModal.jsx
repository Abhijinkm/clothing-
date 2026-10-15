import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Truck, Lock, ArrowLeft, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  checkoutData,
  onClearCart
}) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [formData, setFormData] = useState({
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98471 23456',
    address: 'Boutique Residence, 4th Cross, Panampilly Nagar',
    city: 'Kochi, Kerala',
    pincode: '682036'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = 'ETM-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSubmitting(false);
      setStep('success');
      onClearCart();

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#493512', '#C5A059', '#FFF2DC', '#3B5323']
        });
      } catch (err) {
        // ignore
      }
    }, 1200);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(30, 21, 8, 0.78)',
        backdropFilter: 'blur(8px)',
        zIndex: 1050,
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
          maxWidth: '780px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--color-linen-border)',
          boxShadow: 'var(--shadow-3d)',
          overflow: 'hidden',
          animation: 'fadeIn 0.25s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={18} color="#493512" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-espresso)' }}>
              {step === 'form' ? 'Bespoke Checkout • Encrypted & Secure' : 'Order Confirmed • Thank You'}
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
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {step === 'form' ? (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                
                {/* Left: Client Delivery Details */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-espresso-medium)', marginBottom: '14px', fontWeight: 700 }}>
                    1. Shipping & Concierge Details
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-espresso-dark)', marginBottom: '4px' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--color-linen-border)', background: '#FFFFFF', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-espresso-dark)', marginBottom: '4px' }}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--color-linen-border)', background: '#FFFFFF', fontSize: '0.85rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-espresso-dark)', marginBottom: '4px' }}>
                          Phone Number
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--color-linen-border)', background: '#FFFFFF', fontSize: '0.85rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-espresso-dark)', marginBottom: '4px' }}>
                        Street Address & Residence
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--color-linen-border)', background: '#FFFFFF', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-espresso-dark)', marginBottom: '4px' }}>
                          City, State
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--color-linen-border)', background: '#FFFFFF', fontSize: '0.85rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-espresso-dark)', marginBottom: '4px' }}>
                          PIN Code
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--color-linen-border)', background: '#FFFFFF', fontSize: '0.85rem' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Payment Method & Summary */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-espresso-medium)', marginBottom: '14px', fontWeight: 700 }}>
                    2. Payment Method
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    {[
                      { id: 'upi', label: 'UPI / QR Code (Instant)', icon: QrCode, desc: 'Google Pay, PhonePe, Paytm, BHIM' },
                      { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, MasterCard, Amex, RuPay' },
                      { id: 'cod', label: 'Cash On Delivery', icon: Truck, desc: 'Pay when your heirloom arrives' }
                    ].map(method => {
                      const Icon = method.icon;
                      const isSelected = paymentMethod === method.id;
                      return (
                        <div
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          style={{
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                            background: isSelected ? '#FFF9EE' : '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: isSelected ? 'var(--color-espresso)' : 'rgba(73, 53, 18, 0.08)', color: isSelected ? '#FFF2DC' : 'var(--color-espresso)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-espresso-dark)' }}>{method.label}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--color-espresso-muted)' }}>{method.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Box */}
                  <div style={{ background: '#FFF9EE', borderRadius: '10px', padding: '16px', border: '1px solid var(--color-linen-border)' }}>
                    <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-espresso-medium)', fontWeight: 700, marginBottom: '8px' }}>
                      Order Summary
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                      <span>Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
                      <span>{checkoutData?.currency?.symbol || '₹'}{checkoutData?.subtotal?.toLocaleString()}</span>
                    </div>
                    {checkoutData?.discount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#2E6930', marginBottom: '4px' }}>
                        <span>VIP Privileges</span>
                        <span>-{checkoutData?.currency?.symbol || '₹'}{checkoutData?.discount?.toLocaleString()}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '8px' }}>
                      <span>White-Glove Delivery</span>
                      <span>{checkoutData?.shipping === 0 ? 'Complimentary' : `${checkoutData?.currency?.symbol || '₹'}${checkoutData?.shipping}`}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-espresso-dark)', borderTop: '1px solid var(--color-linen-border)', paddingTop: '8px' }}>
                      <span>Total Payable</span>
                      <span>{checkoutData?.currency?.symbol || '₹'}{checkoutData?.total?.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '8px',
                      background: 'var(--color-espresso)',
                      color: '#FFF2DC',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      marginTop: '16px',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  >
                    {isSubmitting ? 'Processing Bespoke Order...' : `Complete Order • ${checkoutData?.currency?.symbol || '₹'}${checkoutData?.total?.toLocaleString()}`}
                  </button>
                </div>

              </div>
            </form>
          ) : (
            /* Order Success View */
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#3B5323', color: '#FFF2DC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                <CheckCircle2 size={36} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-espresso-dark)', marginBottom: '8px' }}>
                Thank You For Your Patronage
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-espresso-medium)', marginBottom: '16px' }}>
                Your order <strong>#{orderId}</strong> has been received by the <strong>etmek</strong> atelier.
              </p>
              <div style={{ maxWidth: '420px', margin: '0 auto 24px', background: '#FFF9EE', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-linen-border)', textAlign: 'left', fontSize: '0.82rem', lineHeight: '1.6' }}>
                <div><strong>Recipient:</strong> {formData.fullName}</div>
                <div><strong>Delivery To:</strong> {formData.address}, {formData.city} - {formData.pincode}</div>
                <div><strong>Estimated Handcrafted Delivery:</strong> Within 3-5 business days</div>
                <div><strong>A confirmation concierge SMS & email has been dispatched.</strong></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    borderRadius: '6px',
                    background: 'transparent',
                    border: '1px solid var(--color-espresso)',
                    color: 'var(--color-espresso)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Printer size={16} /> Print Receipt
                </button>
                <button
                  onClick={onClose}
                  className="btn-primary"
                  style={{ padding: '10px 22px' }}
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
