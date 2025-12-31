import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useUIStore } from '@/lib/store';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const { cursorText, cursorVariant } = useUIStore();
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'transparent',
      border: '2px solid rgba(251, 191, 36, 0.6)',
      mixBlendMode: 'difference',
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(251, 191, 36, 0.2)',
      border: '2px solid rgba(251, 191, 36, 1)',
      mixBlendMode: 'normal',
    },
    product: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(251, 191, 36, 0.9)',
      border: 'none',
      mixBlendMode: 'normal',
    },
  };

  // Hide custom cursor on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full flex items-center justify-center hidden md:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={cursorVariant}
      variants={variants}
      transition={{ type: 'spring', damping: 30, stiffness: 500 }}
    >
      {cursorText && cursorVariant === 'product' && (
        <span className="text-black font-medium text-sm">{cursorText}</span>
      )}
    </motion.div>
  );
}
