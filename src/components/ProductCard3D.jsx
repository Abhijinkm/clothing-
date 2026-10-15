import React, { useState, useRef } from 'react';
import { Heart, Eye, ShoppingBag, Sparkles, Check } from 'lucide-react';

export default function ProductCard3D({ 
  product, 
  currency, 
  isWishlisted, 
  onToggleWishlist, 
  onQuickView, 
  onAddToCart,
  onTryOn
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // 3D perspective tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);

    // Dynamic light glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 0.35,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 60%)`
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0 });
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1600);
  };

  // Currency converted price
  const convertedPrice = Math.round(product.price * currency.rate);
  const convertedOriginal = Math.round(product.originalPrice * currency.rate);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div 
      className="card-3d-wrapper"
      style={{ minHeight: '520px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="card-3d"
        style={{
          transform: transformStyle,
          transition: transformStyle ? 'transform 0.1s ease-out, box-shadow 0.3s ease' : 'transform 0.5s ease-out, box-shadow 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Dynamic Light Sheen Glare */}
        <div 
          className="card-3d-glare" 
          style={glareStyle}
        />

        {/* Image Showcase Container */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '133%', // 3:4 Luxury fashion portrait aspect ratio
            overflow: 'hidden',
            backgroundColor: '#F5EBD9',
            cursor: 'pointer'
          }}
          onClick={() => {
            if (onTryOn) onTryOn(product);
            else onQuickView(product);
          }}
        >
          {/* Main Product Image */}
          <img 
            src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
            alt={product.name} 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
              transform: isHovered ? 'scale(1.06)' : 'scale(1)'
            }}
            loading="lazy"
          />

          {/* Luxury Badge */}
          {product.badge && (
            <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 6 }}>
              <span className={`badge-luxury badge-${product.badgeType || 'espresso'}`}>
                {product.badgeType === 'gold' && <Sparkles size={11} />}
                {product.badge}
              </span>
            </div>
          )}

          {/* Always Visible 3D Try-On Chip on Image */}
          <div 
            style={{ 
              position: 'absolute', 
              top: product.badge ? '46px' : '14px', 
              left: '14px', 
              zIndex: 6,
              pointerEvents: 'none'
            }}
          >
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(73, 53, 18, 0.88)',
                backdropFilter: 'blur(6px)',
                color: '#FFF2DC',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 242, 220, 0.25)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
              }}
            >
              <Sparkles size={11} color="#C5A059" /> 3D Try-On
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label="Save to Wishlist"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255, 249, 238, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(73, 53, 18, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 6,
              color: isWishlisted ? '#A64B2A' : '#493512',
              transition: 'all 0.2s ease',
              transform: isWishlisted ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <Heart 
              size={18} 
              fill={isWishlisted ? '#A64B2A' : 'none'} 
              strokeWidth={isWishlisted ? 0 : 2}
            />
          </button>

          {/* Quick View Button Hover Overlay */}
          <div 
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '14px',
              right: '14px',
              zIndex: 6,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              gap: '8px'
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              style={{
                flex: 1,
                padding: '9px 10px',
                background: 'rgba(73, 53, 18, 0.92)',
                color: '#FFF2DC',
                backdropFilter: 'blur(8px)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <Eye size={13} /> Details
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onTryOn) onTryOn(product);
              }}
              style={{
                flex: 1.2,
                padding: '9px 10px',
                background: 'linear-gradient(135deg, #C5A059 0%, #A37F38 100%)',
                color: '#FFFFFF',
                backdropFilter: 'blur(8px)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(197, 160, 89, 0.35)'
              }}
            >
              <Sparkles size={13} /> 3D Try-On
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Fabric & Category Line */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ 
              fontSize: '0.72rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em', 
              color: 'var(--color-espresso-medium)', 
              fontWeight: 600 
            }}>
              {product.categoryName}
            </span>
            <span style={{ 
              fontSize: '0.72rem', 
              color: 'var(--color-espresso-light)', 
              background: 'rgba(73, 53, 18, 0.05)',
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              {product.fabric.split(' ')[0]} {product.fabric.split(' ')[1] || ''}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => {
              if (onTryOn) onTryOn(product);
              else onQuickView(product);
            }}
            style={{ 
              fontSize: '1.05rem', 
              fontWeight: 600, 
              color: 'var(--color-espresso-dark)', 
              cursor: 'pointer',
              marginBottom: '10px',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.name}
          </h3>

          {/* Pricing */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-espresso)' }}>
              {currency.symbol}{convertedPrice.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.88rem', textDecoration: 'line-through', color: 'rgba(73, 53, 18, 0.45)' }}>
              {currency.symbol}{convertedOriginal.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A64B2A', background: 'rgba(166, 75, 42, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
              {discountPercent}% OFF
            </span>
          </div>

          {/* Size Pills */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-espresso-muted)' }}>
                Select Size:
              </span>
              <span style={{ fontSize: '0.68rem', color: '#A64B2A', fontWeight: 600 }}>
                {product.stock[selectedSize] <= 3 ? `Only ${product.stock[selectedSize]} left!` : 'In Stock'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {product.sizes.map(size => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                    style={{
                      flex: 1,
                      padding: '5px 0',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      borderRadius: '4px',
                      border: isSelected ? '1px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                      background: isSelected ? 'var(--color-espresso)' : 'transparent',
                      color: isSelected ? 'var(--color-linen)' : 'var(--color-espresso)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dual Action CTAs: Direct 3D Try-On & Add to Bag */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onTryOn) onTryOn(product);
              }}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #C5A059 0%, #A37F38 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(197, 160, 89, 0.28)',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={14} /> 3D Virtual Try-On • 360°
            </button>

            <button
              onClick={handleAdd}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                background: isAddedFeedback ? '#3B5323' : 'var(--color-espresso)',
                color: '#FFF2DC',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
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
              {isAddedFeedback ? (
                <>
                  <Check size={16} /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={15} /> Add to Bag • {selectedSize}
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
