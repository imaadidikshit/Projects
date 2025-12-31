import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { siteConfig } from '@/lib/data';
import { useUIStore } from '@/lib/store';

const AnimatedText = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  return (
    <motion.div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.1, duration: 0.8, ease: 'easeOut' }}
          className="inline-block mr-4"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function HeroSection() {
  const containerRef = useRef(null);
  const { setCursorVariant, setCursorText } = useUIStore();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video/Image */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <motion.img
          style={{ y }}
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
          alt="Luxury Fashion"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-6 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-400 text-sm uppercase tracking-widest">
            New Collection 2025
          </span>
        </motion.div>

        <AnimatedText
          text={siteConfig.tagline}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight"
          delay={0.4}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group px-8 py-4 bg-amber-400 text-black font-medium rounded-full flex items-center gap-3 hover:bg-amber-300 transition-all"
            >
              Explore Collection
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="px-8 py-4 border border-white/30 text-white rounded-full flex items-center gap-3 hover:bg-white/10 transition-all"
          >
            <Play size={20} />
            Watch Film
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
