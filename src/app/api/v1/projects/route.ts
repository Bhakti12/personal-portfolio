import { NextResponse } from 'next/server';

export async function GET() {
  const projects = [
    {
      id: 'fleet-telematics',
      title: 'Vehicle Monitoring System',
      category: 'IoT & Data Ingestion',
      problem: 'Tracking vehicles in remote areas during emergencies was extremely difficult using basic GPS data alone. There was no system in place to detect critical events like overspeeding, harsh braking, or emergencies in real time. Additionally, RTOs, city authorities, and police departments had no way to manage geofences accurately, and responding to accidents or incidents was a slow, manual process.',
      approach: [
        'Built a comprehensive fleet management platform featuring live vehicle tracking, geofencing with route deviation alerts, and an SOS/incident reporting system for emergencies.',
        'Implemented driver behavior mapping to monitor overspeeding and harsh braking, along with a real-time alerts and notification management system.',
        'Designed role-based dashboards (RBAC) for different stakeholders — including RTOs, city authorities, and police stations — to manage and monitor their respective vehicles and geofences with accurate counts.',
        'Added analytics and day-by-day reporting for fleet insights, along with full CRUD operations for managing company, vehicle, and device details.',
        'Integrated SMS-based communication with IoT devices and a FOTA (Firmware Over-The-Air) mechanism for remote device updates.'
      ],
      outcome: [
        'Delivered a robust fleet monitoring platform that reduced emergency response time through real-time SOS alerts and instant incident reporting.',
        'Improved fleet safety and accountability with driver behavior tracking (overspeeding, harsh braking) and automated geofence/route deviation alerts.',
        'Enabled RTOs, city authorities, and police to manage and monitor their vehicles and geofences accurately through dedicated role-based dashboards.',
        'Reduced historical query latency by 40% through an optimized hybrid database architecture (MySQL + partitioned PostgreSQL), enabling faster analytics and reporting.',
        'Streamlined device management with SMS-based IoT communication and FOTA, reducing manual intervention for firmware updates across the fleet.'
      ],
      tags: ['Node.js', 'Python', 'MySQL', 'PostgreSQL', 'MapmyIndia', 'Redis', 'PostGIS', 'Docker'],
      status: 'production'
    },
    {
      id: 'healthcare-workflows',
      title: 'Healthcare Application (FHIR-Compliant)',
      category: 'Healthcare Interoperability',
      problem: 'Home nurse care involved extensive paperwork, with over 20+ different forms per patient depending on the type of care — ranging from initial intake forms to medication tracking. This manual, paper-based process was time-consuming, error-prone, and lacked any digital record-keeping, creating friction for both nurses and care providers.',
      approach: [
        'Designed and built a FHIR-compliant digital platform using Aidbox, a FHIR-based server with built-in form-building capabilities and FHIR-compliant storage. Created dynamic digital forms and integrated them with our existing MySQL and MongoDB databases to auto-populate patient details — eliminating repetitive manual data entry for nurses.',
        'The platform was researched, built, and deployed in a short timeframe, quickly gaining adoption across nursing staff.',
        'To handle scale, migrated 15+ million records (visits, patients, users, medications) from SQL to MongoDB for better performance, using Kafka for reliable data streaming and AWS architecture for infrastructure.',
        'Built the system using a microservices architecture, integrating multiple third-party APIs into our own services for seamless interoperability.'
      ],
      outcome: [
        'Successfully digitized the entire home nurse care workflow, eliminating manual paperwork and significantly reducing form completion time through auto-population of patient data.',
        'Enabled nurses across care settings to adopt the platform quickly due to its intuitive, form-based design.',
        'Improved system performance and scalability by migrating 15+ million records to a NoSQL architecture, ensuring the platform could reliably handle high data volume.',
        'Achieved a robust, interoperable system through microservices and API integrations, supporting long-term extensibility and easier future integrations.'
      ],
      tags: ['Node.js', 'Kafka', 'MySQL', 'PostgreSQL', 'MongoDB', 'Aidbox (FHIR)', 'AWS CloudFormation', 'API Gateway', 'SQS', 'CloudWatch', 'Microservices'],
      status: 'production'
    },
    {
      id: 'physiotherapy-ops',
      title: 'PhysioDashboard',
      category: 'Operations & Scheduling',
      problem: 'A physiotherapy clinic with multiple practitioners had no centralized way to manage daily operations. The clinic owner needed a single system to handle practitioner scheduling and attendance, patient appointments and visit history, medication tracking, payment status across different payment methods, and notifications — all of which were being managed manually and inefficiently.',
      approach: [
        'Designed the system architecture and built a comprehensive operations dashboard covering practitioner management, patient scheduling, visit tracking, medication records, and payment processing (including multiple payment methods and status tracking).',
        'Implemented workload optimization algorithms to balance scheduling across practitioners, along with a notification system to keep both staff and patients updated.',
        'Secured the platform with RBAC (role-based access control), CSRF protection, and encrypted session management to protect sensitive clinic and patient data.'
      ],
      outcome: [
        'Delivered a fully digitized clinic management system that currently handles 1,000+ practitioners and 15,000+ patients reliably and at scale.',
        'Eliminated manual coordination for scheduling, payments, and attendance tracking, giving the clinic owner centralized visibility and control over all operations.'
      ],
      tags: ['Laravel', 'MySQL', 'React.js', 'AWS Lambda', 'Docker'],
      status: 'completed'
    },
    {
      id: 'aviation-crew-sync',
      title: 'Aviation Crew Management System',
      category: 'Real-time Synchronization',
      problem: 'Within a large, existing microservices-based system, airline crews traveling between destinations (e.g., London to Paris) were entitled to per diem allowances — covering hotel stays, meals, and other travel-related expenses. However, there was no dedicated system to calculate and manage these per diems accurately based on duty schedules, routes, and business rules, making it a manual and error-prone process at scale.',
      approach: [
        'Built a dedicated per diem management module as part of the larger crew management system, integrating with existing crew scheduling and duty data to automate per diem calculations based on route, duration, and destination-specific rules.',
        'Used GCP (Google Cloud Platform) to stay consistent with the existing microservices infrastructure, ensuring seamless integration with other crew management services already deployed on the platform.',
        'Used Kafka for event-driven communication between services — enabling real-time synchronization of crew duty updates, schedule changes, and per diem recalculations across the system without tight coupling between services, ensuring data consistency even as crew schedules changed frequently.'
      ],
      outcome: [
        'Automated per diem calculations that were previously manual, reducing errors and processing time for crew expense management.',
        'Ensured real-time consistency between crew schedules and per diem records through Kafka-driven event synchronization, even across a distributed microservices environment.',
        'Delivered a solution that integrated smoothly into the existing GCP-based infrastructure without disrupting other services.'
      ],
      tags: ['React', 'Node.js', 'MySQL', 'MongoDB', 'PostgreSQL', 'GCP', 'Kafka'],
      status: 'completed'
    }
  ];

  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    results: projects.length,
    data: projects
  });
}
