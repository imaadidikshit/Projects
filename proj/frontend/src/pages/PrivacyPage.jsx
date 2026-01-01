import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Privacy Policy</h1>
          <p className="text-white/60">Last Updated: October 2024</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-12 text-white/70 leading-relaxed"
        >
          <section>
            <h2 className="text-2xl text-white font-serif mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us when you create an account, make a purchase, 
              sign up for our newsletter, or contact us. This includes your name, email address, shipping 
              address, payment information, and phone number.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process your orders and payments.</li>
              <li>Communicate with you about your account and orders.</li>
              <li>Send you marketing newsletters (if you opted in).</li>
              <li>Improve our website and customer service.</li>
              <li>Detect and prevent fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white font-serif mb-4">3. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. 
              Payment transactions are encrypted using SSL technology. However, no method of transmission 
              over the Internet is 100% secure.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl text-white font-serif mb-4">4. Contact Us</h2>
            <p>
              If you have questions about this policy, please contact us at privacy@luxe.com.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
}