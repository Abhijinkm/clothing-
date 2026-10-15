import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BrandPhilosophy from './components/BrandPhilosophy';
import ProductGrid from './components/ProductGrid';
import PressSection from './components/PressSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import BrandBookModal from './components/BrandBookModal';
import CheckoutModal from './components/CheckoutModal';
import VirtualTryOnModal from './components/VirtualTryOnModal';
import { PRODUCTS, CURRENCIES } from './data/products';

export default function App() {
  const [currencyKey, setCurrencyKey] = useState('INR');
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('etmek_wishlist');
      return saved ? JSON.parse(saved) : [1, 5];
    } catch {
      return [1, 5];
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('etmek_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 1,
          name: "Crimson Maroon Pure Cotton Co-ord Set",
          price: 1250,
          image: "/assets/maroon-coord.jpeg",
          fabric: "100% Breathable Cotton Slub",
          selectedSize: "M",
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Modal States
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBrandBookOpen, setIsBrandBookOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [tryOnProduct, setTryOnProduct] = useState(null);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('etmek_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('etmek_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const activeCurrency = CURRENCIES[currencyKey] || CURRENCIES.INR;

  // Wishlist Actions
  const handleToggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Cart Actions
  const handleAddToCart = (product, size, qty = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.selectedSize === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            fabric: product.fabric,
            selectedSize: size,
            quantity: qty
          }
        ];
      }
    });
  };

  const handleUpdateCartQuantity = (productId, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.id === productId && item.selectedSize === size) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = (data) => {
    setCheckoutData(data);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation Header */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        currentCurrency={currencyKey}
        onCurrencyChange={setCurrencyKey}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBrandBook={() => setIsBrandBookOpen(true)}
        onOpenTryOn={() => setTryOnProduct(PRODUCTS[0])}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Page Sections */}
      <main style={{ flex: 1 }}>
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('collection-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenBrandBook={() => setIsBrandBookOpen(true)}
          onOpenTryOn={() => setTryOnProduct(PRODUCTS[0])}
        />

        <BrandPhilosophy
          onOpenBrandBook={() => setIsBrandBookOpen(true)}
        />

        <ProductGrid
          products={PRODUCTS}
          currency={activeCurrency}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={handleAddToCart}
          onTryOn={(prod) => setTryOnProduct(prod)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <PressSection
          onOpenBrandBook={() => setIsBrandBookOpen(true)}
        />

        <Newsletter />
      </main>

      {/* Footer */}
      <Footer
        onOpenBrandBook={() => setIsBrandBookOpen(true)}
        onSelectCategory={setActiveCategory}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        currency={activeCurrency}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onClose={() => setQuickViewProduct(null)}
        onTryOn={(prod) => setTryOnProduct(prod)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        currency={activeCurrency}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={PRODUCTS}
        currency={activeCurrency}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(prod, size) => {
          handleAddToCart(prod, size);
          setIsCartOpen(true);
        }}
      />

      {/* Brand Book & PDF Modal */}
      <BrandBookModal
        isOpen={isBrandBookOpen}
        onClose={() => setIsBrandBookOpen(false)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        checkoutData={checkoutData}
        onClearCart={handleClearCart}
      />

      {/* 3D Virtual Try-On Studio Modal */}
      <VirtualTryOnModal
        isOpen={!!tryOnProduct}
        onClose={() => setTryOnProduct(null)}
        product={tryOnProduct}
        products={PRODUCTS}
        onSelectProduct={(p) => setTryOnProduct(p)}
        onAddToCart={(prod, size, qty) => {
          handleAddToCart(prod, size, qty);
          setIsCartOpen(true);
        }}
        currency={activeCurrency}
      />

    </div>
  );
}
