# etmek — The Clothing Solution
### Premium Women's Fashion & Pure Linen Edit | Luxury Editorial E-Commerce

A luxury, high-fashion editorial women's fashion web application crafted with **React, JavaScript, HTML5, and Vanilla CSS**.

---

## 🎨 Brand Palette
- **Espresso Brown**: `#493512` (Primary Anchor / Depth / Typography / Luxury Badges)
- **Warm Linen**: `#FFF2DC` (Secondary Ground / Organic Canvas / Backdrops)
- **Champagne Gold**: `#C5A059` (Artisanal Accents & Highlights)
- **Terracotta Rose**: `#A64B2A` (Festive & Wishlist Accent)

---

## ✨ Features Implemented
1. **Interactive 3D Card Tilt Physics**:
   - Dynamic cursor-tracking 3D perspective tilt (`rotateX`, `rotateY`, `scale3d`).
   - Dynamic specular light glare reflection that moves realistically with the cursor.
2. **Interactive 3D Virtual Try-On Studio (WebGL / Three.js)**:
   - **360° Turntable Rotation**: Drag to rotate or toggle automated 360-degree runway turntable rotation with smooth physics.
   - **Model Customization**:
     - **Skin Tones**: Fair Porcelain, Warm Honey, Artisan Bronze, Rich Espresso, Golden Olive, Deep Ebony.
     - **Face Profiles**: Sculpted Oval, Soft Heart, Chiseled High, Regal Angular.
     - **Hairstyles & Hair Colors**: Sleek Low Chignon, Voluminous Waves, French Bob, Braided Crown, Afro Curls with selectable hues (Espresso Black, Rich Chestnut, Auburn Clay, Warm Amber).
     - **Body Shapes**: Hourglass Balanced, Curvy Full Silhouette, Petite Slender, Athletic Statuesque.
   - **Strict Size Availability**: Standardized strictly across **M, L, XL, XXL** with real-time silhouette drape simulation.
   - **Artisanal Footwear Switcher**: Kolhapuris, Nude Strappy Block Heels, Espresso Suede Stilettos, Ivory Flax Loafers, and Natural Studio Barefoot (with dynamic heel height elevation).
   - **Environment Lighting Modes**: Atelier Studio Warm, Golden Hour Sunset, and Runway Editorial Spotlight.
   - **Camera Presets**: Full Look, Drape Detail, and Footwear Focus.
   - **Instant Add-to-Bag**: Direct add-to-bag with the chosen fit and size + Snapshot studio photo capture.
3. **Authentic Product Showcase**:
   - Crimson Maroon Pure Cotton Co-ord Set (₹1,250)
   - Color-Blocked Duo Floral Motif Tunic & Pants (₹3,899)
   - Indigo Heritage Floral Border Co-ord Set (₹1,100)
   - Earth & Ochre Striped Handwoven Linen Ensemble (₹1,350)
   - Geometric Chevron Artisan Pure Linen Tunic (₹1,200)
4. **Interactive Brand Book & Lookbook PDF**:
   - Multi-page flip/tab book viewer covering Brand Philosophy, Hex Specifications, Autumn Lookbook, and Sustainable Standards.
   - One-click **Save / Print PDF** trigger with dedicated `@media print` clean layout.
5. **Interactive Shopping Experience**:
   - **Cart Drawer**: Slide-over drawer with free shipping progress threshold, item quantity adjustments, size tags, and coupon code support (`ETMEK15`) with confetti celebration!
   - **Quick View Modal**: Detailed modal with image gallery, size selector, size chart guide, and fabric purity breakdown.
   - **Bespoke Checkout**: Concierge checkout with customer details, payment methods (UPI, Card, COD), and order confirmation receipt generation.
   - **Saved Creations (Wishlist)**: Drawer with badge counter and single-click move to bag.
   - **Multi-Currency Switcher**: Live conversion between INR (₹), USD ($), EUR (€), AED (د.إ), and GBP (£).
   - **Instant Live Search & Category Filtering**: Real-time filtering across co-ords, tunics, and linen.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open in browser
# http://127.0.0.1:3000/
```

### Production Build
```bash
npm run build
npm run preview
```
