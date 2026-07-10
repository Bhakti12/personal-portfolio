'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

interface CaseStudyCardProps {
  title: string;
  problem: string;
  approach: string[];
  outcome: string | string[];
  tags: string[];
  mockType: 'fleet' | 'healthcare' | 'physio' | 'aviation';
  index: number;
}

export default function CaseStudyCard({
  title,
  problem,
  approach,
  outcome,
  tags,
  mockType,
  index,
}: CaseStudyCardProps) {
  const isEven = index % 2 === 0;

  // Render mock backend scripts/logs/JSON based on the project type
  const renderMockup = () => {
    switch (mockType) {
      case 'fleet':
        return (
          <div className="flex flex-col h-full font-mono text-[10px] leading-relaxed text-gray-300">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.05]">
              <span className="text-gray-500">database_partition.sql</span>
              <span className="text-[9px] text-matrix uppercase">postgresql</span>
            </div>
            <div className="flex-1 space-y-1 overflow-x-auto">
              <p className="text-blue-400">CREATE TABLE <span className="text-white">telemetry_data</span> (</p>
              <p className="pl-4 text-gray-400">id BIGSERIAL,</p>
              <p className="pl-4 text-gray-400">vehicle_id VARCHAR(50) NOT NULL,</p>
              <p className="pl-4 text-yellow-500/90">gps_coordinates POINT NOT NULL,</p>
              <p className="pl-4 text-gray-400">speed_kmh NUMERIC(5,2),</p>
              <p className="pl-4 text-matrix">timestamp TIMESTAMPTZ NOT NULL</p>
              <p className="text-blue-400">) PARTITION BY RANGE <span className="text-white">(timestamp);</span></p>
              <div className="h-2" />
              <p className="text-gray-500">-- Partition for current day telemetry</p>
              <p className="text-blue-400">CREATE TABLE <span className="text-white">telemetry_y2026m07d03</span></p>
              <p className="pl-4">PARTITION OF <span className="text-yellow-400">telemetry_data</span></p>
              <p className="pl-4">FOR VALUES FROM (<span className="text-matrix">&apos;2026-07-03 00:00:00&apos;</span>)</p>
              <p className="pl-4">TO (<span className="text-matrix">&apos;2026-07-04 00:00:00&apos;</span>);</p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/[0.05]">
              <div className="flex items-center justify-between pb-1 text-[9px] text-gray-500">
                <span>ingested_packet.json</span>
                <span className="h-1.5 w-1.5 rounded-full bg-matrix animate-ping" />
              </div>
              <pre className="text-[9px] text-matrix overflow-x-auto leading-tight bg-black/40 p-2 rounded">
{`{
  "vehicle_id": "GJ-01-TE-4890",
  "coords": {"lat": 23.0225, "lng": 72.5714},
  "speed": 64.8,
  "geofences": ["ahmedabad_central"],
  "timestamp": "2026-07-03T06:30:38.574Z"
}`}
              </pre>
            </div>
          </div>
        );
      case 'healthcare':
        return (
          <div className="flex flex-col h-full font-mono text-[10px] leading-relaxed text-gray-300">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.05]">
              <span className="text-gray-500">fhir_patient_resource.json</span>
              <span className="text-[9px] text-matrix uppercase">aidbox / fhir</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
              <pre className="text-gray-300 leading-tight">
{`{
  "resourceType": "Patient",
  "id": "care-patient-9821",
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Doe",
      "given": ["John", "A."]
    }
  ],
  "telecom": [
    { "system": "phone", "value": "+919409153650" }
  ],
  "managingOrganization": {
    "reference": "Organization/senior-care-center"
  }
}`}
              </pre>
              <div className="mt-3 pt-2 border-t border-white/[0.05]">
                <div className="text-[9px] text-gray-500 mb-1">kafka_producer.log</div>
                <div className="text-[8px] bg-black/40 p-2 rounded text-blue-400">
                  <p className="text-matrix">[KAFKA] Producer dispatched to topic &quot;patient-events&quot;</p>
                  <p>partition: 2, offset: 19804, key: &quot;care-patient-9821&quot;</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'physio':
        return (
          <div className="flex flex-col h-full font-mono text-[10px] leading-relaxed text-gray-300">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.05]">
              <span className="text-gray-500">WorkloadMiddleware.php</span>
              <span className="text-[9px] text-matrix uppercase">laravel / php</span>
            </div>
            <div className="flex-1 space-y-1 overflow-x-auto">
              <p className="text-purple-400">namespace <span className="text-white">App\Http\Middleware;</span></p>
              <div className="h-1" />
              <p className="text-blue-400">class <span className="text-white">CheckTherapistWorkload</span></p>
              <p className="text-blue-400">{`{`}</p>
              <p className="pl-4 text-blue-400">public function <span className="text-yellow-400">handle</span>($request, Closure $next)</p>
              <p className="pl-4">{`{`}</p>
              <p className="pl-8 text-gray-400">$therapist = Therapist::findOrFail($request-&gt;therapist_id);</p>
              <p className="pl-8 text-gray-500">{"// Prevent overloading (max 6 hours active booking / day)"}</p>
              <p className="pl-8 text-blue-400">if <span className="text-white">($therapist-&gt;dailyWorkloadHours() &gt;= 6)</span> {`{`}</p>
              <p className="pl-12 text-red-400">return response()-&gt;json([</p>
              <p className="pl-16 text-yellow-500">&apos;error&apos; =&gt; &apos;Therapist daily load limit reached.&apos;</p>
              <p className="pl-12 text-red-400">], 422);</p>
              <p className="pl-8">{`}`}</p>
              <p className="pl-8 text-purple-400">return $next($request);</p>
              <p className="pl-4">{`}`}</p>
              <p className="text-blue-400">{`}`}</p>
            </div>
          </div>
        );
      case 'aviation':
        return (
          <div className="flex flex-col h-full font-mono text-[10px] leading-relaxed text-gray-300">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.05]">
              <span className="text-gray-500">aviation_sync_job.ts</span>
              <span className="text-[9px] text-matrix uppercase">node.js / ts</span>
            </div>
            <div className="flex-1 space-y-1 overflow-x-auto">
              <p className="text-purple-400">async function <span className="text-yellow-400">syncCrewData</span>() {`{`}</p>
              <p className="pl-4 text-gray-500">{"// Fetch rosters from Sabre API"}</p>
              <p className="pl-4 text-gray-400">const flightSchedules = await SabreClient.getFlightSchedules();</p>
              <div className="h-1" />
              <p className="pl-4 text-blue-400">await <span className="text-white">db.transaction(async (tx) =&gt; {`{`}</span></p>
              <p className="pl-8 text-blue-400">for <span className="text-white">(const flight of flightSchedules) {`{`}</span></p>
              <p className="pl-12 text-gray-400">const perDiem = calculatePerDiem(flight.duration, flight.dest);</p>
              <p className="pl-12 text-purple-400">await tx.insert(crewRoster).values({`{`}</p>
              <p className="pl-16 text-gray-300">crewId: flight.crewId,</p>
              <p className="pl-16 text-gray-300">dutyHours: flight.duration,</p>
              <p className="pl-16 text-matrix">perDiemAmount: perDiem</p>
              <p className="pl-12 text-purple-400">{`}})`}</p>
              <p className="pl-8 text-gray-400">.onConflictUpdate();</p>
              <p className="pl-4">{`})`}</p>
              <p className="text-purple-400">{`}`}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-matrix/5 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

      {/* Case Study Details - Takes 7 Cols on desktop */}
      <div
        className={`lg:col-span-7 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-matrix/20 transition-all duration-300 ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <div>
          <div className="flex flex-wrap gap-2 mb-4 font-mono text-[10px] tracking-wider text-matrix-light">
            <span>&lt;case_study_{index + 1}/&gt;</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
            {title}
          </h3>

          <div className="mb-6 bg-red-950/20 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="text-red-500/80 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <h4 className="font-mono text-xs uppercase text-red-400 tracking-wider mb-1">Problem</h4>
              <p className="text-gray-400 text-sm">{problem}</p>
            </div>
          </div>

          <div className="mb-6 pl-2">
            <h4 className="font-mono text-xs uppercase text-gray-500 tracking-wider mb-3">Approach</h4>
            <ul className="space-y-3">
              {approach.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-gray-300 text-sm">
                  <ChevronRight className="text-matrix mt-1 flex-shrink-0" size={14} />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="bg-matrix/5 border border-matrix/20 rounded-xl p-4 flex items-start gap-3 mb-6">
            <CheckCircle2 className="text-matrix mt-0.5 flex-shrink-0" size={18} />
            <div className="w-full">
              <h4 className="font-mono text-xs uppercase text-matrix-light tracking-wider mb-1">Outcome</h4>
              {Array.isArray(outcome) ? (
                <ul className="space-y-2 mt-2">
                  {outcome.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm font-medium">
                      <span className="text-matrix flex-shrink-0 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300 text-sm font-medium">{outcome}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.04]">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono font-medium px-2.5 py-1 bg-white/[0.04] text-gray-400 rounded border border-white/[0.05]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Code logs Mockup Container - Takes 5 Cols on desktop */}
      <div
        className={`lg:col-span-5 bg-dark-elevated border border-white/[0.08] rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col min-h-[350px] lg:min-h-0 ${
          isEven ? 'lg:order-2 lg:rotate-1' : 'lg:order-1 lg:-rotate-1'
        } hover:rotate-0 transition-transform duration-500`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.005] to-white/[0.02] pointer-events-none" />

        {/* Mockup Title bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.05] relative z-20 select-none">
          <span className="font-mono text-xs text-gray-500 flex items-center gap-1.5">
            <Terminal size={12} className="text-matrix" />
            <span>Code Logs</span>
          </span>
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <span className="w-2 h-2 rounded-full bg-green-500/80" />
          </div>
        </div>

        {/* Contents area */}
        <div className="flex-1 relative z-10 flex flex-col justify-between overflow-hidden">
          {renderMockup()}
        </div>
      </div>
    </motion.div>
  );
}
