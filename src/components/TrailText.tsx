'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailWord {
  id: number;
  x: number;
  y: number;
  text: string;
  jitterX: number;
  jitterY: number;
}

const WORD_LIST = [
  'backend', 'scalable', 'REST API', 'PostgreSQL', 'real-time', 
  'pipeline', 'Node.js', 'distributed', 'low-latency', 'throughput', 
  'microservices', '<>', 'async', 'queue', 'cache'
];

interface TrailTextProps {
  children: React.ReactNode;
}

export default function TrailText({ children }: TrailTextProps) {
  const [words, setWords] = useState<TrailWord[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    // Check for user reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const spawnWord = (clientX: number, clientY: number) => {
    if (reducedMotion) return;
    if (!containerRef.current) return;

    const now = Date.now();
    // Throttle spawn rate to at most one word per 100ms
    if (now - lastSpawnTime.current < 100) return;
    
    // Cap simultaneous words to 20 to preserve memory/performance
    if (words.length >= 20) return;

    lastSpawnTime.current = now;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const text = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    
    // Add jitter (±10px) to prevent layout overlapping
    const jitterX = Math.random() * 20 - 10;
    const jitterY = Math.random() * 20 - 10;

    const newWord = {
      id: now + Math.random(),
      x,
      y,
      text,
      jitterX,
      jitterY,
    };

    setWords((prev) => [...prev, newWord]);

    // Clean up word after animation completes (800ms duration)
    setTimeout(() => {
      setWords((prev) => prev.filter((w) => w.id !== newWord.id));
    }, 850);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    spawnWord(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      spawnWord(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      spawnWord(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      className="relative overflow-hidden w-full h-full"
    >
      {/* Absolute text trail overlay layer */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
        <AnimatePresence>
          {words.map((word) => (
            <motion.span
              key={word.id}
              initial={{ opacity: 0.9, y: 0, scale: 0.9 }}
              animate={{ opacity: 0, y: -15, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute font-mono text-xs font-bold text-[#00ff88] pointer-events-none select-none drop-shadow-[0_0_5px_rgba(0,255,136,0.4)] whitespace-nowrap"
              style={{
                left: word.x + word.jitterX,
                top: word.y + word.jitterY,
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Hero Children Content */}
      {children}
    </div>
  );
}
