export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' },
  GBP: { symbol: '£', rate: 0.0094, label: 'GBP (£)' }
};

export const CATEGORIES = [
  { id: 'all', name: 'All Creations' },
  { id: 'coords', name: 'Co-ord Sets' },
  { id: 'tunics', name: 'Designer Tunics' },
  { id: 'linen', name: 'Pure Linen Edit' },
  { id: 'festive', name: 'Festive & Chanderi' }
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Crimson Maroon Pure Cotton Co-ord Set",
    category: "coords",
    categoryName: "Co-ord Sets",
    price: 1250,
    originalPrice: 1899,
    rating: 4.9,
    reviewsCount: 38,
    image: "/assets/maroon-coord.jpeg",
    views360: {
      front: "/assets/maroon-coord.jpeg",
      sideRight: "/assets/maroon-side.jpeg",
      back: "/assets/maroon-back.jpeg",
      sideLeft: "/assets/maroon-side.jpeg"
    },
    badge: "Bestseller",
    badgeType: "espresso",
    fabric: "100% Breathable Cotton Slub",
    color: "Crimson Maroon & Warm Earth",
    description: "Meticulously tailored straight tunic silhouette with mandarin collar, concealed front placket with genuine mother-of-pearl buttons, and matching relaxed-fit palazzo trousers with deep functional pockets.",
    sizes: ["M", "L", "XL", "XXL"],
    stock: { M: 5, L: 4, XL: 2, XXL: 3 },
    highlights: [
      "Signature relaxed breathable drape",
      "Concealed deep side pockets in trousers",
      "Pre-shrunk premium high-twist weave",
      "Seamless day-to-evening versatility"
    ],
    care: "Gentle cold hand wash or eco-dry clean. Steam iron on reverse."
  },
  {
    id: 2,
    name: "Color-Blocked Duo Floral Motif Tunic & Pants",
    category: "tunics",
    categoryName: "Designer Tunics",
    price: 3899,
    originalPrice: 5299,
    rating: 5.0,
    reviewsCount: 42,
    image: "/assets/floral-tunic-outdoor.jpeg",
    hoverImage: "/assets/floral-tunic-studio.jpeg",
    views360: {
      front: "/assets/floral-tunic-outdoor.jpeg",
      sideRight: "/assets/floral-side.jpeg",
      back: "/assets/floral-back.jpeg",
      sideLeft: "/assets/floral-side.jpeg"
    },
    badge: "New Arrival",
    badgeType: "gold",
    fabric: "Soft Handloom Cotton",
    color: "Magenta, Ivory & Tangerine",
    description: "An artistic two-tone split colorway featuring joyful magenta and crisp ivory, embellished with oversized handcrafted marigold floral motifs and voluminous three-quarter sleeves.",
    sizes: ["M", "L", "XL", "XXL"],
    stock: { M: 6, L: 2, XL: 4, XXL: 3 },
    highlights: [
      "Hand-screen printed artistic botanical motifs",
      "Flattering contemporary V-neckline",
      "Dual-tone color blocking",
      "Tailored straight cropped pants included"
    ],
    care: "Gentle wash with mild liquid detergent. Dry in shade."
  },
  {
    id: 4,
    name: "Indigo Heritage Floral Border Co-ord Set",
    category: "coords",
    categoryName: "Co-ord Sets",
    price: 1100,
    originalPrice: 1699,
    rating: 4.9,
    reviewsCount: 34,
    image: "/assets/blue-printed.jpeg",
    views360: {
      front: "/assets/blue-printed.jpeg",
      sideRight: "/assets/blue-side.jpeg",
      back: "/assets/blue-back.jpeg",
      sideLeft: "/assets/blue-side.jpeg"
    },
    badge: "Editorial Pick",
    badgeType: "linen",
    fabric: "Mulmul Cotton Voile",
    color: "Indigo Blue & Ceramic Cream",
    description: "Inspired by royal jaipur block-print heritage, crafted in weightless feather-light mulmul with engineered border placement along the hem, sleeves, and trousers.",
    sizes: ["M", "L", "XL", "XXL"],
    stock: { M: 4, L: 6, XL: 2, XXL: 5 },
    highlights: [
      "Ultra-soft breathable mulmul cotton weave",
      "Engineered geometric and floral border prints",
      "Semi-elasticated waistband for bespoke fit",
      "Feather-light 140 GSM textile weight"
    ],
    care: "Machine wash cold on gentle cycle. Warm iron."
  },
  {
    id: 5,
    name: "Earth & Ochre Striped Handwoven Linen Ensemble",
    category: "linen",
    categoryName: "Pure Linen Edit",
    price: 1350,
    originalPrice: 1999,
    rating: 5.0,
    reviewsCount: 51,
    image: "/assets/striped-linen.jpeg",
    views360: {
      front: "/assets/striped-linen.jpeg",
      sideRight: "/assets/striped-side.jpeg",
      back: "/assets/striped-back.jpeg",
      sideLeft: "/assets/striped-side.jpeg"
    },
    badge: "Signature Piece",
    badgeType: "gold",
    fabric: "100% Pure European Flax Linen",
    color: "Espresso, Warm Linen & Ochre",
    description: "The epitome of quiet luxury. Handspun flax linen woven into organic pinstripes, cooling against the skin and softening luxuriously with every single wash.",
    sizes: ["M", "L", "XL", "XXL"],
    stock: { M: 5, L: 3, XL: 2, XXL: 4 },
    highlights: [
      "Pure European flax with OEKO-TEX certification",
      "Naturally thermoregulating for tropical & warm climates",
      "Drop-shoulder relaxed Japanese-inspired tailoring",
      "Mother-of-pearl buttons & bound inner seams"
    ],
    care: "Machine wash gentle in cold water. Hang damp to air dry."
  },
  {
    id: 6,
    name: "Geometric Chevron Artisan Pure Linen Tunic",
    category: "linen",
    categoryName: "Pure Linen Edit",
    price: 1200,
    originalPrice: 1799,
    rating: 4.7,
    reviewsCount: 22,
    image: "/assets/geometric-linen.jpeg",
    views360: {
      front: "/assets/geometric-linen.jpeg",
      sideRight: "/assets/geometric-side.jpeg",
      back: "/assets/geometric-back.jpeg",
      sideLeft: "/assets/geometric-side.jpeg"
    },
    badge: "Limited Edition",
    badgeType: "espresso",
    fabric: "Structured Pure Linen",
    color: "Espresso Umber & Warm Parchment",
    description: "Sharp architectural chevron weave blended with pure natural flax. An effortlessly smart investment piece designed for executive ease and discerning weekend gatherings.",
    sizes: ["M", "L", "XL", "XXL"],
    stock: { M: 4, L: 1, XL: 3, XXL: 2 },
    highlights: [
      "Architectural chevron weave texture",
      "Structured standing collar with hidden placket",
      "Side slits for elevated movement and drape",
      "Zero polyester, completely biodegradable natural fiber"
    ],
    care: "Eco dry clean or hand wash with botanical soap."
  }
];

export const EDITORIAL_QUOTES = [
  {
    outlet: "VOGUE INDIA",
    quote: "etmek is pioneering mindful, editorial dressing for modern women who demand breathable elegance without aesthetic compromise.",
    author: "Fashion Features Director"
  },
  {
    outlet: "HARPER'S BAZAAR",
    quote: "The intersection of Espresso Brown depth and Warm Linen calm makes etmek's newest capsule an absolute masterclass in quiet luxury.",
    author: "Senior Style Editor"
  },
  {
    outlet: "ELLE EDIT",
    quote: "Every stitch celebrates artisan integrity. The handwoven linen tunics are essential capsule wardrobe anchors.",
    author: "Contributing Editor"
  }
];

export const BRAND_STORY = {
  name: "etmek",
  subtitle: "The Clothing Solution",
  tagline: "Woven in Espresso Brown & Warm Linen",
  founded: "Est. 2024",
  manifesto: "Born from the desire to create garments that feel as honest as natural fibers and as striking as couture. etmek — The Clothing Solution — rejects disposable trends in favor of architectural drapes, breathable flax linens, and hand-embroidered heirlooms.",
  pillars: [
    {
      title: "100% Pure Flax & Mulmul",
      desc: "Zero synthetic blends. Only pure breathable European flax, combed cotton slub, and artisanal Chanderi weaves."
    },
    {
      title: "Honest Tailoring",
      desc: "Double-reinforced bound seams, functional deep pockets, and mother-of-pearl buttons that endure years of wear."
    },
    {
      title: "Quiet Luxury Palette",
      desc: "Curated in timeless Espresso Brown (#493512) and Warm Linen (#FFF2DC) for an understated, editorial aura."
    },
    {
      title: "Direct from Master Weavers",
      desc: "Ethically crafted alongside third-generation handloom weavers and embroidery artisans with fair wages guaranteed."
    }
  ]
};
