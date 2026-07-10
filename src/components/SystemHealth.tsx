'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, ChevronDown, ChevronUp, Cpu, Server, Database } from 'lucide-react';

export default function SystemHealth() {
  const [isOpen, setIsOpen] = useState(false);
  const [dbLatency, setDbLatency] = useState(8);
  const [kafkaRate, setKafkaRate] = useState(2450);
  const [cpuUsage, setCpuUsage] = useState(14);
  const [connections, setConnections] = useState(118);
  const [uptime, setUptime] = useState(0);

  // Sparkline arrays for canvas rendering
  const dbLatencyHistory = useRef<number[]>(Array(20).fill(8));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Increment uptime
  useEffect(() => {
    // Start uptime at a random offset to simulate server running
    setUptime(Math.floor(14000 + Math.random() * 20000));
    
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update telemetry metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate fluctuating database latency (6ms - 18ms)
      const nextDb = Math.max(6, Math.min(18, Math.round(dbLatencyHistory.current[dbLatencyHistory.current.length - 1] + (Math.random() * 4 - 2))));
      setDbLatency(nextDb);
      
      // Update history array
      dbLatencyHistory.current.push(nextDb);
      if (dbLatencyHistory.current.length > 20) {
        dbLatencyHistory.current.shift();
      }

      // Simulate fluctuating Kafka messages rate (2200 - 2700)
      setKafkaRate(Math.round(2450 + (Math.random() * 200 - 100)));

      // Simulate CPU usage (10% - 25% with occasional small spikes)
      setCpuUsage(Math.max(8, Math.min(35, Math.round(14 + (Math.random() * 6 - 3)))));

      // Connections fluctuation
      setConnections(Math.max(90, Math.min(150, Math.round(118 + (Math.random() * 4 - 2)))));

      // Redraw Sparkline if open
      if (isOpen && canvasRef.current) {
        drawSparkline();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Redraw canvas whenever isOpen becomes true or latency updates
  useEffect(() => {
    if (isOpen) {
      drawSparkline();
    }
  }, [isOpen, dbLatency]);

  const drawSparkline = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 100 * dpr;
    canvas.height = 30 * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, 100, 30);
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const history = dbLatencyHistory.current;
    const minVal = 5;
    const maxVal = 20;
    const range = maxVal - minVal;

    ctx.beginPath();
    history.forEach((val, idx) => {
      const x = (idx / (history.length - 1)) * 96 + 2; // leave 2px padding
      const y = 28 - ((val - minVal) / range) * 24; // scale y within height 30
      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Fill area under line
    ctx.lineTo((history.length - 1) / (history.length - 1) * 96 + 2, 30);
    ctx.lineTo(2, 30);
    ctx.fillStyle = 'rgba(0, 255, 136, 0.08)';
    ctx.closePath();
    ctx.fill();
  };

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9997] font-mono select-none">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Collapsed Pill Button */
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 border border-white/[0.08] hover:border-matrix/40 bg-dark-elevated hover:bg-[#0f110f] rounded-full text-[10px] text-gray-400 hover:text-white transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)] outline-none group cursor-pointer"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-matrix opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-matrix"></span>
            </span>
            <span className="tracking-wide">SYSTEM: ONLINE</span>
            <span className="text-gray-600 font-bold">|</span>
            <span className="text-matrix font-bold group-hover:scale-105 transition-transform">{dbLatency}ms</span>
            <ChevronUp size={12} className="text-gray-500 group-hover:text-matrix transition-colors" />
          </motion.button>
        ) : (
          /* Expanded telemetry box */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="w-72 bg-dark-elevated border border-white/[0.08] hover:border-matrix/20 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Glow overlay */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-matrix/20 to-transparent" />
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
              <div className="flex items-center gap-2 text-white">
                <Activity size={14} className="text-matrix animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">stack_telemetry.log</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/[0.04] text-gray-500 hover:text-matrix transition-all outline-none"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Metrics List */}
            <div className="flex flex-col gap-3 text-[11px] text-gray-400">
              
              {/* Database Latency */}
              <div className="flex justify-between items-center bg-white/[0.01] border border-white/[0.03] p-2.5 rounded-xl">
                <div className="flex items-center gap-2">
                  <Database size={12} className="text-matrix" />
                  <div>
                    <div className="text-gray-500 text-[9px] uppercase tracking-wider">db query latency</div>
                    <div className="text-white font-bold text-xs">{dbLatency} ms</div>
                  </div>
                </div>
                {/* Sparkline canvas container */}
                <canvas
                  ref={canvasRef}
                  style={{ width: '100px', height: '30px' }}
                  className="bg-black/20 rounded border border-white/[0.02]"
                />
              </div>

              {/* Kafka Ingestion rate */}
              <div className="flex justify-between items-center bg-white/[0.01] border border-white/[0.03] p-2.5 rounded-xl">
                <div className="flex items-center gap-2">
                  <Server size={12} className="text-blue-400" />
                  <div>
                    <div className="text-gray-500 text-[9px] uppercase tracking-wider">kafka ingestion</div>
                    <div className="text-white font-bold text-xs">
                      {kafkaRate.toLocaleString()} <span className="text-[9px] text-gray-500 font-normal">msgs/s</span>
                    </div>
                  </div>
                </div>
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping opacity-60 mr-2" />
              </div>

              {/* CPU utilization */}
              <div className="flex justify-between items-center bg-white/[0.01] border border-white/[0.03] p-2.5 rounded-xl">
                <div className="flex items-center gap-2">
                  <Cpu size={12} className="text-yellow-500" />
                  <div>
                    <div className="text-gray-500 text-[9px] uppercase tracking-wider">cpu utilization</div>
                    <div className="text-white font-bold text-xs">{cpuUsage}%</div>
                  </div>
                </div>
                {/* Horizontal Load bar indicator */}
                <div className="w-24 bg-white/[0.04] h-2 rounded border border-white/[0.06] overflow-hidden">
                  <motion.div
                    animate={{ width: `${cpuUsage}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-r ${
                      cpuUsage > 30 ? 'bg-red-500' : cpuUsage > 20 ? 'bg-yellow-500' : 'bg-matrix'
                    }`}
                  />
                </div>
              </div>

              {/* Grid Uptime and Connections */}
              <div className="grid grid-cols-2 gap-3 text-[10px]">
                <div className="bg-white/[0.01] border border-white/[0.03] p-2 rounded-xl text-center">
                  <span className="text-gray-500 text-[8px] uppercase block tracking-wider mb-0.5">uptime</span>
                  <span className="text-white font-bold">{formatUptime(uptime)}</span>
                </div>
                <div className="bg-white/[0.01] border border-white/[0.03] p-2 rounded-xl text-center">
                  <span className="text-gray-500 text-[8px] uppercase block tracking-wider mb-0.5">active conns</span>
                  <span className="text-matrix font-bold">{connections}</span>
                </div>
              </div>

            </div>

            {/* VAPT Shield indicator */}
            <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-white/[0.03] text-[9px] font-semibold text-matrix-light">
              <ShieldCheck size={12} />
              <span>SECURITY CERTIFIED / VAPT VERIFIED</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
