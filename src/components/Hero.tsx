'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Terminal } from 'lucide-react';
import TrailText from './TrailText';

const STATS = [
  { value: '3+ Yrs', label: 'Backend Experience' },
  { value: '40%', label: 'Faster Queries' },
  { value: 'Telemetry', label: 'Real-time @ Scale' },
];

const INITIAL_LOGS = [
  { text: 'npm run start:prod', type: 'cmd' },
  { text: 'SYSTEM: Initializing cluster bootstrap...', type: 'sys' },
  { text: 'DB: Connecting to MySQL (metadata)... Connected.', type: 'sys' },
  { text: 'DB: Connecting to PostgreSQL (time-series)... Connected.', type: 'sys' },
  { text: 'KAFKA: Joining consumer group: "telemetry-ingestion"...', type: 'sys' },
  { text: 'KAFKA: Consumer group ready. Status: ACTIVE', type: 'success' },
  { text: 'SERVER: Express API listening on port 8080 (HTTP/WebSockets)', type: 'sys' },
];

const RECURRING_LOGS = [
  { text: 'SERVER: GET /api/v1/fleet/active - 200 OK - 8ms', type: 'http' },
  { text: 'TELEMETRY: Packet received from device_id=FL-7402, speed=68km/h', type: 'data' },
  { text: 'DB: Ingested telemetry point in partitioned PostgreSQL', type: 'sys' },
  { text: 'SERVER: POST /api/v1/healthcare/fhir/Observation - 201 Created - 38ms', type: 'http' },
  { text: 'KAFKA: Dispatched "observation_created" message to topic "fhir-logs"', type: 'data' },
  { text: 'SERVER: GET /api/v1/crew/sync - 200 OK - 110ms', type: 'http' },
  { text: 'DB: Flushed cache, updated 14 crew duty states in MySQL', type: 'sys' },
];

export default function Hero() {
  const [logs, setLogs] = useState<Array<{ text: string; type: string }>>([]);

  useEffect(() => {
    // Keep track of timeouts and intervals to clear them
    const timeouts: NodeJS.Timeout[] = [];
    let intervalId: NodeJS.Timeout;

    // Add initial logs with a slight delay
    INITIAL_LOGS.forEach((log, index) => {
      const t = setTimeout(() => {
        setLogs((prev) => [...prev, log].slice(-12)); // keep max 12 logs
      }, index * 400);
      timeouts.push(t);
    });

    // Start recurring logs after initial logs finish loading
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        const randomLog = RECURRING_LOGS[Math.floor(Math.random() * RECURRING_LOGS.length)];
        const updatedLog = {
          ...randomLog,
          text: randomLog.text.replace(/FL-\d+/, `FL-${Math.floor(1000 + Math.random() * 9000)}`),
        };
        setLogs((prev) => [...prev, updatedLog].slice(-12));
      }, 1500);
    }, INITIAL_LOGS.length * 400);
    timeouts.push(startTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-grid"
    >
      <TrailText>
        {/* Background radial soft green glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none glow-radial opacity-60 z-0" />

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Left Column - Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_#00ff88]" />
            <span className="font-mono text-xs tracking-wider text-matrix uppercase">
              &lt;backend engineer/&gt;
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            From raw data to real-time decisions — I build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix to-matrix-light drop-shadow-[0_0_15px_rgba(0,255,136,0.15)]">
              backend systems
            </span>{' '}
            that don&apos;t fall over.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-2xl"
          >
            3 years building scalable, data-intensive backend systems across healthcare, e-commerce,
            and IoT fleet tracking. I turn messy operational problems into reliable APIs and pipelines.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              onClick={() => handleScrollToSection('projects')}
              className="flex items-center gap-2 px-6 py-3 bg-matrix hover:bg-matrix-dark text-black font-semibold rounded-lg transition-all duration-300 shadow-[0_4px_20px_rgba(0,255,136,0.3)] hover:shadow-[0_4px_30px_rgba(0,255,136,0.5)] transform hover:-translate-y-0.5 outline-none"
            >
              <span>View work</span>
              <ArrowDown size={16} />
            </button>
            <button
              onClick={() => handleScrollToSection('contact')}
              className="flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-matrix bg-white/[0.02] hover:bg-matrix/5 text-gray-200 hover:text-matrix font-semibold rounded-lg transition-all duration-300 outline-none"
            >
              <span>Get in touch</span>
              <span className="font-mono text-xs">↗</span>
            </button>
          </motion.div>

          {/* Stat Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 border-t border-dark-border/40 pt-8"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-mono text-lg sm:text-2xl font-bold text-matrix">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wide uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Terminal Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 h-[360px] sm:h-[400px] border border-white/[0.08] bg-dark-elevated rounded-2xl p-4 flex flex-col font-mono text-xs shadow-2xl relative"
        >
          {/* Glass glare effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.03] rounded-2xl pointer-events-none" />

          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.05] relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-3 w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 select-none text-[10px]">
              <Terminal size={12} className="text-matrix" />
              <span>server.js</span>
            </div>
            <div className="w-12" /> {/* spacing element */}
          </div>

          {/* Terminal Screen */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-1.5 scrollbar-thin select-none relative z-10">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-1">
                {log.type === 'cmd' && (
                  <>
                    <span className="text-matrix font-bold select-none">&gt;</span>
                    <span className="text-gray-100">{log.text}</span>
                  </>
                )}
                {log.type === 'sys' && (
                  <span className="text-gray-400">{log.text}</span>
                )}
                {log.type === 'success' && (
                  <span className="text-matrix-light">{log.text}</span>
                )}
                {log.type === 'http' && (
                  <span className="text-blue-400">{log.text}</span>
                )}
                {log.type === 'data' && (
                  <span className="text-yellow-500/90">{log.text}</span>
                )}
              </div>
            ))}
            {/* Blinking prompt line */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-matrix font-bold animate-pulse">&gt;</span>
              <span className="w-2 h-4 bg-matrix animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
      </TrailText>
    </section>
  );
}
