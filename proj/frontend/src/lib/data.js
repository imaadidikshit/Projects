// Centralized data file - Edit this to update the entire site

export const siteConfig = {
  name: "LUXE",
  tagline: "Redefining Elegance",
  description: "Premium curated collections for the discerning individual",
  currency: "$",
};

export const categories = [
  { id: "outerwear", name: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80" },
  { id: "tops", name: "Tops", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80" },
  { id: "bottoms", name: "Bottoms", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80" },
  { id: "accessories", name: "Accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80" },
];

export const colors = [
  { id: "black", name: "Black", hex: "#0a0a0a" },
  { id: "white", name: "White", hex: "#fafafa" },
  { id: "navy", name: "Navy", hex: "#1e3a5f" },
  { id: "camel", name: "Camel", hex: "#c4a77d" },
  { id: "burgundy", name: "Burgundy", hex: "#722f37" },
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const products = [
  {
    id: "1",
    slug: "cashmere-overcoat",
    name: "Cashmere Overcoat",
    price: 2450,
    originalPrice: 2800,
    description: "Crafted from the finest Mongolian cashmere, this overcoat represents the pinnacle of luxury outerwear. Each piece is hand-finished by master artisans in our Italian atelier.",
    details: [
      "100% Pure Mongolian Cashmere",
      "Full canvas construction",
      "Horn buttons",
      "Silk-lined interior",
      "Made in Italy"
    ],
    care: "Dry clean only. Store on wide hanger. Brush gently to maintain nap.",
    shipping: "Complimentary express shipping worldwide. Delivery within 3-5 business days.",
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd628b8?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
    ],
    category: "outerwear",
    colors: ["black", "camel", "navy"],
    sizes: ["S", "M", "L", "XL"],
    stock: 15,
    featured: true,
    trending: true,
  },
  {
    id: "2",
    slug: "silk-blend-blazer",
    name: "Silk Blend Blazer",
    price: 1890,
    originalPrice: null,
    description: "A contemporary take on classic tailoring. This blazer combines the structure of wool with the lustrous sheen of silk for an unparalleled refined appearance.",
    details: [
      "70% Wool, 30% Silk blend",
      "Half canvas construction",
      "Functional buttonholes",
      "Cupro lining",
      "Made in Italy"
    ],
    care: "Professional dry clean recommended. Steam to remove wrinkles.",
    shipping: "Complimentary express shipping worldwide. Delivery within 3-5 business days.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80"
    ],
    category: "tops",
    colors: ["black", "navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 23,
    featured: true,
    trending: false,
  },
  {
    id: "3",
    slug: "merino-turtleneck",
    name: "Merino Wool Turtleneck",
    price: 485,
    originalPrice: 550,
    description: "Exceptionally soft extra-fine merino wool turtleneck. The perfect foundation for sophisticated layering or striking standalone piece.",
    details: [
      "100% Extra-fine Merino Wool",
      "18.5 micron gauge",
      "Ribbed cuffs and hem",
      "Seamless construction",
      "Made in Scotland"
    ],
    care: "Hand wash cold or dry clean. Lay flat to dry. Do not hang.",
    shipping: "Complimentary express shipping worldwide. Delivery within 3-5 business days.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80"
    ],
    category: "tops",
    colors: ["black", "white", "camel", "burgundy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 45,
    featured: false,
    trending: true,
  },
  {
    id: "4",
    slug: "tailored-wool-trousers",
    name: "Tailored Wool Trousers",
    price: 695,
    originalPrice: null,
    description: "Impeccably tailored trousers in super 120s wool. Features our signature comfort waistband and pristine pressed creases.",
    details: [
      "Super 120s Wool",
      "Extended waistband",
      "French bearers",
      "Unfinished hem for custom tailoring",
      "Made in Italy"
    ],
    care: "Dry clean only. Press with steam. Hang on trouser hangers.",
    shipping: "Complimentary express shipping worldwide. Delivery within 3-5 business days.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"
    ],
    category: "bottoms",
    colors: ["black", "navy", "camel"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    stock: 32,
    featured: true,
    trending: false,
  },
  {
    id: "5",
    slug: "leather-tote-bag",
    name: "Full-Grain Leather Tote",
    price: 1250,
    originalPrice: 1450,
    description: "Handcrafted from vegetable-tanned full-grain leather. This tote develops a beautiful patina over time, becoming uniquely yours.",
    details: [
      "Full-grain vegetable-tanned leather",
      "Cotton canvas lining",
      "Brass hardware",
      "Interior laptop sleeve",
      "Handmade in Florence"
    ],
    care: "Condition leather periodically. Store stuffed in dust bag. Avoid water exposure.",
    shipping: "Complimentary express shipping worldwide. Delivery within 3-5 business days.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    category: "accessories",
    colors: ["black", "camel", "burgundy"],
    sizes: ["One Size"],
    stock: 18,
    featured: true,
    trending: true,
  },
  {
    id: "6",
    slug: "swiss-automatic-watch",
    name: "Swiss Automatic Timepiece",
    price: 4850,
    originalPrice: null,
    description: "A masterpiece of horological engineering. This automatic movement watch features a sapphire crystal face and exhibition caseback.",
    details: [
      "Swiss automatic movement",
      "316L surgical steel case",
      "Sapphire crystal",
      "50m water resistance",
      "Made in Switzerland"
    ],
    care: "Service every 3-5 years. Keep away from magnetic fields. Wipe with soft cloth.",
    shipping: "Complimentary express shipping worldwide. Delivery within 3-5 business days.",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80"
    ],
    category: "accessories",
    colors: ["black", "white"],
    sizes: ["40mm", "42mm"],
    stock: 8,
    featured: false,
    trending: true,
  },
  {
    id: "7",
    slug: "suede-chelsea-boots",
    name: "Italian Suede Chelsea Boots",
    price: 890,
    originalPrice: 980,
    description: "Classic Chelsea boots reimagined in supple Italian suede. Features a Goodyear welt construction for durability and resoling potential.",
    details: [
      "Italian suede upper",
      "Goodyear welt construction",
      "Leather sole with rubber insert",
      "Elasticated side panels",
      "Made in Italy"
    ],
    care: "Use suede brush regularly. Apply protective spray. Store with shoe trees.",
    shipping: "Complimentary express shipping worldwide. Delivery within 3-5 business days.",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80"
    ],
    category: "accessories",
    colors: ["black", "camel", "navy"],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    stock: 26,
    featured: false,
    trending: false,
  },
  {
    id: "8",
    slug: "linen-summer-shirt",
    name: "Belgian Linen Summer Shirt",
    price: 395,
    originalPrice: null,
    description: "Woven from the finest Belgian flax, this shirt offers unparalleled breathability and develops a beautiful soft hand with each wash.",
    details: [
      "100% Belgian Linen",
      "Mother of pearl buttons",
      "Single-needle stitching",
      "Curved hem",
      "Made in Portugal"
    ],
    care: "Machine wash cold. Tumble dry low. Iron while slightly damp for best results.",
    shipping: "Complimentary express shipping worldwide. Delivery within 3-5 business days.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"
    ],
    category: "tops",
    colors: ["white", "navy", "camel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 38,
    featured: true,
    trending: false,
  },
];

export const brandValues = [
  "Premium Quality",
  "Sustainable Sourcing",
  "Free Worldwide Shipping",
  "Handcrafted Excellence",
  "Timeless Design",
  "Ethical Production"
];

export const getProductBySlug = (slug) => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (categoryId) => {
  return products.filter(p => p.category === categoryId);
};

export const getFeaturedProducts = () => {
  return products.filter(p => p.featured);
};

export const getTrendingProducts = () => {
  return products.filter(p => p.trending);
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
};
