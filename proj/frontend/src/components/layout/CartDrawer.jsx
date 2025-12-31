import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/lib/store';
import { siteConfig, colors as colorData } from '@/lib/data';

const ImageWithFallback = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80';
  };
  return <img src={src} alt={alt} className={className} onError={handleError} />;
};

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();

  const getColorHex = (colorId) => {
    const color = colorData.find(c => c.id === colorId);
    return color?.hex || '#888';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-amber-400" size={24} />
                <h2 className="text-xl font-serif text-white">Your Cart</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag size={64} className="text-white/20 mb-4" />
                  <h3 className="text-xl font-serif text-white mb-2">Your cart is empty</h3>
                  <p className="text-white/60 mb-6">Discover our curated collection</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeCart}
                  >
                    <Link
                      to="/shop"
                      className="px-6 py-3 bg-amber-400 text-black font-medium rounded-full inline-flex items-center gap-2"
                    >
                      Start Shopping
                      <ArrowRight size={18} />
                    </Link>
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.cartId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-4 bg-white/5 rounded-xl"
                    >
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-white font-medium hover:text-amber-400 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>

                        <div className="flex items-center gap-2 mt-1 text-sm text-white/60">
                          <span
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: getColorHex(item.selectedColor) }}
                          />
                          <span>{item.selectedSize}</span>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            >
                              <Minus size={14} />
                            </motion.button>
                            <span className="text-white w-8 text-center">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            >
                              <Plus size={14} />
                            </motion.button>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.cartId)}
                            className="text-white/40 hover:text-red-400 transition-colors"
                          >
                            <X size={18} />
                          </motion.button>
                        </div>
                      </div>

                      <div className="text-amber-400 font-medium">
                        {siteConfig.currency}{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white font-serif text-2xl">
                    {siteConfig.currency}{subtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-white/40 text-sm">Shipping calculated at checkout</p>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="px-6 py-3 border border-white/20 text-white text-center rounded-full hover:bg-white/5 transition-colors"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="px-6 py-3 bg-amber-400 text-black text-center font-medium rounded-full hover:bg-amber-300 transition-colors"
                  >
                    Checkout
                  </Link>
                </div>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-white/40 text-sm hover:text-red-400 transition-colors py-2"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
