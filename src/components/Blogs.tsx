'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, ExternalLink } from 'lucide-react';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  coverImage: string | null;
  readTime: string;
  tags: string[];
}

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMediumPosts() {
      try {
        const res = await fetch('/api/medium-posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts || []);
        }
      } catch (err) {
        console.error('Failed to load Medium blog posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMediumPosts();
  }, []);

  return (
    <section id="blogs" className="py-24 relative overflow-hidden bg-dark border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-matrix text-sm tracking-widest block mb-3">&lt;blogs/&gt;</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Writing
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Notes on backend systems, real-time data, and things I learn along the way.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white/[0.01] border border-white/[0.06] rounded-2xl h-[380px] animate-pulse flex flex-col justify-between p-6"
              >
                <div className="w-full h-40 bg-white/[0.03] rounded-xl mb-4" />
                <div className="space-y-3">
                  <div className="h-4 bg-white/[0.03] w-20 rounded" />
                  <div className="h-6 bg-white/[0.03] w-full rounded" />
                  <div className="h-10 bg-white/[0.03] w-full rounded" />
                </div>
                <div className="h-4 bg-white/[0.03] w-24 rounded mt-4" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          /* Empty/Fallback State */
          <div className="text-center py-12 bg-white/[0.01] border border-white/[0.06] rounded-2xl p-8 max-w-xl mx-auto">
            <BookOpen size={36} className="text-matrix mx-auto mb-4 animate-pulse" />
            <h3 className="text-white font-bold text-lg mb-2">No articles found</h3>
            <p className="text-gray-400 text-sm">
              Articles are currently unavailable. Check back soon or visit my Medium profile directly.
            </p>
          </div>
        ) : (
          /* Posts Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, idx) => {
              const formattedDate = new Date(post.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="h-full"
                >
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full block"
                  >
                    <div className="bg-white/[0.01] border border-white/[0.06] hover:border-matrix/20 rounded-2xl overflow-hidden flex flex-col h-full hover:bg-white/[0.02] transition-all duration-300 relative group">
                      {/* Decorative glowing top line */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-matrix/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Cover Image or Code-Gradient Placeholder */}
                      <div className="w-full h-44 relative overflow-hidden bg-black/40 border-b border-white/[0.04]">
                        {post.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-matrix/5 via-transparent to-transparent flex items-center justify-center relative font-mono text-[9px] text-matrix/20 p-4 select-none">
                            <div className="absolute inset-0 bg-grid opacity-30" />
                            <span className="text-center font-mono">
                              {`// bhakti.s/blog/draft\nconst pipeline = new IngestionPipeline();\nawait pipeline.start();`}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Container */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Meta information */}
                          <div className="flex items-center gap-4 text-gray-500 text-[10px] font-mono mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-matrix/70" />
                              <span>{formattedDate}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} className="text-matrix/70" />
                              <span>{post.readTime}</span>
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-matrix transition-colors">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Bottom row (tags & link indicator) */}
                        <div>
                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {post.tags.slice(0, 3).map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[9px] font-mono px-2 py-0.5 bg-white/[0.03] border border-white/[0.04] text-gray-400 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* CTA arrow link */}
                          <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-400 group-hover:text-matrix transition-colors pt-3 border-t border-white/[0.03]">
                            <span>Read on Medium</span>
                            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
