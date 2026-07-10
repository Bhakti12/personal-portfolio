'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Settings } from 'lucide-react';

export default function Games() {
  return (
    <section id="games" className="py-24 relative overflow-hidden bg-dark border-t border-white/[0.03]">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-matrix text-sm tracking-widest block mb-3">&lt;games/&gt;</span>
        </motion.div>

        {/* Simplified Under Construction Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto bg-white/[0.01] border border-white/[0.06] rounded-2xl p-12 relative overflow-hidden group hover:border-matrix/20 transition-all duration-300"
        >
          {/* Accent lighting glows */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-matrix/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-matrix/5 rounded-full blur-2xl" />

          {/* Icon with Ring Ripple */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute inset-0 m-auto w-16 h-16 bg-matrix/10 rounded-full animate-ping opacity-45" />
            <div className="w-16 h-16 rounded-2xl bg-matrix/10 border border-matrix/20 flex items-center justify-center text-matrix shadow-[0_0_15px_rgba(0,255,136,0.1)] relative z-10">
              <Gamepad2 size={32} className="animate-pulse" />
            </div>
          </div>

          {/* Heading */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
            Games Loading…
          </h3>
          
          {/* Body description */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-6">
            I&apos;m building some brain-tickling puzzles and interactive games.
          </p>

          {/* Status Indicators */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-matrix/5 border border-matrix/20 rounded-full text-[10px] font-mono text-matrix tracking-wide uppercase">
            <Settings size={12} className="animate-spin" />
            <span>Under Construction — Soft Launching Very Soon</span>
          </div>

          {/* Mini Terminal Loader bar */}
          <div className="mt-8 max-w-xs mx-auto bg-black/40 border border-white/[0.04] p-3 rounded-lg font-mono text-[9px] text-gray-500 text-left select-none">
            <div className="flex justify-between mb-1">
              <span>initialize_playground.sh</span>
              <span className="text-matrix">78%</span>
            </div>
            <div className="w-full bg-white/[0.03] h-1.5 rounded overflow-hidden">
              <div className="bg-matrix h-full w-[78%] animate-pulse" />
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
