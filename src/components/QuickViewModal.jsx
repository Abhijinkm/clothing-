import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Sparkles, Check, Ruler, RefreshCw, Truck } from 'lucide-react';

export default function QuickViewModal({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onClose,
  onTryOn
}) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const convertedPrice = Math.round(product.price * currency.rate);
  const convertedOriginal = Math.round(product.originalPrice * currency.rate);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const images = [product.image];
  if (product.hoverImage) images.push(product.hoverImage);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(30, 21, 8, 0.75)',
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
          maxWidth: '920px',
          maxHeight: '90vh',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          border: '1px solid var(--color-linen-border)',
          boxShadow: 'var(--shadow-3d)',
          overflow: 'hidden',
          animation: 'fadeIn 0.25s ease',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(255, 242, 220, 0.9)',
            border: '1px solid var(--color-linen-border)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-espresso)'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Side: Images Gallery */}
        <div style={{ background: '#F5EBD9', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: '380px' }}>
            <img 
              src={activeImage} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            {product.badge && (
              <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                <span className={`badge-luxury badge-${product.badgeType || 'espresso'}`}>
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip if multiple images */}
          {images.length > 1 && (
            <div style={{ padding: '12px', display: 'flex', gap: '8px', background: 'rgba(255, 242, 220, 0.7)' }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: activeImage === img ? '2px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Purchase Form */}
        <div style={{ padding: '30px 28px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-espresso-medium)', fontWeight: 700 }}>
              {product.categoryName}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#A64B2A', fontWeight: 600 }}>
              {product.stock[selectedSize] <= 3 ? `Urgent: Only ${product.stock[selectedSize]} left in ${selectedSize}` : 'In Stock'}
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--color-espresso-dark)', marginBottom: '12px', lineHeight: 1.3 }}>
            {product.name}
          </h2>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-espresso)' }}>
              {currency.symbol}{convertedPrice.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.95rem', textDecoration: 'line-through', color: 'rgba(73, 53, 18, 0.45)' }}>
              {currency.symbol}{convertedOriginal.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#A64B2A', background: 'rgba(166, 75, 42, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
              {discountPercent}% OFF
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-espresso-medium)', lineHeight: 1.6, marginBottom: '20px' }}>
            {product.description}
          </p>

          {/* Fabric & Highlights Card */}
          <div style={{ background: '#FFF9EE', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-linen-border)', marginBottom: '20px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '6px' }}>
              Textile Composition: <span style={{ fontWeight: 400 }}>{product.fabric}</span>
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '0.78rem', color: 'var(--color-espresso-muted)', lineHeight: '1.5' }}>
              {product.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-espresso)' }}>
                Select Size:
              </span>
              <button
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-espresso-light)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                <Ruler size={13} /> Size Chart
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {product.sizes.map(size => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      borderRadius: '6px',
                      border: isSelected ? '1px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                      background: isSelected ? 'var(--color-espresso)' : 'transparent',
                      color: isSelected ? 'var(--color-linen)' : 'var(--color-espresso)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {/* Size Guide Drawer */}
            {showSizeGuide && (
              <div style={{ marginTop: '10px', background: '#FFFFFF', padding: '12px', borderRadius: '6px', border: '1px solid var(--color-linen-border)', fontSize: '0.74rem' }}>
                <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-linen-border)', fontWeight: 700 }}>
                      <th style={{ padding: '4px' }}>Size</th>
                      <th style={{ padding: '4px' }}>Chest (in)</th>
                      <th style={{ padding: '4px' }}>Waist (in)</th>
                      <th style={{ padding: '4px' }}>Hip (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>M</td><td>37-38</td><td>31-32</td><td>41-42</td></tr>
                    <tr><td>L</td><td>39-41</td><td>33-35</td><td>43-45</td></tr>
                    <tr><td>XL</td><td>42-44</td><td>36-38</td><td>46-48</td></tr>
                    <tr><td>XXL</td><td>45-47</td><td>39-41</td><td>49-51</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quantity & CTA */}
          <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-linen-border)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: '36px', height: '44px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--color-espresso)' }}
              >
                -
              </button>
              <span style={{ width: '36px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700 }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                style={{ width: '36px', height: '44px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--color-espresso)' }}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                background: addedSuccess ? '#3B5323' : 'var(--color-espresso)',
                color: '#FFF2DC',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              {addedSuccess ? (
                <>
                  <Check size={18} /> Added to Shopping Bag!
                </>
              ) : (
                <>
                  <ShoppingBag size={17} /> Add to Bag • {currency.symbol}{(convertedPrice * quantity).toLocaleString()}
                </>
              )}
            </button>
          </div>

          {/* 3D Virtual Try-On Studio CTA */}
          <button
            onClick={() => {
              onClose();
              if (onTryOn) onTryOn(product);
            }}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #C5A059 0%, #A37F38 100%)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginTop: '10px',
              boxShadow: '0 4px 14px rgba(197, 160, 89, 0.3)'
            }}
          >
            <Sparkles size={16} /> Try On in 3D Virtual Studio
          </button>

        </div>
      </div>
    </div>
  );
}
