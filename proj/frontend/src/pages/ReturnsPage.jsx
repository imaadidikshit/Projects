import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle, HelpCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Returns & Exchanges</h1>
          <p className="text-white/60 text-lg">
            We want you to be completely satisfied with your purchase. 
            That's why we offer a hassle-free 30-day return policy.
          </p>
        </motion.div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-serif text-white mb-6">How to Return</h2>
            <div className="grid md:grid-cols-3 gap-6">
               {[
                 { title: "1. Request", text: "Log into your account and select the order you wish to return." },
                 { title: "2. Pack", text: "Pack items in original packaging with tags attached." },
                 { title: "3. Ship", text: "Attach the prepaid label and drop off at any carrier location." }
               ].map((step, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white/5 p-6 rounded-xl border border-white/10"
                 >
                   <span className="text-amber-400 font-serif text-xl mb-3 block">{step.title}</span>
                   <p className="text-white/70">{step.text}</p>
                 </motion.div>
               ))}
            </div>
          </section>

          <section className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
            <h2 className="text-xl font-serif text-white mb-4">Return Conditions</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-green-500" />
                Items must be returned within 30 days of delivery.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-green-500" />
                Merchandise must be unworn, unwashed, and with original tags.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-green-500" />
                Footwear must be returned in the original shoe box.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif text-white mb-4">Common Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-white font-medium mb-2">When will I get my refund?</h3>
                <p className="text-white/60">Refunds are processed within 5-7 business days after we receive your return.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-white font-medium mb-2">Is return shipping free?</h3>
                <p className="text-white/60">Yes, we provide free prepaid return labels for all domestic orders.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}