import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiDocumentText, HiChevronDown, HiClock } from 'react-icons/hi';
import { fetchCaseStudies } from '../services/api';

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
        'Techniques to reduce API response times by 60% using select_related, prefetch_related, and database indexing.',
      content:
        '## The Problem\n\nOur hotel management platform faced slow API responses under load. Some endpoints took over 3 seconds to respond.\n\n## The Solution\n\n1. **N+1 Query Optimization**: Used select_related and prefetch_related\n2. **Database Indexing**: Added composite indexes on frequently queried fields\n3. **Redis Caching**: Cached expensive query results\n4. **Pagination**: Implemented cursor-based pagination\n\n## Results\n\nAverage response time dropped from 3.2s to 0.4s (87% improvement).',
      technologies: 'Django, PostgreSQL, Redis',
    },
    {
      title: 'Redis Caching Strategy for Microservices',
      slug: 'redis-caching-microservices',
      excerpt:
        'Implementing a distributed caching layer across multiple Django services.',
      content:
        '## Architecture\n\nImplemented Redis as a shared caching layer across 5 Django microservices.\n\n## Cache Strategies\n\n1. **Cache-Aside**: Application checks cache before DB\n2. **Write-Through**: Updates invalidate cache entries\n3. **TTL Management**: Configurable expiration per data type\n\n## Impact\n\nReduced database load by 70% and improved API response times by 65%.',
      technologies: 'Redis, Django, Docker',
    },
    {
      title: 'Building Celery for Background Job Processing',
      slug: 'celery-background-jobs',
      excerpt:
        'Designing a robust task queue for async email, report generation, and data processing.',
      content:
        '## Requirements\n\nHandle email notifications, report generation, and data synchronization asynchronously.\n\n## Implementation\n\n1. **Celery + Redis**: Message broker setup\n2. **Task Queues**: Separate queues for different priorities\n3. **Periodic Tasks**: Celery Beat for scheduled jobs\n4. **Monitoring**: Flower for task monitoring\n\n## Outcomes\n\nZero blocking on API endpoints for background operations.',
      technologies: 'Celery, Redis, Django, Docker',
    },
  ];

  const displayStudies = caseStudies.length > 0 ? caseStudies : defaultCaseStudies;

  const renderContent = (content) => {
    if (!content) return null;
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h3 key={i} className="text-lg font-bold mt-4 mb-2 text-primary-600 dark:text-primary-400">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 ml-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 shrink-0" />
            {line.replace('- ', '')}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={i} className="text-gray-600 dark:text-gray-400 ml-4 list-decimal">
            {line.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return (
        <p key={i} className="text-gray-600 dark:text-gray-400">
          {line}
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
