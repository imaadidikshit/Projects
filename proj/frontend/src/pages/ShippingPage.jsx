import { motion } from 'framer-motion';
import { Truck, Globe, Clock } from 'lucide-react';

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Shipping Policy</h1>
          <p className="text-white/60 text-lg">
            We offer worldwide shipping with premium carriers to ensure your order arrives safely and on time.
          </p>
        </motion.div>

        <div className="grid gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <Truck className="text-amber-400" size={28} />
              <h2 className="text-2xl font-serif text-white">Domestic Shipping (US)</h2>
            </div>
            <ul className="space-y-4 text-white/70">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Standard (5-7 business days)</span>
                <span className="text-white font-medium">Free</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Express (2-3 business days)</span>
                <span className="text-white font-medium">$15.00</span>
              </li>
              <li className="flex justify-between">
                <span>Overnight (1 business day)</span>
                <span className="text-white font-medium">$35.00</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <Globe className="text-amber-400" size={28} />
              <h2 className="text-2xl font-serif text-white">International Shipping</h2>
            </div>
            <p className="text-white/60 mb-4">
              We ship to over 50 countries globally. Customs duties and taxes are calculated at checkout.
            </p>
            <ul className="space-y-4 text-white/70">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Standard International (7-14 days)</span>
                <span className="text-white font-medium">$25.00</span>
              </li>
              <li className="flex justify-between">
                <span>DHL Express (3-5 days)</span>
                <span className="text-white font-medium">$45.00</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-white/60 text-sm"
        >
          <p className="mb-4">
            * Please note that processing time (1-2 business days) is separate from shipping time. 
            Orders placed after 2PM EST will be processed the following business day.
          </p>
        </motion.div>
      </div>
    </main>
  );
}