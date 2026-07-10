import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate fluctuating latency values
  const dbLatency = Math.floor(6 + Math.random() * 12);
  const cacheLatency = Math.floor(1 + Math.random() * 3);
  
  const healthStatus = {
    status: 'UP',
    environment: 'production',
    timestamp: new Date().toISOString(),
    uptime_seconds: Math.floor(process.uptime()),
    services: {
      api_gateway: { status: 'healthy', latency_ms: 2 },
      primary_database: { status: 'healthy', latency_ms: dbLatency, type: 'PostgreSQL' },
      cache_cluster: { status: 'healthy', latency_ms: cacheLatency, type: 'Redis' },
      message_broker: { status: 'healthy', queue_backlog: 0, type: 'Apache Kafka' }
    },
    system_metrics: {
      cpu_utilization_percent: Math.floor(12 + Math.random() * 8),
      memory_usage_mb: Math.floor(142 + Math.random() * 15),
      active_connections: Math.floor(110 + Math.random() * 20)
    }
  };

  return NextResponse.json(healthStatus);
}
