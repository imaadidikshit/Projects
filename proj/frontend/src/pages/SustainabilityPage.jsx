import { motion } from 'framer-motion';
import { Leaf, RefreshCcw, Heart, Globe } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Organic Materials',
    description: 'We exclusively use GOTS certified organic cotton and recycled synthetic fibers.'
  },
  {
    icon: RefreshCcw,
    title: 'Circular Economy',
    description: 'Our recycling program ensures that old garments are given a new life, not sent to landfills.'
  },
  {
    icon: Globe,
    title: 'Carbon Neutral',
    description: 'We offset 100% of our carbon emissions from shipping and production processes.'
  },
  {
    icon: Heart,
    title: 'Ethical Labor',
    description: 'All our partners pay fair living wages and ensure safe working conditions.'
  }
];

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm uppercase tracking-widest mb-4 block">
            Our Commitment
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Sustainability</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Fashion shouldn't cost the earth. We are dedicated to reducing our environmental footprint at every stage of production.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 text-center"
            >
              <div className="inline-flex p-3 rounded-full bg-amber-400/10 text-amber-400 mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden aspect-[21/9]"
        >
          <img 
            src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=1600&q=80" 
            alt="Sustainable Production" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center p-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Transparency is Key</h2>
              <p className="text-white/80 text-lg">
                We believe in full transparency. Every product comes with a QR code that traces its journey from raw material to your doorstep.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}