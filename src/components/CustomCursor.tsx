'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Real mouse positions for 1:1 responsive arrow tracking
  const [rawX, setRawX] = useState(0);
  const [rawY, setRawY] = useState(0);

  // Spring physics for the trailing HUD ring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setRawX(e.clientX);
      setRawY(e.clientY);

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Mouse click handlers
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Global hover detection for clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('input') ||
        target.closest('textarea');

      if (isClickable) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!relatedTarget || (!relatedTarget.closest('a') && !relatedTarget.closest('button') && !relatedTarget.closest('[role="button"]') && !relatedTarget.closest('input') && !relatedTarget.closest('textarea') && !relatedTarget.classList.contains('cursor-pointer'))) {
        setIsHovered(false);
      }
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isDesktop) return null;

  return (
    <>
      {/* Outer Trailing Glow HUD Circle */}
      <motion.div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 select-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.75 : isClicking ? 0.7 : 1,
            borderColor: isHovered ? '#00ff88' : 'rgba(0, 255, 136, 0.25)',
            borderWidth: isHovered ? '2px' : '1px',
            boxShadow: isHovered 
              ? '0 0 14px rgba(0, 255, 136, 0.4), inset 0 0 4px rgba(0, 255, 136, 0.15)' 
              : '0 0 0px rgba(0,0,0,0)',
            rotate: 360,
          }}
          transition={{
            scale: { type: 'spring', stiffness: 350, damping: 20 },
            borderColor: { duration: 0.2 },
            rotate: { repeat: Infinity, duration: 15, ease: 'linear' },
          }}
          className="w-7 h-7 rounded-full border border-dashed flex items-center justify-center"
        />
      </motion.div>

      {/* Aerodynamic Arrow Pointer (1:1 direct coordinate mapping) */}
      <motion.div
        className="fixed pointer-events-none z-[9999] select-none"
        style={{
          left: rawX,
          top: rawY,
        }}
        animate={{
          scale: isHovered ? 1.25 : isClicking ? 0.85 : 1,
          rotate: isHovered ? -15 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_5px_rgba(0,255,136,0.5)]"
        >
          <path
            d="M2 2 L22 10 Q12 12, 6 22 Z"
            fill="#00ff88"
            stroke="#020402"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </>
  );
}
