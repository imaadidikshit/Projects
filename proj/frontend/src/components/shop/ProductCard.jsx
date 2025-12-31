import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { siteConfig, colors as colorData } from '@/lib/data';
import { useCartStore, useUIStore } from '@/lib/store';
import { useState } from 'react';

const ImageWithFallback = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80';
  };
  return <img src={src} alt={alt} className={className} onError={handleError} />;
};

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCartStore();
  const { setCursorVariant, setCursorText } = useUIStore();

  const getColorHex = (colorId) => {
    const color = colorData.find(c => c.id === colorId);
    return color?.hex || '#888';
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group"
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorVariant('product');
        setCursorText('View');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorVariant('default');
        setCursorText('');
      }}
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-zinc-900">
          {/* Primary Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
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
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={product.images[1]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Sale Badge */}
          {product.originalPrice && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-black text-xs font-medium rounded-full">
              Sale
            </span>
          )}

          {/* Low Stock Badge */}
          {product.stock <= 5 && (
            <span className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              Low Stock
            </span>
          )}

          {/* Quick Add Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickAdd}
            className={`absolute bottom-4 left-4 right-4 py-3 font-medium rounded-full flex items-center justify-center gap-2 transition-colors ${
              justAdded
                ? 'bg-green-500 text-white'
                : 'bg-white text-black hover:bg-amber-400'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={18} />
                Added!
              </>
            ) : (
              <>
                <Plus size={18} />
                Quick Add
              </>
            )}
          </motion.button>
        </div>

        {/* Product Info */}
        <div>
          <h3 className="text-white font-medium mb-1 group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>

          {/* Color Swatches */}
          <div className="flex items-center gap-1 mb-2">
            {product.colors.slice(0, 4).map((colorId) => (
              <span
                key={colorId}
                className="w-3 h-3 rounded-full border border-white/20"
                style={{ backgroundColor: getColorHex(colorId) }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-white/40 text-xs ml-1">+{product.colors.length - 4}</span>
            )}
          </div>

          {/* Price */}
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
        </div>
      </Link>
    </motion.div>
  );
}
