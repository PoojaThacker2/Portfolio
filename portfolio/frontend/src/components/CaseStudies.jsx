import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiDocumentText, HiChevronDown } from 'react-icons/hi';
import { fetchCaseStudies } from '../services/api';
import { CASE_STUDY_DIAGRAMS } from './ArchitectureDiagrams';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchCaseStudies().then(setCaseStudies).catch(() => {});
  }, []);

  const defaultCaseStudies = [
    {
      title: 'How I Optimized Django APIs for High Traffic',
      slug: 'optimize-django-apis',
      excerpt:
        'Techniques to reduce API response times by 87% using select_related, prefetch_related, database indexing and Redis caching.',
      content:
        "## Problem\n\nOur hotel management platform's REST APIs slowed down significantly under load — some endpoints took over 3 seconds to respond, most of it from Django ORM N+1 query patterns and unindexed lookups.\n\n## Context\n\nThe platform serves 70+ REST APIs across 5+ Django microservices for a multi-tenant hospitality product, so a slow endpoint compounds across every tenant hitting it concurrently.\n\n## Engineering Challenge\n\nNested serializers were triggering a database query per related object, and several list endpoints had no pagination, so response size and query count both grew with data volume.\n\n## Approach\n\n1. **Query Optimization**: Replaced implicit related-object lookups with select_related and prefetch_related to collapse N+1 patterns into a fixed number of queries\n2. **Database Indexing**: Added composite indexes on the fields most frequently used in filters and ordering\n3. **Redis Caching**: Cached expensive, infrequently-changing query results with a defined TTL\n4. **Pagination**: Replaced full-table responses with cursor-based pagination\n\n## Result\n\nAverage response time dropped from 3.2s to 0.4s — an 87% improvement — without changing the API's response shape for existing clients.\n\n## Lessons Learned\n\nQuery optimization and caching solve different problems: indexing and select_related/prefetch_related fix the query pattern itself, while caching only helps once the query is already efficient. Fixing the N+1 pattern first made the caching layer far more effective, since it wasn't compensating for wasted work.",
      technologies: 'Django, PostgreSQL, Redis',
    },
    {
      title: 'Redis Caching Strategy for Microservices',
      slug: 'redis-caching-microservices',
      excerpt:
        'Implementing a shared caching layer across 5 Django microservices, cutting database load by 70%.',
      content:
        "## Problem\n\n5 Django microservices each ran independent database queries for the same frequently-requested data (hotel and tenant configuration, mostly-static lookups), creating redundant database load across the platform.\n\n## Context\n\nAs a multi-tenant hospitality platform, static reference data doesn't change often per tenant, but is read on nearly every request — a textbook case for a shared caching layer rather than per-service query optimization alone.\n\n## Architecture\n\nIntroduced Redis as a shared caching layer sitting between each Django service and PostgreSQL, so a cache hit in one service benefits from a write made by another.\n\n## Key Technical Decisions\n\n1. **Cache-Aside**: Each service checks Redis before querying PostgreSQL, and populates the cache on a miss — kept the caching logic explicit rather than transparent, so cache behavior stays easy to reason about per endpoint\n2. **Write-Through Invalidation**: Writes invalidate the relevant cache keys immediately rather than waiting for TTL expiry, to avoid serving stale tenant configuration after an update\n3. **TTL Management**: Configurable expiration per data type, so highly static data (e.g. tenant settings) gets a longer TTL than data that changes more often\n\n## Result\n\nReduced database load by 70% and improved API response times by 65% across the affected endpoints.\n\n## Lessons Learned\n\nCache invalidation is the harder half of caching — the read path is straightforward, but getting invalidation right (especially across multiple services sharing one cache) is what actually determines whether the cache is trustworthy. Being deliberate about TTL per data type turned out to matter as much as the caching layer itself.",
      technologies: 'Redis, Django, Docker',
    },
    {
      title: 'Building Celery for Background Job Processing',
      slug: 'celery-background-jobs',
      excerpt:
        'Decoupling notifications, scheduled syncs and background work from the request/response cycle with Celery and Redis.',
      content:
        "## Problem\n\nEmail notifications, report generation, and data synchronization were running synchronously inside the request/response cycle, blocking API responses on work that didn't need to happen immediately.\n\n## Context\n\nThe platform's asynchronous workloads span automated weather integrations, notifications, and scheduled workflows — a mix of one-off background jobs and work that needs to run on a schedule.\n\n## Architecture\n\nIntroduced Celery with Redis as the message broker, decoupling background work from the request/response cycle: the API enqueues a task and returns immediately, while a separate worker process executes it.\n\n## Key Technical Decisions\n\n1. **Celery + Redis**: Chose Redis as the broker since it was already in place for caching, avoiding an additional piece of infrastructure to operate\n2. **Task Queues**: Separated queues by priority so time-sensitive notifications aren't stuck behind longer-running report generation jobs\n3. **Celery Beat**: Used for scheduled/periodic tasks (e.g. recurring weather integration syncs) rather than hand-rolled cron plus manual triggering\n\n## Result\n\nAPI endpoints no longer block on notification, report, or sync work — request latency for those endpoints stopped being coupled to the duration of the background job itself.\n\n## Lessons Learned\n\nSeparating task queues by priority early avoided a real failure mode: without it, a burst of report-generation jobs would have delayed time-sensitive notifications behind them in the same queue.",
      technologies: 'Celery, Redis, Django, Docker',
    },
  ];

  const displayStudies = caseStudies.length > 0 ? caseStudies : defaultCaseStudies;

  const renderInline = (text) =>
    text.split(/(\*\*.+?\*\*)/g).map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i} className="font-semibold text-gray-800 dark:text-gray-200">{part.slice(2, -2)}</strong>
        : part
    );

  const renderContent = (content) => {
    if (!content) return null;
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h3 key={i} className="text-lg font-bold mt-5 mb-2 text-primary-600 dark:text-primary-400">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 ml-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 shrink-0" />
            {renderInline(line.replace('- ', ''))}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={i} className="text-gray-600 dark:text-gray-400 ml-4 list-decimal">
            {renderInline(line.replace(/^\d+\.\s*/, ''))}
          </li>
        );
      }
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return (
        <p key={i} className="text-gray-600 dark:text-gray-400">
          {renderInline(line)}
        </p>
      );
    });
  };

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          Engineering <span className="gradient-text">Case Studies</span>
        </h2>
        <p className="section-subtitle">
          Technical deep-dives into problems I've solved
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-4">
        {displayStudies.map((study, index) => (
          <motion.div
            key={study.slug || study.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="card cursor-pointer"
            onClick={() => setExpandedId(expandedId === (study.slug || study.title) ? null : (study.slug || study.title))}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 shrink-0">
                  <HiDocumentText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{study.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {study.excerpt}
                  </p>
                  {study.technologies && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {study.technologies.split(',').filter(Boolean).map((tech) => (
                        <span key={tech.trim()} className="badge text-xs">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedId === (study.slug || study.title) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="p-1 text-gray-400 shrink-0 mt-2"
              >
                <HiChevronDown className="w-5 h-5" />
              </motion.div>
            </div>

            <AnimatePresence>
              {expandedId === (study.slug || study.title) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 prose prose-sm dark:prose-invert max-w-none">
                    {CASE_STUDY_DIAGRAMS[study.slug] && (
                      <div className="not-prose mb-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                        {(() => {
                          const Diagram = CASE_STUDY_DIAGRAMS[study.slug];
                          return <Diagram />;
                        })()}
                      </div>
                    )}
                    {renderContent(study.content)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
