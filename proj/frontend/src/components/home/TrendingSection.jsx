import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getTrendingProducts, siteConfig } from '@/lib/data';
import { useUIStore, useCartStore } from '@/lib/store';

const ImageWithFallback = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80';
  };
  return <img src={src} alt={alt} className={className} onError={handleError} />;
};

export default function TrendingSection() {
  const products = getTrendingProducts();
  const containerRef = useRef(null);
  const { setCursorVariant, setCursorText } = useUIStore();
  const { addItem } = useCartStore();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0]);
  };

  return (
    <section ref={containerRef} className="py-24 bg-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-amber-400 text-sm uppercase tracking-widest mb-4 block">
              Trending Now
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white">
              Most Wanted
            </h2>
          </div>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/60 hover:text-amber-400 transition-colors flex items-center gap-2 text-sm uppercase tracking-wider"
            >
              View All
              <ArrowUpRight size={16} />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Horizontal Scroll Section */}
      <motion.div style={{ x }} className="flex gap-6 px-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[300px] md:w-[400px] group"
            onMouseEnter={() => {
              setCursorVariant('product');
              setCursorText('View');
            }}
            onMouseLeave={() => {
              setCursorVariant('default');
              setCursorText('');
            }}
          >
            <Link to={`/product/${product.slug}`} className="block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                {/* Primary Image */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImageWithFallback
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Secondary Image on Hover */}
                {product.images?.[1] && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0"
                  >
                    <ImageWithFallback
                      src={product.images[1]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Quick Add Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-4 left-4 right-4 py-3 bg-white text-black font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleQuickAdd(e, product)}
                >
                  Quick Add
                </motion.button>

                {/* Sale Badge */}
                {product.originalPrice && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-black text-xs font-medium rounded-full">
                    Sale
                  </span>
                )}
              </div>

              <h3 className="text-white font-medium text-lg mb-1 group-hover:text-amber-400 transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-medium">
                  {siteConfig.currency}{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-white/40 line-through text-sm">
                    {siteConfig.currency}{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
