import { NextResponse } from 'next/server';

export async function GET() {
  const skillsData = {
    programming_languages: ['Python', 'JavaScript', 'TypeScript'],
    backend_development: ['Node.js', 'Express.js', 'Django', 'REST APIs', 'WebSockets'],
    databases: ['MySQL', 'PostgreSQL', 'MongoDB'],
    cloud: ['AWS Lambda'],
    healthcare_tech: ['FHIR', 'Aidbox'],
    maps_and_geospatial: ['MapmyIndia APIs'],
    security: ['JWT Authentication', 'Role-Based Access Control (RBAC)', 'Rate Limiting', 'CSRF Protection', 'Input Validation'],
    tools_and_version_control: ['Git', 'GitHub']
  };

  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    data: skillsData
  });
}
