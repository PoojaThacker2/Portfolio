import { motion } from 'framer-motion';
import {
  HiTemplate, HiCode, HiShare, HiLightningBolt,
  HiClock, HiDatabase, HiCog,
} from 'react-icons/hi';

const SPECIALIZATIONS = [
  {
    icon: HiTemplate,
    title: 'Backend Architecture',
    description: 'Designing maintainable service architectures around clear boundaries and domain responsibilities — including multi-tenant systems with secure tenant isolation.',
  },
  {
    icon: HiCode,
    title: 'API Engineering',
    description: 'Building REST APIs with Django REST Framework and FastAPI, with strong validation, authentication, filtering, pagination and OpenAPI documentation.',
  },
  {
    icon: HiShare,
    title: 'Distributed Systems',
    description: 'Coordinating multiple Django microservices and asynchronous workflows across Celery, Redis and Kafka.',
  },
  {
    icon: HiLightningBolt,
    title: 'Performance & Scalability',
    description: 'Optimizing PostgreSQL/MySQL queries and ORM models, and introducing caching to reduce database load and response times.',
  },
  {
    icon: HiClock,
    title: 'Asynchronous Processing',
    description: 'Using Celery and Celery Beat for background jobs, scheduled workflows and notification pipelines decoupled from the request/response cycle.',
  },
  {
    icon: HiDatabase,
    title: 'Database Design',
    description: 'Modeling relational schemas with Django ORM and SQLAlchemy, including migrations managed with Alembic and Django migrations.',
  },
  {
    icon: HiCog,
    title: 'Production Engineering',
    description: 'Deploying and operating services with Docker, Jenkins CI/CD and Kubernetes-based QA environments, with OWASP-aligned security practices.',
  },
];

export default function Specialization() {
  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          What I <span className="gradient-text">Specialize In</span>
        </h2>
        <p className="section-subtitle">
          The engineering problems I spend most of my time solving
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPECIALIZATIONS.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="card"
          >
            <div className="p-2.5 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 w-fit mb-4">
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
