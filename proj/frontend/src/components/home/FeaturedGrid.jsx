import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getFeaturedProducts, siteConfig } from '@/lib/data';
import { useUIStore, useCartStore } from '@/lib/store';

const ImageWithFallback = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80';
  };
  return <img src={src} alt={alt} className={className} onError={handleError} />;
};

export default function FeaturedGrid() {
  const products = getFeaturedProducts();
  const { setCursorVariant, setCursorText } = useUIStore();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm uppercase tracking-widest mb-4 block">
            Curated Selection
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white">
            Featured Collection
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          {products.slice(0, 5).map((product, index) => {
            // Make first and fourth items span 2 rows for bento effect
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className={`relative group rounded-2xl overflow-hidden ${isLarge ? 'md:row-span-2' : ''}`}
                onMouseEnter={() => {
                  setCursorVariant('product');
                  setCursorText('View');
                }}
                onMouseLeave={() => {
                  setCursorVariant('default');
                  setCursorText('');
                }}
              >
                <Link to={`/product/${product.slug}`} className="block w-full h-full">
                  {/* Background Image */}
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

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {product.originalPrice && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-block w-fit px-3 py-1 bg-amber-400 text-black text-xs font-medium rounded-full mb-3"
                      >
                        Sale
                      </motion.span>
                    )}

                    <h3 className="text-xl md:text-2xl font-serif text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-amber-400 font-medium text-lg">
                          {siteConfig.currency}{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-white/50 line-through text-sm">
                            {siteConfig.currency}{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowUpRight className="text-white" size={18} />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all inline-flex items-center gap-3"
            >
              View All Products
              <ArrowUpRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
