import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Heart, Share2, ChevronLeft, Check, Truck, RefreshCw, Shield } from 'lucide-react';
import { getProductBySlug, getRelatedProducts, siteConfig, colors as colorData } from '@/lib/data';
import { useCartStore, useUIStore } from '@/lib/store';
import ProductCard from '@/components/shop/ProductCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ImageWithFallback = ({ src, alt, className, onClick }) => {
  const handleError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80';
  };
  return <img src={src} alt={alt} className={className} onClick={onClick} onError={handleError} />;
};

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const relatedProducts = product ? getRelatedProducts(product.id, 4) : [];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { addItem } = useCartStore();
  const { setCursorVariant } = useUIStore();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || '');
    }
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-black pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-white mb-4">Product not found</h1>
          <Link to="/shop" className="text-amber-400 hover:underline">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const getColorHex = (colorId) => {
    const color = colorData.find(c => c.id === colorId);
    return color?.hex || '#888';
  };

  const getColorName = (colorId) => {
    const color = colorData.find(c => c.id === colorId);
    return color?.name || colorId;
  };

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          Back
        </motion.button>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Sale Badge */}
              {product.originalPrice && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-black text-sm font-medium rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-amber-400'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info - Sticky */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 lg:h-fit space-y-6"
          >
            {/* Category */}
            <Link
              to={`/shop?category=${product.category}`}
              className="text-amber-400 text-sm uppercase tracking-wider hover:underline"
            >
              {product.category}
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-serif text-white">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl text-amber-400 font-medium">
                {siteConfig.currency}{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-white/40 line-through">
                  {siteConfig.currency}{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/70 text-lg leading-relaxed">{product.description}</p>

            {/* Color Selector */}
            <div>
              <label className="text-white text-sm uppercase tracking-wider mb-3 block">
                Color: <span className="text-amber-400">{getColorName(selectedColor)}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((colorId) => (
                  <button
                    key={colorId}
                    onClick={() => setSelectedColor(colorId)}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === colorId
                        ? 'border-amber-400 scale-110'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: getColorHex(colorId) }}
                  >
                    {selectedColor === colorId && (
                      <Check size={16} className={colorId === 'white' ? 'text-black' : 'text-white'} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="text-white text-sm uppercase tracking-wider mb-3 block">
                Size: <span className="text-amber-400">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 border rounded-lg transition-all ${
                      selectedSize === size
                        ? 'border-amber-400 bg-amber-400/20 text-amber-400'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4">
              {/* Quantity */}
              <div className="flex items-center gap-3 bg-white/5 rounded-full px-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="text-white w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`flex-1 py-4 font-medium rounded-full transition-colors flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-amber-400 text-black hover:bg-amber-300'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={20} />
                    Added to Cart!
                  </>
                ) : (
                  'Add to Cart'
                )}
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 border border-white/20 rounded-full text-white/60 hover:text-red-400 hover:border-red-400 transition-colors"
              >
                <Heart size={20} />
              </motion.button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-500' : 'bg-amber-400'}`} />
              <span className="text-white/60 text-sm">
                {product.stock > 5 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="text-center">
                <Truck className="mx-auto text-amber-400 mb-2" size={24} />
                <p className="text-white/60 text-sm">Free Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCw className="mx-auto text-amber-400 mb-2" size={24} />
                <p className="text-white/60 text-sm">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto text-amber-400 mb-2" size={24} />
                <p className="text-white/60 text-sm">2 Year Warranty</p>
              </div>
            </div>

            {/* Accordion Details */}
            <Accordion type="single" collapsible className="border-t border-white/10 pt-4">
              <AccordionItem value="details" className="border-b border-white/10">
                <AccordionTrigger className="text-white hover:text-amber-400 hover:no-underline py-4">
                  Product Details
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="text-white/70 flex items-start gap-2">
                        <Check className="text-amber-400 flex-shrink-0 mt-1" size={16} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="care" className="border-b border-white/10">
                <AccordionTrigger className="text-white hover:text-amber-400 hover:no-underline py-4">
                  Fabric & Care
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <p className="text-white/70">{product.care}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-b border-white/10">
                <AccordionTrigger className="text-white hover:text-amber-400 hover:no-underline py-4">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <p className="text-white/70">{product.shipping}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white">You May Also Like</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
