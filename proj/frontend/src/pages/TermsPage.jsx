import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
         <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Terms of Service</h1>
          <p className="text-white/60">Last Updated: October 2024</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-12 text-white/70 leading-relaxed"
        >
          <section>
            <h2 className="text-2xl text-white font-serif mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4">2. Intellectual Property</h2>
            <p>
              All content on this site, including text, graphics, logos, and images, is the property of LUXE 
              and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4">3. Product Availability</h2>
            <p>
              All orders are subject to product availability. We reserve the right to discontinue any product at any time. 
              Prices for our products are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4">4. Limitation of Liability</h2>
            <p>
              LUXE shall not be liable for any indirect, incidental, special, consequential or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
}