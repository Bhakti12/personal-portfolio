'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, FileDown } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080908] border-t border-white/[0.03] py-12 relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* Monospace copyright */}
        <div className="font-mono text-[10px] text-gray-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} BHAKTI SANGHANI. ALL RIGHTS RESERVED.</p>
          <p className="mt-1 text-gray-600">HANDCRAFTED WITH NEXT.JS & TAILWIND</p>
        </div>

        {/* Action icons and back to top */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Bhakti12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-matrix transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/bhakti-s-722215216/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-matrix transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-matrix transition-colors"
              aria-label="Download Resume"
            >
              <FileDown size={18} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.06] text-gray-500 hover:text-matrix hover:border-matrix/30 flex items-center justify-center transition-all outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
