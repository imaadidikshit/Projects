import { motion } from 'framer-motion';
import { brandValues } from '@/lib/data';

export default function Marquee() {
  // Double the items for seamless infinite scroll
  const items = [...brandValues, ...brandValues];

  return (
    <section className="py-8 bg-amber-400 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
        className="flex whitespace-nowrap"
      >
        {items.map((value, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className="text-black font-medium text-lg md:text-xl uppercase tracking-wider">
              {value}
            </span>
            <span className="ml-8 text-black/50 text-2xl">•</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
