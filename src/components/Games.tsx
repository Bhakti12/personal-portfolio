'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

export default function Games() {
  return (
    <section id="games" className="py-24 relative overflow-hidden bg-dark border-t border-white/[0.03]">
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

        {/* Empty State Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto bg-white/[0.02] border border-white/[0.06] rounded-2xl p-12 relative overflow-hidden group hover:border-matrix/20 transition-all duration-300"
        >
          {/* Accent lighting dots */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-matrix/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-matrix/5 rounded-full blur-2xl" />

          {/* Pulse Ripple and Game Icon */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute inset-0 m-auto w-16 h-16 bg-matrix/10 rounded-full animate-ping opacity-40" />
            <div className="w-16 h-16 rounded-2xl bg-matrix/10 border border-matrix/20 flex items-center justify-center text-matrix shadow-[0_0_15px_rgba(0,255,136,0.1)] relative z-10">
              <Gamepad2 size={32} className="animate-pulse" />
            </div>
          </div>

          {/* Heading and Body */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
            Something fun is loading…
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
            I&apos;m building a few small games/experiments here. Coming soon.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
