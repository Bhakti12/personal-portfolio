'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyCard from './CaseStudyCard';

interface ProjectData {
  title: string;
  problem: string;
  approach: string[];
  outcome: string;
  tags: string[];
  mockType: 'fleet' | 'healthcare' | 'physio' | 'aviation';
}

const PROJECTS: ProjectData[] = [
  {
    title: 'Real-time Fleet Visibility & Telematics',
    problem: 'A fleet operator needed to track hundreds of vehicles in real time, but raw GPS/telemetry data was arriving too fast and too messy to be useful — no live view, no alerts, no history worth querying.',
    approach: [
      'Built high-frequency telemetry ingestion pipelines in Python and Node.js, with custom packet parsing to cut data loss and improve throughput.',
      'Designed a dual-database architecture — MySQL for relational metadata (vehicles, drivers, SIM cards), partitioned PostgreSQL for time-series telemetry.',
      'Integrated MapmyIndia for live location visualization and geofence-based alerting.',
      'Layered in secure, role-based dashboards with authentication, rate limiting, and CSRF protection to VAPT-compliant standards.',
    ],
    outcome: 'Reduced historical query latency by 40% and gave fleet operators live, geofenced visibility with role-based access control.',
    tags: ['Node.js', 'Python', 'MySQL', 'PostgreSQL', 'MapmyIndia'],
    mockType: 'fleet',
  },
  {
    title: 'Digitizing Healthcare Workflows (FHIR-compliant)',
    problem: 'A senior-care healthcare provider was running critical medical workflows on paper-based and semi-manual processes — slow, error-prone, and impossible to make interoperable with other systems.',
    approach: [
      'Designed and built a FHIR-compliant platform to digitize medical form workflows, using Aidbox for interoperable data exchange.',
      'Built a scalable Form Service via REST APIs supporting dynamic form creation and external healthcare-system integration.',
      'Implemented Kafka-based ingestion pipelines and migrated legacy on-premise records into MongoDB.',
      'Worked directly with frontend, QA, and product to translate clinical requirements into technical specs.',
    ],
    outcome: 'Digitized structured data capture for senior-care workflows and improved healthcare record traceability, replacing manual processes with reliable, interoperable pipelines.',
    tags: ['Node.js', 'Express.js', 'Kafka', 'MongoDB', 'FHIR/Aidbox'],
    mockType: 'healthcare',
  },
  {
    title: 'Physiotherapy Operations Dashboard',
    problem: 'A physiotherapy practice needed to manage scheduling and staff workload without double-booking or overloading therapists.',
    approach: [
      'Built a scheduling and workload-optimization dashboard in Laravel/MySQL.',
      'Implemented secure REST APIs with RBAC, CSRF protection, and encrypted session management.',
    ],
    outcome: 'Gave the practice a single system to manage schedules and balance therapist workload securely.',
    tags: ['Laravel', 'MySQL', 'RBAC'],
    mockType: 'physio',
  },
  {
    title: 'Aviation Crew Management Sync',
    problem: 'An aviation crew management system needed to stay in sync with external airline systems in real time, while automating error-prone manual per-diem calculations.',
    approach: [
      'Designed backend services with real-time synchronization to external airline systems.',
      'Automated per-diem calculations based on duty schedules and business rules.',
      'Architected a relational schema in MySQL for crew records, scheduling data, and sync logs, tuned for query performance.',
    ],
    outcome: 'Removed manual per-diem calculation errors and kept crew data reliably in sync across systems.',
    tags: ['Node.js', 'Express.js', 'React', 'MySQL'],
    mockType: 'aviation',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-dark border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-mono text-matrix text-sm tracking-widest block mb-3">&lt;projects/&gt;</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Case studies in systems architecture & data integration.
          </h2>
        </motion.div>

        {/* Case Studies */}
        <div>
          {PROJECTS.map((project, idx) => (
            <CaseStudyCard
              key={idx}
              index={idx}
              title={project.title}
              problem={project.problem}
              approach={project.approach}
              outcome={project.outcome}
              tags={project.tags}
              mockType={project.mockType}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
