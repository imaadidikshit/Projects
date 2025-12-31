import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUIStore } from '@/lib/store';
import { products } from '@/lib/data';

const ImageWithFallback = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80';
  };
  return <img src={src} alt={alt} className={className} onError={handleError} />;
};

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    closeSearch();
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-start justify-center pt-24"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="w-full max-w-2xl mx-6"
          >
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-16 py-5 bg-white/10 border border-white/20 rounded-2xl text-white text-xl placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-zinc-900/90 border border-white/10 rounded-2xl overflow-hidden max-h-[60vh] overflow-y-auto"
              >
                {results.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={handleClose}
                      className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium group-hover:text-amber-400 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-white/60 text-sm capitalize">{product.category}</p>
                      </div>
                      <span className="text-amber-400 font-medium">${product.price}</span>
                      <ArrowRight className="text-white/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" size={18} />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {query.length >= 2 && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-8 text-center text-white/60"
              >
                No products found for "{query}"
              </motion.div>
            )}

            {/* Quick Links */}
            {query.length < 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <p className="text-white/40 mb-4">Popular Searches</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Cashmere', 'Blazer', 'Leather', 'Watch'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 hover:border-amber-400 hover:text-amber-400 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
