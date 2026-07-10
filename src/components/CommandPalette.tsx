'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CornerDownLeft, X } from 'lucide-react';
import MatrixRain from './MatrixRain';

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

const COMMAND_LIST = [
  { cmd: 'help', desc: 'Display all available CLI commands.' },
  { cmd: 'skills', desc: 'List specialized backend technical stacks.' },
  { cmd: 'projects', desc: 'List main architecture case study titles.' },
  { cmd: 'goto', desc: 'Scroll to a section (usage: goto [section]).' },
  { cmd: 'contact', desc: 'Display email, social links, and phone details.' },
  { cmd: 'matrix', desc: 'Execute matrix code stream digital rain easter egg.' },
  { cmd: 'clear', desc: 'Clear command history buffer.' },
  { cmd: 'exit', desc: 'Exit CLI terminal emulator.' }
];

const SECTIONS = ['home', 'about', 'projects', 'console', 'games', 'blogs', 'contact'];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    { command: 'system_bootstrap', output: 'Bhakti CLI Console v1.0.4 initialized. Type "help" to start.' }
  ]);
  const [matrixActive, setMatrixActive] = useState(false);
  const [suggestionIdx, setSuggestionIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Filter command suggestions
  const getSuggestions = () => {
    if (!inputVal) return [];
    const lowerInput = inputVal.toLowerCase();
    
    // Check for "goto " subcommands
    if (lowerInput.startsWith('goto ')) {
      const arg = lowerInput.substring(5);
      return SECTIONS
        .filter(sec => sec.startsWith(arg))
        .map(sec => `goto ${sec}`);
    }

    return COMMAND_LIST
      .map(c => c.cmd)
      .filter(cmd => cmd.startsWith(lowerInput));
  };

  const suggestions = getSuggestions();

  // Handle global keyboard shortcuts (Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle with Ctrl + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Toggle with / when not typing in form inputs
      if (e.key === '/' && !isOpen) {
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.getAttribute('contenteditable') === 'true')) {
          return;
        }
        e.preventDefault();
        setIsOpen(true);
      }

      // Close on Esc
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setInputVal('');
      setSuggestionIdx(-1);
    }
  }, [isOpen]);

  // Auto-scroll terminal history to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const tokens = trimmed.split(' ');
    const primaryCmd = tokens[0].toLowerCase();
    const arg = tokens[1]?.toLowerCase();

    let output: string | React.ReactNode = '';

    switch (primaryCmd) {
      case 'help':
      case '?':
        output = (
          <div className="space-y-1 mt-1 text-gray-400">
            <p className="text-matrix font-bold">AVAILABLE COMMANDS:</p>
            {COMMAND_LIST.map(c => (
              <div key={c.cmd} className="grid grid-cols-4 gap-2">
                <span className="text-white font-bold">{c.cmd}</span>
                <span className="col-span-3 text-xs">{c.desc}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-gray-400 mt-1">
            <p className="text-matrix font-bold">TECH STACK SUMMARY:</p>
            <p><span className="text-white font-bold">LANGUAGES:</span> Python, JavaScript, TypeScript, SQL, PHP</p>
            <p><span className="text-white font-bold">BACKEND:</span> Node.js, Express.js, Django, REST APIs, WebSockets, Laravel</p>
            <p><span className="text-white font-bold">DATABASES:</span> PostgreSQL, MySQL, MongoDB, TimescaleDB</p>
            <p><span className="text-white font-bold">SPECIALIZED:</span> FHIR/Aidbox, Kafka pipelines, MapmyIndia APIs</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1 text-gray-400 mt-1">
            <p className="text-matrix font-bold">CASE STUDIES IN PRODUCTION:</p>
            <p>• <span className="text-white font-bold">fleet</span>: Real-time telemetry ingestion pipeline</p>
            <p>• <span className="text-white font-bold">healthcare</span>: Interoperable FHIR clinical forms</p>
            <p>• <span className="text-white font-bold">physio</span>: Laravel RBAC therapist scheduling</p>
            <p>• <span className="text-white font-bold">aviation</span>: Sabre API real-time crew synchronization</p>
            <p className="text-[10px] text-gray-500 mt-1">Type &quot;goto [project_name]&quot; to scroll straight to it.</p>
          </div>
        );
        break;

      case 'goto':
        if (!arg) {
          output = `Error: destination required. Available targets: ${SECTIONS.join(', ')}`;
        } else if (SECTIONS.includes(arg)) {
          let sectionId = arg;
          // map names if necessary
          if (arg === 'games') sectionId = 'games'; // Games component maintains id='games'

          const target = document.getElementById(sectionId);
          if (target) {
            output = `Scrolling to <${sectionId}/> section...`;
            setTimeout(() => {
              target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            setIsOpen(false);
          } else {
            output = `Error: target section "#${sectionId}" not found in document DOM.`;
          }
        } else {
          output = `Error: invalid target "${arg}". Choose from: ${SECTIONS.join(', ')}`;
        }
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-gray-400 mt-1">
            <p className="text-matrix font-bold">CONTACT PIPELINE HEADERS:</p>
            <p><span className="text-white font-bold">EMAIL:</span> sanghanibhakti922@gmail.com</p>
            <p><span className="text-white font-bold">LINKEDIN:</span> linkedin.com/in/bhakti-s-722215216/</p>
            <p><span className="text-white font-bold">GITHUB:</span> github.com/Bhakti12</p>
          </div>
        );
        break;

      case 'matrix':
        output = 'Executing matrix binary code streaming sequence...';
        setMatrixActive(true);
        setIsOpen(false);
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        setSuggestionIdx(-1);
        return;

      case 'exit':
      case 'close':
        setIsOpen(false);
        return;

      default:
        output = `Command not recognized: "${primaryCmd}". Type "help" to display all registered routes.`;
    }

    setHistory(prev => [...prev, { command: trimmed, output }]);
    setInputVal('');
    setSuggestionIdx(-1);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Execute on Enter
    if (e.key === 'Enter') {
      if (suggestionIdx >= 0 && suggestionIdx < suggestions.length) {
        executeCommand(suggestions[suggestionIdx]);
      } else {
        executeCommand(inputVal);
      }
      return;
    }

    // Handle suggestion navigation
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSuggestionIdx(prev => Math.min(suggestions.length - 1, prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSuggestionIdx(prev => Math.max(-1, prev - 1));
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete with selected suggestion or first suggestion
      if (suggestions.length > 0) {
        const fill = suggestionIdx >= 0 ? suggestions[suggestionIdx] : suggestions[0];
        setInputVal(fill);
        setSuggestionIdx(-1);
      }
    }
  };

  return (
    <>
      {/* Matrix digital rain easter egg */}
      {matrixActive && (
        <MatrixRain onClose={() => setMatrixActive(false)} />
      )}

      {/* Terminal Palette Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
            
            {/* Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Terminal Window Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl bg-dark-elevated border border-white/[0.08] hover:border-matrix/20 rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col h-[380px] relative font-mono text-xs z-10"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4 select-none">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-matrix" />
                  <span className="text-white font-bold text-[10px] tracking-wider uppercase">bhakti_terminal.sh</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] text-gray-500">[Press Esc to Close]</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-white p-0.5 rounded transition-colors outline-none cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* History scroll list */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3 mb-4 scrollbar-thin select-text">
                {history.map((h, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-start gap-1.5 text-gray-500">
                      <span className="text-matrix font-bold">&gt;</span>
                      <span className="text-white">{h.command}</span>
                    </div>
                    <div className="pl-3.5 text-gray-400 leading-relaxed font-sans text-[11px] whitespace-pre-line">
                      {h.output}
                    </div>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Suggestions Panel */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-16 left-5 right-5 bg-[#0a0c0a] border border-white/[0.05] p-2.5 rounded-xl flex flex-wrap gap-2 z-20 select-none shadow-2xl"
                  >
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInputVal(suggestion);
                          inputRef.current?.focus();
                        }}
                        className={`text-[10px] px-2 py-1 rounded font-bold uppercase transition-all outline-none cursor-pointer border ${
                          suggestionIdx === idx
                            ? 'bg-matrix/10 border-matrix text-matrix'
                            : 'bg-white/[0.01] border-white/[0.05] text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Command Line */}
              <div className="flex items-center gap-2 border-t border-white/[0.04] pt-4 relative">
                <span className="text-matrix font-bold select-none">bhakti@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setSuggestionIdx(-1);
                  }}
                  onKeyDown={handleInputKeyDown}
                  className="flex-1 bg-transparent text-white outline-none border-none caret-matrix tracking-wide font-mono text-xs select-all"
                  placeholder="Type help or goto..."
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="flex items-center gap-1 text-[9px] text-gray-500 font-mono select-none">
                  <CornerDownLeft size={10} className="text-gray-500" />
                  <span>Enter</span>
                </span>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
