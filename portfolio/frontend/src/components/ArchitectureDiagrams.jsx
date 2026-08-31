// Simple, responsive flowchart-style SVGs describing the real architecture
// discussed in each case study's content — not decorative, meant to be read.

const boxClass = 'fill-white dark:fill-gray-900 stroke-primary-400 dark:stroke-primary-500';
const textClass = 'fill-gray-800 dark:fill-gray-100 text-[13px] font-medium';
const subTextClass = 'fill-gray-500 dark:fill-gray-400 text-[11px]';
const lineClass = 'stroke-gray-300 dark:stroke-gray-700';
const dashedClass = 'stroke-primary-400 dark:stroke-primary-500';

function ArrowMarker({ id }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" className="fill-gray-400 dark:fill-gray-600" />
    </marker>
  );
}

export function QueryOptimizationDiagram() {
  return (
    <svg viewBox="0 0 620 220" className="w-full h-auto max-w-2xl mx-auto" role="img" aria-label="Client sends a request to the Django REST API, which checks Redis cache before falling back to an indexed PostgreSQL query">
      <defs><ArrowMarker id="arrow-qo" /></defs>

      <rect x="230" y="10" width="160" height="48" rx="10" className={boxClass} strokeWidth="1.5" />
      <text x="310" y="39" textAnchor="middle" className={textClass}>Client</text>

      <line x1="310" y1="58" x2="310" y2="90" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-qo)" />

      <rect x="210" y="92" width="200" height="52" rx="10" className={boxClass} strokeWidth="1.5" />
      <text x="310" y="123" textAnchor="middle" className={textClass}>Django REST API</text>

      <line x1="260" y1="144" x2="140" y2="176" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-qo)" />
      <line x1="360" y1="144" x2="480" y2="176" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-qo)" />

      <rect x="40" y="178" width="180" height="34" rx="8" className={boxClass} strokeWidth="1.5" />
      <text x="130" y="200" textAnchor="middle" className={textClass}>Redis (cache hit)</text>

      <rect x="400" y="178" width="180" height="34" rx="8" className={boxClass} strokeWidth="1.5" />
      <text x="490" y="200" textAnchor="middle" className={textClass}>PostgreSQL, indexed</text>

      <text x="200" y="168" textAnchor="middle" className={subTextClass}>hit</text>
      <text x="420" y="168" textAnchor="middle" className={subTextClass}>miss</text>
    </svg>
  );
}

export function RedisCachingDiagram() {
  return (
    <svg viewBox="0 0 620 260" className="w-full h-auto max-w-2xl mx-auto" role="img" aria-label="Client requests hit a Django API shared across microservices, which reads from Redis cache and falls back to PostgreSQL on a miss, invalidating the cache on writes">
      <defs><ArrowMarker id="arrow-rc" /></defs>

      <rect x="230" y="10" width="160" height="48" rx="10" className={boxClass} strokeWidth="1.5" />
      <text x="310" y="39" textAnchor="middle" className={textClass}>Client</text>

      <line x1="310" y1="58" x2="310" y2="90" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-rc)" />

      <rect x="180" y="92" width="260" height="52" rx="10" className={boxClass} strokeWidth="1.5" />
      <text x="310" y="115" textAnchor="middle" className={textClass}>Django API</text>
      <text x="310" y="133" textAnchor="middle" className={subTextClass}>shared across 5 microservices</text>

      <line x1="260" y1="144" x2="140" y2="186" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-rc)" />
      <line x1="360" y1="144" x2="480" y2="186" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-rc)" />

      <rect x="40" y="188" width="180" height="44" rx="8" className={boxClass} strokeWidth="1.5" />
      <text x="130" y="207" textAnchor="middle" className={textClass}>Redis</text>
      <text x="130" y="222" textAnchor="middle" className={subTextClass}>cache-aside, TTL</text>

      <rect x="400" y="188" width="180" height="44" rx="8" className={boxClass} strokeWidth="1.5" />
      <text x="490" y="207" textAnchor="middle" className={textClass}>PostgreSQL</text>
      <text x="490" y="222" textAnchor="middle" className={subTextClass}>on cache miss</text>

      <text x="200" y="176" textAnchor="middle" className={subTextClass}>read</text>
      <text x="420" y="176" textAnchor="middle" className={subTextClass}>miss</text>

      <path d="M 400 210 C 320 250, 220 250, 140 218" fill="none" className={dashedClass} strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-rc)" />
      <text x="270" y="252" textAnchor="middle" className={subTextClass}>invalidate on write</text>
    </svg>
  );
}

export function CeleryDiagram() {
  return (
    <svg viewBox="0 0 620 260" className="w-full h-auto max-w-2xl mx-auto" role="img" aria-label="Client requests hit the Django API, which enqueues work onto a Celery queue backed by Redis; Celery Beat schedules periodic tasks; a worker processes the queue and writes to the database or an external service">
      <defs><ArrowMarker id="arrow-cl" /></defs>

      <rect x="230" y="10" width="160" height="44" rx="10" className={boxClass} strokeWidth="1.5" />
      <text x="310" y="37" textAnchor="middle" className={textClass}>Client</text>

      <line x1="310" y1="54" x2="310" y2="82" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-cl)" />

      <rect x="220" y="84" width="180" height="44" rx="10" className={boxClass} strokeWidth="1.5" />
      <text x="310" y="111" textAnchor="middle" className={textClass}>Django API</text>

      <line x1="310" y1="128" x2="310" y2="156" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-cl)" />

      <rect x="190" y="158" width="240" height="40" rx="8" className={boxClass} strokeWidth="1.5" />
      <text x="310" y="182" textAnchor="middle" className={textClass}>Celery Queue (Redis broker)</text>

      <path d="M 460 40 C 520 60, 520 160, 430 178" fill="none" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-cl)" />
      <rect x="440" y="10" width="150" height="40" rx="8" className={boxClass} strokeWidth="1.5" />
      <text x="515" y="34" textAnchor="middle" className={textClass}>Celery Beat</text>

      <line x1="310" y1="198" x2="310" y2="220" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-cl)" />

      <rect x="230" y="222" width="160" height="34" rx="8" className={boxClass} strokeWidth="1.5" />
      <text x="310" y="244" textAnchor="middle" className={textClass}>Worker</text>

      <line x1="260" y1="256" x2="120" y2="248" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-cl)" />
      <line x1="360" y1="256" x2="500" y2="248" className={lineClass} strokeWidth="1.5" markerEnd="url(#arrow-cl)" />

      <text x="70" y="245" textAnchor="middle" className={subTextClass}>Database</text>
      <text x="550" y="245" textAnchor="middle" className={subTextClass}>Email / notifications</text>
    </svg>
  );
}

export const CASE_STUDY_DIAGRAMS = {
  'optimize-django-apis': QueryOptimizationDiagram,
  'redis-caching-microservices': RedisCachingDiagram,
  'celery-background-jobs': CeleryDiagram,
};
