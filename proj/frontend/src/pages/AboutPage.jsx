import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const values = [
    {
      title: 'Quality First',
      description: 'Every piece is crafted from the finest materials, sourced from the world\'s best suppliers.',
      image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80',
    },
    {
      title: 'Sustainable',
      description: 'We\'re committed to ethical production and environmentally conscious practices.',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80',
    },
    {
      title: 'Timeless Design',
      description: 'Our pieces transcend trends, designed to be cherished for years to come.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    },
  ];

  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <span className="text-amber-400 text-sm uppercase tracking-widest mb-4 block">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Redefining Luxury for the Modern Era
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Founded in 2020, LUXE was born from a vision to create timeless pieces that 
              combine exceptional craftsmanship with contemporary design. We believe luxury 
              should be accessible, sustainable, and above all, meaningful.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              Our collections are curated with intention, each piece selected for its 
              quality, design, and the story it tells. From our ateliers in Italy to 
              your wardrobe, we maintain the highest standards at every step.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
              alt="LUXE Store"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-zinc-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm uppercase tracking-widest mb-4 block">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Our Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-white/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2020', label: 'Founded' },
              { number: '50+', label: 'Countries' },
              { number: '100K+', label: 'Happy Customers' },
              { number: '95%', label: 'Sustainable Materials' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <span className="text-4xl md:text-5xl font-serif text-amber-400 block mb-2">
                  {stat.number}
                </span>
                <span className="text-white/60 uppercase tracking-wider text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-400/20 to-amber-600/20 border border-amber-400/30 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Experience Luxury Today
          </h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of premium essentials and timeless pieces.
          </p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-amber-400 text-black font-medium rounded-full inline-flex items-center gap-2"
            >
              Shop Collection
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
        <script src="https://trustflow-nu.vercel.app/embed.js" data-space-id="2e689c9c-1430-4404-8240-7649f5a77920"></script>
      </section>
    </main>
  );
}
