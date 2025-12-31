import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ArrowRight, ShoppingBag, Truck, Tag } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { siteConfig, colors as colorData } from '@/lib/data';
import { Input } from '@/components/ui/input';

const ImageWithFallback = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80';
  };
  return <img src={src} alt={alt} className={className} onError={handleError} />;
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const shipping = subtotal >= 500 ? 0 : 25;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const getColorHex = (colorId) => {
    const color = colorData.find(c => c.id === colorId);
    return color?.hex || '#888';
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'LUXE10') {
      setPromoApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingBag size={80} className="mx-auto text-white/20 mb-6" />
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-4">Your Cart is Empty</h1>
            <p className="text-white/60 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-amber-400 text-black font-medium rounded-full inline-flex items-center gap-2"
              >
                Start Shopping
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-white mb-12"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.cartId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-white/5 rounded-2xl border border-white/10"
              >
                {/* Image */}
                <div className="w-32 h-40 rounded-xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        to={`/product/${item.slug}`}
                        className="text-xl font-serif text-white hover:text-amber-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-3 mt-2 text-white/60">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: getColorHex(item.selectedColor) }}
                        />
                        <span>Size: {item.selectedSize}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.cartId)}
                      className="p-2 text-white/40 hover:text-red-400 transition-colors"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-white/5 rounded-full px-3">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="p-2 text-white/60 hover:text-white transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-white w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="p-2 text-white/60 hover:text-white transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-amber-400 font-medium text-lg">
                        {siteConfig.currency}{(item.price * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-white/40 text-sm">
                          {siteConfig.currency}{item.price.toLocaleString()} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="text-white/40 text-sm hover:text-red-400 transition-colors"
            >
              Clear Cart
            </button>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 lg:h-fit space-y-6"
          >
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-serif text-white">Order Summary</h2>

              {/* Promo Code */}
              <div>
                <label className="text-white/60 text-sm mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="bg-white/5 border-white/10 text-white"
                    disabled={promoApplied}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                    className="px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                  >
                    {promoApplied ? 'Applied!' : 'Apply'}
                  </motion.button>
                </div>
                {promoApplied && (
                  <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                    <Tag size={14} /> 10% discount applied
                  </p>
                )}
                <p className="text-white/40 text-xs mt-2">Try: LUXE10</p>
              </div>

              {/* Summary Lines */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>{siteConfig.currency}{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span className="flex items-center gap-1">
                    <Truck size={16} />
                    Shipping
                  </span>
                  <span>{shipping === 0 ? 'Free' : `${siteConfig.currency}${shipping}`}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (10%)</span>
                    <span>-{siteConfig.currency}{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-xl font-serif text-white pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-amber-400">{siteConfig.currency}{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {subtotal < 500 && (
                <div className="p-4 bg-amber-400/10 border border-amber-400/30 rounded-lg">
                  <p className="text-amber-400 text-sm">
                    Add {siteConfig.currency}{(500 - subtotal).toLocaleString()} more for free shipping!
                  </p>
                  <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(subtotal / 500) * 100}%` }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-amber-400 text-black font-medium rounded-full hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </motion.button>

              {/* Continue Shopping */}
              <Link
                to="/shop"
                className="block text-center text-white/60 hover:text-white transition-colors text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
