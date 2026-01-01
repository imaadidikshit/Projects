import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '@/lib/data';

// Determine API URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Outerwear', href: '/shop?category=outerwear' },
    { label: 'Tops', href: '/shop?category=tops' },
    { label: 'Bottoms', href: '/shop?category=bottoms' },
    { label: 'Accessories', href: '/shop?category=accessories' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Sustainability', href: '/sustainability' },
  ],
  support: [
    { label: 'Contact', href: '/contact' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Size Guide', href: '/size-guide' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Newsletter error:", error);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/10">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-white/60 text-lg">
              Subscribe for exclusive access to new collections, private sales, and style insights.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex gap-4"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-50"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`px-8 py-4 font-medium rounded-full flex items-center gap-2 transition-colors ${
                status === 'success' ? 'bg-green-500 text-white' : 
                status === 'error' ? 'bg-red-500 text-white' :
                'bg-amber-400 text-black hover:bg-amber-300'
              }`}
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={18} />
              ) : status === 'success' ? (
                'Subscribed!'
              ) : status === 'error' ? (
                'Retry'
              ) : (
                <>
                  Subscribe <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="text-3xl font-serif font-bold text-white mb-6 block">
              {siteConfig.name}
            </Link>
            <p className="text-white/60 mb-6">{siteConfig.description}</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="p-2 bg-white/5 rounded-full text-white/60 hover:text-amber-400 hover:bg-white/10 transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-white font-medium uppercase tracking-wider mb-6">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/60 hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}