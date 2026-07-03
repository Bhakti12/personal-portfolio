'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickDot {
  id: number;
  x: number;
  y: number;
}

export default function ClickEffect() {
  const [mounted, setMounted] = useState(false);
  const [dots, setDots] = useState<ClickDot[]>([]);

  useEffect(() => {
    setMounted(true);

    const handleClick = (e: MouseEvent) => {
      // Don't spawn on clicks on input/textarea to keep it non-distracting
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const newDot = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setDots((prev) => [...prev, newDot]);

      setTimeout(() => {
        setDots((prev) => prev.filter((d) => d.id !== newDot.id));
      }, 1200);
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        
        const newDot = {
          id: Date.now() + Math.random(),
          x: touch.clientX,
          y: touch.clientY,
        };

        setDots((prev) => [...prev, newDot]);

        setTimeout(() => {
          setDots((prev) => prev.filter((d) => d.id !== newDot.id));
        }, 1200);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      <AnimatePresence>
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: dot.x, top: dot.y }}
          >
            {/* Center Core Glowing Dot */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute w-3 h-3 bg-[#00ff88] rounded-full shadow-[0_0_12px_#00ff88]"
            />

            {/* Expanding Concentric Outer HUD Ring */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0.8 }}
              animate={{ scale: 5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute -left-2.5 -top-2.5 w-8 h-8 border border-[#00ff88] bg-[#00ff88]/5 rounded-full shadow-[0_0_20px_rgba(0,255,136,0.3)]"
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
