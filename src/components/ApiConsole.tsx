'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Copy, Check, Terminal, Code2, RefreshCw } from 'lucide-react';

const ENDPOINTS = [
  {
    path: '/api/v1/projects',
    method: 'GET',
    description: 'Fetch detailed case studies in systems architecture & data integration.',
    defaultResponse: {
      status: 'success',
      results: 4,
      data: [
        {
          id: 'fleet-telematics',
          title: 'Real-time Fleet Visibility & Telematics',
          category: 'IoT & Data Ingestion',
          outcome: 'Reduced historical query latency by 40%...',
          tags: ['Node.js', 'Python', 'MySQL', 'PostgreSQL', 'MapmyIndia']
        }
      ]
    }
  },
  {
    path: '/api/v1/skills',
    method: 'GET',
    description: 'Get backend technologies, database architectures, and security stacks.',
    defaultResponse: {
      status: 'success',
      data: {
        languages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'PHP'],
        backend: ['Node.js', 'Express.js', 'Django', 'REST APIs', 'WebSockets', 'Laravel'],
        databases: ['PostgreSQL', 'MySQL', 'MongoDB']
      }
    }
  },
  {
    path: '/api/v1/health',
    method: 'GET',
    description: 'Check active telemetry pipeline stats, CPU load, and DB query latencies.',
    defaultResponse: {
      status: 'UP',
      uptime_seconds: 14209,
      services: {
        primary_database: { status: 'healthy', latency_ms: 12 },
        message_broker: { status: 'healthy', type: 'Apache Kafka' }
      }
    }
  },
  {
    path: '/api/v1/contact',
    method: 'POST',
    description: 'Send a message directly to Bhakti.',
    defaultResponse: {
      status: 'success',
      message: 'Email dispatched successfully via transporter.'
    }
  }
];

export default function ApiConsole() {
  const [activeEndpointIdx, setActiveEndpointIdx] = useState(0);
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState<'response' | 'headers' | 'snippets'>('response');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>('');
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [snippetLanguage, setSnippetLanguage] = useState<'curl' | 'javascript' | 'python'>('curl');

  // POST inputs
  const [postData, setPostData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const activeEndpoint = ENDPOINTS[activeEndpointIdx];

  // Keep method in sync with selected endpoint
  useEffect(() => {
    setMethod(activeEndpoint.method as 'GET' | 'POST');
    setResponseBody('');
    setResponseStatus(null);
    setResponseTime(null);
  }, [activeEndpointIdx, activeEndpoint]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
  };

  const executeRequest = async () => {
    setIsSending(true);
    const startTime = performance.now();
    
    try {
      let res;
      if (method === 'GET') {
        res = await fetch(activeEndpoint.path);
      } else {
        // For contact, validate
        if (!postData.name || !postData.email || !postData.message) {
          throw new Error('Validation failed: name, email, and message are required in request body.');
        }
        res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        });
      }

      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      setResponseTime(duration);
      setResponseStatus(res.status);

      const data = await res.json();
      setResponseBody(JSON.stringify(data, null, 2));

      // Build simulated response headers
      setResponseHeaders({
        'HTTP/1.1': `${res.status} ${res.statusText || (res.status === 200 ? 'OK' : 'Created')}`,
        'Content-Type': 'application/json; charset=utf-8',
        'Date': new Date().toUTCString(),
        'X-Powered-By': 'Next.js',
        'Cache-Control': method === 'GET' && activeEndpoint.path !== '/api/v1/health' ? 'public, max-age=3600' : 'no-store, max-age=0',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      
      if (res.status === 200 && method === 'POST') {
        setPostData({ name: '', email: '', message: '' }); // reset on success
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown Error';
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setResponseStatus(errorMessage.includes('Validation') ? 400 : 500);
      setResponseBody(JSON.stringify({ error: errorMessage }, null, 2));
      setResponseHeaders({
        'HTTP/1.1': errorMessage.includes('Validation') ? '400 Bad Request' : '500 Internal Server Error',
        'Content-Type': 'application/json',
        'Date': new Date().toUTCString()
      });
    } finally {
      setIsSending(false);
    }
  };

  const getCodeSnippet = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://bhakti.dev';
    const fullUrl = `${origin}${activeEndpoint.path}`;

    if (snippetLanguage === 'curl') {
      if (method === 'GET') {
        return `curl -X GET "${fullUrl}" \\\n  -H "Accept: application/json"`;
      } else {
        return `curl -X POST "${origin}/api/contact" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "${postData.name || 'Alice'}",\n    "email": "${postData.email || 'alice@example.com'}",\n    "message": "${postData.message || 'Hello from curl!'}"\n  }'`;
      }
    }

    if (snippetLanguage === 'javascript') {
      if (method === 'GET') {
        return `fetch("${fullUrl}")\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`;
      } else {
        return `fetch("${origin}/api/contact", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({\n    name: "${postData.name || 'Alice'}",\n    email: "${postData.email || 'alice@example.com'}",\n    message: "${postData.message || 'Hello from fetch!'}"\n  })\n})\n.then(res => res.json())\n.then(data => console.log(data));`;
      }
    }

    if (snippetLanguage === 'python') {
      if (method === 'GET') {
        return `import requests\n\nresponse = requests.get("${fullUrl}")\ndata = response.json()\nprint(data)`;
      } else {
        return `import requests\n\npayload = {\n    "name": "${postData.name || 'Alice'}",\n    "email": "${postData.email || 'alice@example.com'}",\n    "message": "${postData.message || 'Hello from requests!'}"\n}\n\nresponse = requests.post(\n    "${origin}/api/contact",\n    json=payload\n)\nprint(response.json())`;
      }
    }

    return '';
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syntaxHighlight = (json: string) => {
    if (!json) return null;
    return json.split('\n').map((line, i) => {
      let coloredLine = line;
      
      coloredLine = coloredLine.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")(\s*:)/g, '<span class="text-matrix">$1</span>$3');
      coloredLine = coloredLine.replace(/(:\s*)("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")/g, '$1<span class="text-matrix-light font-medium">$2</span>');
      coloredLine = coloredLine.replace(/(:\s*)(true|false|null|\d+)/g, '$1<span class="text-yellow-500 font-bold">$2</span>');

      return (
        <div key={i} dangerouslySetInnerHTML={{ __html: coloredLine }} />
      );
    });
  };

  return (
    <section id="console" className="py-24 relative overflow-hidden bg-dark border-t border-white/[0.03]">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-matrix/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-matrix text-sm tracking-widest block mb-3">&lt;api_explorer/&gt;</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Query the Portfolio API.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Test live Next.js endpoints directly in your browser. Send simulated requests and check response headers, code snippets, and payloads.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-5 bg-white/[0.01] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between hover:border-matrix/10 transition-all duration-300">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2 mb-6">
                <Terminal size={14} className="text-matrix" />
                <span>Request Builder</span>
              </h3>

              <div className="space-y-3 mb-6">
                <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                  Select Endpoint
                </label>
                <div className="flex flex-col gap-2">
                  {ENDPOINTS.map((ep, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveEndpointIdx(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all duration-200 outline-none flex items-center justify-between ${
                        activeEndpointIdx === idx
                          ? 'bg-matrix/10 border-matrix text-white shadow-[0_0_15px_rgba(0,255,136,0.05)]'
                          : 'bg-white/[0.01] border-white/[0.06] text-gray-400 hover:bg-white/[0.02] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                          ep.method === 'GET' ? 'bg-blue-900/50 text-blue-400 border border-blue-800/40' : 'bg-yellow-900/50 text-yellow-500 border border-yellow-800/40'
                        }`}>
                          {ep.method}
                        </span>
                        <span className="font-mono text-xs truncate max-w-[200px] sm:max-w-none">{ep.path}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">&lt;route&gt;</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  {activeEndpoint.description}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {method === 'POST' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 mb-6 border-t border-white/[0.04] pt-6 overflow-hidden"
                  >
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        Request Body (JSON)
                      </label>
                      <span className="text-[9px] font-mono text-matrix">application/json</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={postData.name}
                          onChange={handleInputChange}
                          className="bg-white/[0.03] border border-white/[0.08] focus:border-matrix rounded-lg px-3 py-2 text-white text-xs outline-none transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={postData.email}
                          onChange={handleInputChange}
                          className="bg-white/[0.03] border border-white/[0.08] focus:border-matrix rounded-lg px-3 py-2 text-white text-xs outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <textarea
                        name="message"
                        placeholder="Message content..."
                        rows={3}
                        value={postData.message}
                        onChange={handleInputChange}
                        className="bg-white/[0.03] border border-white/[0.08] focus:border-matrix rounded-lg px-3 py-2 text-white text-xs outline-none transition-all resize-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={executeRequest}
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 py-3 bg-matrix hover:bg-matrix-dark disabled:bg-matrix/40 text-black font-semibold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,255,136,0.15)] hover:shadow-[0_4px_30px_rgba(0,255,136,0.3)] outline-none cursor-pointer disabled:cursor-not-allowed mt-4"
            >
              {isSending ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">sending request...</span>
                </>
              ) : (
                <>
                  <Play size={16} fill="black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Execute Request</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-7 bg-[#0d0f0d] border border-white/[0.08] rounded-2xl flex flex-col shadow-2xl overflow-hidden min-h-[400px] lg:min-h-0 relative">
            
            <div className="flex items-center justify-between px-4 py-3 bg-[#0a0b0a] border-b border-white/[0.05] z-10">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('response')}
                  className={`font-mono text-xs py-1 transition-colors ${
                    activeTab === 'response' ? 'text-matrix border-b-2 border-matrix' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Response Body
                </button>
                <button
                  onClick={() => setActiveTab('headers')}
                  className={`font-mono text-xs py-1 transition-colors ${
                    activeTab === 'headers' ? 'text-matrix border-b-2 border-matrix' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Headers
                </button>
                <button
                  onClick={() => setActiveTab('snippets')}
                  className={`font-mono text-xs py-1 transition-colors ${
                    activeTab === 'snippets' ? 'text-matrix border-b-2 border-matrix' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Code Snippets
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
            </div>

            <div className="flex items-center gap-6 px-5 py-2.5 bg-white/[0.01] border-b border-white/[0.03] text-[10px] font-mono text-gray-500">
              <div>
                STATUS: {responseStatus ? (
                  <span className={responseStatus >= 200 && responseStatus < 300 ? 'text-matrix font-bold' : 'text-red-500 font-bold'}>
                    {responseStatus} {responseStatus === 200 ? 'OK' : responseStatus === 201 ? 'Created' : responseStatus === 400 ? 'Bad Request' : 'Error'}
                  </span>
                ) : (
                  <span>---</span>
                )}
              </div>
              <div>
                TIME: {responseTime !== null ? (
                  <span className="text-yellow-500 font-bold">{responseTime} ms</span>
                ) : (
                  <span>---</span>
                )}
              </div>
              <div className="ml-auto flex items-center gap-1 text-gray-600">
                <Code2 size={12} />
                <span>JSON</span>
              </div>
            </div>

            <div className="flex-1 p-5 font-mono text-[11px] leading-relaxed overflow-y-auto max-h-[360px] scrollbar-thin select-text">
              {activeTab === 'response' && (
                <div className="space-y-1">
                  {responseStatus === null ? (
                    <div className="text-gray-600 h-full flex flex-col justify-center py-20 select-none">
                      <p className="text-center font-mono text-xs">{`// Response payload will render here`}</p>
                      <p className="text-center font-mono text-[10px] mt-1 text-gray-700">Click &quot;Execute Request&quot; above to dispatch a HTTP pipeline call.</p>
                    </div>
                  ) : (
                    syntaxHighlight(responseBody)
                  )}
                </div>
              )}

              {activeTab === 'headers' && (
                <div className="space-y-1 text-gray-400">
                  {responseStatus === null ? (
                    <div className="text-gray-600 text-center py-20 select-none">{`// Response headers will render here`}</div>
                  ) : (
                    Object.entries(responseHeaders).map(([key, val]) => (
                      <div key={key}>
                        {key === 'HTTP/1.1' ? (
                          <span className="text-blue-400 font-bold">{key} {val}</span>
                        ) : (
                          <>
                            <span className="text-gray-500 font-semibold">{key}:</span>{' '}
                            <span className="text-gray-300">{val}</span>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'snippets' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.04] select-none">
                    <div className="flex gap-2">
                      {(['curl', 'javascript', 'python'] as const).map(lang => (
                        <button
                          key={lang}
                          onClick={() => setSnippetLanguage(lang)}
                          className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase transition-all outline-none border ${
                            snippetLanguage === lang
                              ? 'bg-matrix/10 border-matrix text-matrix'
                              : 'bg-white/[0.02] border border-white/[0.05] text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {lang === 'javascript' ? 'fetch' : lang === 'python' ? 'requests' : lang}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1 text-gray-500 hover:text-matrix transition-colors text-[10px] outline-none"
                    >
                      {copied ? <Check size={12} className="text-matrix" /> : <Copy size={12} />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-gray-300 whitespace-pre bg-black/30 p-3 rounded-lg overflow-x-auto select-all leading-normal border border-white/[0.03]">
                    {getCodeSnippet()}
                  </pre>
                </div>
              )}
            </div>
            
            <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.02]" />
          </div>

        </div>

      </div>
    </section>
  );
}
