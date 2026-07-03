'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    // Construct prefilled mailto URL
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    const mailtoUrl = `mailto:sanghanibhakti922@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    
    // Open in a new tab/window
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-dark border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-matrix text-sm tracking-widest block mb-3">&lt;contact/&gt;</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Let&apos;s talk.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
            Open to backend/full-stack roles and interesting problems. Reach out directly or find me on LinkedIn/GitHub.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details - 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Direct Information */}
            <div className="space-y-4">
              <a
                href="mailto:sanghanibhakti922@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:border-matrix/20 hover:bg-white/[0.02] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-matrix/10 border border-matrix/20 flex items-center justify-center text-matrix group-hover:bg-matrix group-hover:text-black transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Email</h4>
                  <p className="text-white text-sm font-semibold">sanghanibhakti922@gmail.com</p>
                </div>
              </a>

              {/* <a
                href="tel:+919409153650"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:border-matrix/20 hover:bg-white/[0.02] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-matrix/10 border border-matrix/20 flex items-center justify-center text-matrix group-hover:bg-matrix group-hover:text-black transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Phone</h4>
                  <p className="text-white text-sm font-semibold">+91 9409153650</p>
                </div>
              </a> */}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-3">Links</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/bhakti-s-722215216/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/5 text-gray-300 hover:text-white transition-all text-xs font-semibold"
                >
                  <Linkedin size={16} className="text-[#0a66c2]" />
                  <span>LinkedIn</span>
                </a>
                
                <a
                  href="https://github.com/Bhakti12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/50 hover:bg-white/5 text-gray-300 hover:text-white transition-all text-xs font-semibold"
                >
                  <Github size={16} className="text-gray-400" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form - 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Alice Liddell"
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-matrix rounded-lg px-4 py-3 text-white text-sm outline-none transition-all focus:ring-1 focus:ring-matrix"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="alice@wonderland.com"
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-matrix rounded-lg px-4 py-3 text-white text-sm outline-none transition-all focus:ring-1 focus:ring-matrix"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Hey Bhakti, I'd like to talk to you about a backend system architecture..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-matrix rounded-lg px-4 py-3 text-white text-sm outline-none transition-all focus:ring-1 focus:ring-matrix resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-matrix hover:bg-matrix-dark text-black font-semibold rounded-lg transition-all duration-300 shadow-[0_4px_20px_rgba(0,255,136,0.2)] hover:shadow-[0_4px_30px_rgba(0,255,136,0.4)] outline-none"
              >
                <span>Send Message</span>
                <Send size={14} />
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
