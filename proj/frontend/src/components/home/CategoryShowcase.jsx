import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';
import { useUIStore } from '@/lib/store';

const ImageWithFallback = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80';
  };
  return <img src={src} alt={alt} className={className} onError={handleError} />;
};

export default function CategoryShowcase() {
  const { setCursorVariant } = useUIStore();

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm uppercase tracking-widest mb-4 block">
            Shop By
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white">
            Categories
          </h2>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/shop?category=${category.id}`}
                className="group relative block aspect-square rounded-full overflow-hidden"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {/* Image */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

                {/* Border Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-amber-400 transition-colors duration-500"
                  whileHover={{ scale: 0.9 }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
                      {category.name}
                    </h3>
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="text-amber-400 text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Explore
                    </motion.span>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
