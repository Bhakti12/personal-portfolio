'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, ShieldAlert, Cpu, Code2, GraduationCap, LayoutGrid, Activity, MapPin, GitBranch } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Programming Languages',
    icon: <Code2 className="text-matrix" size={20} />,
    skills: ['Python', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Backend Development',
    icon: <Cpu className="text-matrix" size={20} />,
    skills: ['Node.js', 'Express.js', 'Django', 'REST APIs', 'WebSockets'],
  },
  {
    title: 'Databases',
    icon: <Database className="text-matrix" size={20} />,
    skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Cloud',
    icon: <LayoutGrid className="text-matrix" size={20} />,
    skills: ['AWS Lambda'],
  },
  {
    title: 'Healthcare Tech',
    icon: <Activity className="text-matrix" size={20} />,
    skills: ['FHIR', 'Aidbox'],
  },
  {
    title: 'Maps & Geospatial',
    icon: <MapPin className="text-matrix" size={20} />,
    skills: ['MapmyIndia APIs'],
  },
  {
    title: 'Security',
    icon: <ShieldAlert className="text-matrix" size={20} />,
    skills: ['JWT Authentication', 'Role-Based Access Control (RBAC)', 'Rate Limiting', 'CSRF Protection', 'Input Validation'],
  },
  {
    title: 'Tools & Version Control',
    icon: <GitBranch className="text-matrix" size={20} />,
    skills: ['Git', 'GitHub'],
  },
];

const EDUCATION = [
  {
    degree: 'B.Tech, Computer Engineering',
    institution: 'Dharmsinh Desai University',
    period: '2020 – 2023',
    score: 'CPI 7.00/10',
  },
  {
    degree: 'Diploma, Computer Engineering',
    institution: 'Gujarat Technological University',
    period: '2017 – 2020',
    score: 'CGPA 9.80/10',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-dark border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-matrix text-sm tracking-widest block mb-3">&lt;about/&gt;</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Building systems that work quietly behind the scenes.
          </h2>
        </motion.div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 text-gray-400 text-base sm:text-lg leading-relaxed space-y-6"
          >
            <p>
              Hi, I&apos;m Bhakti Sanghani, a Backend Software Engineer with 3 years of experience building scalable, data-intensive systems across healthcare, e-commerce, and IoT-based fleet management domains. I specialize in designing robust backend architectures using Node.js, Django, and REST APIs, with strong expertise in working with MySQL, PostgreSQL, and MongoDB.
            </p>
            <p>
              Over the years, I&apos;ve worked on diverse projects — from building a FHIR-compliant healthcare platform that digitized medical workflows for senior care systems, to engineering high-frequency telemetry pipelines for real-time vehicle tracking and fleet monitoring. I enjoy solving complex problems, optimizing system performance, and collaborating with cross-functional teams to deliver reliable, production-ready solutions.
            </p>
            <p>
              I&apos;m passionate about writing clean, efficient code and continuously learning new technologies to build systems that make a real impact.
            </p>
          </motion.div>

          {/* Education list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2 mb-2">
              <GraduationCap size={16} className="text-matrix" />
              <span>Education</span>
            </h3>
            
            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 relative overflow-hidden group hover:border-matrix/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-semibold text-sm sm:text-base group-hover:text-matrix transition-colors">
                      {edu.degree}
                    </h4>
                    <span className="font-mono text-[10px] bg-white/[0.05] px-2 py-0.5 rounded text-gray-400">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{edu.institution}</p>
                  <span className="font-mono text-xs text-matrix/90">{edu.score}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2 mb-8"
          >
            <span>&lt;skills/&gt;</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white/[0.02] border border-white/[0.06] hover:border-matrix/30 rounded-2xl p-6 transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Accent top-glow line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-matrix/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {cat.icon}
                    <h4 className="font-mono text-sm font-semibold text-white tracking-wide uppercase">
                      {cat.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-2.5 py-1 bg-white/[0.04] text-gray-300 rounded border border-white/[0.05] font-mono group-hover:border-matrix/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
