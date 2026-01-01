import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. We also offer installments via Klarna."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you will receive an email with a tracking number and link. You can also view your order status in your account dashboard."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
  },
  {
    question: "Can I cancel or modify my order?",
    answer: "We process orders quickly. If you need to make changes, please contact support@luxe.com within 1 hour of placing your order."
  },
  {
    question: "Where are your products made?",
    answer: "Our products are designed in New York and manufactured in ethical factories across Italy, Portugal, and Japan, known for their exceptional craftsmanship."
  },
  {
    question: "How do I care for my silk garments?",
    answer: "We recommend dry cleaning or hand washing in cold water with a gentle detergent. Lay flat to dry and iron on low heat if necessary."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm uppercase tracking-widest mb-4 block">
            Support
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Frequently Asked Questions</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-white/10 rounded-xl px-6 bg-white/5 data-[state=open]:bg-white/10 transition-colors"
              >
                <AccordionTrigger className="text-white text-lg font-medium hover:text-amber-400 no-underline hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </main>
  );
}