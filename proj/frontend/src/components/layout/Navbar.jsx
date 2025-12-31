import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore, useUIStore } from '@/lib/store';
import { siteConfig } from '@/lib/data';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, getItemCount } = useCartStore();
  const { toggleSearch, setCursorVariant } = useUIStore();
  const itemCount = getItemCount();

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <nav className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-2xl px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link 
                to="/" 
                className="relative group"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <motion.span 
                  className="text-2xl font-serif font-bold tracking-widest text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  {siteConfig.name}
                </motion.span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative group"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <span className={`text-sm uppercase tracking-wider transition-colors ${
                      location.pathname === link.href ? 'text-amber-400' : 'text-white/80 hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                    {location.pathname === link.href && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400"
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSearch}
                  className="p-2 text-white/80 hover:text-white transition-colors"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <Search size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCart}
                  className="p-2 text-white/80 hover:text-white transition-colors relative"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <ShoppingBag size={20} />
                  <AnimatePresence>
                    {itemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-black text-xs font-bold rounded-full flex items-center justify-center"
                      >
                        {itemCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
              </div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-24 px-6 md:hidden"
          >
            <div className="backdrop-blur-xl bg-black/90 border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2xl font-serif ${
                        location.pathname === link.href ? 'text-amber-400' : 'text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
