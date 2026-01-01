import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const pressArticles = [
  {
    publication: "Vogue",
    date: "October 2024",
    title: "LUXE is Redefining Minimalist Fashion for the Modern Era",
    excerpt: "The brand's latest collection proves that sustainable luxury is not just a trend, but the future of fashion.",
    link: "#"
  },
  {
    publication: "GQ",
    date: "September 2024",
    title: "The Essential Guide to Building a Timeless Wardrobe",
    excerpt: "Why LUXE's approach to staples is changing how men shop for high-end basics.",
    link: "#"
  },
  {
    publication: "Elle",
    date: "August 2024",
    title: "Eco-Conscious Brands to Watch This Season",
    excerpt: "Among the top contenders, LUXE stands out for its transparency and material innovation.",
    link: "#"
  },
  {
    publication: "Hypebeast",
    date: "July 2024",
    title: "A Closer Look at the Craftsmanship Behind LUXE",
    excerpt: "We visited their Italian ateliers to see exactly how their garments come to life.",
    link: "#"
  }
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm uppercase tracking-widest mb-4 block">
            In The News
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Press & Features</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {pressArticles.map((article, index) => (
            <motion.a
              href={article.link}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {article.publication}
                  </h3>
                  <span className="text-white/40 text-sm">{article.date}</span>
                </div>
                <ArrowUpRight className="text-white/40 group-hover:text-amber-400 transition-colors" />
              </div>
              <h4 className="text-xl text-white mb-3 font-medium">{article.title}</h4>
              <p className="text-white/60 leading-relaxed">{article.excerpt}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
}