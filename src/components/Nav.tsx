'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'API Console', href: '#console', id: 'console' },
  { label: 'Games', href: '#games', id: 'games' },
  { label: 'Blogs', href: '#blogs', id: 'blogs' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll height detection for background opacity change
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // IntersectionObserver to highlight current active section
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section is in the middle of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-md border-b border-dark-border/50 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Nav Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-mono text-matrix font-bold text-lg select-none flex items-center gap-1 group"
        >
          <span className="text-gray-400 group-hover:text-matrix transition-colors">&lt;</span>
          <span>Bhakti Sanghani</span>
          <span className="text-gray-400 group-hover:text-matrix transition-colors">/&gt;</span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-mono text-xs tracking-wider transition-colors duration-200 py-2 relative block ${
                    activeSection === item.id ? 'text-matrix' : 'text-gray-400 hover:text-gray-100'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-matrix shadow-[0_0_8px_#00ff88]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Resume Download */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 border border-matrix/50 hover:border-matrix bg-matrix/5 hover:bg-matrix/10 text-matrix font-mono text-xs rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(0,255,136,0.05)] hover:shadow-[0_0_15px_rgba(0,255,136,0.15)] outline-none focus:ring-2 focus:ring-matrix focus:ring-offset-2 focus:ring-offset-dark"
          >
            <FileDown size={14} />
            <span>Resume</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 border border-matrix/45 bg-matrix/5 text-matrix font-mono text-xs rounded-full"
          >
            <FileDown size={12} />
            <span>CV</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-gray-400 hover:text-gray-100 p-1 outline-none focus:text-matrix"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-dark/95 border-b border-dark-border/80 backdrop-blur-lg overflow-hidden absolute top-full left-0 w-full"
          >
            <nav className="flex flex-col px-6 py-8 gap-6">
              <ul className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`font-mono text-sm block py-1 tracking-wider ${
                        activeSection === item.id ? 'text-matrix border-l-2 border-matrix pl-3' : 'text-gray-400'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
